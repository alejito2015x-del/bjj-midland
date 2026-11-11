import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Midland BJJ & MMA at 4612 Billingsley Blvd, Midland, TX. Call (432) 230-5545 or send a message to book your free trial class.",
  path: "/contact",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
