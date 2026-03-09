import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Programs from "@/components/sections/Programs";
import HeroPinWrapper from "@/components/sections/HeroPinWrapper";
import ScrollSections from "@/components/sections/ScrollSections";
import SchedulePoster from "@/components/sections/SchedulePoster";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import SectionReveal from "@/components/sections/SectionReveal";
import ScrollReset from "@/components/layout/ScrollReset";

export default function Home() {
  return (
    <>
      <ScrollReset />
      <Navbar />
      <main>
        {/* Hero stays pinned while BJJ GI card rises over it */}
        <HeroPinWrapper />

        {/* Scroll-scrub sections — client-only to avoid SSR hydration issues */}
        <ScrollSections />

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
