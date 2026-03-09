"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, Clock, CheckCircle, ChevronDown,
  ShieldCheck, Zap, Users2, Sun, Sunrise, Moon,
} from "lucide-react";
import { useRegistrationModal } from "@/context/RegistrationModalContext";

const PROGRAMS = [
  { value: "bjj-gi",   label: "BJJ GI — Traditional" },
  { value: "bjj-nogi", label: "BJJ NO-GI — No Kimono" },
  { value: "mma",      label: "MMA / Wrestling" },
  { value: "kids",     label: "Kids & Youth (Ages 4+)" },
  { value: "veteran",  label: "Veterans & Law Enforcement" },
  { value: "private",  label: "Private Lessons" },
];

const DAYS = [
  { short: "MON", full: "Monday" },
  { short: "TUE", full: "Tuesday" },
  { short: "WED", full: "Wednesday" },
  { short: "THU", full: "Thursday" },
  { short: "FRI", full: "Friday" },
  { short: "SAT", full: "Saturday" },
];

const TIME_SLOTS = [
  { value: "morning",   Icon: Sunrise, label: "Morning",   sub: "6am–12pm" },
  { value: "afternoon", Icon: Sun,     label: "Afternoon", sub: "12pm–5pm" },
  { value: "evening",   Icon: Moon,    label: "Evening",   sub: "5pm–9pm"  },
];

const PERKS = [
  { Icon: ShieldCheck, text: "First class 100% free" },
  { Icon: Zap,         text: "No contracts or commitments" },
  { Icon: Users2,      text: "All levels welcome" },
];

type FormData = {
  name: string; email: string; phone: string;
  program: string; preferredDay: string;
  preferredTime: string; notes: string;
};
const EMPTY: FormData = { name:"", email:"", phone:"", program:"", preferredDay:"", preferredTime:"", notes:"" };

/* ── Styles ─────────────────────────────────────── */
const INPUT: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, color: "white",
  fontSize: "0.84rem", outline: "none",
};

