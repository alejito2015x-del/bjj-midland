"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

const MAPS_TESTIMONIALS = [
  {
    id: "erika-truex",
    name: "Erika Truex",
    role: "Google Review",
    rating: 5,
    content:
      "Great gym and coaches! Has been such an integral component for my husbands mental and physical health. If you are in law enforcement also, I highly encourage adding this to your training regimen; and if youve ever thought about trying jiu jitsu out period — give them a try! Great kiddos class as well!",
  },
  {
    id: "holly-snider",
    name: "Holly Snider",
    role: "Google Review",
    rating: 5,
    content:
      "It's been a long year and this was one of the few places I felt welcomed and safe. For the first time in my life I am comfortable with the way my body looks and feels. I joined and suddenly I have new friends, brothers, sisters, mother and father figures and a safe place to go. Definitely one of my favorite places to be.",
  },
  {
    id: "dwayne-dickson",
    name: "Dwayne Dickson",
    role: "Google Review",
    rating: 5,
    content:
      "Midland BJJ is a great place to train! The staff of coaches are extremely knowledgeable and experienced. Always a welcoming and friendly training environment. Multiple sessions most days, training in other disciplines — MMA, wrestling, DT/combatives — plus technical seminars and guest instructors on a regular basis.",
  },
  {
    id: "john-higgins",
    name: "John Higgins",
    role: "Google Review",
    rating: 5,
    content:
      "Been coming here since Nov. 2022 and love it. Started training with my youngest son and now my other son has started too. Brad and everyone here has made myself and my boys feel welcomed. My 16 year old was very skeptical but after two sessions he changed his tune. I cannot say enough positive things about this place!",
  },
  {
    id: "brian-g",
    name: "Brian G.",
    role: "Yelp Review",
    rating: 5,
    content:
      "I have some experience in BJJ and have trained at some of the best large-scale academies in the States and I can say that without a doubt this gym is a standout. Bruno is well respected throughout the BJJ community. The culture was perfect, the facilities are great, and the instruction is as good as it gets.",
  },
  {
    id: "sarah-f",
    name: "Sarah F.",
    role: "Yelp Review",
    rating: 5,
    content:
      "My daughter trains here. It pulled her out of one of the darkest places she has ever been. Not only are the coaches knowledgeable and great people, so are their students. Extremely welcoming and they make you feel like family the moment you walk through the door.",
  },
  {
    id: "will-h",
    name: "Will H.",
    role: "Yelp Review",
    rating: 5,
    content:
      "I moved out here for work and was looking to continue training BJJ. Brad Barnes and Midland BJJ have proven to be like a home away from home for me. World class coaching and attention to detail. The environment is my favorite part — very family oriented. From white belts to black belts, everyone helps each other get better.",
  },
  {
    id: "roxie-c",
    name: "Roxie C.",
    role: "Yelp Review",
    rating: 5,
    content:
      "My kids trained at Midland BJJ when we lived in west Texas and it is by far the best gym they have been to. My boys loved training with Nestor and always learned so much from him. Brad is very involved and truly cares about every single student. We miss it every day since moving away!",
  },
  {
    id: "kristin-w",
    name: "Kristin W.",
    role: "Yelp Review",
    rating: 5,
    content:
      "My seven year old has been training here for several years and the environment is always encouraging. His growth has been tremendous both skill-wise and confidence-wise! He looks forward to every class. The kids program is exceptional — the coaches genuinely invest in each child's development.",
  },
];

const TICKER_ITEMS = [
  ...MAPS_TESTIMONIALS,
  ...MAPS_TESTIMONIALS,
];

