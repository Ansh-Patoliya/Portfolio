import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";


export default function App() {
  return (
    <div className="min-h-screen bg-[#F4EFE4] text-[#14130F] selection:bg-[#1F5C45] selection:text-[#F4EFE4] font-sans antialiased">
      <Navigation />
      <main className="site-main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}