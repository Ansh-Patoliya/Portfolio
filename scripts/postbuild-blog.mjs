// After `vite build`: writes real HTML for /blog and every /blog/<slug>/ so crawlers
// and link previews see the content without running JavaScript.
import fs from "node:fs";
import path from "node:path";
import { AUTHOR, OUT_DIR, SITE_URL } from "./blog-config.mjs";
import { categories, firstPara, projects } from "./load-projects.mjs";

const root = process.cwd();
const out = path.join(root, OUT_DIR);
const template = fs.readFileSync(path.join(out, "index.html"), "utf8").replace(/\s*<noscript>[\s\S]*?<\/noscript>/, ""); // static root content replaces the noscript fallback
const posts = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "posts.json"), "utf8"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function setMeta(html, attr, name, content) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`);
  return html.replace(re, (_, a, b) => `${a}${esc(content)}${b}`);
}

function page({ title, description, url, image, type = "website", body, jsonLd, extraHead = "" }) {
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "property", "og:type", type);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "name", "twitter:title", title);
  html = setMeta(html, "name", "twitter:description", description);
  if (image) {
    html = setMeta(html, "property", "og:image", image);
    html = setMeta(html, "name", "twitter:image", image);
  }
  const ld = (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [])
    .map((j) => `  <script type="application/ld+json">${JSON.stringify(j)}</script>\n`)
    .join("");
  html = html.replace("</head>", `${extraHead}${ld}    </head>`);
  // React replaces #root on load, so this is only for crawlers / no-JS readers.
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}

function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
  };
}

function write(rel, html) {
  const file = path.join(out, rel, "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// /blog
write(
  "blog",
  page({
    title: `Blog | ${AUTHOR}`,
    description: "Notes on web development, data analytics and AI by Ansh Patoliya.",
    url: `${SITE_URL}/blog`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        url: `${SITE_URL}/blog`,
        name: `${AUTHOR} | Blog`,
        description: "Project overviews and notes by Ansh Patoliya.",
        inLanguage: "en-IN",
        author: { "@id": `${SITE_URL}/#person` },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date })),
      },
      breadcrumb([["Home", SITE_URL + "/"], ["Blog", `${SITE_URL}/blog`]]),
    ],
    body:
      `<main><h1>Blog</h1><ul>` +
      posts.map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a> (${p.date}): ${esc(p.summary)}</li>`).join("") +
      `</ul></main>`,
  }),
);

// /blog/<slug>
for (const p of posts) {
  const url = `${SITE_URL}/blog/${p.slug}`;
  const image = p.image ? (p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`) : undefined;
  write(
    `blog/${p.slug}`,
    page({
      title: `${p.title} | ${AUTHOR}`,
      description: p.summary,
      url,
      image,
      type: "article",
      body: `<main><article><h1>${esc(p.title)}</h1><p><time datetime="${p.date}">${p.date}</time></p>${p.html}</article></main>`,
      extraHead:
        `  <meta property="article:published_time" content="${p.date}" />\n` +
        `  <meta property="article:author" content="${AUTHOR}" />\n` +
        p.tags.map((t) => `  <meta property="article:tag" content="${esc(t)}" />\n`).join(""),
      jsonLd: [{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: p.summary,
        datePublished: p.date,
        dateModified: p.date,
        mainEntityOfPage: url,
        ...(image ? { image } : {}),
        keywords: p.tags.join(", "),
        inLanguage: "en-IN",
        wordCount: p.html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        author: { "@id": `${SITE_URL}/#person`, "@type": "Person", name: AUTHOR },
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      breadcrumb([["Home", SITE_URL + "/"], ["Blog", `${SITE_URL}/blog`], [p.title, url]]),
      ],
    }),
  );
}
// ---- home: crawler-readable content + project list as structured data ----
const homeBody =
  `<main><h1>Ansh Patoliya: Full-stack developer &amp; data analyst</h1>` +
  `<p>Ansh Patoliya is a 3rd-year Computer Engineering student based in Ahmedabad, Gujarat, India. He builds web apps, Power BI dashboards and AI tools.</p>` +
  `<h2>Projects</h2>` +
  categories
    .map((c) => {
      const items = projects.filter((p) => p.category === c.id);
      return `<h3>${esc(c.label)}</h3><ul>` + items.map((p) => `<li><strong>${esc(p.title)}</strong>: ${esc(firstPara(p.description))}${p.githubUrl ? ` <a href="${p.githubUrl}">GitHub</a>` : ""}</li>`).join("") + `</ul>`;
    })
    .join("") +
  `<h2>Contact</h2><p>anshpatoliya1408@gmail.com · <a href="https://github.com/Ansh-Patoliya">GitHub</a> · <a href="https://www.linkedin.com/in/ansh-patoliya">LinkedIn</a></p>` +
  `<p><a href="/blog">Blog</a></p></main>`;

const projectList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Ansh Patoliya",
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareSourceCode",
      name: p.title,
      description: firstPara(p.description),
      keywords: p.tags.join(", "),
      author: { "@id": `${SITE_URL}/#person` },
      ...(p.githubUrl ? { codeRepository: p.githubUrl } : {}),
    },
  })),
};
let home = template.replace('<div id="root"></div>', `<div id="root">${homeBody}</div>`);
home = home.replace("</head>", `  <script type="application/ld+json">${JSON.stringify(projectList)}</script>\n    </head>`);
fs.writeFileSync(path.join(out, "index.html"), home);

console.log(`[blog] wrote static HTML for /blog and ${posts.length} post(s).`);
