import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Midland BJJ & MMA has been building warriors and champions in Midland, Texas since 2000. Learn our story, values, and approach to Brazilian Jiu Jitsu and MMA.",
  path: "/about",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
