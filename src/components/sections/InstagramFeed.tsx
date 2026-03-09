"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram, X } from "lucide-react";
import { createPortal } from "react-dom";

// ─── Posts de @midlandbjj ─────────────────────────────────────────────────────
const POSTS = [
  { id: 1,  shortcode: "DVT12oVDqEa", url: "https://www.instagram.com/p/DVT12oVDqEa/" },
  { id: 2,  shortcode: "DU3XYcAju38", url: "https://www.instagram.com/p/DU3XYcAju38/" },
  { id: 3,  shortcode: "DT-ucrSDgCh", url: "https://www.instagram.com/p/DT-ucrSDgCh/" },
  { id: 4,  shortcode: "DTft71sEQAq", url: "https://www.instagram.com/p/DTft71sEQAq/" },
  { id: 5,  shortcode: "DRfJGB9ESRK", url: "https://www.instagram.com/p/DRfJGB9ESRK/" },
  { id: 6,  shortcode: "DT0hFsgDiA2", url: "https://www.instagram.com/p/DT0hFsgDiA2/" },
  { id: 7,  shortcode: "DTAxqCbjHbM", url: "https://www.instagram.com/p/DTAxqCbjHbM/" },
  { id: 8,  shortcode: "DSLWjRUgScd", url: "https://www.instagram.com/p/DSLWjRUgScd/" },
  { id: 9,  shortcode: "DRyg_mVAH2J", url: "https://www.instagram.com/p/DRyg_mVAH2J/" },
];

const IG_HEADER_OFFSET = 54;

