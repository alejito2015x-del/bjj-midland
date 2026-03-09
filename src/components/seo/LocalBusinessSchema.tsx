import { SITE_CONFIG } from "@/lib/constants";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": "https://midlandbjjmma.com",
    name: "MIDLAND BJJ & MMA",
    alternateName: "Midland BJJ and MMA",
    description: SITE_CONFIG.description,
    url: "https://midlandbjjmma.com",
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "4612 Billingsley Blvd",
      addressLocality: "Midland",
      addressRegion: "TX",
      postalCode: "79705",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.035686,
      longitude: -102.1260243,
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
