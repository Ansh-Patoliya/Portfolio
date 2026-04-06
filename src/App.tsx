import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ParticleBackground } from "./components/ParticleBackground";
import { CursorGlow } from "./components/effects/CursorGlow";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground relative isolate">
      <ParticleBackground />
      <CursorGlow />
      <div className="relative z-10 pointer-events-auto">
        <Navigation />
        <main>
          <section id="hero">
            <Hero />
          </section>
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}