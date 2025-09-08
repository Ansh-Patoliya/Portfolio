import { motion } from "motion/react";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Code, 
  Database, 
  Palette, 
  Server, 
  Smartphone, 
  Globe,
  GitBranch,
  Cloud
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      { name: "HTML", level: 35 },
      { name: "CSS/Tailwind", level: 32 },
      { name: "JavaScript", level: 20 }
    ]
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Java", level: 92 },
      { name: "Python", level: 72 }
    ]
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySql", level: 80 },
      { name: "Supabase", level: 17 }
    ]
  }
];

const tools = [
  { name: "Design", icon: Palette, items: ["Figma", "Adobe XD", "Sketch"] },
  { name: "Web", icon: Globe, items: ["Webpack", "Vite", "Vercel"] },
  { name: "Version Control", icon: GitBranch, items: ["Git", "GitHub", "GitLab"] }
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container px-6 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-chart-1 to-chart-2 mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            I'm passionate about staying current with the latest technologies and continuously expanding my skill set.
          </p>
        </motion.div>

        {/* Technical Skills */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur border-border/50 rounded-xl hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-chart-1 to-chart-2 rounded-lg">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.1) }}
                        viewport={{ once: true }}
                      >
                        <Progress 
                          value={skill.level} 
                          className="h-2 bg-accent"
                        />
                      </motion.div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl text-center mb-8 text-foreground">
            Tools & Technologies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 bg-card/30 backdrop-blur border-border/30 rounded-xl hover:shadow-lg hover:bg-card/50 transition-all duration-300">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 bg-gradient-to-r from-chart-1 to-chart-2 rounded-xl">
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg text-foreground">{tool.name}</h4>
                    <div className="space-y-1">
                      {tool.items.map((item) => (
                        <p key={item} className="text-sm text-muted-foreground">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}