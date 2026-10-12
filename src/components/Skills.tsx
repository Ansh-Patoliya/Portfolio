import { BarChart3, BrainCircuit, Database, GitBranch, Globe, LayoutDashboard, Terminal } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./effects/ScrollReveal";

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
    skills: ["Java", "Python", "Flask", "PostgreSQL", "MySQL"],
  },
];

const tools = [
  { name: "Analytics", icon: LayoutDashboard, items: ["Power BI", "Jupyter Notebook", "Excel"] },
  { name: "Web", icon: Globe, items: ["Vite", "Vercel"] },
  { name: "Version Control", icon: GitBranch, items: ["Git", "GitHub", "GitLab"] },
  { name: "Dev Environment", icon: Terminal, items: ["VS Code", "PyCharm", "Anaconda"] },
];

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="(03) SKILLS & EXPERTISE" title="Skills & Expertise">
          Passionate about turning data into insights and building intelligent systems — here's my current toolkit.
        </SectionHeading>

        {/* Skill categories */}
        <div className="grid gap-6 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <ScrollReveal key={category.title} delay={index * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-[32px] border border-line bg-paper-2 p-7 transition-colors duration-300 hover:border-ink md:p-8">
                <div className="flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-paper">
                    <category.icon className="h-6 w-6" />
                  </span>
                  <span className="eyebrow-muted">({String(index + 1).padStart(2, "0")})</span>
                </div>

                <div className="mt-8 lg:min-h-[8.75rem]">
                  <h3 className="font-serif text-3xl leading-tight text-ink md:text-4xl">{category.title}</h3>
                  {category.subtitle && <p className="eyebrow-muted mt-2">{category.subtitle}</p>}
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Tools & technologies */}
        <ScrollReveal className="mt-6">
          <div className="rounded-[32px] bg-ink p-8 text-paper md:p-12">
            <div className="mb-10 flex items-center justify-between gap-4">
              <h3 className="font-serif text-3xl md:text-4xl">Tools &amp; Technologies</h3>
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-paper/50">(04)</span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-paper/15">
              {tools.map((tool) => (
                <div key={tool.name} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                  <div className="flex items-center gap-2.5 text-accent-light">
                    <tool.icon className="h-4 w-4" />
                    <h4 className="font-mono text-xs uppercase tracking-[0.12em]">{tool.name}</h4>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {tool.items.map((item) => (
                      <li key={item} className="font-serif text-2xl text-paper">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
