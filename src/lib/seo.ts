import type { Metadata } from "next";

// SINGLE SOURCE OF TRUTH for the production URL used by SEO metadata,
// the sitemap and structured data. midlandbjj.com is the live domain;
// www.midlandbjj.com also serves the site, so canonical tags point here.
export const SITE_URL = "https://midlandbjj.com";

// 1200x630 link-preview image (Facebook, WhatsApp, iMessage, X, LinkedIn).
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Two athletes squaring off on the mats at Midland BJJ & MMA",
};

// Verified against the links in the site footer.
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/midlandbjj/",
  "https://www.facebook.com/bjjmidland",
  "https://www.youtube.com/@bjjmidland",
];

const TITLE_SUFFIX = "STAY RELENTLESS BJJ";

// Per-page metadata. A child segment's openGraph/twitter objects REPLACE the
// root ones (no deep merge) and the root canonical would otherwise leak to
// every page, so each page gets a complete, self-contained set.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: `/${string}`;
}): Metadata {
  const fullTitle = `${title} | ${TITLE_SUFFIX}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: path,
      siteName: "Midland BJJ & MMA",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
