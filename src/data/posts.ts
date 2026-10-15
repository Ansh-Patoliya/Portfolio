import raw from "./posts.json";

export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  summary: string;
  tags: string[];
  image?: string; // public URL, e.g. /blog/my-post.jpg
  readingTime: number; // minutes
  html: string;
};

/** Generated from content/blog.xlsx by scripts/build-blog.mjs (newest first). */
export const posts = raw as Post[];

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
