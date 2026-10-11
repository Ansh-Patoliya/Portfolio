import React from "react";
import {
  BarChart3,
  BrainCircuit,
  Database,
  Globe,
  GitBranch,
  LayoutDashboard,
  Terminal,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Skill Categories & Tools Data (verbatim)                          */
/* ------------------------------------------------------------------ */
const skillCategories = [
  {
    title: "Data Analytics",
    icon: BarChart3,
    skills: [
      "Exploratory Data Analysis (EDA)",
      "Microsoft Excel",
      "Power BI",
      "SQL",
      "Data Cleaning & Wrangling",
      "Statistical Analysis",
    ],
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Learning & Building",
    icon: BrainCircuit,
    skills: [
      "Python (Pandas / NumPy)",
      "Matplotlib / Seaborn",
      "Scikit-learn",
      "Data Preprocessing",
      "ML Algorithms",
      "TensorFlow / PyTorch (Basics)",
    ],
  },
  {
    title: "Backend & Databases",
    icon: Database,
    skills: [
      "Java",
      "Python",
      "Flask",
      "PostgreSQL",
      "MySQL",
    ],
  },
];

const tools = [
  {
    name: "Analytics",
    icon: LayoutDashboard,
    items: ["Power BI", "Jupyter Notebook", "Excel"],
  },
  { name: "Web", icon: Globe, items: ["Vite", "Vercel"] },
  {
    name: "Version Control",
    icon: GitBranch,
    items: ["Git", "GitHub", "GitLab"],
  },
  {
    name: "Dev Environment",
    icon: Terminal,
    items: ["VS Code", "PyCharm", "Anaconda"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="editorial-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#D9D2C0]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block mb-2">
              (03) SKILLS & EXPERTISE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#14130F] font-normal tracking-tight">
              Skills & Expertise
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#6B665A] max-w-md text-left sm:text-right">
            Passionate about turning data into insights and building intelligent systems — here's my current toolkit.
          </p>
        </div>

        {/* Hairline Rows */}
        <div className="border-t border-[#D9D2C0]">
          {skillCategories.map((category, index) => {
            const formattedIndex = String(index + 1).padStart(2, "0");
            return (
              <div
                key={category.title}
                className="skills-row"
              >
                {/* Left: Mono Label with Subtitle */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45]">
                      ({formattedIndex})
                    </span>
                    <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-[#14130F] font-semibold">
                      {category.title}
                    </h3>
                  </div>
                  {category.subtitle && (
                    <span className="skill-subtitle">
                      {category.subtitle}
                    </span>
                  )}
                </div>

                {/* Right: Skills with natural wrapping and " · " separator */}
                <div>
                  <div className="flex flex-wrap items-center">
                    {category.skills.map((skill, sIdx) => (
                      <React.Fragment key={skill}>
                        <span className="font-serif text-2xl sm:text-3xl text-[#14130F] hover:text-[#1F5C45] transition-colors duration-200">
                          {skill}
                        </span>
                        {sIdx < category.skills.length - 1 && (
                          <span className="skill-dot">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Tools & Technologies Row */}
          <div className="skills-row">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45]">
                  (04)
                </span>
                <h3 className="font-mono text-xs uppercase tracking-[0.1em] text-[#14130F] font-semibold">
                  Tools & Technologies
                </h3>
              </div>
            </div>

            <div>
              <div className="tools-subgrid">
                {tools.map((tool) => (
                  <div key={tool.name} className="space-y-2.5">
                    <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45]">
                      {tool.name}
                    </h4>
                    <ul className="space-y-1">
                      {tool.items.map((item) => (
                        <li
                          key={item}
                          className="font-serif text-xl sm:text-2xl text-[#14130F] hover:text-[#1F5C45] transition-colors"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}