"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/lib/constants";
import Coaches from "@/components/sections/Coaches";
import { Target, Shield, Users, Trophy, ArrowRight, MapPin, Dumbbell, Calendar, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Discipline",
    description: "The foundation of all progress. We teach consistency and dedication.",
  },
  {
    icon: Shield,
    title: "Respect",
    description: "For yourself, for your training partners, for the martial art.",
  },
  {
    icon: Users,
    title: "Community",
    description: "A family that supports you on and off the mat.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Always striving to be better than yesterday, never settling.",
  },
];

const storyHighlights = [
  "Open affiliation. All training backgrounds are welcome.",
  "Large classes and small-group coaching options.",
  "Law enforcement continuing education and certification support.",
  "Self-defense mindset built on confidence and control.",
];

const storyStats = [
  { icon: Calendar, label: "Established", value: `EST. ${SITE_CONFIG.established}` },
  { icon: MapPin, label: "Location", value: "4612 Billingsley Blvd, Midland" },
  { icon: Dumbbell, label: "Training Focus", value: "Jiu Jitsu, Striking, Weapons" },
  { icon: Globe, label: "Community", value: "Beginners to Professionals" },
];

const offerItems = [
  { title: "Martial Skill", desc: "Structured curriculum from white to black belt with clear progression." },
  { title: "Self-Defense", desc: "Real-world awareness and techniques applicable in any situation." },
  { title: "Personal Growth", desc: "Build discipline, confidence, and mental resilience on and off the mat." },
];