export default function RegistrationModal() {
  const { isOpen, closeModal, initialProgram } = useRegistrationModal();
  const [form, setForm]       = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen && initialProgram) setForm(p => ({ ...p, program: initialProgram }));
  }, [isOpen, initialProgram]);

  useEffect(() => {
    if (!isOpen) { const t = setTimeout(() => { setForm(EMPTY); setSubmitted(false); }, 300); return () => clearTimeout(t); }
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    if (isOpen) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, closeModal]);

  const set = (f: keyof FormData) => (v: string) => setForm(p => ({ ...p, [f]: v }));
  const toggleDay = (full: string) => setForm(p => ({
    ...p,
    preferredDay: p.preferredDay === full ? "" : full,
  }));
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[70]"
            style={{ background: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }}
            onClick={closeModal}
          />

          {/* Center wrapper */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              key="modal"
              role="dialog" aria-modal="true"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%", maxWidth: 900,
                maxHeight: "92vh",
                background: "#0C0C0C",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={closeModal}
                aria-label="Close"
                style={{
                  position: "absolute", top: 14, right: 14, zIndex: 40,
                  width: 30, height: 30, borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.5)", transition: "all 0.15s",
                }}
              >
                <X size={14} />
              </button>

              {/* Body */}
              <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

                {/* ── LEFT PANEL ── */}
                <div style={{
                  width: 280, flexShrink: 0,
                  background: "linear-gradient(170deg, #191100 0%, #0A0A0A 60%, #0D0A00 100%)",
                  borderRight: "1px solid rgba(212,167,75,0.1)",
                  padding: "36px 28px",
                  display: "flex", flexDirection: "column", gap: 24,
                  position: "relative", overflow: "hidden",
                }}>
                  {/* Grid */}
                  <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
                    backgroundImage: "linear-gradient(rgba(212,167,75,1) 1px,transparent 1px),linear-gradient(90deg,rgba(212,167,75,1) 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                  }} />
                  {/* Glow */}
                  <div style={{
                    position: "absolute", top: -60, left: -60, width: 180, height: 180,
                    background: "radial-gradient(circle, rgba(212,167,75,0.14) 0%, transparent 70%)",
                    pointerEvents: "none",
                  }} />

                  <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 20, height: "100%" }}>
                    {/* Badge */}
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "5px 10px", borderRadius: 20, width: "fit-content",
                      background: "rgba(212,167,75,0.08)", border: "1px solid rgba(212,167,75,0.2)",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", flexShrink: 0, animation: "pulse 2s infinite" }} />
                      <span style={{ color: "#D4A74B", fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em" }}>SIGN UP TODAY</span>
                    </div>

                    {/* Title */}
                    <div>
                      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.1rem", lineHeight: 0.93, color: "white", margin: 0 }}>
                        BOOK YOUR<br />
                        <span style={{
                          background: "linear-gradient(135deg,#EDD077,#D4A74B)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>FREE CLASS</span>
                      </h2>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.78rem", marginTop: 10, lineHeight: 1.6 }}>
                        No experience needed.<br />No contracts. Just come train.
                      </p>
                    </div>

                    {/* Perks */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {PERKS.map(({ Icon, text }) => (
                        <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: 7, flexShrink: 0,
                            background: "rgba(212,167,75,0.09)", border: "1px solid rgba(212,167,75,0.17)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <Icon style={{ width: 12, height: 12, color: "#D4A74B" }} />
                          </div>
                          <span style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.78rem" }}>{text}</span>
                        </div>
                      ))}
                    </div>

                    {/* Spacer */}
                    <div style={{ flex: 1 }} />

                    {/* Divider */}
                    <div style={{ height: 1, background: "linear-gradient(90deg,rgba(212,167,75,0.2),transparent)" }} />

                    {/* Location */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <MapPin style={{ width: 12, height: 12, color: "rgba(212,167,75,0.5)", marginTop: 2, flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.73rem", lineHeight: 1.55 }}>4612 Billingsley Blvd<br />Midland, TX 79705</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Clock style={{ width: 12, height: 12, color: "rgba(212,167,75,0.5)", flexShrink: 0 }} />
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.73rem" }}>Mon–Fri 6am–9pm · Sat 8am–2pm</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
                  <style>{`.reg-scroll::-webkit-scrollbar{display:none}`}</style>

                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="reg-scroll" style={{ padding: "32px 32px 28px", display: "flex", flexDirection: "column", gap: 22 }}>

                      {/* §1 Personal */}
                      <Section num="01" label="Personal Information">
                        <input type="text" value={form.name} onChange={e => set("name")(e.target.value)}
                          required placeholder="Full Name *" style={INPUT}
                          className="focus:border-gold/50 transition-colors placeholder-white/25" />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                          <input type="email" value={form.email} onChange={e => set("email")(e.target.value)}
                            required placeholder="Email Address *" style={INPUT}
                            className="focus:border-gold/50 transition-colors placeholder-white/25" />
                          <input type="tel" value={form.phone} onChange={e => set("phone")(e.target.value)}
                            required placeholder="Phone Number *" style={INPUT}
                            className="focus:border-gold/50 transition-colors placeholder-white/25" />
                        </div>
                      </Section>

                      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

                      {/* §2 Program */}
                      <Section num="02" label="Program">
                        <div style={{ position: "relative" }}>
                          <select value={form.program} onChange={e => set("program")(e.target.value)} required
                            style={{ ...INPUT, appearance: "none", paddingRight: 36, color: form.program ? "white" : "rgba(255,255,255,0.28)", cursor: "pointer" }}
                            className="focus:border-gold/50 transition-colors"
                          >
                            <option value="" disabled hidden>Which program interests you? *</option>
                            {PROGRAMS.map(p => (
                              <option key={p.value} value={p.value} style={{ background: "#111", color: "white" }}>{p.label}</option>
                            ))}
                          </select>
                          <ChevronDown style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "rgba(255,255,255,0.28)", pointerEvents: "none" }} />
                        </div>
                      </Section>

                      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

                      {/* §3 Availability */}
                      <Section num="03" label="Availability">

                        {/* Days — 6 columns, compact */}
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>
                            Available days <span style={{ color: "#D4A74B" }}>*</span>
                          </p>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 6 }}>
                            {DAYS.map(({ short, full }) => {
                              const on = form.preferredDay === full;
                              return (
                                <button key={full} type="button" onClick={() => toggleDay(full)} style={{
                                  padding: "9px 4px", borderRadius: 8, fontSize: "0.69rem", fontWeight: 700,
                                  letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.14s",
                                  border: on ? "1px solid rgba(212,167,75,0.6)" : "1px solid rgba(255,255,255,0.08)",
                                  background: on ? "rgba(212,167,75,0.12)" : "rgba(255,255,255,0.02)",
                                  color: on ? "#D4A74B" : "rgba(255,255,255,0.35)",
                                  boxShadow: on ? "0 0 12px rgba(212,167,75,0.1)" : "none",
                                }}>
                                  {short}
                                </button>
                              );
                            })}
                          </div>
                          <input type="text" required tabIndex={-1} aria-hidden="true"
                            value={form.preferredDay ? "ok" : ""} onChange={() => {}}
                            style={{ opacity: 0, height: 0, width: 0, position: "absolute" }} />
                        </div>

                        {/* Time — 3 columns, compact */}
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "0.08em", marginBottom: 8, textTransform: "uppercase" }}>
                            Preferred time <span style={{ color: "#D4A74B" }}>*</span>
                          </p>
                          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                            {TIME_SLOTS.map(({ value, Icon, label, sub }) => {
                              const on = form.preferredTime === value;
                              return (
                                <button key={value} type="button" onClick={() => set("preferredTime")(value)} style={{
                                  padding: "14px 8px", borderRadius: 10,
                                  display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                                  cursor: "pointer", transition: "all 0.14s",
                                  border: on ? "1px solid rgba(212,167,75,0.55)" : "1px solid rgba(255,255,255,0.08)",
                                  background: on ? "rgba(212,167,75,0.09)" : "rgba(255,255,255,0.02)",
                                  boxShadow: on ? "0 0 16px rgba(212,167,75,0.1)" : "none",
                                }}>
                                  <Icon style={{ width: 16, height: 16, color: on ? "#D4A74B" : "rgba(255,255,255,0.28)" }} />
                                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: on ? "#D4A74B" : "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>{label}</span>
                                  <span style={{ fontSize: "0.64rem", color: "rgba(255,255,255,0.22)" }}>{sub}</span>
                                </button>
                              );
                            })}
                          </div>
                          <input type="text" required tabIndex={-1} aria-hidden="true"
                            value={form.preferredTime} onChange={() => {}}
                            style={{ opacity: 0, height: 0, width: 0, position: "absolute" }} />
                        </div>

                      </Section>

                      {/* Notes */}
                      <textarea value={form.notes} onChange={e => set("notes")(e.target.value)} rows={2}
                        placeholder="Questions, injuries, student's age... (optional)"
                        style={{ ...INPUT, resize: "none" }}
                        className="focus:border-gold/40 transition-colors placeholder-white/22" />

                      {/* Submit */}
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        <button type="submit" className="btn-predator btn-gold" style={{ width: "100%", padding: "14px 24px", fontSize: "0.82rem", letterSpacing: "0.18em" }}>
                          BOOK MY FREE CLASS
                        </button>
                        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.7rem", textAlign: "center" }}>
                          We'll reach out within 24 hours to confirm your schedule.
                        </p>
                      </div>

                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.93 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "60px 40px", minHeight: 400 }}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.08, type: "spring", stiffness: 220, damping: 18 }}
                        style={{
                          width: 72, height: 72, borderRadius: "50%", marginBottom: 24,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(212,167,75,0.1)", border: "1px solid rgba(212,167,75,0.35)",
                          boxShadow: "0 0 36px rgba(212,167,75,0.18)",
                        }}
                      >
                        <CheckCircle style={{ width: 32, height: 32, color: "#D4A74B" }} />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2.6rem", color: "white", lineHeight: 1, marginBottom: 12 }}>
                          CLASS{" "}
                          <span style={{ background: "linear-gradient(135deg,#EDD077,#D4A74B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            BOOKED!
                          </span>
                        </h3>
                        <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.88rem", marginBottom: 6 }}>
                          See you on the mats, <span style={{ color: "#D4A74B", fontWeight: 600 }}>{form.name.split(" ")[0]}</span>.
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.8rem", maxWidth: 260, margin: "0 auto", lineHeight: 1.6 }}>
                          We'll contact you within 24 hours to confirm your first class.
                        </p>
                        <button onClick={closeModal} className="btn-predator btn-outline-gold"
                          style={{ marginTop: 28, padding: "12px 36px", fontSize: "0.8rem", letterSpacing: "0.15em" }}>
                          CLOSE
                        </button>
                      </motion.div>
                    </motion.div>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({ num, label, children }: { num: string; label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0,
          background: "rgba(212,167,75,0.11)", border: "1px solid rgba(212,167,75,0.24)",
          color: "#D4A74B", fontSize: "0.62rem", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{num}</span>
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}
