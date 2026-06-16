import React from "react";
import { ScrollReveal } from "./effects/ScrollReveal";

export function About() {
  const profilePhoto = new URL("../assets/photo.jpg", import.meta.url).href;

  return (
    <section id="about" className="py-20 bg-[#0A0A0A]">
      <div className="container px-6 max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#FAFAFA] font-semibold tracking-tight">
            About Me
          </h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto rounded-full" />
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="order-2 lg:order-1" delay={0.05}>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Hi! I'm a 2nd-year Computer Engineering student with a passion for data analytics and AI/ML.
                I enjoy uncovering patterns in data, building insightful dashboards, and growing my skills in machine learning every day.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not analyzing datasets, you'll find me exploring new technologies, learning
                machine learning algorithms, or working on open source projects. I believe in continuous learning
                and staying current with the ever-evolving data science landscape.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="text-chart-1 font-medium">Location</h4>
                  <p className="text-muted-foreground">Ahmedabad ,Gujrat</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-chart-1 font-medium">Experience</h4>
                  <p className="text-muted-foreground">6+ Projects</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-chart-1 font-medium">Availability</h4>
                  <p className="text-muted-foreground">Open to opportunities</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-chart-1 font-medium">Focus</h4>
                  <p className="text-muted-foreground">Data Analytics & AI/ML</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="order-1 lg:order-2 flex justify-center" delay={0.12}>
            <div className="relative bg-[#111111] border border-[#262626] hover:border-[#3b82f6]/40 hover:-translate-y-1 transition-all duration-300 rounded-2xl p-2 shadow-2xl overflow-hidden max-w-sm">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-80 h-80 object-cover rounded-[14px] transition-transform duration-500"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}