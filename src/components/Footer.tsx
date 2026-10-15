import { ArrowUpRight, Github, Heart, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useGoToSection } from "../utils/goToSection";

const navLinks = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Ansh-Patoliya", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ansh-patoliya", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const goToSection = useGoToSection();

  return (
    <footer className="border-t border-line">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* Brand */}
          <div>
            <p className="eyebrow">PORTFOLIO / ARCHIVE</p>
            <p className="mt-4 font-serif text-5xl leading-none tracking-tight text-ink md:text-6xl">Ansh Patoliya</p>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              Data Analyst &amp; Aspiring AI/ML Engineer based in Ahmedabad, India.
            </p>
          </div>

          {/* Navigation + socials */}
          <div className="flex flex-col gap-8 md:items-end">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  className="eyebrow-muted transition-colors hover:text-ink"
                  onClick={() => goToSection(link.id)}
                >
                  {link.label}
                </button>
              ))}
              <Link to="/blog" className="eyebrow-muted transition-colors hover:text-ink">
                Blog
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:bg-accent hover:text-paper"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 font-mono text-xs text-muted sm:flex-row sm:items-center">
          <p className="flex flex-wrap items-center gap-1.5">
            © {currentYear} Crafted with love
            <Heart className="inline h-3.5 w-3.5 fill-accent/20 text-accent" />
            and just enough ☕ — Ansh Patoliya
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1 uppercase tracking-[0.1em] transition-colors hover:text-ink"
          >
            Back to top <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
