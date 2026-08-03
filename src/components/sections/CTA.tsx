"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRegistrationModal } from "@/context/RegistrationModalContext";
import { SITE_CONFIG } from "@/lib/constants";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 80 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 as const },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export default function CTA() {
  const { openModal } = useRegistrationModal();
  return (
    <section id="contact-cta" className="pt-4 pb-14 md:pt-6 md:pb-20 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neon-orange/5 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(212, 167, 75, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(212, 167, 75, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="w-full px-6 md:px-12 relative"
        style={{ maxWidth: "1280px", marginInline: "auto" }}>
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-gold/30 bg-gold/5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
              <span className="text-gold text-sm md:text-base font-semibold tracking-[0.15em] uppercase">
                First Class Free
              </span>
            </motion.div>

            <div aria-hidden="true" className="h-6 md:h-8 lg:h-10" />

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="text-5xl md:text-6xl lg:text-7xl text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              YOUR JOURNEY
              <span className="block text-gradient-gold">STARTS HERE</span>
            </motion.h2>

            <div aria-hidden="true" className="h-5 md:h-7 lg:h-8" />

            {/* Description */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-text-secondary text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              No experience required. Walk in as a beginner, walk out as part of the tribe.
              Every champion was once a contender who refused to give up.
            </motion.p>

            <div aria-hidden="true" className="h-8 md:h-10 lg:h-12" />

            {/* CTA Buttons */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <Link
                href="/contact"
                onClick={(e) => { e.preventDefault(); openModal("trial"); }}
                className="btn-predator btn-gold px-10 py-5 text-lg"
              >
                <span>Book Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${SITE_CONFIG.phoneTel}`}
                className="btn-predator btn-outline-gold px-10 py-5 text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </motion.div>

            <div aria-hidden="true" className="h-10 md:h-12 lg:h-14" />

            {/* Info Cards */}
            <motion.div
              {...fadeUp(0.4)}
              className="grid sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center lg:items-start gap-4 p-4 bg-background-card border border-border rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <h4 className="text-white text-sm font-semibold mb-1">Location</h4>
                  <p className="text-text-secondary text-sm">4612 Billingsley Blvd, Midland, TX 79705</p>
                </div>
              </div>
              <div className="flex items-center lg:items-start gap-4 p-4 bg-background-card border border-border rounded-lg">
                <div className="w-10 h-10 flex items-center justify-center bg-gold/10 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div className="text-left">
                  <h4 className="text-white text-sm font-semibold mb-1">Hours</h4>
                  <p className="text-text-secondary text-sm">Mon-Fri 6am-9pm • Sat 8am-2pm</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative min-w-0"
          >
            <div className="relative mx-auto flex items-center justify-center w-full max-w-[72rem] origin-center scale-[1.28] sm:scale-[1.42] lg:scale-[1.62]">
              <Image
                src="/images/ref_23.png"
                alt="Stay Relentless BJJ"
                width={1600}
                height={1600}
                className="object-contain w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        <div aria-hidden="true" className="h-0" />
      </div>
    </section>
  );
}
