"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROGRAMS, SCHEDULE } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const colorClasses = {
  cyan: { bg: "bg-neon-cyan", text: "text-neon-cyan", border: "border-neon-cyan" },
  magenta: { bg: "bg-neon-magenta", text: "text-neon-magenta", border: "border-neon-magenta" },
  orange: { bg: "bg-neon-orange", text: "text-neon-orange", border: "border-neon-orange" },
  "neon-green": { bg: "bg-neon-green", text: "text-neon-green", border: "border-neon-green" },
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dayAccentClasses: Record<string, string> = {
  Sunday: "bg-neon-green/70",
  Monday: "bg-neon-magenta/80",
  Tuesday: "bg-neon-magenta/80",
  Wednesday: "bg-neon-cyan/70",
  Thursday: "bg-neon-green/70",
  Friday: "bg-neon-magenta/80",
  Saturday: "bg-neon-cyan/70",
};

const timeSlots = [
  "6:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "5:40 PM",
  "6:30 PM",
  "8:30 PM",
];

const getSchedulePillClass = (className: string, type: string) => {
  const normalized = className.toLowerCase();

  if (normalized.includes("open mat")) {
    return "bg-violet-300/85 border-violet-200/70 text-black";
  }
  if (normalized.includes("combatives")) {
    return "bg-sky-300/85 border-sky-200/70 text-black";
  }
  if (normalized.includes("thunderdome")) {
    return "bg-purple-300/85 border-purple-200/70 text-black";
  }

  const byType: Record<string, string> = {
    "bjj-gi": "bg-pink-300/85 border-pink-200/70 text-black",
    "bjj-nogi": "bg-lime-300/85 border-lime-200/70 text-black",
    mma: "bg-cyan-300/85 border-cyan-200/70 text-black",
    kids: "bg-yellow-300/90 border-yellow-200/70 text-black",
  };

  return byType[type] ?? "bg-white/80 border-white/70 text-black";
};

export default function ClassesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/classes-hero-bg.png')", backgroundPosition: "15% center" }} />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,167,75,0.1),transparent)]" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                Our Programs
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                CLASSES &
                <span className="block text-gradient-gold">SCHEDULE</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Find the perfect program for your goals. From traditional gi training to modern MMA.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Special Programs */}
        <section className="py-10 bg-background">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
                SPECIAL <span className="text-gradient-gold">PROGRAMS</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-predator p-8 text-center">
                <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  KIDS PROGRAMS
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed text-left">
                  Our Kids BJJ program builds confidence, discipline, and respect both on and off the mat. Lil' Ninjas (ages 4–7) introduces movement, coordination, and fun fundamentals, while our Samurai program (ages 8–14) develops real technique, competition skills, and mental toughness. Classes run Mon–Fri with small group sizes for focused coaching.
                </p>
              </div>
              <div className="card-predator p-8 text-center">
                <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  VETERAN & LEO PROGRAMS
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed text-left">
                  We honor those who serve with exclusive scholarship opportunities for active military, veterans, and law enforcement officers. Midland BJJ & MMA is a certified C4C PJJ training center, offering structured curriculum, continuing education, and official certification for professionals seeking advanced combatives training.
                </p>
              </div>
              <div className="card-predator p-8 text-center">
                <h3 className="text-xl text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  PRIVATE TRAINING
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed text-left">
                  Accelerate your progress with one-on-one coaching tailored to your goals — whether you're a beginner building foundations, a competitor sharpening technique, or a team seeking specialized instruction. Corporate group sessions and self-defense seminars are also available. Contact us to schedule your first session.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-12 bg-background-elevated">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl md:text-6xl text-white leading-[0.9]" style={{ fontFamily: "var(--font-display)" }}>
                MIDLAND JIUJITSU
              </h2>
              <p className="mt-2 text-sm md:text-xl tracking-[0.5em] text-white/80 uppercase">
                Schedule
              </p>
            </motion.div>

            {/* Mobile */}
            <div className="lg:hidden space-y-5">
              {days.map((day) => {
                const dayClasses = SCHEDULE.filter((s) => s.day === day);
                if (dayClasses.length === 0) return null;

                return (
                  <div key={day} className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm p-5">
                    <div className="mb-4">
                      <h3 className="text-lg tracking-[0.08em] uppercase text-white" style={{ fontFamily: "var(--font-display)" }}>
                        {day}
                      </h3>
                      <div className={`mt-1 h-[2px] w-16 ${dayAccentClasses[day]}`} />
                    </div>
                    <div className="space-y-2.5">
                      {dayClasses.map((classItem, index) => (
                        <div key={`${day}-${classItem.time}-${index}`} className="flex items-center justify-between gap-3">
                          <span className="text-white/70 text-xs tracking-wider">{classItem.time}</span>
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${getSchedulePillClass(classItem.class, classItem.type)}`}
                          >
                            {classItem.class}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,0,130,0.08),transparent_35%),radial-gradient(circle_at_90%_80%,rgba(0,212,255,0.08),transparent_35%)]" />
                <div className="relative grid grid-cols-8">
                  <div className="border-b border-white/10 p-4" />
                  {days.map((day) => (
                    <div
                      key={day}
                      className="border-b border-white/10 p-4 text-center"
                    >
                      <div className="text-white text-sm tracking-[0.08em] uppercase" style={{ fontFamily: "var(--font-display)" }}>
                        {day}
                      </div>
                      <div className={`mx-auto mt-2 h-[2px] w-14 ${dayAccentClasses[day]}`} />
                    </div>
                  ))}

                  {timeSlots.map((time) => (
                    <div key={`row-${time}`} className="contents">
                      <div className="border-r border-white/10 border-b border-white/10 px-4 py-3 text-white/65 text-xs tracking-wider">
                        {time}
                      </div>
                      {days.map((day) => {
                        const classItems = SCHEDULE.filter((s) => s.day === day && s.time === time);
                        return (
                          <div
                            key={`${day}-${time}`}
                            className="min-h-[58px] border-b border-r border-white/10 p-2 flex flex-col items-center justify-center gap-1.5"
                          >
                            {classItems.map((classItem, index) => (
                              <span
                                key={`${day}-${time}-${index}`}
                                className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] whitespace-nowrap ${getSchedulePillClass(classItem.class, classItem.type)}`}
                              >
                                {classItem.class}
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {PROGRAMS.map((program) => (
                <div key={program.id} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${colorClasses[program.color as keyof typeof colorClasses].bg}`} />
                  <span className="text-text-secondary text-xs tracking-wider uppercase">{program.shortName}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,167,75,0.05)_0%,transparent_70%)]" />

          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                NOT SURE WHICH <span className="text-gradient-gold">CLASS TO CHOOSE?</span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Come try any class for free. We&apos;ll help you find the perfect program for your goals.
              </p>
              <Link
                href="/contact"
                className="inline-flex btn-predator btn-gold px-10 py-5 text-lg"
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
