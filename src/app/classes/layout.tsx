import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

// page.tsx is a client component and cannot export metadata, so it lives here.
export const metadata: Metadata = pageMetadata({
  title: "Classes & Schedule",
  description:
    "BJJ Gi, No-Gi, MMA & Wrestling, and kids martial arts classes in Midland, TX. See the weekly schedule and find the right program for your goals.",
  path: "/classes",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
