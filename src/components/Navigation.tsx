import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace("#", "");
    const element = targetId === "hero" ? document.body : document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="site-navbar">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            type="button"
            className="font-serif text-2xl md:text-3xl text-[#14130F] hover:text-[#1F5C45] transition-colors cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5C45]"
            onClick={() => scrollToSection("#hero")}
          >
            Ansh Patoliya
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                className="font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A] hover:text-[#14130F] transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1F5C45]"
                onClick={() => scrollToSection(item.href)}
              >
                {item.name}
              </button>
            ))}
            <a
              href="/Ansh_Patoliya_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-pill-btn text-xs py-2 px-5"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#14130F] hover:text-[#1F5C45] transition-colors focus:outline-none"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-[#F4EFE4] border-b border-[#D9D2C0] py-6 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className="font-mono text-sm uppercase tracking-[0.1em] text-[#14130F] hover:text-[#1F5C45] text-left py-2 border-b border-[#D9D2C0]/60 transition-colors"
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href="/Ansh_Patoliya_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-pill-btn w-full text-center text-xs py-3"
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