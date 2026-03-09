"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROGRAMS, SCHEDULE } from "@/lib/constants";
import { Clock, ChevronDown, ChevronUp, Flame } from "lucide-react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

/* ─── type config ─── */
const TYPE_STYLES: Record<string, { pill: string; glow: string; dot: string; label: string }> = {
  "bjj-gi": {
    pill: "bg-gradient-to-r from-pink-400/90 to-rose-300/90 text-black border-pink-300/50",
    glow: "shadow-[0_0_12px_rgba(244,114,182,0.4)]",
    dot: "bg-pink-400",
    label: "GI",
  },
  "bjj-nogi": {
    pill: "bg-gradient-to-r from-lime-400/90 to-emerald-300/90 text-black border-lime-300/50",
    glow: "shadow-[0_0_12px_rgba(163,230,53,0.4)]",
    dot: "bg-lime-400",
    label: "NO-GI",
  },
  mma: {
    pill: "bg-gradient-to-r from-cyan-400/90 to-sky-300/90 text-black border-cyan-300/50",
    glow: "shadow-[0_0_12px_rgba(34,211,238,0.4)]",
    dot: "bg-cyan-400",
    label: "MMA",
  },
  kids: {
    pill: "bg-gradient-to-r from-amber-300/95 to-yellow-200/95 text-black border-amber-200/50",
    glow: "shadow-[0_0_12px_rgba(251,191,36,0.4)]",
    dot: "bg-amber-400",
    label: "KIDS",
  },
};

