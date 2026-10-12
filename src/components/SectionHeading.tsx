import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Small mono label above the title, e.g. "(02) PROJECTS" */
  eyebrow: string;
  title: string;
  /** Optional content aligned to the right of the title (description, counter ...) */
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, children }: SectionHeadingProps) {
  return (
    <header className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between md:gap-12">
      <div>
        <p className="eyebrow mb-4 flex items-center gap-3">
          {eyebrow}
          <span aria-hidden="true" className="h-px w-12 bg-accent/40" />
        </p>
        <h2 className="font-serif text-5xl font-normal leading-[1.02] tracking-tight text-ink md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      {children && <div className="max-w-sm text-base leading-relaxed text-muted md:text-right md:text-lg">{children}</div>}
    </header>
  );
}
