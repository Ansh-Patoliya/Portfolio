import { motion } from "motion/react";
import { Heart, Github, Linkedin, Twitter, Globe } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/Ansh-Patoliya",
    label: "GitHub"
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ansh-patoliya",
    label: "LinkedIn"
  }
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-accent/10 to-background border-t border-border/50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo/Brand */}
          <motion.div
            className="text-2xl bg-gradient-to-r from-chart-1 to-chart-2 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ansh Patoliya
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-card/50 backdrop-blur rounded-full hover:bg-chart-1/20 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true }}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-chart-1 transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {["Home", "About", "Projects", "Skills", "Contact"].map((link) => (
              <button
                key={link}
                className="text-muted-foreground hover:text-chart-1 transition-colors"
                onClick={() => {
                  const targetId = link.toLowerCase() === "home" ? "hero" : link.toLowerCase();
                  const element = targetId === "hero" ? document.body : document.getElementById(targetId);
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link}
              </button>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="text-center text-sm text-muted-foreground border-t border-border/30 pt-8 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="flex items-center justify-center gap-2">
              © {currentYear}  Crafted with love 
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              and just enough ☕ — Ansh Patoliya
            </p>
          
          </motion.div>
        </div>
      </div>
    </footer>
  );
}