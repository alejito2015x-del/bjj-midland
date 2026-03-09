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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/hf_20260225_070918_2efae084-34a4-4698-ae6d-edb59749f09a.mp4"
          autoPlay
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background-elevated/70" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_80%_at_50%_0%,rgba(212,167,75,0.08),transparent)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full text-center" style={{ maxWidth: "1280px", marginInline: "auto", paddingTop: "8rem", paddingBottom: "0" }}>

        {/* Headline */}
        <div className="flex flex-col items-center gap-1" style={{ transform: "translateY(55px)" }}>
          <h1 className="text-[clamp(2.5rem,7vw,6rem)] font-normal leading-none tracking-tight text-white" style={{ marginTop: "195px" }}>
            MIDLAND
          </h1>
          <div className="relative w-full flex justify-center" style={{ height: "2em", marginTop: "15px" }}>
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute whitespace-nowrap text-[clamp(1.8rem,4vw,3.8rem)] font-normal tracking-tight"
                style={{
                  color: "#D4A74B",
                  fontFamily: "var(--font-display)",
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

        <div style={{ height: "20px" }} />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7 mt-16"
        >
          <Link
            href="/contact"
            onClick={(e) => { e.preventDefault(); openModal("trial"); }}
          >
            <InteractiveHoverButton
              text="Start Your Journey"
              variant="gold"
              className="text-base tracking-[0.18em]"
              style={{ paddingInline: "2.5rem", paddingBlock: "1.1rem" }}
            />
          </Link>
          <InteractiveHoverButton
            type="button"
            onClick={handleViewScheduleClick}
            text="View Schedule"
            variant="outline"
            icon={<Play className="w-5 h-5" />}
            className="text-base tracking-[0.18em]"
            style={{ paddingInline: "2.5rem", paddingBlock: "1.1rem" }}
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
    </section>
  );
}
