import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    title: "CampusConnect",
    description: "CampusConnect is a modern, feature-rich campus event management system designed to streamline the organization and participation of campus activities. Built with JavaFX and PostgreSQL, it provides a robust platform for students, club members, and administrators to collaborate effectively.",
    image: "https://images.unsplash.com/photo-1675095904077-600d903942da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbWFuYWdlbWVudCUyMHBsYXRmb3JtfGVufDF8fHx8MTc1NzMxNjQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["Java", "JavaFX", "PostgreSQL"],
    githubUrl: "https://github.com/Ansh-Patoliya/CampusConnect"
  },
  {
    title: "Stock Market Simulator",
    description: "A real-time stock trading simulator built with Java and JavaFX. It allows users to register, log in, add wallet balance, and simulate buying/selling of stocks with dynamic price updates using multithreading.",
    image: "https://cdn.pixabay.com/photo/2021/08/08/15/06/stock-market-6531146_1280.jpg",
    tags: ["Java", "JavaFX", "MySQL"],
    githubUrl: "https://github.com/Ansh-Patoliya/Stock-Market-Simulator"
  },
  {
    title: "Employee Management System",
    description: "The Employee Management System is a Java-based application designed to manage employee details, salaries, leave requests, and approvals efficiently. It includes role-based access for employees and managers, providing features such as profile management, salary details, leave applications, and manager approvals.",
    image: "https://www.sourcecodester.com/sites/default/files/images/oretnom23/employee-management-system-home-page.png",
    tags: ["Java"],
    githubUrl: "https://github.com/Ansh-Patoliya/Sem-1-Project-EmpoyeeManagement"
  },
  {
    title: "Online Banking System",
    description: "The Online Banking System is a Java-based application that provides users with various banking services, including account management, loan management, fixed deposits, and transaction history. It enables users to register, log in, add wallet balance, and perform banking operations efficiently.",
    image: "https://as1.ftcdn.net/v2/jpg/04/87/53/72/1000_F_487537248_CR9mdE7w7aToWazXOYzbA0aRhqKi8Xp7.jpg",
    tags: ["Java"],
    githubUrl: "https://github.com/Ansh-Patoliya/sem-1-project-OnlineBankingSystem"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-accent/5 to-background">
      <div className="container px-6 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-chart-1 to-chart-2 mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-card/50 backdrop-blur border-border/50 rounded-xl overflow-hidden">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl group-hover:text-chart-1 transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="bg-accent/50 text-accent-foreground hover:bg-chart-1/20 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 gap-3">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-2 hover:to-chart-1 text-white border-0"
                    asChild
                  >
                    
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-chart-1/30 hover:border-chart-1 hover:bg-chart-1/10"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}