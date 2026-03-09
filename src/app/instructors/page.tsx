"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { INSTRUCTORS, IMAGES } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function InstructorsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,167,75,0.1),transparent)]" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                Our Team
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                MEET YOUR
                <span className="block text-gradient-gold">INSTRUCTORS</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Learn from the best. Our team combines decades of experience in competition, teaching, and real-world application.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Instructors Grid */}
        <section className="py-20 bg-background-elevated">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INSTRUCTORS.map((instructor, index) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="card-predator h-full">
                    {/* Image */}
                    <div className="relative h-64 bg-gradient-to-br from-background-card to-background overflow-hidden">
                      <Image
                        src={IMAGES[instructor.image as keyof typeof IMAGES] as string}
                        alt={instructor.name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent" />

                      {/* Belt badge */}
                      <div className="absolute bottom-4 left-4 px-4 py-1.5 bg-gold text-background text-xs font-bold uppercase tracking-wider">
                        {instructor.belt}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl text-white mb-1 group-hover:text-gold transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                        {instructor.name}
                      </h3>
                      <p className="text-gold text-sm font-medium mb-4">
                        {instructor.role}
                      </p>

                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {instructor.bio}
                      </p>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2">
                        {instructor.specialties.map((specialty, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-background text-text-secondary text-xs border border-border"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,167,75,0.05)_0%,transparent_70%)]" />

          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                TRAIN WITH <span className="text-gradient-gold">THE BEST</span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Our instructors are dedicated to helping you achieve your goals, whether you're seeking fitness, self-defense, or competition success.
              </p>
              <Link
                href="/contact"
                className="inline-flex btn-predator btn-gold px-10 py-5 text-lg"
              >
                <span>Meet the Team in Person</span>
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
