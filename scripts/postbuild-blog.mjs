// After `vite build`: writes real HTML for /blog and every /blog/<slug>/ so crawlers
// and link previews see the content without running JavaScript.
import fs from "node:fs";
import path from "node:path";
import { AUTHOR, OUT_DIR, SITE_URL } from "./blog-config.mjs";

const root = process.cwd();
const out = path.join(root, OUT_DIR);
const template = fs.readFileSync(path.join(out, "index.html"), "utf8");
const posts = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "posts.json"), "utf8"));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function setMeta(html, attr, name, content) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`);
  return html.replace(re, (_, a, b) => `${a}${esc(content)}${b}`);
}

function page({ title, description, url, image, type = "website", body, jsonLd }) {
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
  if (jsonLd) html = html.replace("</head>", `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n    </head>`);
  // React replaces #root on load, so this is only for crawlers / no-JS readers.
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
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
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: p.summary,
        datePublished: p.date,
        dateModified: p.date,
        mainEntityOfPage: url,
        ...(image ? { image } : {}),
        keywords: p.tags.join(", "),
        author: { "@id": `${SITE_URL}/#person`, "@type": "Person", name: AUTHOR },
      },
    }),
  );
}
console.log(`[blog] wrote static HTML for /blog and ${posts.length} post(s).`);
