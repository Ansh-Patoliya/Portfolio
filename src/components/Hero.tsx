import { Button } from "./ui/button";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Typewriter } from "./effects/Typewriter";

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container px-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-7xl mb-4 bg-gradient-to-r from-foreground via-foreground to-chart-1 bg-clip-text text-transparent tracking-tight"
            style={{ fontWeight: 800, lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Data Analyst
          </motion.h1>

          <motion.h2
            className="text-2xl md:text-5xl mb-8 text-muted-foreground tracking-tight"
            style={{ fontWeight: 700, lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            Aspiring AI/ML Engineer
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transforming raw data into actionable insights through analytics, visualization, and data-driven problem solving while building expertise in Artificial Intelligence and Machine Learning.
          </motion.p>

          <motion.div
            className="text-base md:text-xl mb-10"
            style={{ color: 'var(--foreground)', opacity: 0.8 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typewriter
              prefix="I am a"
              words={[
                "Data Analyst",
                "Power BI Developer",
                "SQL Enthusiast",
                "Future AI/ML Engineer"
              ]}
              className="tracking-tight font-medium"
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-2 hover:to-chart-1 text-white border-0 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-chart-1/30 hover:border-chart-1 text-foreground hover:bg-chart-1/10 px-8 py-6 rounded-xl transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={scrollToAbout}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground hover:text-chart-1 transition-colors" />
      </motion.div>
    </section>
  );
}