# Personal Portfolio

Live: https://ansh-patoliya.vercel.app/

`npm install` then `npm run dev`. Build output goes to `build/`.

## Blog: how to add a post

Posts live in **`content/blog.xlsx`** (one row = one post). No database, no backend.

| column | notes |
| --- | --- |
| `slug` | URL part, lowercase-with-dashes, unique. Becomes `/blog/<slug>` |
| `title` | Post title |
| `date` | `yyyy-mm-dd`. Format the column as Text or use this exact format |
| `summary` | 1-2 sentences, also used as meta description and link preview |
| `tags` | comma separated, e.g. `Django, Backend` |
| `body` | Markdown (headings, lists, links, code, images). Max 32,000 characters per cell |
| `image` | optional. File name of an image you put in `public/blog/` (e.g. `my-post.jpg`) |
| `published` | `yes` to show the post, anything else keeps it as a draft |

Then `git push`. Vercel rebuilds, and the build script regenerates `src/data/posts.json`,
`public/sitemap.xml`, `public/rss.xml` and real HTML for every post (good for SEO).
A bad row (duplicate slug, wrong date, missing image file) stops the build with a clear message.

Images inside the body: put the file in `public/blog/` and write `![alt](/blog/file.jpg)`.

`node scripts/init-blog-xlsx.mjs [--sample]` recreates an empty sheet (it overwrites the file).
