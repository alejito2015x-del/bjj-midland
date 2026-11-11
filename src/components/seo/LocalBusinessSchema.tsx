import { SITE_CONFIG } from "@/lib/constants";
import { OG_IMAGE, SITE_URL, SOCIAL_PROFILES } from "@/lib/seo";

// openingHours is intentionally omitted: the schedule only lists class start
// times, not business hours. Add it once the gym confirms real opening hours —
// wrong hours on Google are worse than none.
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${SITE_URL}/#gym`,
    name: "MIDLAND BJJ & MMA",
    alternateName: ["Midland BJJ and MMA", SITE_CONFIG.fullName],
    description: SITE_CONFIG.description,
    url: SITE_URL,
    logo: `${SITE_URL}/images/jaguar-logo.png`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    telephone: SITE_CONFIG.phoneTel,
    email: SITE_CONFIG.email,
    foundingDate: SITE_CONFIG.established,
    sameAs: SOCIAL_PROFILES,
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
