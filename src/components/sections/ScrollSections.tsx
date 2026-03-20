"use client";

import GiScrollSection        from "./GiScrollSection";
import NoGiScrollSection      from "./NoGiScrollSection";
import MmaScrollSection       from "./MmaScrollSection";
import ChoosePathSection      from "./ChoosePathSection";
import MobileProgramCarousel  from "./MobileProgramCarousel";

export default function ScrollSections() {
  return (
    <div className="mt-0 lg:-mt-[100vh]">
      <ChoosePathSection />

      {/* Mobile: horizontal slideshow carousel */}
      <div className="block lg:hidden">
        <MobileProgramCarousel />
      </div>

      {/* Desktop: scroll-driven canvas sections */}
      <div className="hidden lg:block">
        <GiScrollSection />
        <NoGiScrollSection />
        <MmaScrollSection />
      </div>
    </div>
  );
}
