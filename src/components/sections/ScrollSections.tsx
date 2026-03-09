"use client";

import GiScrollSection   from "./GiScrollSection";
import NoGiScrollSection from "./NoGiScrollSection";
import MmaScrollSection  from "./MmaScrollSection";
import ChoosePathSection from "./ChoosePathSection";

export default function ScrollSections() {
  return (
    <div className="-mt-[90svh] sm:-mt-[95svh] lg:-mt-[100vh]">
      <ChoosePathSection />
      <GiScrollSection />
      <NoGiScrollSection />
      <MmaScrollSection />
    </div>
  );
}
