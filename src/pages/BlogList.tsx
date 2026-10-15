import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../components/SectionHeading";
import { ScrollReveal } from "../components/effects/ScrollReveal";
import { formatDate, posts } from "../data/posts";
import { usePageMeta } from "../utils/usePageMeta";

export function BlogList({ notFound = false }: { notFound?: boolean }) {
  usePageMeta(
    notFound ? "Page not found | Ansh Patoliya" : "Blog | Ansh Patoliya",
    "Notes on web development, data analytics and AI by Ansh Patoliya.",
  );
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(), []);
  const visible = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;

  return (
    <section className="section border-t-0">
      <div className="container-page">
        <SectionHeading eyebrow={notFound ? "(404) NOT FOUND" : "(BLOG) NOTES"} title={notFound ? "Page not found" : "Blog"}>
          {notFound ? "That page does not exist. Here is what I have written so far." : "Notes on building web apps, working with data and learning AI."}
        </SectionHeading>

        {tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {[null, ...tags].map((t) => (
              <button
                key={t ?? "all"}
                type="button"
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
                className={`chip transition-colors hover:border-accent hover:text-accent ${
                  tag === t ? "!border-ink !bg-ink !text-paper" : ""
                }`}
              >
                {t ?? "All"}
              </button>
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <p className="border-t border-line py-16 text-lg text-muted">No posts yet. Check back soon.</p>
        ) : (
          <ul className="border-t border-line">
            {visible.map((post, i) => (
              <li key={post.slug}>
                <ScrollReveal delay={(i % 4) * 0.05}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group grid gap-4 border-b border-line py-8 md:grid-cols-[9rem_1fr_auto] md:items-start md:gap-10"
                  >
                    <time dateTime={post.date} className="eyebrow-muted pt-2">
                      {formatDate(post.date)}
                    </time>
                    <div>
                      <h2 className="font-serif text-3xl leading-snug text-ink transition-colors group-hover:text-accent md:text-4xl">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{post.summary}</p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.map((t) => (
                          <li key={t} className="chip">
                            {t}
                          </li>
                        ))}
                        <li className="chip">{post.readingTime} min read</li>
                      </ul>
                    </div>
                    {post.image && (
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className="hidden h-28 w-44 rounded-2xl object-cover md:block"
                      />
                    )}
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
