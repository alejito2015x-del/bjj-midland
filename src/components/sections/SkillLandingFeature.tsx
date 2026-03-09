"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const schedule = [
  { day: "Monday", classType: "BJJ GI", time: "6:00 PM", color: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/40" },
  { day: "Tuesday", classType: "NO-GI", time: "7:00 PM", color: "bg-neon-magenta/15 text-neon-magenta border-neon-magenta/40" },
  { day: "Wednesday", classType: "MMA", time: "7:30 PM", color: "bg-neon-orange/15 text-neon-orange border-neon-orange/40" },
  { day: "Thursday", classType: "KIDS", time: "5:30 PM", color: "bg-neon-green/15 text-neon-green border-neon-green/40" },
];

export default function SkillLandingFeature() {
  return (
    <section
      className="pt-32 pb-32 md:pt-40 md:pb-40 bg-background-elevated relative overflow-hidden"
      style={{ marginTop: "30px" }}
    >
      <div className="absolute inset-0 diagonal-lines opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(233,30,140,0.08),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,212,255,0.08),transparent_45%)]" />

      <div className="relative w-full px-6 md:px-12"
        style={{ maxWidth: "1280px", marginInline: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-5">
          </span>
          <h2 className="text-4xl md:text-6xl text-white mb-4">
            TRAINING FLOW
            <span className="block text-gradient-neon">+ MEMBERSHIP OPTIONS</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Weekly rhythm with color-coded classes and clear pricing, built for quick decisions on mobile and desktop.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-predator p-10 md:p-12"
          >
            <h3 className="text-3xl text-white mb-6">THIS WEEK AT THE GYM</h3>
            <div className="space-y-4">
              {schedule.map((slot) => (
                <div key={`${slot.day}-${slot.classType}`} className="bg-background-card border border-border rounded-xl p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white text-sm md:text-base font-semibold uppercase tracking-[0.08em]">{slot.day}</p>
                    <p className="text-text-secondary text-sm">{slot.time}</p>
                  </div>
                  <span className={`text-xs md:text-sm px-3 py-1.5 rounded-full border font-semibold tracking-[0.08em] ${slot.color}`}>
                    {slot.classType}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/classes#schedule" className="mt-6 inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm tracking-[0.12em] uppercase">
              Full Schedule <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
