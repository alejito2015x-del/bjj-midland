"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { useRegistrationModal } from "@/context/RegistrationModalContext";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openModal } = useRegistrationModal();

  const titles = useMemo(() => ["BRAZILIAN JIU JITSU", "MIXED MARTIAL ARTS"], []);
  const [titleNumber, setTitleNumber] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearTimeout(timeout);
  }, [titleNumber, titles]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 4) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const handleViewScheduleClick = () => {
    const scheduleSection = document.getElementById("schedule");

    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.location.hash !== "#schedule") {
        window.history.replaceState(null, "", "#schedule");
      }
      return;
    }

    window.location.assign("/#schedule");
  };

  return (
    <section id="hero" style={{ background: "#000", display: "block" }}>

      {/* ── MOBILE LAYOUT (< lg) ── */}
      <div className="lg:hidden" style={{ position: "relative", height: "100svh", overflow: "hidden", background: "#000" }}>

        {/* Video — full screen background */}
        <video
          ref={videoRef}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 70%",
            display: "block",
            transform: "scale(1.65)",
            transformOrigin: "center 70%",
          }}
          autoPlay muted playsInline loop preload="auto"
        >
          <source src="/images/hero-mobile-fullbody-v2.mp4" type="video/mp4" />
        </video>

        {/* Dark base overlay */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />

        {/* Top fade — navbar area */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "15%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)",
        }} />

        {/* Bottom fade — video into text */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "75%",
          background: "linear-gradient(to top, #000 0%, #000 30%, rgba(0,0,0,0.97) 50%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.5) 80%, transparent 100%)",
        }} />

        {/* Text — absolutely at the bottom, fills remaining space */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 24px 44px",
          textAlign: "center",
          zIndex: 2,
        }}>
          <h1
            className="font-normal leading-[0.9] tracking-tight text-white"
            style={{ fontSize: "clamp(3.8rem, 18vw, 5.5rem)" }}
          >
            MIDLAND
          </h1>

          <div className="relative overflow-hidden" style={{ height: "clamp(2.2rem, 9vw, 3rem)", marginTop: "0.5rem" }}>
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute left-0 right-0 font-normal tracking-tight text-center"
                style={{
                  color: "#D4A74B",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.25rem, 6vw, 2rem)",
                  top: 0,
                }}
                initial={{ opacity: 0, y: 40 }}
                transition={{ type: "spring", stiffness: 60, damping: 14 }}
                animate={
                  titleNumber === index
                    ? { y: 0, opacity: 1 }
                    : { y: titleNumber > index ? -40 : 40, opacity: 0 }
                }
              >
                {title}
              </motion.span>
            ))}
          </div>

          <p className="mt-4 text-white/55 text-sm leading-relaxed mx-auto" style={{ maxWidth: "28ch" }}>
            Elite training for all levels — BJJ, No-Gi &amp; MMA in Midland, Texas.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-stretch gap-3 mt-6 mx-auto"
            style={{ maxWidth: "320px" }}
          >
            <Link
              href="/contact"
              onClick={(e) => { e.preventDefault(); openModal("trial"); }}
            >
              <InteractiveHoverButton
                text="Start Your Journey"
                variant="gold"
                className="w-full text-[0.82rem] tracking-[0.16em]"
                style={{ paddingInline: "1.5rem", paddingBlock: "1rem" }}
              />
            </Link>
            <InteractiveHoverButton
              type="button"
              onClick={handleViewScheduleClick}
              text="View Schedule"
              variant="outline"
              icon={<Play className="w-4 h-4" />}
              className="w-full text-[0.82rem] tracking-[0.16em]"
              style={{ paddingInline: "1.5rem", paddingBlock: "1rem" }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT (lg+) ── */}
      <div className="hidden lg:block relative min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
          >
            <source src="/images/hf_20260225_070918_2efae084-34a4-4698-ae6d-edb59749f09a.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background-elevated/70" />
          <div className="absolute inset-0 bg-[radial-gradient(35%_80%_at_50%_0%,rgba(212,167,75,0.08),transparent)]" />
        </div>

        {/* Desktop Content */}
        <div
          className="relative z-10 flex flex-col items-center gap-8 w-full text-center px-6 pb-0"
          style={{
            maxWidth: "1280px",
            marginInline: "auto",
            paddingTop: "clamp(5.5rem, 16vw, 8rem)",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <h1
              className="font-normal leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(4rem, 17vw, 6rem)" }}
            >
              MIDLAND
            </h1>
            <div
              className="relative w-full flex justify-center"
              style={{ height: "clamp(3rem, 12vw, 4.5rem)", marginTop: "0.15rem" }}
            >
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute text-center whitespace-nowrap font-normal tracking-tight"
                  style={{
                    color: "#D4A74B",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 7.5vw, 3.8rem)",
                    top: "1.2rem",
                  }}
                  initial={{ opacity: 0, y: 60 }}
                  transition={{ type: "spring", stiffness: 60, damping: 14 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? -60 : 60, opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-row items-center justify-center gap-7 mt-16"
          >
            <Link
              href="/contact"
              onClick={(e) => { e.preventDefault(); openModal("trial"); }}
            >
              <InteractiveHoverButton
                text="Start Your Journey"
                variant="gold"
                className="text-base tracking-[0.18em]"
                style={{ paddingInline: "1.5rem", paddingBlock: "1rem" }}
              />
            </Link>
            <InteractiveHoverButton
              type="button"
              onClick={handleViewScheduleClick}
              text="View Schedule"
              variant="outline"
              icon={<Play className="w-4 h-4" />}
              className="text-base tracking-[0.18em]"
              style={{ paddingInline: "1.5rem", paddingBlock: "1rem" }}
            />
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-elevated to-transparent" />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-2"
          >
            <div className="w-1 h-1 rounded-full bg-gold/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