// Dimensiones responsivas de la card
function useCardSize() {
  const [size, setSize] = useState({ w: 380, h: 460 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        const w = Math.round(vw * 0.80);
        setSize({ w, h: Math.round(w * 1.18) });
      } else if (vw < 768) {
        setSize({ w: 300, h: 360 });
      } else {
        setSize({ w: 380, h: 460 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function PostModal({
  shortcode, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
  shortcode: string; onClose: () => void;
  onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const content = (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: isMobile ? "0" : "clamp(14px, 2.5vw, 28px)",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          style={{
            position: "fixed",
            top: isMobile ? "12px" : "20px",
            right: isMobile ? "12px" : "20px",
            zIndex: 10001,
            width: "44px", height: "44px", borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>

        {isMobile ? (
          // ── Mobile: full-screen embed + flechas abajo ──
          <motion.div
            key={shortcode}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100vw", height: "100dvh",
              display: "flex", flexDirection: "column",
              background: "#fff",
            }}
          >
            <iframe
              src={`https://www.instagram.com/p/${shortcode}/embed/`}
              frameBorder="0"
              scrolling="yes"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
              title={`Post ${shortcode}`}
              style={{ flex: 1, width: "100%", border: "none", display: "block" }}
            />
            {/* Prev / Next en la parte inferior */}
            <div
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px 20px",
                background: "#0A0A0A",
                borderTop: "1px solid rgba(212,167,75,0.2)",
              }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                disabled={!hasPrev}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: hasPrev ? "rgba(212,167,75,0.15)" : "transparent",
                  border: `1px solid ${hasPrev ? "rgba(212,167,75,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: hasPrev ? "#D4A74B" : "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", letterSpacing: "0.1em" }}>
                {POSTS.findIndex(p => p.shortcode === shortcode) + 1} / {POSTS.length}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                disabled={!hasNext}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: hasNext ? "rgba(212,167,75,0.15)" : "transparent",
                  border: `1px solid ${hasNext ? "rgba(212,167,75,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: hasNext ? "#D4A74B" : "rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          // ── Desktop: flecha / embed / flecha ──
          <div style={{
            width: "min(1320px, 100%)",
            display: "grid",
            gridTemplateColumns: "clamp(48px, 8vw, 92px) minmax(0,1fr) clamp(48px, 8vw, 92px)",
            alignItems: "center",
            gap: "clamp(8px, 1.8vw, 24px)",
          }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {hasPrev ? (
                <button onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Anterior"
                  style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                ><ChevronLeft size={22} /></button>
              ) : <div style={{ width: "48px", height: "48px" }} />}
            </div>

            <motion.div
              key={shortcode}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                justifySelf: "center", borderRadius: "16px",
                overflow: "hidden", background: "#fff",
                width: "min(520px, calc(100vw - clamp(120px, 20vw, 220px)))",
                maxHeight: "90vh", overflowY: "auto",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              }}
            >
              <iframe
                src={`https://www.instagram.com/p/${shortcode}/embed/`}
                width="520" height="840" frameBorder="0" scrolling="yes"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
                title={`Post ${shortcode}`}
                style={{ display: "block", border: "none", width: "100%", height: "840px" }}
              />
            </motion.div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {hasNext ? (
                <button onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Siguiente"
                  style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                ><ChevronRight size={22} /></button>
              ) : <div style={{ width: "48px", height: "48px" }} />}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return typeof window !== "undefined" ? createPortal(content, document.body) : null;
}

// ── Tarjeta ───────────────────────────────────────────────────────────────────
function PhotoCard({ shortcode, index, onOpen, cardW, cardH, isMobile }: {
  shortcode: string; index: number; onOpen: () => void;
  cardW: number; cardH: number; isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || isMobile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.06, 0.3), duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 relative cursor-pointer"
      onClick={onOpen}
      style={{
        width: `${cardW}px`, height: `${cardH}px`,
        borderRadius: "14px", overflow: "hidden",
        background: "#141414",
        border: active ? "1px solid rgba(212,167,75,0.4)" : "1px solid rgba(212,167,75,0.14)",
        boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.6)" : "0 4px 20px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
        transform: hovered ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
      }}
    >
      {/* Embed clipeado */}
      <iframe
        src={`https://www.instagram.com/p/${shortcode}/embed/`}
        frameBorder="0" scrolling="no"
        title={`Post ${shortcode}`}
        style={{
          position: "absolute",
          top: `-${IG_HEADER_OFFSET}px`, left: "0",
          width: `${cardW}px`,
          height: `${cardH + IG_HEADER_OFFSET + 120}px`,
          border: "none", pointerEvents: "none", display: "block",
        }}
      />

      {/* Máscara inferior */}
      <div aria-hidden style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "64px",
        background: "linear-gradient(to top, #141414 40%, transparent 100%)",
        zIndex: 5, pointerEvents: "none",
      }} />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        background: active
          ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 100%)"
          : "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 100%)",
        transition: "background 0.3s ease",
      }} />

      {/* Watermark */}
      <div style={{
        position: "absolute", top: "10px", right: "10px", zIndex: 20,
        display: "flex", alignItems: "center", gap: "4px",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
        borderRadius: "5px", padding: "4px 8px",
        opacity: active ? 1 : 0.65,
        transition: "opacity 0.25s ease",
      }}>
        <Instagram size={10} color="#D4A74B" />
        <span style={{
          fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
          color: "#fff", fontFamily: "var(--font-display)",
        }}>@MIDLANDBJJ</span>
      </div>

      {/* View Post — siempre visible en mobile, solo en hover en desktop */}
      <div style={{
        position: "absolute", bottom: "12px", left: "50%",
        transform: active ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(8px)",
        zIndex: 20,
        background: "rgba(212,167,75,0.95)", borderRadius: "4px",
        padding: isMobile ? "7px 16px" : "6px 14px",
        opacity: active ? 1 : 0,
        transition: "opacity 0.25s ease, transform 0.25s ease",
        whiteSpace: "nowrap",
      }}>
        <span style={{
          fontSize: isMobile ? "11px" : "10px",
          fontWeight: 700, letterSpacing: "0.12em",
          color: "#0A0A0A", fontFamily: "var(--font-display)",
          textTransform: "uppercase",
        }}>View Post</span>
      </div>
    </motion.div>
  );
}

// ── Sección principal ─────────────────────────────────────────────────────────
export default function InstagramFeed() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { w: cardW, h: cardH } = useCardSize();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: -1 | 1) => {
    const step = isMobile ? cardW + 12 : (cardW + 14) * 2;
    trackRef.current?.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const closeModal = useCallback(() => setActiveIndex(null), []);
  const prevPost = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPost = useCallback(() => setActiveIndex((i) => (i !== null && i < POSTS.length - 1 ? i + 1 : i)), []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    updateArrows();
    return () => el.removeEventListener("scroll", updateArrows);
  }, []);

  return (
    <>
      {activeIndex !== null && (
        <PostModal
          shortcode={POSTS[activeIndex].shortcode}
          onClose={closeModal} onPrev={prevPost} onNext={nextPost}
          hasPrev={activeIndex > 0} hasNext={activeIndex < POSTS.length - 1}
        />
      )}

      <section
        id="instagram"
        className="relative overflow-hidden"
        style={{
          background: "#0A0A0A",
          marginTop: "0px",
          paddingTop: isMobile ? "12px" : "clamp(16px, 2vw, 24px)",
          paddingBottom: isMobile ? "8px" : "clamp(10px, 1.2vw, 16px)",
        }}
      >
        {/* Textura */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(-45deg, transparent 0px, transparent 18px, rgba(212,167,75,0.018) 18px, rgba(212,167,75,0.018) 19px)",
        }} />
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,167,75,0.05) 0%, transparent 70%)",
        }} />

        {/* ── Header ── */}
        <div
          className="relative text-center"
          style={{ paddingLeft: "16px", paddingRight: "16px", marginBottom: isMobile ? "16px" : "26px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div style={{ height: "1px", width: "32px", background: "rgba(212,167,75,0.4)" }} />
            <div className="inline-flex items-center gap-2">
              <Instagram size={12} style={{ color: "#D4A74B" }} />
              <span className="tracking-[0.28em] uppercase font-semibold"
                style={{ color: "#D4A74B", fontSize: "11px" }}>@midlandbjj</span>
            </div>
            <div style={{ height: "1px", width: "32px", background: "rgba(212,167,75,0.4)" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.08, duration: 0.5 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(1.8rem, 8vw, 2.4rem)" : "clamp(2rem, 4.5vw, 3.2rem)",
              color: "#D4A74B", letterSpacing: "0.01em", marginBottom: "6px",
            }}
          >
            Follow us on Instagram
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.5 }}
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: isMobile ? "0.875rem" : "1rem",
              lineHeight: "1.7", maxWidth: "520px",
              margin: "0 auto", textAlign: "center",
            }}
          >
            Train smarter. Stay connected. Discover what&apos;s next in BJJ &amp; MMA.
          </motion.p>
        </div>

        {/* ── Carousel ── */}
        <div className="relative w-full">
          {/* Flechas — ocultas en mobile */}
          {!isMobile && (
            <>
              <button onClick={() => scroll(-1)} aria-label="Scroll left"
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(10,10,10,0.92)", border: "1px solid rgba(212,167,75,0.35)",
                  color: "#D4A74B", opacity: canLeft ? 1 : 0,
                  pointerEvents: canLeft ? "auto" : "none",
                  boxShadow: "0 0 24px rgba(212,167,75,0.2)",
                  transition: "opacity 0.2s",
                }}
              ><ChevronLeft size={18} /></button>

              <button onClick={() => scroll(1)} aria-label="Scroll right"
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(10,10,10,0.92)", border: "1px solid rgba(212,167,75,0.35)",
                  color: "#D4A74B", opacity: canRight ? 1 : 0,
                  pointerEvents: canRight ? "auto" : "none",
                  boxShadow: "0 0 24px rgba(212,167,75,0.2)",
                  transition: "opacity 0.2s",
                }}
              ><ChevronRight size={18} /></button>
            </>
          )}

          {/* Fades laterales */}
          <div aria-hidden className="absolute inset-y-0 left-0 w-3 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
          <div aria-hidden className="absolute inset-y-0 right-0 w-3 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />

          {/* Track */}
          <div
            ref={trackRef}
            className="flex overflow-x-auto"
            style={{
              scrollbarWidth: "none", msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              gap: isMobile ? "12px" : "14px",
              paddingTop: "8px", paddingBottom: "24px",
              paddingLeft: isMobile ? "16px" : "0px",
              paddingRight: isMobile ? "16px" : "0px",
              // Snap en mobile para deslizar de a una card
              scrollSnapType: isMobile ? "x mandatory" : "none",
            }}
          >
            {POSTS.map((post, i) => (
              <div key={post.id} style={{ scrollSnapAlign: isMobile ? "start" : "none", flexShrink: 0 }}>
                <PhotoCard
                  shortcode={post.shortcode} index={i}
                  onOpen={() => setActiveIndex(i)}
                  cardW={cardW} cardH={cardH} isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {/* Indicador de scroll en mobile */}
          {isMobile && (
            <div className="flex justify-center gap-1.5 mt-1">
              {POSTS.map((_, i) => (
                <div key={i} style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "rgba(212,167,75,0.35)",
                }} />
              ))}
            </div>
          )}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.25, duration: 0.5 }}
          className="flex justify-center px-6"
          style={{ marginTop: isMobile ? "18px" : "26px" }}
        >
          <a
            href="https://www.instagram.com/midlandbjj/"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full font-bold uppercase transition-all duration-300 active:scale-95 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #D4A74B 0%, #FF6B00 100%)",
              color: "#0A0A0A", fontFamily: "var(--font-display)",
              boxShadow: "0 0 32px rgba(212,167,75,0.3)",
              letterSpacing: "0.18em",
              padding: isMobile ? "12px 24px" : "14px 32px",
              fontSize: isMobile ? "13px" : "14px",
            }}
          >
            <Instagram size={isMobile ? 14 : 16} />
            Follow @midlandbjj
          </a>
        </motion.div>
      </section>
    </>
  );
}
