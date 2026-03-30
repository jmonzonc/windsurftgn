import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { ACTIVITY_IMAGES, SITE } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

const ITEM_KEYS = ["banana-boat", "kayak", "alquiler-windsurf", "alquiler-surf", "paseos-barco", "donut"] as const;
const EMOJIS: Record<string, string> = { "banana-boat": "🍌", kayak: "🛶", "alquiler-windsurf": "🏄", "alquiler-surf": "🌊", "paseos-barco": "🚤", donut: "🍩" };
const IMG_MAP: Record<string, string> = { "banana-boat": "banana", kayak: "kayak", "alquiler-windsurf": "windsurf_rental", "alquiler-surf": "surf_rental", "paseos-barco": "boat_rides", donut: "donut" };

export async function generateStaticParams() {
  const params: { locale: string; actividad: string }[] = [];
  for (const locale of locales) {
    for (const key of ITEM_KEYS) {
      params.push({ locale, actividad: key });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; actividad: string }>;
}): Promise<Metadata> {
  const { locale, actividad } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const items = dict.actividades.items as Record<string, { name: string; seoDesc?: string }>;
  const item = items[actividad];
  if (!item) return {};

  const img = ACTIVITY_IMAGES[IMG_MAP[actividad]] || ACTIVITY_IMAGES["banana"];
  const description = item.seoDesc || `${item.name} en Playa Larga, Tarragona`;

  const languageAlternates: Record<string, string> = {
    "x-default": `https://windsurftarragona.com/es/actividades/${actividad}`,
  };
  for (const loc of locales) {
    languageAlternates[loc] = `https://windsurftarragona.com/${loc}/actividades/${actividad}`;
  }

  return {
    title: `${item.name} · Windsurf Tarragona`,
    description,
    alternates: {
      canonical: `https://windsurftarragona.com/${locale}/actividades/${actividad}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: `${item.name} · Windsurf Tarragona`,
      description,
      url: `https://windsurftarragona.com/${locale}/actividades/${actividad}`,
      siteName: "Windsurf Tarragona",
      locale: locale === "ca" ? "ca_ES" : locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [{ url: img, width: 600, height: 400, alt: item.name }],
    },
  };
}

export default async function ActividadPage({
  params,
}: {
  params: Promise<{ locale: string; actividad: string }>;
}) {
  const { locale, actividad } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const items = dict.actividades.items as Record<string, { name: string; seoDesc?: string }>;
  const item = items[actividad];
  if (!item) notFound();

  const img = ACTIVITY_IMAGES[IMG_MAP[actividad]] || ACTIVITY_IMAGES["banana"];
  const emoji = EMOJIS[actividad] || "🎉";
  const pageUrl = `https://windsurftarragona.com/${locale}/actividades/${actividad}`;

  const backLabel = locale === "en" ? "Back to activities" : locale === "ca" ? "Tornar a activitats" : "Volver a actividades";
  const priceLabel = locale === "en" ? "Prices and availability — contact us for more info" : locale === "ca" ? "Preus i disponibilitat — contacta'ns per a més info" : "Precios y disponibilidad — contáctanos para más info";

  const activityJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: item.name,
    description: item.seoDesc || `${item.name} en Playa Larga, Tarragona`,
    url: pageUrl,
    image: img,
    isAccessibleForFree: false,
    availableLanguage: ["es", "ca", "en"],
    touristType: ["Adventure tourism", "Beach tourism", "Water sports"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coords.lat,
      longitude: SITE.coords.lng,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ctra. N-340, Km 1168, Camping Las Palmeras",
      addressLocality: "Tarragona",
      addressRegion: "Cataluña",
      postalCode: "43007",
      addressCountry: "ES",
    },
    containedInPlace: {
      "@type": "SportsActivityLocation",
      "@id": "https://windsurftarragona.com/#business",
      name: "Windsurf Tarragona",
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Windsurf Tarragona", url: `https://windsurftarragona.com/${locale}` },
    { name: dict.nav.actividades, url: `https://windsurftarragona.com/${locale}#actividades` },
    { name: item.name, url: pageUrl },
  ]);

  return (
    <div className="min-h-screen bg-ice">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src={img} alt={item.name} className="w-full h-full object-cover brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-6xl mb-4">{emoji}</span>
          <h1 className="font-display text-white" style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>{item.name}</h1>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,104,214,0.06)]">
          <div className="bg-ice rounded-2xl p-6 mb-8 border border-ocean/10">
            <p className="font-body text-sm text-gray-400 text-center">{priceLabel}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href={SITE.phoneHref} className="btn-primary py-3.5 px-8 text-base no-underline">📞 {SITE.phone}</a>
            <Link href={`/${locale}#actividades`} className="font-body py-3.5 px-6 rounded-full border-2 border-ocean/15 text-ocean font-semibold no-underline transition-all hover:bg-ocean/5">← {backLabel}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
