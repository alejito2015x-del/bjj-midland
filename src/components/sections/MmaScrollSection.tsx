"use client";

import ScrollProgramSection from "./ScrollProgramSection";

const mmaFrames = Array.from({ length: 151 }, (_, index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/images/mma-scroll-sequence/ezgif-frame-${frame}.jpg`;
});

export default function MmaScrollSection() {
  return (
    <ScrollProgramSection
      imageFrames={mmaFrames}
      title="MMA/WRESTLING"
      subtitle="Complete combat development"
      description="Combine striking, wrestling, and submissions in one integrated system. Develop timing, pressure, and fight IQ for real competitive performance."
      bullets={[
        "Striking, takedowns, and ground control",
        "Scenario-based fight preparation",
        "Coaching for amateur and advanced levels",
      ]}
      ctaText="View MMA Schedule"
      ctaHref="/?scheduleFilter=mma#schedule"
      align="left"
      overlayGradient="linear-gradient(135deg, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.30) 58%, rgba(0,0,0,0.12) 100%)"
      animKey="mma"
      roundedTop={true}
      scrollHeightVh={430}
      lockUntilComplete
    />
  );
}
