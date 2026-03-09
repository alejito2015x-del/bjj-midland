"use client";

import { motion } from "framer-motion";
import { Shield, Users, Trophy, Target, Flame, Brain } from "lucide-react";

const benefits = [
  {
    icon: Trophy,
    title: "World-Class Instruction",
    description: "Train under experienced black belts with proven records in competition and real-world application.",
    accent: "gold",
  },
  {
    icon: Users,
    title: "Tribe Mentality",
    description: "Join a brotherhood of dedicated practitioners committed to mutual growth and excellence.",
    accent: "gold",
  },
  {
    icon: Shield,
    title: "Proven Self-Defense",
    description: "Learn practical techniques that work in real situations. Confidence through capability.",
    accent: "gold",
  },
  {
    icon: Brain,
    title: "Mental Fortitude",
    description: "Develop unshakeable discipline, focus, and problem-solving skills that extend beyond the mat.",
    accent: "gold",
  },
  {
    icon: Flame,
    title: "Elite Conditioning",
    description: "Build functional strength, flexibility, and endurance through intensive martial arts training.",
    accent: "gold",
  },
  {
    icon: Target,
    title: "Goal-Oriented Progress",
    description: "Clear belt progression system with measurable milestones. Track your journey to mastery.",
    accent: "gold",
  },
];

export default function Benefits() {
  return (
    <section className="py-44 md:py-56 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(212,167,75,0.03)_0%,transparent_70%)]" />
      </div>

      <div className="w-full px-6 md:px-12 relative"
        style={{ maxWidth: "1280px", marginInline: "auto" }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-36"
        >
          <span className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Why Train With Us
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6">
            THE RELENTLESS
            <span className="block text-gradient-gold">ADVANTAGE</span>
          </h2>
          <p className="text-text-secondary text-lg w-full md:w-1/2 mx-auto text-center">
            More than a gym. A complete transformation system designed to build warriors for life.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="card-predator p-10 h-full text-center">
                  {/* Icon */}
                  <div className="mb-6 relative flex justify-center">
                    <div className="w-14 h-14 flex items-center justify-center bg-gold/5 border border-gold/20 group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                      <Icon
                        className="w-6 h-6 text-gold group-hover:text-background transition-colors duration-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 w-14 h-14 mx-auto bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl text-white mb-3 group-hover:text-gold transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}
                  >
                    {benefit.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-40 text-center"
        >
          <div className="w-full mx-auto flex flex-col items-center">
            <svg className="w-12 h-12 text-gold/30 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <blockquote
              className="text-2xl md:text-3xl text-white leading-relaxed mb-6 w-full md:w-1/2 mx-auto text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              &ldquo;A BLACK BELT IS A WHITE BELT WHO NEVER QUIT.&rdquo;
            </blockquote>
            <p className="text-gold text-sm tracking-[0.2em] uppercase">
              — Stay Relentless Philosophy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
