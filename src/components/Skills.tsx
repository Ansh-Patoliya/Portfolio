import React from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  BarChart3,
  BrainCircuit,
  Database,
  Globe,
  GitBranch,
  LayoutDashboard,
  Terminal,
} from "lucide-react";
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
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-background to-accent/5"
    >
      <div className="container px-6 max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-chart-1 to-chart-2 mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Passionate about turning data into insights and building intelligent
            systems — here's my current toolkit.
          </p>
        </ScrollReveal>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <ScrollReveal key={category.title} delay={categoryIndex * 0.06}>
              <Card className="neon-border bg-card/50 backdrop-blur border-border/50 rounded-xl hover:shadow-lg transition-all duration-300 h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-chart-1 to-chart-2 rounded-lg">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      {category.title}
                      {category.subtitle && (
                        <span className="block text-xs text-muted-foreground font-normal mt-0.5">
                          {category.subtitle}
                        </span>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/60 text-foreground border border-border/40 hover:border-chart-1/50 hover:bg-chart-1/10 hover:text-chart-1 transition-all duration-300 cursor-default"
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          delay:
                            categoryIndex * 0.06 + skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Tools & Technologies */}
        <ScrollReveal>
          <h3 className="text-2xl md:text-3xl text-center mb-8 text-foreground">
            Tools & Technologies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <ScrollReveal key={tool.name} delay={index * 0.05}>
                <Card className="neon-border text-center p-6 bg-card/30 backdrop-blur border-border/30 rounded-xl hover:shadow-lg hover:bg-card/50 transition-all duration-300">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-gradient-to-r from-chart-1 to-chart-2 rounded-xl">
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg text-foreground">{tool.name}</h4>
                    <div className="space-y-1">
                      {tool.items.map((item) => (
                        <p
                          key={item}
                          className="text-sm text-muted-foreground"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}