// One-off helper: creates content/blog.xlsx with the right columns.
// Usage: node scripts/init-blog-xlsx.mjs [--sample]
import fs from "node:fs";
import XLSX from "xlsx";

const header = ["slug", "title", "date", "summary", "tags", "body", "image", "published"];
const sample = process.argv.includes("--sample");
const rows = sample
  ? [
      ["how-to-add-a-post", "How to add a post to this blog", "2026-10-15",
       "Open the Excel file, add a row, push to GitHub. That is the whole workflow.", "Blog, Meta",
       "## The workflow\n\n1. Open `content/blog.xlsx`.\n2. Add a new row.\n3. Put an image in `public/blog/` (optional).\n4. `git push`, Vercel rebuilds.\n\n## Markdown works\n\nUse **bold**, *italic*, [links](https://github.com/Ansh-Patoliya), lists and code blocks.\n\n> Short posts are fine.\n", "", "no"],
    ]
  : [];

fs.mkdirSync("content", { recursive: true });
const ws = XLSX.utils.aoa_to_sheet([header, ...rows]);
ws["!cols"] = [{ wch: 24 }, { wch: 40 }, { wch: 12 }, { wch: 50 }, { wch: 20 }, { wch: 80 }, { wch: 20 }, { wch: 10 }];
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "posts");
XLSX.writeFile(wb, "content/blog.xlsx");
console.log("content/blog.xlsx written");
