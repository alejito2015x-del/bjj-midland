"use client";

import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const coachTestimonials = [
  {
    quote:
      "Brad 'Gordinho' Barnes is the owner and head instructor of Midland BJJ & MMA. Since starting in 2001, he has coached high-level MMA athletes, earned his BJJ black belt at the 2015 Masters World Championships, and built one of the key martial arts programs in West Texas. A 9-year law enforcement veteran and C4C PJJ adjunct instructor, his coaching emphasizes practical control, real-world self-defense, and law-enforcement-ready jiu jitsu.",
    name: "Brad \"Gordinho\" Barnes",
    designation: "Owner & Head Instructor",
    src: "/images/coaches/brad.png",
  },
  {
    quote:
      "Professor Maddy Fernandez leads our Youth Program with high-level competitive experience and a strong teaching structure for young students. She is a multiple-time IBJJF Open champion in class and absolute divisions, plus a multiple-time IBJJF NoGi Worlds and Pan American medalist in both Gi and NoGi. She began training in 2015, was promoted to blue belt in six months, and also trains MMA and kickboxing. Her favorite techniques are the single-leg takedown and armbar from mount.",
    name: "Professor Maddy Fernandez",
    designation: "Head Instructor, Youth Program",
    src: "/images/coaches/mady.png",
  },
  {
    quote:
      "With 13+ years in BJJ and pro MMA experience (2-0), Chip brings high-level competition knowledge, including Fight of the Night and Submission of the Night honors at Fight to Win Pro. His coaching blends sharp technical detail with a strong team culture where athletes train for competition, self-defense, fitness, and personal growth. Chip is passionate about helping students build confidence, discipline, and lasting camaraderie on and off the mats.",
    name: "Professor Chip Cole",
    designation: "Adult BJJ Instructor",
    src: "/images/coaches/chip.png",
  },
];

export default function Coaches() {
  return (
    <section className="relative pt-14 md:pt-16 pb-4 md:pb-6 bg-background overflow-hidden">
      <div className="absolute inset-0 diagonal-lines opacity-15" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-gold/50" />
            <span className="text-gold text-xs font-semibold tracking-[0.3em] uppercase">
              Our Coaches
            </span>
            <div className="h-px w-10 bg-gold/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl text-white leading-[0.92] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TRAIN WITH{" "}
            <span className="text-gradient-gold">EXPERIENCE</span>
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Meet the coaching team guiding our adults and kids programs with proven instruction, structure, and real mat experience.
          </p>
        </motion.div>

        <AnimatedTestimonials
          testimonials={coachTestimonials}
          autoplay
          className="max-w-6xl py-4 md:py-3"
        />
      </div>
    </section>
  );
}