export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[88px] bg-background">

        {/* ── HERO ── */}
        <section className="relative py-28 md:py-36 overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0">
            <Image
              src="/images/about-hero-bg-20260306.png"
              alt=""
              fill
              priority
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black/52" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,167,75,0.08),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative max-w-[1200px] mx-auto px-6 md:px-[60px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-12 bg-gold/50" />
                <span className="text-gold text-xs font-semibold tracking-[0.35em] uppercase">
                  Our Story
                </span>
                <div className="h-px w-12 bg-gold/50" />
              </div>

              {/* Title */}
              <h1
                className="text-[clamp(3.5rem,10vw,7rem)] text-white leading-[0.88] tracking-tight mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ABOUT
              </h1>
              <h2
                className="text-[clamp(3rem,8vw,5.5rem)] text-gradient-gold leading-[0.92] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                MIDLAND BJJ &amp; MMA
              </h2>

              {/* Divider */}
              <div className="flex items-center justify-center gap-3 mt-8 mb-6">
                <div className="h-px w-16 bg-gold/30" />
                <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                <div className="h-px w-16 bg-gold/30" />
              </div>

              <p className="-mt-1 md:-mt-2 text-text-secondary text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                Building warriors and champions in Midland, Texas since{" "}
                <span className="text-gold font-semibold">{SITE_CONFIG.established}</span>.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── STORY: IMAGE + WHAT MAKES US DIFFERENT ── */}
        <section className="relative pt-16 md:pt-20 pb-4 md:pb-8 bg-background-elevated overflow-hidden">
          <div className="absolute inset-0 jaguar-pattern opacity-60" />
          <div className="absolute inset-0 diagonal-lines opacity-15" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative max-w-[1200px] mx-auto px-6 md:px-[60px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[60px] items-center">

              {/* Left: Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-[480px] md:h-[560px] overflow-hidden border border-gold/20 bg-background rounded-sm">
                  <div className="absolute -inset-4 bg-[radial-gradient(circle_at_65%_20%,rgba(212,167,75,0.15),transparent_60%)] pointer-events-none" />
                  <Image
                    src="/images/hero-bg-20260306-124220.png"
                    alt="Midland BJJ competition moment"
                    fill
                    className="object-cover object-[44%_50%] scale-[1.1]"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(212,167,75,0.1),transparent_45%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/60 to-transparent" />

                  {/* Badge top-left */}
                  <div className="absolute left-5 top-5 border border-gold/50 bg-background/80 backdrop-blur-sm px-4 py-2">
                    <p className="text-[10px] text-gold uppercase tracking-[0.28em] font-semibold">
                      Since {SITE_CONFIG.established}
                    </p>
                  </div>

                  {/* EST badge bottom */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="border border-gold/50 p-4 text-center bg-background/85 backdrop-blur-sm">
                      <p
                        className="text-gold text-3xl leading-none"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        EST. {SITE_CONFIG.established}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: What makes us different */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-10"
              >
                <div>
                  <span className="inline-block text-gold text-xs font-semibold tracking-[0.28em] uppercase mb-5">
                    About Midland BJJ
                  </span>
                  <h2
                    className="text-[2.4rem] md:text-[3rem] text-white leading-[0.9] mb-6"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    WHAT MAKES{" "}
                    <span className="text-gradient-gold">MIDLAND BJJ</span>{" "}
                    DIFFERENT?
                  </h2>
                  <p className="text-text-secondary leading-relaxed text-[1.05rem]">
                    Midland BJJ combines traditional dojo standards with modern
                    coaching, clear structure, and a team-first culture. From
                    first class to advanced training, we build skill with
                    purpose.
                  </p>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {storyHighlights.map((highlight, i) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 border border-gold/20 bg-background/60 px-4 py-4 hover:border-gold/40 transition-colors"
                    >
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-gold shrink-0" />
                      <p className="text-sm leading-relaxed text-[#b7b9be]">
                        {highlight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COACHES ── */}
        <Coaches />

        {/* ── STATS STRIP ── */}
        <section className="py-4 bg-background border-y border-gold/15">
          <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gold/15">
              {storyStats.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="px-8 pt-3 pb-7 md:pt-4 md:pb-8 group hover:bg-gold/5 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gold/60 mb-1 group-hover:text-gold transition-colors" />
                    <p className="text-[10px] uppercase tracking-[0.24em] text-gold/70 font-semibold mb-2">
                      {item.label}
                    </p>
                    <p className="text-white font-medium text-[0.95rem] leading-snug">
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WHAT WE OFFER ── */}
        <section className="relative pt-14 md:pt-16 pb-12 md:pb-14 overflow-hidden" style={{ background: "#0d0d0d" }}>
          {/* Top gold separator */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(212,167,75,0.04),transparent)]" />

          <div className="relative max-w-[1200px] mx-auto px-6 md:px-[60px]">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-gold/50" />
                <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
                  What We Offer
                </span>
                <div className="h-px w-10 bg-gold/50" />
              </div>
              <h2
                className="text-4xl md:text-5xl text-white leading-[0.92] mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ONE SYSTEM.{" "}
                <span className="text-gradient-gold">THREE PILLARS.</span>
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed text-center">
                We train martial skill, self-defense awareness, and personal
                development as one unified system. A place where beginners and
                professionals reduce stress, sharpen discipline, and build
                lasting confidence.
              </p>
            </motion.div>

            {/* Three pillar cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offerItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative border border-gold/20 p-10 min-h-[280px] flex flex-col hover:border-gold/50 transition-all duration-500 overflow-hidden"
                  style={{ background: "#141414" }}
                >
                  {/* Number watermark */}
                  <span
                    className="absolute -right-3 -top-4 text-[7rem] font-black leading-none text-gold/5 group-hover:text-gold/10 transition-colors select-none"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex-1">
                    <div className="w-1 h-8 bg-gold mb-8" />
                    <h3
                      className="text-2xl text-white mb-5 group-hover:text-gold transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom gold separator */}
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        </section>

        {/* ── VALUES ── */}
        <section className="py-14 md:py-16 relative overflow-hidden" style={{ background: "#080808" }}>
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-10 bg-gold/50" />
                <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
                  Our Values
                </span>
                <div className="h-px w-10 bg-gold/50" />
              </div>
              <h2
                className="text-4xl md:text-5xl text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                WHAT{" "}
                <span className="text-gradient-gold">DEFINES US</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      className="border border-gold/20 p-10 min-h-[280px] text-center flex flex-col items-center justify-center hover:border-gold/40 transition-all duration-500"
                      style={{ background: "#141414" }}
                    >
                      <div className="w-14 h-14 flex items-center justify-center bg-gold/10 border border-gold/25 mb-8 group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                        <Icon className="w-6 h-6 text-gold group-hover:text-background transition-colors" />
                      </div>
                      <h3
                        className="text-xl text-white mb-5 group-hover:text-gold transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {value.title.toUpperCase()}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hf_20260306_221907_32ae0106-7fda-4ffb-ac78-ba02dbbdefc4.jpeg"
              alt=""
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-black/72" />
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,167,75,0.07)_0%,transparent_65%)]" />
          <div className="absolute inset-0 jaguar-pattern opacity-40" />

          <div className="relative max-w-2xl mx-auto px-6 md:px-[60px] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-10 bg-gold/50" />
                <div className="w-1.5 h-1.5 bg-gold rotate-45" />
                <div className="h-px w-10 bg-gold/50" />
              </div>
              <h2
                className="text-4xl md:text-5xl text-white mb-6 leading-[0.92]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                READY TO{" "}
                <span className="text-gradient-gold">JOIN US?</span>
              </h2>
              <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                Your first class is completely free, no commitment. Discover why
                we are the largest BJJ family in Midland.
              </p>
              <Link
                href="/contact"
                className="inline-flex btn-predator btn-gold px-10 py-5 text-base"
              >
                <span>Book My Free Class</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
