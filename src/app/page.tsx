import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Programs from "@/components/sections/Programs";
import HeroPinWrapper from "@/components/sections/HeroPinWrapper";
import GiScrollSection from "@/components/sections/GiScrollSection";
import NoGiScrollSection from "@/components/sections/NoGiScrollSection";
import MmaScrollSection from "@/components/sections/MmaScrollSection";
import SchedulePoster from "@/components/sections/SchedulePoster";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import SectionReveal from "@/components/sections/SectionReveal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero stays pinned while BJJ GI card rises over it */}
        <HeroPinWrapper />

        {/* GI scroll-scrub section — rises over Hero with rounded top corners */}
        <GiScrollSection />

        {/* No-GI rises over GI */}
        <NoGiScrollSection />

        {/* MMA rises over No-GI */}
        <MmaScrollSection />

        {/* MMA, Kids, Veteran, Location */}
        <Programs />

        <SectionReveal delay={0.02}>
          <Suspense>
            <SchedulePoster />
          </Suspense>
        </SectionReveal>
        <SectionReveal delay={0.04}>
          <Testimonials />
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <InstagramFeed />
        </SectionReveal>
        <SectionReveal delay={0.08}>
          <CTA />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
