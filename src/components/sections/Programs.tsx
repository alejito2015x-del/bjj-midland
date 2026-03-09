"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const revealUp = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const programs = [
  {
    id: "bjj-gi",
    title: "BJJ GI",
    subtitle: "Technique, control and precision",
    description:
      "Discover the gentle art. Build patience, strategy, and technical precision with traditional gi training for self-defense and competition.",
    bullets: [
      "Fundamentals and advanced techniques",
      "Better physical and mental conditioning",
      "Strong community and discipline",
    ],
    cta: "View GI Schedule",
    image: "/images/gi-ref-18.png",
  },
  {
    id: "no-gi",
    title: "BJJ NO-GI",
    subtitle: "Speed, pressure and transitions",
    description:
      "Train without the kimono in a faster-paced grappling format. Perfect for athletes who want explosive takedowns, scrambles, and submissions.",
    bullets: [
      "Dynamic submission wrestling",
      "High pace rounds and cardio gains",
      "Direct transfer to MMA and self-defense",
    ],
    cta: "View NO-GI Schedule",
    image: "/images/nogi-ref-17.png",
  },
  {
    id: "mma",
    title: "MMA/WRESTLING",
    subtitle: "Complete combat development",
    description:
      "Combine striking, wrestling, and submissions in one integrated system. Develop timing, pressure, and fight IQ for real competitive performance.",
    bullets: [
      "Striking, takedowns, and ground control",
      "Scenario-based fight preparation",
      "Coaching for amateur and advanced levels",
    ],
    cta: "View MMA Schedule",
    image: "/images/mma-ref-19.png",
  },
];

const scheduleFilterByProgramId: Record<string, string> = {
  "bjj-gi": "bjj-gi",
  "no-gi": "bjj-nogi",
  mma: "mma",
};

