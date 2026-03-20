import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Programs from "@/components/sections/Programs";
import Coaches from "@/components/sections/Coaches";
import HeroPinWrapper from "@/components/sections/HeroPinWrapper";
import ScrollSections from "@/components/sections/ScrollSections";
import SchedulePoster from "@/components/sections/SchedulePoster";
import CTA from "@/components/sections/CTA";
import Testimonials from "@/components/sections/Testimonials";
import InstagramFeed from "@/components/sections/InstagramFeed";
import ScrollReset from "@/components/layout/ScrollReset";

export default function Home() {
  return (
    <>
      <ScrollReset />
      <Navbar />
      <main>
        <HeroPinWrapper />
        <ScrollSections />
        <Programs />
        <Coaches />
        <Suspense>
          <SchedulePoster />
        </Suspense>
        <Testimonials />
        <InstagramFeed />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