function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const manualPauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPaused = isHoverPaused || isManualPaused;

  const pauseAfterManualAction = useCallback(() => {
    setIsManualPaused(true);
    if (manualPauseTimeoutRef.current) {
      clearTimeout(manualPauseTimeoutRef.current);
    }
    manualPauseTimeoutRef.current = setTimeout(() => {
      setIsManualPaused(false);
    }, 12000);
  }, []);

  const select = useCallback(
    (i: number) => {
      setDir(i > active ? 1 : -1);
      setActive(i);
      pauseAfterManualAction();
    },
    [active, pauseAfterManualAction]
  );

  const handlePrev = useCallback(() => {
    setDir(-1);
    setActive((i) => (i - 1 + MAPS_TESTIMONIALS.length) % MAPS_TESTIMONIALS.length);
    pauseAfterManualAction();
  }, [pauseAfterManualAction]);

  const handleNext = useCallback(() => {
    setDir(1);
    setActive((i) => (i + 1) % MAPS_TESTIMONIALS.length);
    pauseAfterManualAction();
  }, [pauseAfterManualAction]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % MAPS_TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(id);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (manualPauseTimeoutRef.current) {
        clearTimeout(manualPauseTimeoutRef.current);
      }
    };
  }, []);

  const t = MAPS_TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className="relative pt-6 md:pt-8 pb-12 md:pb-14"
      style={{ background: "var(--background, #0A0A0A)" }}
      onMouseEnter={() => setIsHoverPaused(true)}
      onMouseLeave={() => setIsHoverPaused(false)}
    >
      {/* Tatami diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent 0px, transparent 18px, rgba(212,167,75,0.022) 18px, rgba(212,167,75,0.022) 19px)",
        }}
      />

      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 40% 55%, rgba(212,167,75,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Name watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`wm-${active}`}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="font-black uppercase select-none leading-none tracking-widest"
            style={{
              color: "rgba(255,255,255,0.012)",
              fontSize: "clamp(42px, 11vw, 120px)",
              fontFamily: "var(--font-display)",
            }}
          >
            {t.name.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative mx-auto w-full max-w-[1460px] px-5 sm:px-7 md:px-10 lg:px-14 xl:px-16">

        {/* ── Section header ── */}
        <div className="flex flex-col gap-4 md:gap-5">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-14 bg-gold/50" />
            <span
              className="uppercase text-gold/85 tracking-[0.35em] text-[11px] font-semibold"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Testimonials
            </span>
            <div className="h-px w-14 bg-gold/50" />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex justify-center w-full"
          >
            <h2
              className="w-full max-w-[980px] leading-[0.88] uppercase text-center"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.05rem, 5.6vw, 4.9rem)",
              }}
            >
              <span className="block text-white whitespace-nowrap">WHAT THEY</span>
              <span
                className="block whitespace-nowrap"
                style={{
                  WebkitTextStroke: "1.4px rgba(212,167,75,0.55)",
                  color: "transparent",
                }}
              >
                SAY ABOUT US
              </span>
            </h2>
          </motion.div>

          {/* ── Rating badge — centered full-width strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative flex items-center justify-center overflow-hidden py-3 md:py-4 rounded-xl border border-gold/20"
            style={{
              background:
                "linear-gradient(90deg, rgba(212,167,75,0.03) 0%, rgba(212,167,75,0.11) 45%, rgba(212,167,75,0.06) 100%)",
            }}
          >
            {/* Center radial glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 90% 100% at 80% 50%, rgba(212,167,75,0.12) 0%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div className="relative flex flex-wrap items-center justify-center gap-5 px-4 md:gap-10 md:px-8">

              {/* Stars */}
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.35, type: "spring", stiffness: 280 }}
                  >
                    <Star
                      size={20}
                      className="text-gold fill-gold"
                      style={{ filter: "drop-shadow(0 0 8px rgba(212,167,75,0.75))" }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div
                className="hidden md:block h-10 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(212,167,75,0.35), transparent)" }}
              />

              {/* Score */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 200 }}
                className="font-black leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.1rem, 4.2vw, 3.2rem)",
                  color: "#D4A74B",
                  textShadow: "0 0 40px rgba(212,167,75,0.4)",
                }}
              >
                5.0
              </motion.span>

              {/* Divider */}
              <div
                className="hidden md:block h-10 w-px"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(212,167,75,0.35), transparent)" }}
              />

              {/* Labels */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.5 }}
                className="flex flex-col items-start gap-2 pl-0 md:pl-2"
              >
                <div className="flex items-center gap-3">
                  <GoogleIcon className="opacity-80 w-5 h-5" />
                  <span
                    className="tracking-[0.28em] uppercase font-semibold"
                    style={{ color: "rgba(255,255,255,0.75)", fontSize: "1rem" }}
                  >
                    Google Reviews
                  </span>
                </div>
                <div className="flex items-center gap-3 pl-8">
                  <div className="h-px w-6" style={{ background: "rgba(212,167,75,0.45)" }} />
                  <span
                    className="tracking-[0.28em] uppercase"
                    style={{ color: "rgba(255,255,255,0.30)", fontSize: "0.72rem" }}
                  >
                    Midland BJJ &amp; MMA · Texas
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Edge fade vignette — solo lado izquierdo */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-16 pointer-events-none"
              style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }}
            />
          </motion.div>
        </div>

        {/* ── Gold rule ── */}
        <div className="mt-5 mb-5 md:mt-6 md:mb-6 flex items-center gap-3">
          <motion.div
            className="h-px flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "linear-gradient(to right, rgba(212,167,75,0.6), transparent)",
              transformOrigin: "left",
            }}
          />
          <div
            className="w-2 h-2 rotate-45 flex-shrink-0"
            style={{ background: "rgba(212,167,75,0.7)" }}
          />
        </div>

        {/* ── Featured testimonial card ── */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`review-${active}`}
            custom={dir}
            initial={{ opacity: 0, y: dir > 0 ? 18 : -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: dir > 0 ? -18 : 18 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative mx-auto flex w-full max-w-[1100px] flex-col p-5 md:p-7 rounded-2xl backdrop-blur-[2px]"
            style={{
              background: "linear-gradient(150deg, rgba(212,167,75,0.06) 0%, rgba(18,18,18,0.9) 50%, rgba(10,10,10,1) 100%)",
              border: "1px solid rgba(212,167,75,0.13)",
              boxShadow: "0 18px 46px rgba(0,0,0,0.38), 0 0 0 1px rgba(212,167,75,0.04) inset",
            }}
          >
            {/* Top gold accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(to right, #D4A74B, #FF6B00 40%, transparent)" }}
            />

            {/* Oversized quote mark */}
            <div
              aria-hidden
              className="select-none leading-[0.75] mb-5"
              style={{
                color: "rgba(212,167,75,0.2)",
                fontSize: "clamp(3rem, 6vw, 5.2rem)",
                fontFamily: "Georgia, 'Times New Roman', serif",
              }}
            >
              &ldquo;
            </div>

            {/* Quote body — altura fija para que el card no cambie de tamaño entre reviews */}
            <div style={{ position: "relative", height: "clamp(260px, 45vw, 200px)", overflow: "hidden" }}>
              <blockquote
                style={{
                  color: "rgba(255,255,255,0.84)",
                  fontSize: "clamp(1rem, 1.35vw, 1.22rem)",
                  lineHeight: "1.65",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                {t.content}
              </blockquote>
              {/* Fade para reviews largas */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "48px",
                background: "linear-gradient(to top, rgba(18,18,18,0.95), transparent)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Closing quote */}
            <div
              aria-hidden
              className="select-none leading-[0.75] text-right mb-6"
              style={{
                color: "rgba(212,167,75,0.2)",
                fontSize: "clamp(3rem, 6vw, 5.2rem)",
                fontFamily: "Georgia, 'Times New Roman', serif",
                transform: "translateY(1.2rem)",
              }}
            >
              &rdquo;
            </div>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-white/[0.06]">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-[#0A0A0A] text-sm flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #D4A74B 0%, #FF6B00 100%)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>

              <div className="flex-1">
                <p
                  className="text-white font-bold tracking-wide uppercase text-[0.95rem]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={10} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <span className="text-white/25 text-xs tracking-wider">{t.role}</span>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/8PpTkFCS3UAnWZmVA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 group transition-colors shrink-0 ml-auto"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                <GoogleIcon className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <span className="text-[13px] tracking-[0.22em] uppercase group-hover:text-gold transition-colors font-medium">
                  All Reviews
                </span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Auto-play progress bar */}
            {!isPaused && (
              <motion.div
                key={`pb-${active}`}
                className="absolute bottom-0 left-0 h-[2px]"
                style={{ background: "linear-gradient(to right, #D4A74B, #FF6B00)" }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 7, ease: "linear" }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation: dots + counter ── */}
        <div className="mx-auto mt-4 flex w-full max-w-[1100px] items-center justify-between">
          {/* Prev / Next arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:text-gold"
              style={{
                border: "1px solid rgba(212,167,75,0.3)",
                color: "rgba(255,255,255,0.56)",
                background: "rgba(255,255,255,0.02)",
              }}
              aria-label="Previous review"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:text-gold"
              style={{
                border: "1px solid rgba(212,167,75,0.3)",
                color: "rgba(255,255,255,0.56)",
                background: "rgba(255,255,255,0.02)",
              }}
              aria-label="Next review"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {MAPS_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => select(i)}
                aria-label={`Go to review ${i + 1}`}
                className="transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === active
                    ? "linear-gradient(to right, #D4A74B, #FF6B00)"
                    : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="text-white/20 text-[11px] tracking-[0.3em] uppercase tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(MAPS_TESTIMONIALS.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ── Scrolling name ticker ── */}
      <div className="mt-8 md:mt-10 border-t border-white/[0.04] overflow-hidden">
        <motion.div
          className="flex items-center gap-12 py-3 will-change-transform"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {TICKER_ITEMS.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-4 flex-shrink-0"
              style={{
                color: "rgba(255,255,255,0.22)",
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              <span style={{ color: "rgba(212,167,75,0.55)" }}>★★★★★</span>
              {item.name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
