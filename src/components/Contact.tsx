import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Instagram,
  Globe
} from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "./effects/ScrollReveal";
import { projectId, publicAnonKey } from "../utils/supabase/info";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "anshpatoliya1408@gmail.com",
    href: "mailto:anshpatoliya1408@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8160369100",
    href: "tel:+918160369100"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Ahmedabad , Gujarat",
    href: "#"
  }
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Ansh-Patoliya",
    color: "hover:text-gray-400"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ansh-patoliya",
    color: "hover:text-blue-400"
  },
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/_kano._148",
    color: "hover:text-sky-400"
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
  const [emailOpened, setEmailOpened] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-ebb6b21e/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Store in localStorage for potential future use / fallback backup
        const contactData = {
          ...formData,
          timestamp: new Date().toISOString(),
          id: Date.now().toString()
        };

        const existingContacts = JSON.parse(localStorage.getItem('portfolio-contacts') || '[]');
        existingContacts.push(contactData);
        localStorage.setItem('portfolio-contacts', JSON.stringify(existingContacts));

        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
        console.log('Contact form processed successfully');
      } else {
        throw new Error('Server responded with error status');
      }
    } catch (error) {
      console.error('Error processing contact form:', error);
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
    <section id="contact" className="py-20 bg-[#0D0D0D]">
      <div className="container px-6 max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-[#FAFAFA] font-semibold tracking-tight">
            Let's Work Together
          </h2>
          <div className="w-24 h-1 bg-[#2563EB] mx-auto rounded-full" />
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ScrollReveal y={22} className="will-change-transform">
            <Card className="bg-[#111111] border border-[#262626] rounded-xl hover:border-[#3b82f6]/40 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-[#FAFAFA]">
                  <div className="p-2 bg-[#2563EB] rounded-lg">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  Send Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#FAFAFA]">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="bg-[#161616] border border-[#262626] rounded-xl text-[#FAFAFA] focus:border-[#2563EB] focus:ring-[#2563EB] focus-visible:ring-[#2563EB] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#FAFAFA]">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email id"
                      required
                      className="bg-[#161616] border border-[#262626] rounded-xl text-[#FAFAFA] focus:border-[#2563EB] focus:ring-[#2563EB] focus-visible:ring-[#2563EB] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#FAFAFA]">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="bg-[#161616] border border-[#262626] rounded-xl text-[#FAFAFA] focus:border-[#2563EB] focus:ring-[#2563EB] focus-visible:ring-[#2563EB] transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#2563EB] hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#3b82f6] text-[#FAFAFA] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-[1.03] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-0"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      className="text-green-400 text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Mail className="w-4 h-4" />
                        <span>Message Sent!</span>
                      </div>
                      <p className="text-sm">
                        {emailOpened
                          ? "Your email client should open with a pre-filled message. I'll get back to you soon!"
                          : "Thank you for your message! I'll get back to you soon!"
                        }
                      </p>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      className="text-red-400 text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      There was an error processing your message. Please try again or contact me directly at anshpatoliya1408@gmail.com.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal y={22} delay={0.08} className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-[#111111] border border-[#262626] rounded-xl hover:border-[#3b82f6]/40 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#FAFAFA]">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-[#161616] transition-colors group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2 bg-[#2563EB] rounded-lg">
                      <info.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="text-[#FAFAFA] group-hover:text-[#2563EB] transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-[#111111] border border-[#262626] rounded-xl hover:border-[#3b82f6]/40 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-[#FAFAFA]">Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#161616] transition-colors group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <social.icon className={`w-5 h-5 text-muted-foreground ${social.color} transition-colors`} />
                      <span className="text-sm text-[#FAFAFA] group-hover:text-[#2563EB] transition-colors">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}