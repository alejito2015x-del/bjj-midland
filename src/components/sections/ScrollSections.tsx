"use client";

import GiScrollSection   from "./GiScrollSection";
import NoGiScrollSection from "./NoGiScrollSection";
import MmaScrollSection  from "./MmaScrollSection";

export default function ScrollSections() {
  return (
    <div style={{ marginTop: "-100vh" }}>
      <GiScrollSection />
      <NoGiScrollSection />
      <MmaScrollSection />
    </div>
  );
}
