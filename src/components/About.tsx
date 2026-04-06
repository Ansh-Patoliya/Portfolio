import React from "react";
import { ScrollReveal } from "./effects/ScrollReveal";
import { TiltCard } from "./effects/TiltCard";

export function About() {
  const profilePhoto = new URL("../assets/photo.jpg", import.meta.url).href;

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-accent/5">
      <div className="container px-6 max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-foreground to-chart-1 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-chart-1 to-chart-2 mx-auto rounded-full" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="order-2 lg:order-1" delay={0.05}>
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
                  <p className="text-muted-foreground">6+ Projects</p>
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
          </ScrollReveal>

          <ScrollReveal className="order-1 lg:order-2 flex justify-center" delay={0.12}>
            <TiltCard>
              <div className="relative group neon-border rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-2 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 opacity-75" />
                <div className="relative bg-card rounded-2xl p-2 shadow-2xl overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-80 h-80 object-cover rounded-[20px] transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}