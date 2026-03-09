"use client";

import ScrollProgramSection from "./ScrollProgramSection";

const giFrames = Array.from({ length: 70 }, (_, index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/images/gi-scroll-sequence/ezgif-frame-${frame}.jpg`;
});

export default function GiScrollSection() {
  return (
    <ScrollProgramSection
      sectionId="programs"
      navFocusKey="gi"
      imageFrames={giFrames}
      title="BJJ GI"
      subtitle="Technique, control and precision"
      description="Discover the gentle art. Build patience, strategy, and technical precision with traditional gi training for self-defense and competition."
      bullets={[
        "Fundamentals and advanced techniques",
        "Better physical and mental conditioning",
        "Strong community and discipline",
      ]}
      ctaText="View GI Schedule"
      ctaHref="/?scheduleFilter=bjj-gi#schedule"
      align="left"
      overlayGradient="linear-gradient(135deg, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.30) 58%, rgba(0,0,0,0.12) 100%)"
      animKey="gi"
      roundedTop={true}
      scrollHeightVh={430}
      lockUntilComplete
    />
  );
}
