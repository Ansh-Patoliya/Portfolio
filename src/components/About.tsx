import { SectionHeading } from "./SectionHeading";
import { ScrollReveal } from "./effects/ScrollReveal";

const profilePhoto = new URL("../assets/photo.jpg", import.meta.url).href;

const facts = [
  { label: "Location", value: "Ahmedabad ,Gujrat" },
  { label: "Experience", value: "19+ Projects" },
  { label: "Availability", value: "Open to opportunities" },
  { label: "Focus", value: "Full-stack, Data & AI/ML" },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionHeading eyebrow="(01) ABOUT" title="About Me">
          <p className="eyebrow-muted">01 / 04</p>
        </SectionHeading>

        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <ScrollReveal className="lg:col-span-7">
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl md:text-[2.125rem]">
              Hi! I'm a 3rd-year Computer Engineering student who builds full-stack products and turns data into
              insight. From hackathon platforms and trading simulators to Power BI dashboards and Gemini-powered AI
              tools, I like shipping things people can actually use.
            </p>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Right now I'm working across Django, Next.js and Flask on the web side, and Python, SQL and Power BI on
              the data side, while going deeper into machine learning. I believe in learning by building.
            </p>

            <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-ink pt-4">
                  <dt className="eyebrow">{fact.label}</dt>
                  <dd className="mt-2 font-serif text-2xl text-ink md:text-3xl">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          {/* Portrait */}
          <ScrollReveal delay={0.1} className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:justify-self-end">
            <figure>
              <div className="relative">
                {/* Offset outline behind the photo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-[32px] border border-line"
                />
                <img
                  src={profilePhoto}
                  alt="Ansh Patoliya"
                  className="relative aspect-[4/5] w-full rounded-[32px] object-cover object-top grayscale transition duration-700 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
              <figcaption className="eyebrow-muted mt-8 flex items-center justify-between px-1">
                <span>Portrait</span>
                <span>Ansh Patoliya</span>
              </figcaption>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
