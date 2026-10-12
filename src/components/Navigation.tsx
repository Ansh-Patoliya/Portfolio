import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Contact", id: "contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

    if (isOpen) {
      // Closing the mobile menu cancels an in-flight smooth scroll, so wait for it to finish.
      setIsOpen(false);
      window.setTimeout(scroll, 260);
    } else {
      scroll();
    }
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper">
      <div className="container-page">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            className="text-left font-serif text-2xl text-ink transition-colors hover:text-accent md:text-3xl"
            onClick={() => scrollToSection("hero")}
          >
            Ansh Patoliya
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="eyebrow-muted transition-colors hover:text-ink"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </button>
            ))}
            <a href="/Ansh_Patoliya_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn">
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-ink transition-colors hover:text-accent md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1 pb-6 pt-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="border-b border-line/60 py-3 text-left font-mono text-sm uppercase tracking-[0.1em] text-ink transition-colors hover:text-accent"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
                  </button>
                ))}
                <a
                  href="/Ansh_Patoliya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-4 w-full"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
