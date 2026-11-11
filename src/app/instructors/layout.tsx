import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = pageMetadata({
  title: "Instructors",
  description:
    "Meet the black belts and coaches at Midland BJJ & MMA. Decades of experience in competition, teaching, and real-world self-defense in Midland, Texas.",
  path: "/instructors",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
