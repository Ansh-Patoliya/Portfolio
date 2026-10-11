import { Heart, Github, Linkedin, ArrowUpRight } from "lucide-react";

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
    <footer className="bg-[#F4EFE4] border-t border-[#D9D2C0] py-16 sm:py-20">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-[#D9D2C0]">
          {/* Brand & Subtext */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block">
              PORTFOLIO / ARCHIVE
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-[#14130F]">
              Ansh Patoliya
            </div>
            <p className="font-sans text-sm text-[#6B665A] max-w-sm">
              Data Analyst & Aspiring AI/ML Engineer based in Ahmedabad, India.
            </p>
          </div>

          {/* Nav & Socials */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-8">
            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              {["Home", "About", "Projects", "Skills", "Contact"].map((link) => (
                <button
                  key={link}
                  type="button"
                  className="font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A] hover:text-[#14130F] transition-colors cursor-pointer"
                  onClick={() => {
                    const targetId = link.toLowerCase() === "home" ? "hero" : link.toLowerCase();
                    const element = targetId === "hero" ? document.body : document.getElementById(targetId);
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[#D9D2C0] flex items-center justify-center text-[#14130F] hover:border-[#1F5C45] hover:bg-[#1F5C45] hover:text-[#F4EFE4] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#6B665A]">
          <p className="flex items-center gap-1.5">
            © {currentYear} Crafted with love 
            <Heart className="w-3.5 h-3.5 text-[#1F5C45] fill-[#1F5C45]/20 inline" />
            and just enough ☕ — Ansh Patoliya
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hover:text-[#14130F] transition-colors flex items-center gap-1"
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}