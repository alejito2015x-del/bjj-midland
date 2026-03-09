"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PRICING_PLANS } from "@/lib/constants";
import { Check, X, ArrowRight } from "lucide-react";
import { useRegistrationModal } from "@/context/RegistrationModalContext";

const faqs = [
  {
    question: "Do I need prior experience?",
    answer:
      "No, we accept students of all levels. Our 'All Level' classes are designed so beginners and advanced practitioners can train together safely.",
  },
  {
    question: "What do I need for my first class?",
    answer:
      "Just comfortable workout clothes. We have loaner gis available for your first class. We recommend bringing water and a towel.",
  },
  {
    question: "Are there long-term contracts?",
    answer:
      "We offer monthly plans with no long-term commitment. We also have 6 and 12-month options with discounts for those who prefer to commit.",
  },
  {
    question: "Do you offer family discounts?",
    answer:
      "Yes, we offer discounts for families. Ask at the front desk about our family plans.",
  },
  {
    question: "Can I pause my membership?",
    answer:
      "Yes, you can pause your membership for up to 30 days per year for travel or injury. Contact the front desk for details.",
  },
];

export default function PricingPage() {
  const { openModal } = useRegistrationModal();
  return (
    <>
      <Navbar />
      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(212,167,75,0.1),transparent)]" />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <span className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                Memberships
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                INVEST IN
                <span className="block text-gradient-gold">YOUR FUTURE</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Flexible plans for every goal. Your first class is always free.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-background-elevated">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_PLANS.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
                >
                  <div
                    className={`card-predator h-full p-8 relative ${
                      plan.popular ? "border-gold" : ""
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-neon-orange to-neon-magenta text-white text-xs font-bold uppercase tracking-wider">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                        {plan.name}
                      </h3>
                      <p className="text-text-secondary text-sm mb-6">
                        {plan.description}
                      </p>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-gold text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
                          ${plan.price}
                        </span>
                        <span className="text-text-muted text-sm mb-2">
                          /{plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 flex items-center justify-center bg-gold/10 rounded-sm mt-0.5">
                            <Check size={12} className="text-gold" />
                          </div>
                          <span className="text-text-secondary text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 opacity-40">
                          <div className="w-5 h-5 flex items-center justify-center bg-border rounded-sm mt-0.5">
                            <X size={12} className="text-text-muted" />
                          </div>
                          <span className="text-text-muted text-sm line-through">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/contact"
                      onClick={(e) => { e.preventDefault(); openModal(plan.id); }}
                      className={`w-full btn-predator ${
                        plan.popular ? "btn-gold" : "btn-outline-gold"
                      } py-4`}
                    >
                      Choose {plan.name}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-text-muted text-sm mt-8"
            >
              All plans include access to Sunday Open Mat. Loaner gi available for new members.
            </motion.p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-background">
          <div className="max-w-3xl mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block text-gold text-xs font-semibold tracking-[0.3em] uppercase mb-6">
                FAQ
              </span>
              <h2 className="text-4xl md:text-5xl text-white" style={{ fontFamily: 'var(--font-display)' }}>
                HAVE <span className="text-gradient-gold">QUESTIONS?</span>
              </h2>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="card-predator p-6">
                    <h3 className="text-lg text-white mb-3 font-semibold">
                      {faq.question}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-background-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,167,75,0.05)_0%,transparent_70%)]" />

          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                STILL <span className="text-gradient-gold">UNSURE?</span>
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
                Try first. Your first class is 100% free, no commitment. Come see our facilities and meet the team.
              </p>
              <Link
                href="/contact"
                onClick={(e) => { e.preventDefault(); openModal("trial"); }}
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
