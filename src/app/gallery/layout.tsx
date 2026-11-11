import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description:
    "Training moments, competitions, and community at Midland BJJ & MMA in Midland, Texas.",
  path: "/gallery",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
