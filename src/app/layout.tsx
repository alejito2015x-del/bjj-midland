import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";
import Providers from "@/components/layout/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "STAY RELENTLESS | BJJ & MMA Midland Texas",
    template: "%s | STAY RELENTLESS BJJ",
  },
  description:
    "Stay Relentless Jiu Jitsu Midland - Premier Brazilian Jiu Jitsu and MMA training center in Midland, Texas. Est. 2000. Train with elite black belts.",
  keywords: [
    "BJJ Midland",
    "MMA Midland Texas",
    "Jiu Jitsu Midland",
    "Stay Relentless",
    "Brazilian Jiu Jitsu Texas",
    "MMA gym Midland",
    "Kids martial arts Midland",
  ],
  openGraph: {
    title: "STAY RELENTLESS | BJJ & MMA Midland Texas",
    description: "Premier Brazilian Jiu Jitsu and MMA training center in Midland, Texas. Est. 2000.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <LocalBusinessSchema />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
