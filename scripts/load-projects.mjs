// Loads src/data/projects.ts (TypeScript) from plain Node scripts using esbuild.
import fs from "node:fs";
import { transformSync } from "esbuild";

const code = transformSync(fs.readFileSync("src/data/projects.ts", "utf8"), { loader: "ts", format: "esm" }).code;
const mod = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));

export const projects = mod.projects;
export const categories = mod.categories;
/** Markdown-ish project description -> plain text. */
export const plain = (s) => s.replace(/\*\*/g, "").replace(/^\* /gm, "- ").replace(/\n{2,}/g, "\n").trim();
export const firstPara = (s) => plain(s.split("\n\n")[0]);
