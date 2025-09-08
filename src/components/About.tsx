import image_a55727ee37f473092b8d0e93d542729fdbade57f from 'figma:asset/a55727ee37f473092b8d0e93d542729fdbade57f.png';
import image_be1dbbb74613ec35e45215a726dd55a86c8ee279 from 'figma:asset/be1dbbb74613ec35e45215a726dd55a86c8ee279.png';
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container px-6 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-chart-1 to-chart-2 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi! I'm a 2nd-year Computer Engineering student with a passion for web development.
I enjoy designing and coding websites that bring ideas to life while growing my skills every day.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open source projects, or hiking in the mountains. I believe in continuous learning 
                and staying current with the ever-evolving tech landscape.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="text-chart-1">Location</h4>
                  <p className="text-muted-foreground">Ahmedabad ,Gujrat</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-chart-1">Experience</h4>
                  <p className="text-muted-foreground">0 Years</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-chart-1">Availability</h4>
                  <p className="text-muted-foreground">Open to opportunities</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-chart-1">Focus</h4>
                  <p className="text-muted-foreground">Full-Stack Development</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-2 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-75" />
              <div className="relative bg-card rounded-2xl p-2 shadow-2xl">
                <ImageWithFallback
                  src={image_a55727ee37f473092b8d0e93d542729fdbade57f}
                  alt="Profile"
                  className="w-80 h-80 object-cover rounded-[20px]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}