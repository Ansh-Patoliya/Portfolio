import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Github, X } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./effects/ScrollReveal";

/* Newest / highest priority first */
const orderedProjects = [...projects].sort((a, b) => {
  const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
  if (priorityDiff !== 0) return priorityDiff;
  return new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime();
});

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
          <img src={project.image} alt={project.title} className="aspect-[16/8] w-full bg-ink object-cover" />

          <div className="p-6 sm:p-10">
            <h3 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">{project.title}</h3>

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
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn flex-1">
                View Project <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="btn-outline"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
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
      className="group flex h-full flex-col rounded-[32px] border border-line bg-paper-2 p-3 transition duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_28px_56px_-28px_rgba(20,19,15,0.35)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-ink">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-paper px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
          {String(index + 1).padStart(2, "0")}
          {index === 0 && " · Featured"}
        </span>

        <span
          aria-hidden="true"
          className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-paper text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-paper"
        >
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pb-3 pt-7 sm:px-5">
        <h3 className="font-serif text-3xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-4xl">
          {project.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted">
          {getShortDescription(project.description)}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
            <span className="eyebrow">View details</span>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" /> GitHub Repo
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="(02) PROJECTS" title="Featured Projects">
          Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {orderedProjects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.08} className="h-full">
              <ProjectCard project={project} index={index} onSelect={() => setSelected(project)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
