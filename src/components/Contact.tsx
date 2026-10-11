import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, CheckCircle2, AlertCircle } from "lucide-react";
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

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      console.warn('Web3Forms access key is not set. Please define VITE_WEB3FORMS_KEY in .env');
    }

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
    <section id="contact" className="editorial-section">
      <div className="section-container">
        {/* Section Number Header */}
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block mb-3">
            (04) CONTACT
          </span>
          {/* Giant Serif Line */}
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#14130F] font-normal tracking-tight leading-[0.98]">
            Let's Work Together
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#6B665A] mt-6 max-w-2xl leading-relaxed">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </p>
        </div>

        {/* Large Underlined Email Link */}
        <div className="py-6 sm:py-10 border-b border-[#D9D2C0]">
          <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A] block mb-2">
            Direct Email
          </span>
          <a
            href="mailto:anshpatoliya1408@gmail.com"
            className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#14130F] hover:text-[#1F5C45] underline underline-offset-8 decoration-[#D9D2C0] hover:decoration-[#1F5C45] transition-all break-all"
          >
            anshpatoliya1408@gmail.com
          </a>
        </div>

        {/* Small Mono Social Links & Direct Meta */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-6 border-b border-[#D9D2C0]">
          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A]">
              Connect:
            </span>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.1em] text-[#14130F] hover:text-[#1F5C45] transition-colors inline-flex items-center gap-1"
              >
                <span>{social.label}</span>
                <span className="text-[10px]">↗</span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-[0.1em] text-[#6B665A]">
            <a href="tel:+918160369100" className="hover:text-[#14130F] transition-colors">
              +91 8160369100
            </a>
            <span className="text-[#D9D2C0]">·</span>
            <span>Ahmedabad , Gujarat</span>
          </div>
        </div>

        {/* Minimal Editorial Message Form */}
        <div className="mt-16 pt-6">
          <div className="contact-grid">
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1F5C45] block">
                Send a Message
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#14130F] leading-tight">
                Send Message
              </h3>
              <p className="font-sans text-sm text-[#6B665A] leading-relaxed">
                Fill in your details below. Messages are delivered straight to my personal inbox.
              </p>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.1em] text-[#14130F] block">
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
                    className="editorial-input w-full px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.1em] text-[#14130F] block">
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
                    className="editorial-input w-full px-4 py-3 text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.1em] text-[#14130F] block">
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
                    className="editorial-input w-full px-4 py-3 text-sm focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="editorial-pill-btn cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    className="p-4 rounded-lg border border-[#1F5C45]/30 bg-[#1F5C45]/10 text-[#1F5C45] flex items-center gap-3 text-sm font-sans"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-medium">Message Sent!</p>
                      <p className="text-xs opacity-90">Thank you for your message! I'll get back to you soon!</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    className="p-4 rounded-lg border border-red-300 bg-red-50 text-red-800 flex items-center gap-3 text-sm font-sans"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <div>
                      <p className="font-medium">Delivery Error</p>
                      <p className="text-xs">
                        There was an error processing your message. Please try again or contact me directly at anshpatoliya1408@gmail.com.
                      </p>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}