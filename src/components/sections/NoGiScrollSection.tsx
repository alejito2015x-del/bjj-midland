"use client";

import ScrollProgramSection from "./ScrollProgramSection";

const noGiFrames = Array.from({ length: 151 }, (_, index) => {
  const frame = String(index + 1).padStart(3, "0");
  return `/images/nogi-scroll-sequence/ezgif-frame-${frame}.jpg`;
});

export default function NoGiScrollSection() {
  return (
    <ScrollProgramSection
      imageFrames={noGiFrames}
      title="BJJ NO-GI"
      subtitle="Speed, pressure and transitions"
      description="Train without the kimono in a faster-paced grappling format. Perfect for athletes who want explosive takedowns, scrambles, and submissions."
      bullets={[
        "Dynamic submission wrestling",
        "High pace rounds and cardio gains",
        "Direct transfer to MMA and self-defense",
      ]}
      ctaText="View NO-GI Schedule"
      ctaHref="/?scheduleFilter=bjj-nogi#schedule"
      align="right"
      instantOverlay
      overlayGradient="linear-gradient(225deg, rgba(0,0,0,0.56) 0%, rgba(0,0,0,0.30) 58%, rgba(0,0,0,0.12) 100%)"
      animKey="nogi"
      roundedTop={false}
      scrollHeightVh={300}
      lockScrollPixels={1300}
      lockUntilComplete
    />
  );
}
