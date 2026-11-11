import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = pageMetadata({
  title: "Pricing & Memberships",
  description:
    "Flexible Brazilian Jiu Jitsu and MMA memberships in Midland, TX. Monthly plans with no long-term commitment, discounted 6 and 12-month options. Your first class is free.",
  path: "/pricing",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
