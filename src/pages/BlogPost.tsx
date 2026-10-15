import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate, posts } from "../data/posts";
import { usePageMeta } from "../utils/usePageMeta";
import { BlogList } from "./BlogList";

export function BlogPost() {
  const { slug } = useParams();
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];
  usePageMeta(post ? `${post.title} | Ansh Patoliya` : "Blog | Ansh Patoliya", post?.summary);

  if (!post) return <BlogList notFound />;

  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <article className="pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="mx-auto w-full max-w-3xl px-6">
        <Link to="/blog" className="eyebrow-muted inline-flex items-center gap-2 transition-colors hover:text-ink">
          <ArrowLeft className="h-3.5 w-3.5" /> All posts
        </Link>

        <header className="mt-10">
          <p className="eyebrow-muted flex flex-wrap items-center gap-x-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </p>
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{post.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>
        </header>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="mt-10 aspect-[16/9] w-full rounded-[28px] border border-line object-cover"
          />
        )}

        <div className="prose-blog mt-12" dangerouslySetInnerHTML={{ __html: post.html }} />

        {(newer || older) && (
          <nav aria-label="More posts" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {older ? (
              <Link to={`/blog/${older.slug}`} className="group rounded-2xl border border-line p-5 transition-colors hover:border-accent">
                <span className="eyebrow-muted inline-flex items-center gap-2">
                  <ArrowLeft className="h-3.5 w-3.5" /> Older
                </span>
                <span className="mt-2 block font-serif text-xl text-ink group-hover:text-accent">{older.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link to={`/blog/${newer.slug}`} className="group rounded-2xl border border-line p-5 transition-colors hover:border-accent sm:text-right">
                <span className="eyebrow-muted inline-flex items-center gap-2">
                  Newer <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span className="mt-2 block font-serif text-xl text-ink group-hover:text-accent">{newer.title}</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
