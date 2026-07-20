import type { Locale } from "./i18n";
import { SITE, LOCATIONS, type LocationKey } from "./constants";

const BUSINESS_ID = "https://windsurftarragona.com/#business";

const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "14:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "11:00",
    closes: "14:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday", "Sunday"],
    opens: "16:00",
    closes: "19:00",
  },
];

const langOf = (locale: Locale) =>
  locale === "ca" ? "ca" : locale === "en" ? "en" : "es";

function addressNode(key: "playa" | "puerto") {
  const L = LOCATIONS[key];
  return {
    "@type": "PostalAddress",
    streetAddress: L.streetAddress,
    addressLocality: "Tarragona",
    addressRegion: "Cataluña",
    postalCode: L.postalCode,
    addressCountry: "ES",
  };
}

function geoNode(key: "playa" | "puerto") {
  const L = LOCATIONS[key];
  return {
    "@type": "GeoCoordinates",
    latitude: L.coords.lat,
    longitude: L.coords.lng,
  };
}

function placeNode(key: "playa" | "puerto", locale: Locale) {
  const L = LOCATIONS[key];
  const names: Record<string, Record<Locale, string>> = {
    playa: {
      es: "Windsurf Tarragona · Playa Larga",
      ca: "Windsurf Tarragona · Platja Llarga",
      en: "Windsurf Tarragona · Playa Larga",
    },
    puerto: {
      es: "Windsurf Tarragona · Puerto Deportivo de Tarragona",
      ca: "Windsurf Tarragona · Port de Tarragona",
      en: "Windsurf Tarragona · Port of Tarragona",
    },
  };
  return {
    "@type": "SportsActivityLocation",
    "@id": L.id,
    name: names[key][locale],
    telephone: "+34609874869",
    address: addressNode(key),
    geo: geoNode(key),
    hasMap: L.mapsUrl,
    openingHoursSpecification: OPENING_HOURS,
    parentOrganization: { "@id": BUSINESS_ID },
  };
}

export function locationRef(key: LocationKey) {
  return key === "ambas"
    ? [{ "@id": LOCATIONS.playa.id }, { "@id": LOCATIONS.puerto.id }]
    : { "@id": LOCATIONS[key].id };
}

export function buildJsonLd(locale: Locale, dict: Record<string, any>) {
  const offer = (name: string, path: string, at: LocationKey, description?: string) => ({
    "@type": "Offer",
    availableAtOrFrom: locationRef(at),
    itemOffered: {
      "@type": "Service",
      name,
      ...(description ? { description } : {}),
      url: `${SITE.url}/${locale}/${path}`,
    },
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        "@id": BUSINESS_ID,
        name: "Windsurf Tarragona",
        alternateName: ["Escola Nàutica Tarragona", "Escuela Náutica Tarragona"],
        description: dict.meta.description,
        url: `${SITE.url}/${locale}`,
        telephone: "+34609874869",
        email: SITE.email,
        foundingDate: "2004",
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card",
        inLanguage: langOf(locale),
        availableLanguage: ["es", "ca", "en"],
        logo: { "@type": "ImageObject", url: `${SITE.url}/logo.png` },
        image: [
          `${SITE.url}/images/base-playa-larga.jpg`,
          `${SITE.url}/images/actividad-banana.jpg`,
          `${SITE.url}/images/actividad-paseos-barco.jpg`,
        ],
        address: addressNode("playa"),
        geo: geoNode("playa"),
        hasMap: [LOCATIONS.playa.mapsUrl, LOCATIONS.puerto.mapsUrl],
        location: [{ "@id": LOCATIONS.playa.id }, { "@id": LOCATIONS.puerto.id }],
        sameAs: [SITE.instagram, SITE.facebook, SITE.mapsUrl],
        openingHoursSpecification: OPENING_HOURS,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "150",
          bestRating: "5",
          worstRating: "1",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name:
            locale === "ca"
              ? "Activitats i Cursos Nàutics"
              : locale === "en"
                ? "Nautical Activities & Courses"
                : "Actividades y Cursos Náuticos",
          itemListElement: [
            offer("Curso de Windsurf", "escuela/windsurf", "playa", "Curso individual 90€/h · Pack 3 personas 50€/h por persona"),
            offer(
              "Curso de Wing-Foil",
              "escuela/wing-foil",
              "ambas",
              "3 fases: fases 1 y 3 en Playa Larga, fase 2 (training-foil) en el Puerto Deportivo de Tarragona · Training-foil 200€/h"
            ),
            offer(
              "Esquí Náutico / Wakeboard",
              "escuela/esqui-wake",
              "puerto",
              "75€/estirada 12 min · Micro-curso salida del agua 150€"
            ),
            offer(
              "Banana Boat",
              "actividades/banana-boat",
              "puerto",
              "20€/persona, 12 minutos, hasta 10 personas"
            ),
            offer(
              "Kayak",
              "actividades/kayak",
              "playa",
              "25€/hora, hasta 4 plazas"
            ),
            offer(
              "Big Paddle Surf",
              "actividades/big-paddle-surf",
              "playa",
              "100€/hora, hasta 12 personas"
            ),
            offer(
              "Paseos en Barco",
              "actividades/paseos-barco",
              "puerto",
              "200€/hora, hasta 6 personas con patrón"
            ),
          ],
        },
        areaServed: [
          { "@type": "City", name: "Tarragona" },
          { "@type": "City", name: "Salou" },
          { "@type": "City", name: "Cambrils" },
          { "@type": "AdministrativeArea", name: "Costa Daurada" },
          { "@type": "AdministrativeArea", name: "Costa Dorada" },
        ],
      },
      placeNode("playa", locale),
      placeNode("puerto", locale),
    ],
  };
}

export function buildCourseJsonLd(opts: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  image: string;
  location: LocationKey;
}) {
  const { locale, slug, name, description, image, location } = opts;
  const pageUrl = `${SITE.url}/${locale}/escuela/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: pageUrl,
    image,
    provider: {
      "@type": "SportsActivityLocation",
      "@id": BUSINESS_ID,
      name: "Windsurf Tarragona",
      sameAs: SITE.url,
    },
    availableLanguage: ["es", "ca", "en"],
    inLanguage: langOf(locale),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      location: locationRef(location),
    },
  };
}

export function buildActivityJsonLd(opts: {
  locale: Locale;
  slug: string;
  name: string;
  description: string;
  image: string;
  location: LocationKey;
}) {
  const { locale, slug, name, description, image, location } = opts;
  const geoKey = location === "puerto" ? "puerto" : "playa";
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name,
    description,
    url: `${SITE.url}/${locale}/actividades/${slug}`,
    image,
    isAccessibleForFree: false,
    availableLanguage: ["es", "ca", "en"],
    touristType: ["Adventure tourism", "Beach tourism", "Water sports"],
    geo: geoNode(geoKey),
    address: addressNode(geoKey),
    containedInPlace: locationRef(location),
  };
}
