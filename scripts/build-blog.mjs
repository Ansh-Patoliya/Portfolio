// Reads content/blog.xlsx and generates:
//   src/data/posts.json   (used by the React pages)
//   public/sitemap.xml    (home + /blog + every post)
//   public/rss.xml
// Runs automatically before `npm run dev` and `npm run build`.
import fs from "node:fs";
import path from "node:path";
import XLSX from "xlsx";
import { marked } from "marked";
import { AUTHOR, SITE_URL } from "./blog-config.mjs";
import { categories, firstPara, plain, projects } from "./load-projects.mjs";

const root = process.cwd();
const xlsxPath = path.join(root, "content", "blog.xlsx");
const REQUIRED = ["slug", "title", "date", "summary", "body"];

const fail = (msg) => {
  console.error(`\n[blog] ${msg}\n`);
  process.exit(1);
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

let rows = [];
if (fs.existsSync(xlsxPath)) {
  const wb = XLSX.read(fs.readFileSync(xlsxPath), { type: "buffer", cellDates: false });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  rows = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: "yyyy-mm-dd", defval: "" });
} else {
  console.warn("[blog] content/blog.xlsx not found, building with zero posts.");
}

const seen = new Set();
const posts = [];
rows.forEach((row, i) => {
  const r = {};
  for (const [k, v] of Object.entries(row)) r[k.trim().toLowerCase()] = typeof v === "string" ? v.trim() : v;
  const line = i + 2; // header is row 1
  if (!r.slug && !r.title) return; // fully empty row

  if (String(r.published ?? "").toLowerCase() !== "yes") return;

  for (const col of REQUIRED) if (!r[col]) fail(`Row ${line}: "${col}" is empty.`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug)) fail(`Row ${line}: slug "${r.slug}" must be lowercase-with-dashes.`);
  if (seen.has(r.slug)) fail(`Row ${line}: duplicate slug "${r.slug}".`);
  seen.add(r.slug);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date)) fail(`Row ${line}: date "${r.date}" must look like 2026-10-15 (format the column as yyyy-mm-dd).`);

  let image;
  if (r.image) {
    image = /^(https?:)?\/\//.test(r.image) || r.image.startsWith("/") ? r.image : `/blog/${r.image}`;
    if (image.startsWith("/blog/") && !fs.existsSync(path.join(root, "public", image))) {
      // Not fatal: lets you list the file name first and drop the image in later.
      console.warn(`[blog] Row ${line}: image "${r.image}" not found in public/blog/, publishing without it.`);
      image = undefined;
    }
  }

  const html = marked.parse(String(r.body), { gfm: true, breaks: false });
  const words = String(r.body).split(/\s+/).filter(Boolean).length;
  posts.push({
    slug: r.slug,
    title: r.title,
    date: r.date,
    summary: r.summary,
    tags: String(r.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    ...(image ? { image } : {}),
    readingTime: Math.max(1, Math.round(words / 200)),
    html,
  });
});

posts.sort((a, b) => b.date.localeCompare(a.date));
fs.writeFileSync(path.join(root, "src", "data", "posts.json"), JSON.stringify(posts, null, 2) + "\n");

// ---- sitemap ----
const today = new Date().toISOString().slice(0, 10);
const urls = [
  { loc: `${SITE_URL}/`, lastmod: today, priority: "1.0" },
  { loc: `${SITE_URL}/blog`, lastmod: posts[0]?.date ?? today, priority: "0.8" },
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date, priority: "0.7" })),
];
fs.writeFileSync(
  path.join(root, "public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n") +
    `\n</urlset>\n`,
);

// ---- rss ----
const rfc822 = (d) => new Date(`${d}T00:00:00+05:30`).toUTCString();
fs.writeFileSync(
  path.join(root, "public", "rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel>\n` +
    `<title>${esc(AUTHOR)} | Blog</title><link>${SITE_URL}/blog</link>\n` +
    `<description>Notes on web development, data analytics and AI.</description><language>en</language>\n` +
    posts
      .map(
        (p) =>
          `<item><title>${esc(p.title)}</title><link>${SITE_URL}/blog/${p.slug}</link><guid>${SITE_URL}/blog/${p.slug}</guid>` +
          `<pubDate>${rfc822(p.date)}</pubDate><description>${esc(p.summary)}</description></item>`,
      )
      .join("\n") +
    `\n</channel></rss>\n`,
);

// ---- llms.txt + llms-full.txt (for AI assistants / answer engines) ----
const strip = (html) => html.replace(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g, "\n## $1\n").replace(/<li>/g, "- ").replace(/<\/(p|li|ul|ol)>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\n{3,}/g, "\n\n").trim();
const intro = `# ${AUTHOR}

> ${AUTHOR} is a full-stack developer and data analyst, a 3rd-year Computer Engineering student in Ahmedabad, Gujarat, India. He builds web apps, Power BI dashboards and AI tools.

## About
- Location: Ahmedabad, Gujarat, India
- Focus: full-stack web (Django REST Framework, Next.js, Flask, React), data analytics (Power BI, SQL, Python), AI tools (Gemini API)
- Contact: anshpatoliya1408@gmail.com

## Links
- [Portfolio](${SITE_URL}/)
- [Blog](${SITE_URL}/blog)
- [GitHub](https://github.com/Ansh-Patoliya)
- [LinkedIn](https://www.linkedin.com/in/ansh-patoliya)
- [Resume](${SITE_URL}/Ansh_Patoliya_Resume.pdf)
`;
const projectLines = categories
  .map((c) => `### ${c.label}\n` + projects.filter((p) => p.category === c.id).map((p) => `- **${p.title}**: ${firstPara(p.description)}${p.githubUrl ? ` (${p.githubUrl})` : ""}`).join("\n"))
  .join("\n\n");
const postLines = posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.summary}`).join("\n");
fs.writeFileSync(path.join(root, "public", "llms.txt"), `${intro}\n## Projects\n${projectLines}\n\n## Blog\n${postLines || "- (no posts yet)"}\n\n## Full text\n- [llms-full.txt](${SITE_URL}/llms-full.txt): all projects and blog posts in plain text\n`);
fs.writeFileSync(
  path.join(root, "public", "llms-full.txt"),
  `${intro}\n## Projects\n\n` +
    projects.map((p) => `### ${p.title}\nTags: ${p.tags.join(", ")}\n${p.githubUrl ? `Repository: ${p.githubUrl}\n` : ""}\n${plain(p.description)}`).join("\n\n") +
    `\n\n## Blog posts\n\n` +
    posts.map((p) => `### ${p.title}\nURL: ${SITE_URL}/blog/${p.slug}\nDate: ${p.date}\nTags: ${p.tags.join(", ")}\n\n${strip(p.html)}`).join("\n\n---\n\n") +
    "\n",
);

console.log(`[blog] ${posts.length} post(s) published.`);
