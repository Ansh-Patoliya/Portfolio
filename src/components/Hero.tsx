import { Typewriter } from "./effects/Typewriter";

export function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-flow">
        {/* 1. Small Mono Label */}
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-[#1F5C45] block">
          Data Analyst
        </span>

        {/* 2. Name / Headline with italic accent word */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#14130F] tracking-tight leading-[1.05] font-normal">
          Ansh <span className="italic text-[#1F5C45]">Patoliya</span>
        </h1>

        {/* 3. Subtitle */}
        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#6B665A] font-normal leading-snug">
          Aspiring AI/ML Engineer
        </p>

        {/* 4. Paragraph */}
        <p className="font-sans text-base sm:text-lg md:text-xl text-[#6B665A] max-w-2xl leading-relaxed">
          Transforming raw data into actionable insights through analytics, visualization, and data-driven problem solving while building expertise in Artificial Intelligence and Machine Learning.
        </p>

        {/* 5. Typing Line */}
        <div className="font-mono text-xs sm:text-sm tracking-[0.1em] uppercase text-[#6B665A] flex items-center justify-center gap-2">
          <Typewriter
            prefix="I am a"
            words={[
              "Data Analyst",
              "Power BI Developer",
              "SQL Enthusiast",
              "Future AI/ML Engineer"
            ]}
            className="text-[#14130F] font-medium"
          />
        </div>

        {/* 6. Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4">
          <button
            type="button"
            className="editorial-pill-btn cursor-pointer"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Work
          </button>
          <a
            href="/Ansh_Patoliya_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-text-link"
          >
            Resume ↗
          </a>
          <button
            type="button"
            className="editorial-text-link cursor-pointer"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}