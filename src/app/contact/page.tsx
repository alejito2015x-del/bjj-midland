"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  CheckCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <main className="pt-[88px] bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden bg-background">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/contact-hero-bg-20260306-154854.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover [object-position:15%_30%]"
            />
          </div>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,167,75,0.08),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative max-w-[1200px] mx-auto px-6 md:px-[60px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-7">
                <div className="h-px w-12 bg-gold/50" />
                <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                  Contact Us
                </span>
                <div className="h-px w-12 bg-gold/50" />
              </div>
              <h1
                className="text-[clamp(3rem,8vw,6rem)] text-white leading-[0.88] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                START YOUR
              </h1>
              <h2
                className="text-[clamp(2.5rem,7vw,5rem)] text-gradient-gold leading-[0.92] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                JOURNEY TODAY
              </h2>
              <div className="flex items-center justify-center gap-3 my-8">
                <div className="h-px w-16 bg-gold/30" />
                <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                <div className="h-px w-16 bg-gold/30" />
              </div>
              <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
                Have questions? We&apos;re here to help. Contact us and we&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 border-t border-gold/15" style={{ background: "#0d0d0d" }}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-[60px]">

              {/* ── Left: Contact Info (2fr) ── */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-10"
              >
                {/* Header */}
                <div>
                  <span className="inline-block text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">
                    Get in Touch
                  </span>
                  <h2
                    className="text-4xl md:text-5xl text-white leading-[0.92] mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    CONTACT{" "}
                    <span className="text-gradient-gold">INFORMATION</span>
                  </h2>
                  <p className="text-text-secondary leading-relaxed">
                    Visit us at our facility or reach out through any of these channels. We respond within 24 hours.
                  </p>
                </div>

                {/* Contact items */}
                <div className="flex flex-col gap-0">
                  {[
                    { icon: MapPin, label: "LOCATION", value: SITE_CONFIG.address, href: undefined },
                    { icon: Phone,  label: "PHONE",    value: SITE_CONFIG.phone,   href: `tel:${SITE_CONFIG.phone}` },
                    { icon: Mail,   label: "EMAIL",    value: SITE_CONFIG.email,   href: `mailto:${SITE_CONFIG.email}` },
                    { icon: Clock,  label: "HOURS",    value: "Mon–Fri: 6am–9pm · Sat: 8am–2pm · Sun: Closed", href: undefined },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4 border-b border-gold/10 py-6 last:border-b-0"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-gold/10 border border-gold/20 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70 font-semibold mb-1">
                          {label}
                        </p>
                        {href ? (
                          <a href={href} className="text-white text-sm leading-relaxed hover:text-gold transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-white text-sm leading-relaxed">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-gold/70 font-semibold mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-3">
                    {[
                      { href: `https://instagram.com/${SITE_CONFIG.social.instagram.replace("@", "")}`, Icon: Instagram, label: "Instagram" },
                      { href: `https://facebook.com/${SITE_CONFIG.social.facebook}`, Icon: Facebook, label: "Facebook" },
                      { href: `https://youtube.com/${SITE_CONFIG.social.youtube}`, Icon: Youtube, label: "YouTube" },
                    ].map(({ href, Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-11 h-11 flex items-center justify-center border border-gold/20 text-text-secondary hover:text-gold hover:border-gold/60 transition-all"
                        style={{ background: "#0a0a0a" }}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

              </motion.div>

              {/* ── Right: Form (3fr) ── */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div
                  className="border border-gold/20 p-8 md:p-10"
                  style={{ background: "#0a0a0a" }}
                >
                  {!submitted ? (
                    <>
                      <span className="inline-block text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-4">
                        Send a Message
                      </span>
                      <h2
                        className="text-4xl text-white mb-8 leading-[0.92]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        SEND US A{" "}
                        <span className="text-gradient-gold">MESSAGE</span>
                      </h2>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="name" className="block text-white text-xs font-semibold tracking-wide uppercase mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full h-12 px-4 bg-background border border-border text-white placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                            placeholder="Your full name"
                          />
                        </div>

                        {/* Email + Phone side by side (short fields) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="email" className="block text-white text-xs font-semibold tracking-wide uppercase mb-2">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full h-12 px-4 bg-background border border-border text-white placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                              placeholder="your@email.com"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-white text-xs font-semibold tracking-wide uppercase mb-2">
                              Phone <span className="text-text-muted normal-case tracking-normal font-normal">(optional)</span>
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full h-12 px-4 bg-background border border-border text-white placeholder-text-muted focus:outline-none focus:border-gold transition-colors"
                              placeholder="(432) 305-9480"
                            />
                          </div>
                        </div>

                        {/* Interest */}
                        <div>
                          <label htmlFor="interest" className="block text-white text-xs font-semibold tracking-wide uppercase mb-2">
                            What are you interested in?
                          </label>
                          <select
                            id="interest"
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className="w-full h-12 px-4 bg-background border border-border text-white focus:outline-none focus:border-gold transition-colors appearance-none"
                          >
                            <option value="">Select an option</option>
                            <option value="trial">Free trial class</option>
                            <option value="bjj">Brazilian Jiu Jitsu</option>
                            <option value="mma">MMA</option>
                            <option value="kids">Kids programs</option>
                            <option value="pricing">Pricing information</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-white text-xs font-semibold tracking-wide uppercase mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full min-h-[140px] px-4 py-3.5 bg-background border border-border text-white placeholder-text-muted focus:outline-none focus:border-gold transition-colors resize-none"
                            placeholder="How can we help you?"
                          />
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="w-full h-[52px] btn-predator btn-gold text-sm mt-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </button>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gold/10 border border-gold">
                        <CheckCircle className="w-10 h-10 text-gold" />
                      </div>
                      <h3
                        className="text-3xl text-white mb-3"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        MESSAGE SENT!
                      </h3>
                      <p className="text-text-secondary mb-8">
                        Thank you for contacting us. We&apos;ll get back to you soon.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", phone: "", interest: "", message: "" });
                        }}
                        className="btn-predator btn-outline-gold px-8 py-3"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Full-width Map */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2"
              >
                <div className="w-full rounded-xl overflow-hidden h-64 md:h-[320px] border border-gold/15">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d844.5!2d-102.1260243!3d32.035686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86fbd92f62b85865%3A0x48fab8be530fb9f5!2sMidland%20BJJ!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: "grayscale(100%) invert(92%) contrast(83%)",
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BJJ Midland Location"
                  />
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
