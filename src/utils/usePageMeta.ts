import { useEffect } from "react";

/** Sets title + description for client-side navigation (static HTML already has them for crawlers). */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
