import React, { useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const contactInfo = [
  {
    label: "Email",
    value: "anshpatoliya1408@gmail.com",
    href: "mailto:anshpatoliya1408@gmail.com"
  },
  {
    label: "Phone",
    value: "+91 8160369100",
    href: "tel:+918160369100"
  },
  {
    label: "Location",
    value: "Ahmedabad , Gujarat",
    href: "#"
  }
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Ansh-Patoliya",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ansh-patoliya",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_kano._148",
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Web3Forms access keys are public by design (they ship in client code), so a default is fine.
    // VITE_WEB3FORMS_KEY, if set, overrides it.
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "f0841338-343a-441d-8aea-bab37fcd5b7e";

    const contactData = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };

    try {
      const existingContacts = JSON.parse(localStorage.getItem('portfolio-contacts') || '[]');
      existingContacts.push(contactData);
      localStorage.setItem('portfolio-contacts', JSON.stringify(existingContacts));
    } catch (err) {
      console.warn("Could not save contact to localStorage:", err);
    }

    try {
      // Send request to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        
        // Supabase background backup
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-ebb6b21e/contact`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
              'apikey': publicAnonKey
            },
            body: JSON.stringify(formData),
          }
        ).catch(err => {
          console.warn("Supabase background send failed:", err);
        });
      } else {
        console.error('Web3Forms submission failed:', result.message || 'Unknown error');
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message via Web3Forms:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <div className="grid gap-12 rounded-[32px] bg-ink p-6 text-paper sm:p-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:p-16">
          {/* Left: heading + contact details */}
          <div className="flex flex-col">
            <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em] text-accent-light">
              (04) CONTACT
              <span aria-hidden="true" className="h-px w-12 bg-accent-light/40" />
            </p>
            <h2 className="font-serif text-5xl font-normal leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
              Let's Work <span className="italic text-accent-light">Together</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/70 md:text-lg">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing
              together.
            </p>

            <ul className="mt-10 border-b border-paper/15">
              {contactInfo.map((item) => {
                const content = (
                  <>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-paper/50">{item.label}</span>
                    <span className="flex items-center justify-between gap-4">
                      <span className="break-all font-serif text-xl text-paper sm:text-2xl md:text-3xl">{item.value}</span>
                      {item.href !== "#" && (
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-paper/40 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-light"
                        />
                      )}
                    </span>
                  </>
                );
                return (
                  <li key={item.label} className="border-t border-paper/15">
                    {item.href === "#" ? (
                      <div className="flex flex-col gap-2 py-5">{content}</div>
                    ) : (
                      <a href={item.href} className="group flex flex-col gap-2 py-5">
                        {content}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-paper/25 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  {social.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-[24px] bg-paper p-6 text-ink sm:p-8">
            <h3 className="font-serif text-3xl leading-tight md:text-4xl">Send a Message</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              Fill in your details below. Messages are delivered straight to my personal inbox.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="eyebrow-muted block text-ink">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="field"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="eyebrow-muted block text-ink">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email id"
                  required
                  className="field"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="eyebrow-muted block text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="field resize-none"
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn w-full sm:w-auto">
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitStatus === "success" && (
                <motion.div
                  className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-accent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-medium">Message Sent!</p>
                    <p className="text-xs opacity-90">Thank you for your message! I'll get back to you soon!</p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  className="flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                  <div>
                    <p className="font-medium">Delivery Error</p>
                    <p className="text-xs">
                      There was an error processing your message. Please try again or contact me directly at
                      anshpatoliya1408@gmail.com.
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