export default function Programs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
    {/* Programs cards — GI / No-GI / MMA are rendered above as scroll sections in page.tsx */}
    <section id="programs-cards" className="flex flex-col items-center justify-start pb-16 md:pb-24 bg-background-elevated relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(212,167,75,0.03),transparent)]" />

      <div
        className="w-full px-6 md:px-12 relative"
        style={{ maxWidth: "1280px", marginInline: "auto" }}
      >
        {/* Programs Layout — all adult programs are rendered separately as scroll sections in page.tsx */}
        <div className="mt-8 md:mt-10 flex flex-col gap-16 md:gap-24">
          {programs.filter((p) => !["bjj-gi", "no-gi", "mma"].includes(p.id)).map((program, index) => (
            <div
              key={program.id}
              className="px-1 md:px-6 lg:px-10"
            >
              <motion.article
                className="relative overflow-hidden rounded-[32px] border border-white/12 min-h-[760px] lg:min-h-[700px]"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08, opacity: 0.72 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.05, delay: index * 0.08 + 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                  />
                </motion.div>
                <motion.div
                  className="bg-gradient-to-r from-black/20 via-black/55 to-black/92 absolute inset-0"
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0.35 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: index * 0.08 + 0.1 }}
                />

                <div
                  className="relative z-10 min-h-[760px] lg:min-h-[700px] flex items-end lg:items-center px-6 py-8 md:px-10 md:py-10 lg:px-12 justify-end"
                  style={{ paddingRight: "clamp(5rem, 12vw, 11rem)" }}
                >
                  <motion.div
                    className="w-full lg:w-[48%] xl:w-[44%] h-full max-w-[92%] sm:max-w-[88%] md:max-w-[84%] lg:max-w-none px-1 md:px-2 py-2 flex flex-col justify-center gap-6 md:gap-8"
                    style={{ transform: "translateX(clamp(2.75rem, 10vw, 12rem))" }}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.7, delay: index * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3
                      className={`mt-2 md:mt-3 text-white leading-[0.9] text-center ${
                        program.id === "mma"
                          ? "text-5xl md:text-6xl lg:text-6xl"
                          : "text-5xl md:text-6xl lg:text-7xl"
                      }`}
                      style={{
                        fontFamily: "var(--font-display)",
                        ...(program.id === "no-gi"
                          ? { transform: "translateX(-100px)" }
                          : program.id === "mma"
                            ? { transform: "translateX(-30px)" }
                            : {}),
                      }}
                    >
                      {program.title}
                    </h3>

                    <div className="space-y-4 md:space-y-6">
                      <p className="text-gold text-2xl md:text-3xl leading-tight font-semibold">
                        {program.subtitle}
                      </p>

                      <p className="text-white/88 text-lg md:text-xl leading-relaxed">
                        {program.description}
                      </p>

                      <ul className="space-y-3 md:space-y-4">
                        {program.bullets.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-white/90 text-lg md:text-xl">
                            <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_14px_rgba(212,167,75,0.7)] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <motion.div
                      className="flex justify-start pl-4 sm:pl-6 md:pl-8"
                      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.45, delay: index * 0.08 + 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/?scheduleFilter=${scheduleFilterByProgramId[program.id] ?? "all"}#schedule`}
                        className="inline-flex items-center gap-2 btn-predator btn-gold px-10 py-5 text-black/95"
                      >
                        <span>{program.cta}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.article>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Kids & Veteran Programs */}
    <motion.section
      className="pb-6 md:pb-8 bg-background-elevated relative overflow-hidden"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="w-full px-6 md:px-12 relative"
        style={{ maxWidth: "1280px", marginInline: "auto" }}
      >
        {/* Kids Programs Teaser */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative left-1/2 w-screen -translate-x-1/2 mt-20 md:mt-24"
          style={{ marginTop: "3rem" }}
        >
          <div className="w-full border-gradient-gold overflow-hidden flex flex-col md:flex-row">
            {/* Image */}
            <motion.div
              className="relative h-[28rem] md:h-auto md:w-1/2 md:min-h-[680px]"
              initial={{ opacity: 0, x: -24, scale: 1.04 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/kids-youth.jpeg"
                alt="Kids & Youth Programs"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background-card/80 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-card/80 md:hidden" />
            </motion.div>
            {/* Content */}
            <motion.div
              className="px-10 py-16 md:px-20 md:py-24 flex flex-col items-center justify-center gap-10 text-center md:w-1/2"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                KIDS & YOUTH PROGRAMS
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-lg md:text-xl">
                Our Kids & Youth classes build confidence, focus, discipline, and respect through age-appropriate Jiu Jitsu training. Students learn real technique, anti-bullying awareness, and leadership habits in a structured environment designed for growth on and off the mats. Programs available for ages 4 and up.
              </p>
              <Link
                href="/classes#kids"
                className="inline-flex items-center gap-2 btn-predator btn-outline-gold px-12 py-5 text-lg"
              >
                <span>EXPLORE THIS PROGRAM</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Explicit spacer between Kids and Veteran modules */}
        <div className="h-16 md:h-24" />

        {/* Veteran & LEO Programs */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="relative left-1/2 w-screen -translate-x-1/2 mt-0"
        >
          <div className="w-full border-gradient-gold overflow-hidden flex flex-col md:flex-row">
            <motion.div
              className="px-10 py-16 md:px-20 md:py-24 flex flex-col items-center justify-center gap-10 text-center md:w-1/2"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3
                className="text-4xl md:text-5xl lg:text-6xl text-white leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                VETERAN & LEO PROGRAMS
              </h3>
              <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-lg md:text-xl">
                We proudly support veterans and law enforcement with scholarship opportunities and a mission-driven training environment focused on resilience, stress management, and practical grappling. As a certified C4C PJJ training center, we provide a trusted community where service members can continue to sharpen mindset, fitness, and real-world readiness.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 btn-predator btn-outline-gold px-12 py-5 text-lg"
              >
                <span>EXPLORE THIS PROGRAM</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div
              className="relative h-[28rem] md:h-auto md:w-1/2 md:min-h-[680px]"
              initial={{ opacity: 0, x: 24, scale: 1.04 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/veteran-leo.png"
                alt="Veteran and law enforcement training programs"
                fill
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background-card/75 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-card/85 md:hidden" />
            </motion.div>
          </div>
        </motion.div>

        <div className="h-6 md:h-8" />

        {/* Location Block */}
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="relative left-1/2 w-screen -translate-x-1/2 mt-0 px-4 sm:px-6 lg:px-10"
        >
          <div className="mx-auto w-full max-w-[1760px]">
            <div className="text-center">
              <div
                className="inline-flex items-center gap-3 md:gap-4"
              >
                <MapPin className="w-8 h-8 md:w-10 md:h-10 text-gold" />
                <span className="section-title-standard">Location</span>
              </div>
            </div>
            <div className="h-3 md:h-5" />

            <div className="border border-white/12 bg-background-card/70 rounded-[32px] overflow-hidden mx-auto">
              <div className="px-8 py-6 md:px-14 md:py-8 text-center border-b border-white/10">
                <h3
                  className="text-3xl md:text-4xl text-white leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  FIND US IN MIDLAND, TEXAS
                </h3>
                <div className="mt-2 w-full flex justify-center">
                  <p className="text-text-secondary text-base md:text-lg w-full max-w-2xl text-center">
                    4612 Billingsley Blvd, Midland, TX 79705
                  </p>
                </div>
              </div>

              <div className="relative w-full h-[440px] md:h-[620px] xl:h-[680px]">
                <iframe
                  title="BJJ Midland Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d844.5!2d-102.1260243!3d32.035686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86fbd92f62b85865%3A0x48fab8be530fb9f5!2sMidland%20BJJ!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-2 md:mt-3 px-8 py-4 md:px-14 md:py-5 border-t border-white/10 flex flex-col items-center">
                <a
                  href="https://maps.app.goo.gl/v9vpqptiHazz1YJS9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-predator btn-outline-gold px-10 py-4"
                >
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
    </>
  );
}
