import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Github, Lock, X } from "lucide-react";
import { categories, projects, type Category, type Project } from "../data/projects";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./effects/ScrollReveal";

/** First paragraph, with the **bold** markers removed. */
const getShortDescription = (description: string) =>
  (description.split("\n\n")[0] || description).replace(/\*\*/g, "").replace(/\n/g, " ");

/** Turns **text** into <strong>. */
function formatBoldText(text: string) {
  return text.split(/\*\*([^*]+)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

/** "(A)", "(B)" ... */
const groupLetter = (index: number) => String.fromCharCode(65 + index);

/* ------------------------------------------------------------------ */
/*  Details modal                                                      */
/* ------------------------------------------------------------------ */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const categoryLabel = categories.find((c) => c.id === project.category)?.label;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-line bg-paper shadow-2xl"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink shadow transition-colors hover:bg-ink hover:text-paper"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto">
          {project.image && (
            <img src={project.image} alt={project.title} className="aspect-[16/8] w-full bg-ink object-cover" />
          )}

          <div className="p-6 sm:p-10">
            {categoryLabel && <p className="eyebrow mb-4 pr-12">{categoryLabel}</p>}
            <h3 className="pr-10 font-serif text-4xl leading-tight text-ink sm:text-5xl">{project.title}</h3>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="chip">
                  {tag}
                </li>
              ))}
            </ul>

            <div className="my-8 h-px bg-line" />

            <p className="eyebrow mb-4">About this project</p>
            <div className="space-y-3 text-base leading-relaxed text-ink/80 sm:text-lg">
              {project.description.split("\n").map((line, idx) => {
                const text = line.trim();
                if (text === "") return null;
                if (text.startsWith("*") || text.startsWith("-")) {
                  return (
                    <div key={idx} className="flex items-start gap-3 pl-1">
                      <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{formatBoldText(text.substring(1).trim())}</span>
                    </div>
                  );
                }
                return <p key={idx}>{formatBoldText(text)}</p>;
              })}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="btn flex-1"
                >
                  <Github className="h-4 w-4" /> View on GitHub
                </a>
              )}
              {!project.githubUrl && (
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted">
                  <Lock className="h-4 w-4" /> Private repository. Happy to walk through it on request.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/*  Project card                                                       */
/* ------------------------------------------------------------------ */
function ProjectCard({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group flex h-full flex-col rounded-[28px] border border-line bg-paper-2 p-3 transition duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_28px_56px_-28px_rgba(20,19,15,0.35)]"
    >
      {project.image && (
        <div className="relative mb-2 aspect-[16/9] overflow-hidden rounded-[20px] bg-ink">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col px-4 pb-3 pt-4 sm:px-5">
        <div className="flex min-h-7 items-center justify-between gap-3">
          <span className="eyebrow-muted">({String(index + 1).padStart(2, "0")})</span>
          <div className="flex items-center gap-2">
            {project.isPrivate && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                <Lock className="h-3 w-3" />
                Private
              </span>
            )}
          </div>
        </div>

        <h4 className="mt-4 font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-accent">
          {project.title}
        </h4>

        <p className="mt-3 line-clamp-3 text-base leading-relaxed text-muted">
          {getShortDescription(project.description)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
            <span className="eyebrow">View details</span>
            <div className="flex items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`${project.title} on GitHub`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
                >
                  <Github className="h-4 w-4" /> Repo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Compact row (Learning & Academic)                                  */
/* ------------------------------------------------------------------ */
function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} on GitHub`}
      className="group grid gap-3 border-b border-line py-6 transition-colors md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.3fr)_17rem] md:items-center md:gap-8"
    >
      <span className="eyebrow-muted">({String(index + 1).padStart(2, "0")})</span>
      <h4 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent md:text-3xl">
        {project.title}
      </h4>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted md:text-base">
        {getShortDescription(project.description)}
      </p>
      <span className="flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5 md:hidden lg:flex lg:flex-1 lg:justify-end">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-paper"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  One category                                                       */
/* ------------------------------------------------------------------ */
function CategoryGroup({
  category,
  letter,
  items,
  onSelect,
}: {
  category: Category;
  letter: string;
  items: Project[];
  onSelect: (project: Project) => void;
}) {
  const isList = category.id === "learning";
  // 3 columns when the count divides evenly, otherwise 2 (avoids a lonely orphan card).
  const columns = items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <div id={`projects-${category.id}`} className="scroll-mt-24 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <p className="eyebrow-muted mb-3">
            ({letter}) · {String(items.length).padStart(2, "0")} {items.length === 1 ? "project" : "projects"}
          </p>
          <h3 className="font-serif text-4xl leading-tight tracking-tight text-ink md:text-5xl">{category.label}</h3>
        </div>
        <p className="max-w-xs text-base leading-relaxed text-muted md:text-right">{category.blurb}</p>
      </header>

      {isList ? (
        <div className="border-t border-line">
          {items.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className={`grid gap-6 md:grid-cols-2 ${columns}`}>
          {items.map((project, index) => (
            <ScrollReveal key={project.title} delay={(index % 3) * 0.08} className="h-full">
              <ProjectCard project={project} index={index} onSelect={() => onSelect(project)} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const groups = categories
    .map((category) => ({ category, items: projects.filter((p) => p.category === category.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="(02) PROJECTS" title="Projects">
          A growing collection of dashboards, AI tools, web platforms and apps, grouped by what they do.
        </SectionHeading>

        {/* Jump links */}
        <nav aria-label="Project categories" className="-mt-4 mb-14 flex flex-wrap gap-2 md:-mt-8">
          {groups.map(({ category, items }) => (
            <a
              key={category.id}
              href={`#projects-${category.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              {category.label}
              <span className="font-mono text-xs text-muted">{String(items.length).padStart(2, "0")}</span>
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-16 md:gap-20">
          {groups.map(({ category, items }, index) => (
            <CategoryGroup
              key={category.id}
              category={category}
              letter={groupLetter(index)}
              items={items}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
