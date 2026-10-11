import React from "react";

export function About() {
  const profilePhoto = new URL("../assets/photo.jpg", import.meta.url).href;

  return (
    <section id="about" className="editorial-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#D9D2C0]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block mb-2">
              (01) ABOUT
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#14130F] font-normal tracking-tight">
              About Me
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A]">
            01 / 04
          </p>
        </div>

        <div className="about-grid">
          {/* Text Content */}
          <div className="space-y-8">
            <p className="font-sans text-lg sm:text-xl text-[#14130F] leading-relaxed">
              Hi! I'm a 2nd-year Computer Engineering student with a passion for data analytics and AI/ML.
              I enjoy uncovering patterns in data, building insightful dashboards, and growing my skills in machine learning every day.
            </p>

            <p className="font-sans text-base sm:text-lg text-[#6B665A] leading-relaxed">
              When I'm not analyzing datasets, you'll find me exploring new technologies, learning
              machine learning algorithms, or working on open source projects. I believe in continuous learning
              and staying current with the ever-evolving data science landscape.
            </p>

            {/* Hairline Grid */}
            <div className="about-meta-grid">
              <div className="bg-[#FAF7F0] p-6 space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block">
                  Location
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#14130F]">
                  Ahmedabad ,Gujrat
                </p>
              </div>
              <div className="bg-[#FAF7F0] p-6 space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block">
                  Experience
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#14130F]">
                  6+ Projects
                </p>
              </div>
              <div className="bg-[#FAF7F0] p-6 space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block">
                  Availability
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#14130F]">
                  Open to opportunities
                </p>
              </div>
              <div className="bg-[#FAF7F0] p-6 space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block">
                  Focus
                </span>
                <p className="font-serif text-xl sm:text-2xl text-[#14130F]">
                  Data Analytics & AI/ML
                </p>
              </div>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="border border-[#D9D2C0] p-3 bg-[#FAF7F0] rounded-2xl shadow-sm">
                <img
                  src={profilePhoto}
                  alt="Ansh Patoliya Profile"
                  className="w-full aspect-square object-cover rounded-xl filter grayscale contrast-105 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-[#6B665A] px-1">
                <span>Portrait</span>
                <span>Ansh Patoliya</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}