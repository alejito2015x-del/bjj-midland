"use client";

import GiScrollSection   from "./GiScrollSection";
import NoGiScrollSection from "./NoGiScrollSection";
import MmaScrollSection  from "./MmaScrollSection";
import ChoosePathSection from "./ChoosePathSection";

export default function ScrollSections() {
  return (
    <div style={{ marginTop: "-100vh" }}>
      <ChoosePathSection />
      <GiScrollSection />
      <NoGiScrollSection />
      <MmaScrollSection />
    </div>
  );
}
