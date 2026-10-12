import { Typewriter } from "./effects/Typewriter";

export function Hero() {
  return (
    <section id="hero" className="px-6 pb-16 pt-12 md:pb-24 md:pt-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center sm:gap-7">
        {/* 1. Small mono label */}
        <span className="eyebrow block tracking-[0.12em]">Data Analyst</span>

        {/* 2. Name with italic accent word */}
        <h1 className="font-serif text-5xl font-normal leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl">
          Ansh <span className="italic text-accent">Patoliya</span>
        </h1>

        {/* 3. Subtitle */}
        <p className="font-serif text-2xl font-normal leading-snug text-muted sm:text-3xl md:text-4xl">
          Aspiring AI/ML Engineer
        </p>

        {/* 4. Paragraph */}
        <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg md:text-xl">
          Transforming raw data into actionable insights through analytics, visualization, and data-driven problem
          solving while building expertise in Artificial Intelligence and Machine Learning.
        </p>

        {/* 5. Typing line */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted sm:text-sm">
          <Typewriter
            prefix="I am a"
            words={["Data Analyst", "Power BI Developer", "SQL Enthusiast", "Future AI/ML Engineer"]}
            className="font-medium text-ink"
          />
        </div>

        {/* 6. Actions */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 sm:gap-8">
          <button
            type="button"
            className="btn"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </button>
          <a href="/Ansh_Patoliya_Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-link">
            Resume ↗
          </a>
          <button
            type="button"
            className="text-link"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