const SPECIAL_OVERRIDES: Record<string, string> = {
  "open mat": "bg-gradient-to-r from-violet-400/90 to-purple-300/90 text-black border-violet-300/50",
  combatives: "bg-gradient-to-r from-sky-400/90 to-blue-300/90 text-black border-sky-300/50",
  thunderdome: "bg-gradient-to-r from-fuchsia-400/90 to-purple-300/90 text-black border-fuchsia-300/50",
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayAbbr: Record<string, string> = {
  Sunday: "SUN", Monday: "MON", Tuesday: "TUE", Wednesday: "WED",
  Thursday: "THU", Friday: "FRI", Saturday: "SAT",
};

const timeSlots = [
  "6:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM", "5:40 PM", "6:30 PM", "8:30 PM",
];

const FILTER_OPTIONS = [
  { id: "all", label: "ALL", color: "from-gold via-gold-light to-gold" },
  { id: "bjj-gi", label: "GI", color: "from-pink-400 to-rose-400" },
  { id: "bjj-nogi", label: "NO-GI", color: "from-lime-400 to-emerald-400" },
  { id: "mma", label: "MMA", color: "from-cyan-400 to-sky-400" },
  { id: "kids", label: "KIDS", color: "from-amber-400 to-yellow-400" },
];

const FILTER_ALIAS: Record<string, string> = {
  all: "all",
  gi: "bjj-gi",
  "bjj-gi": "bjj-gi",
  nogi: "bjj-nogi",
  "no-gi": "bjj-nogi",
  "bjj-nogi": "bjj-nogi",
  mma: "mma",
  kids: "kids",
};

/* ─── helpers ─── */
function getPillClasses(className: string, type: string) {
  const normalized = className.toLowerCase();
  for (const [key, cls] of Object.entries(SPECIAL_OVERRIDES)) {
    if (normalized.includes(key)) return cls;
  }
  return TYPE_STYLES[type]?.pill ?? "bg-white/80 border-white/50 text-black";
}

function getGlowClass(className: string, type: string) {
  const normalized = className.toLowerCase();
  if (normalized.includes("open mat") || normalized.includes("thunderdome"))
    return "shadow-[0_0_12px_rgba(167,139,250,0.4)]";
  if (normalized.includes("combatives"))
    return "shadow-[0_0_12px_rgba(56,189,248,0.4)]";
  return TYPE_STYLES[type]?.glow ?? "";
}

/* ─── component ─── */
export default function SchedulePoster() {
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const todayName = days[new Date().getDay()];

  useEffect(() => {
    const rawFilter = (searchParams.get("scheduleFilter") ?? searchParams.get("filter") ?? "").trim().toLowerCase();
    if (!rawFilter) {
      setActiveFilter("all");
      setExpandedDay(null);
      return;
    }

    const mappedFilter = FILTER_ALIAS[rawFilter];
    if (!mappedFilter) return;

    setActiveFilter(mappedFilter);
    setExpandedDay(null);
  }, [searchParams]);

  const filteredSchedule = useMemo(() => {
    if (activeFilter === "all") return SCHEDULE;
    return SCHEDULE.filter((s) => s.type === activeFilter);
  }, [activeFilter]);

  const filteredTimeSlots = useMemo(() => {
    return timeSlots.filter((time) =>
      filteredSchedule.some((s) => s.time === time)
    );
  }, [filteredSchedule]);

  return (
    <section
      id="schedule"
      className="relative w-full bg-background-elevated scroll-mt-24 md:scroll-mt-28"
      style={{ paddingTop: "0.5rem", paddingBottom: "0" }}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 diagonal-lines opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(212,167,75,0.06), transparent 50%), radial-gradient(ellipse at bottom right, rgba(0,212,255,0.04), transparent 50%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* ════════════════════════════════════════════
          HEADER — centrado con max-width
          ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative text-center"
        style={{ marginBottom: "0.45rem" }}
      >
        <div className="flex items-center justify-center gap-2" style={{ marginBottom: "0.7rem" }}>
          <span className="block h-px bg-gold/60" style={{ width: "2rem" }} />
          <span
            className="text-gold uppercase"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.66rem", letterSpacing: "0.32em" }}
          >
            Weekly Training
          </span>
          <span className="block h-px bg-gold/60" style={{ width: "2rem" }} />
        </div>

        <h2
          className="section-title-standard text-center"
          style={{
            margin: "0 auto",
            fontSize: "clamp(2.15rem, 4.5vw, 3.45rem)",
            letterSpacing: "0.13em",
            lineHeight: 0.92,
          }}
        >
          Class <span className="text-white">Schedule</span>
        </h2>

        <p
          className="text-text-secondary"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.9rem, 1.2vw, 1.03rem)",
            lineHeight: 1.45,
            marginTop: "0.55rem",
            maxWidth: "28rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Train every day. Build your legacy on the mat.
        </p>
      </motion.div>

      {/* ════════════════════════════════════════════
          FILTER TABS — grandes y claros
          ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex justify-center"
        style={{ marginBottom: "0.95rem" }}
      >
        <div
          className="inline-flex items-center rounded-2xl bg-black/60 border border-white/10 backdrop-blur-sm"
          style={{ padding: "0.26rem", gap: "0.26rem" }}
        >
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setActiveFilter(opt.id)}
              className={clsx(
                "relative rounded-xl transition-all duration-300 cursor-pointer",
                activeFilter === opt.id
                  ? "text-black"
                  : "text-white/50 hover:text-white hover:bg-white/[0.06]"
              )}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                padding: "0.56rem 1.02rem",
              }}
            >
              {activeFilter === opt.id && (
                <motion.div
                  layoutId="activeFilter"
                  className={clsx("absolute inset-0 rounded-xl bg-gradient-to-r", opt.color)}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{opt.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
          MOBILE VIEW
          ════════════════════════════════════════════ */}
      <div
        className="relative lg:hidden"
        style={{ maxWidth: "30rem", marginLeft: "auto", marginRight: "auto", padding: "0 1rem" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {days.map((day, dayIdx) => {
            const dayClasses = filteredSchedule.filter((s) => s.day === day);
            if (dayClasses.length === 0) return null;

            const isToday = day === todayName;
            const isExpanded = expandedDay === day || (expandedDay === null && isToday);

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: dayIdx * 0.05 }}
              >
                <div
                  className={clsx(
                    "rounded-2xl border overflow-hidden transition-all duration-300",
                    isToday
                      ? "border-gold/40 bg-gradient-to-br from-gold/[0.06] to-transparent"
                      : "border-white/[0.06] bg-black/40"
                  )}
                >
                  <button
                    onClick={() => setExpandedDay(isExpanded ? "__none__" : day)}
                    className="w-full flex items-center justify-between text-left group"
                    style={{ padding: "1rem 1.25rem" }}
                  >
                    <div className="flex items-center gap-3">
                      {isToday && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gold/20 border border-gold/30">
                          <Flame size={10} className="text-gold" />
                          <span
                            className="text-gold uppercase"
                            style={{ fontFamily: "var(--font-display)", fontSize: "0.625rem", letterSpacing: "0.15em" }}
                          >
                            Today
                          </span>
                        </span>
                      )}
                      <h3
                        className={clsx(
                          "uppercase transition-colors",
                          isToday ? "text-gold" : "text-white group-hover:text-white/90"
                        )}
                        style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", letterSpacing: "0.08em" }}
                      >
                        {day}
                      </h3>
                      <span className="text-white/25 text-xs tracking-wider">
                        {dayClasses.length} {dayClasses.length === 1 ? "class" : "classes"}
                      </span>
                    </div>
                    <div className="text-white/30 group-hover:text-white/50 transition-colors">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div style={{ padding: "0 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                          {dayClasses.map((classItem, index) => (
                            <motion.div
                              key={`${day}-${classItem.time}-${index}`}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.04, duration: 0.3 }}
                              className="flex items-center gap-3 border-t border-white/[0.04] first:border-t-0"
                              style={{ paddingTop: "0.625rem" }}
                            >
                              <div className="flex items-center gap-1.5" style={{ minWidth: "5rem" }}>
                                <Clock size={11} className="text-white/25" />
                                <span
                                  className="text-white/50 tracking-wider"
                                  style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem" }}
                                >
                                  {classItem.time}
                                </span>
                              </div>
                              <span
                                className={clsx(
                                  "inline-flex items-center rounded-lg border font-bold uppercase",
                                  "transition-shadow duration-300 hover:scale-[1.03]",
                                  getPillClasses(classItem.class, classItem.type)
                                )}
                                style={{ padding: "0.375rem 0.75rem", fontSize: "0.6875rem", letterSpacing: "0.08em" }}
                              >
                                {classItem.class}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          DESKTOP VIEW — tabla + panel lateral derecho
          ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="hidden lg:block relative"
        style={{ padding: "0 1rem" }}
      >
        <div
          style={{ maxWidth: "1460px", marginLeft: "auto", marginRight: "auto", display: "flex", gap: "1rem", alignItems: "stretch" }}
        >
          {/* ── Schedule table ── */}
          <div
            className="relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-sm"
            style={{ flex: "1 1 0%", overflow: "hidden", minWidth: 0 }}
          >
            {/* top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/50 to-transparent z-10" />

            {/* inner glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(212,167,75,0.04), transparent 40%), radial-gradient(ellipse at 80% 100%, rgba(0,212,255,0.03), transparent 40%)" }} />

            <table className="relative w-full" style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "78px" }} />
                {days.map((d) => <col key={d} />)}
              </colgroup>

              {/* ── Header row ── */}
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th style={{ padding: "0.85rem 0.35rem" }}>
                    <Clock size={14} className="text-white/20 mx-auto" />
                  </th>
                  {days.map((day) => {
                    const isToday = day === todayName;
                    return (
                      <th
                        key={day}
                        className={clsx(
                          "text-center relative font-normal transition-colors",
                          isToday && "bg-gold/[0.05]"
                        )}
                        style={{ padding: "0.85rem 0.2rem" }}
                      >
                        <div
                          className={clsx("uppercase", isToday ? "text-gold" : "text-white/80")}
                          style={{ fontFamily: "var(--font-display)", fontSize: "0.98rem", letterSpacing: "0.12em" }}
                        >
                          {dayAbbr[day]}
                        </div>
                        <div
                          className={clsx(isToday ? "text-gold/60" : "text-white/25")}
                          style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", letterSpacing: "0.08em", marginTop: "0.18rem" }}
                        >
                          {day}
                        </div>
                        {isToday && (
                          <motion.div
                            layoutId="todayIndicator"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-gold"
                            style={{ width: "2rem", height: "2px" }}
                          />
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              {/* ── Time rows ── */}
              <tbody>
                {filteredTimeSlots.map((time, rowIdx) => (
                  <tr
                    key={`row-${time}`}
                    className={clsx(
                      rowIdx < filteredTimeSlots.length - 1 && "border-b border-white/[0.04]"
                    )}
                  >
                    <td
                      className="text-center border-r border-white/[0.04]"
                      style={{ padding: "0.7rem 0.35rem" }}
                    >
                      <span
                        className="text-white/40 tabular-nums"
                        style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", letterSpacing: "0.04em" }}
                      >
                        {time}
                      </span>
                    </td>

                    {days.map((day) => {
                      const isToday = day === todayName;
                      const classItems = filteredSchedule.filter(
                        (s) => s.day === day && s.time === time
                      );

                      return (
                        <td
                          key={`${day}-${time}`}
                          className={clsx(
                            "text-center align-middle",
                            "border-r border-white/[0.04] last:border-r-0",
                            isToday && "bg-gold/[0.03]"
                          )}
                          style={{ padding: "0.45rem 0.2rem", height: "54px" }}
                        >
                          <div className="flex flex-col items-center justify-center gap-1">
                            {classItems.map((classItem, index) => (
                              <motion.span
                                key={`${day}-${time}-${index}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: rowIdx * 0.03 + index * 0.02 }}
                                whileHover={{ scale: 1.08, y: -1 }}
                                className={clsx(
                                  "inline-flex items-center rounded-lg border font-bold uppercase whitespace-nowrap",
                                  "cursor-default transition-shadow duration-300",
                                  getPillClasses(classItem.class, classItem.type),
                                  "hover:" + getGlowClass(classItem.class, classItem.type)
                                )}
                                style={{ padding: "0.26rem 0.45rem", fontSize: "0.6rem", letterSpacing: "0.05em" }}
                              >
                                {classItem.class}
                              </motion.span>
                            ))}
                            {classItems.length === 0 && (
                              <span className="block rounded-full bg-white/[0.06]" style={{ width: "4px", height: "4px" }} />
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Side panel: Programs legend ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-sm"
            style={{ width: "184px", flexShrink: 0, padding: "1rem 0.9rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          >
            {/* Programs section */}
            <div>
              <div
                className="text-white/40 uppercase"
                style={{ fontFamily: "var(--font-display)", fontSize: "0.72rem", letterSpacing: "0.18em", marginBottom: "1rem" }}
              >
                Programs
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {PROGRAMS.map((program) => {
                  const s = TYPE_STYLES[program.id];
                  if (!s) return null;
                  return (
                    <button
                      key={program.id}
                      onClick={() =>
                        setActiveFilter(activeFilter === program.id ? "all" : program.id)
                      }
                      className={clsx(
                        "flex items-center gap-3 rounded-xl border transition-all duration-300 cursor-pointer group",
                        activeFilter === program.id
                          ? "border-white/20 bg-white/[0.08]"
                          : "border-transparent hover:border-white/10 hover:bg-white/[0.04]"
                      )}
                      style={{ padding: "0.62rem 0.7rem", gap: "0.5rem" }}
                    >
                      <span
                        className={clsx("rounded-full shrink-0", s.dot)}
                        style={{ width: "10px", height: "10px" }}
                      />
                      <span
                        className={clsx(
                          "uppercase transition-colors",
                          activeFilter === program.id ? "text-white" : "text-white/50 group-hover:text-white/80"
                        )}
                        style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", letterSpacing: "0.1em" }}
                      >
                        {program.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="bg-white/[0.06]" style={{ height: "1px", margin: "1rem 0" }} />

            {/* Special classes section */}
            <div>
              <div
                className="text-white/30 uppercase"
                style={{ fontFamily: "var(--font-display)", fontSize: "0.62rem", letterSpacing: "0.18em", marginBottom: "0.75rem" }}
              >
                Special
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {[
                  { label: "Open Mat", color: "bg-violet-400" },
                  { label: "Combatives", color: "bg-sky-400" },
                  { label: "Thunderdome", color: "bg-fuchsia-400" },
                ].map((special) => (
                  <div key={special.label} className="flex items-center gap-3">
                    <span className={clsx("rounded-full shrink-0", special.color)} style={{ width: "8px", height: "8px" }} />
                    <span
                      className="text-white/45 uppercase"
                      style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", letterSpacing: "0.05em" }}
                    >
                      {special.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ════════════════════════════════════════════
          MOBILE LEGEND (solo visible en mobile)
          ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative lg:hidden flex flex-wrap items-center justify-center"
        style={{ marginTop: "2rem", gap: "1rem 1.5rem", padding: "0 1rem" }}
      >
        {PROGRAMS.map((program) => {
          const style = TYPE_STYLES[program.id];
          if (!style) return null;
          return (
            <button
              key={program.id}
              onClick={() =>
                setActiveFilter(activeFilter === program.id ? "all" : program.id)
              }
              className={clsx(
                "flex items-center gap-2.5 rounded-lg border transition-all duration-300 group cursor-pointer",
                activeFilter === program.id
                  ? "border-white/20 bg-white/[0.06]"
                  : "border-transparent hover:border-white/10 hover:bg-white/[0.03]"
              )}
              style={{ padding: "0.5rem 0.875rem" }}
            >
              <span
                className={clsx("rounded-full", style.dot)}
                style={{ width: "8px", height: "8px" }}
              />
              <span
                className={clsx(
                  "uppercase transition-colors",
                  activeFilter === program.id ? "text-white" : "text-white/40 group-hover:text-white/60"
                )}
                style={{ fontFamily: "var(--font-display)", fontSize: "0.85rem", letterSpacing: "0.12em" }}
              >
                {program.shortName}
              </span>
            </button>
          );
        })}
      </motion.div>

      <div aria-hidden="true" className="h-0" />
    </section>
  );
}
