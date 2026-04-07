import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { ACTIVITY_IMAGES, SITE } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

const ITEM_KEYS = ["banana-boat", "kayak", "alquiler-windsurf", "alquiler-surf", "paseos-barco", "donut", "big-paddle-surf", "aquamarina"] as const;
const EMOJIS: Record<string, string> = { "banana-boat": "🍌", kayak: "🛶", "alquiler-windsurf": "🏄", "alquiler-surf": "🌊", "paseos-barco": "🚤", donut: "🍩", "big-paddle-surf": "🛟", aquamarina: "💎" };
const IMG_MAP: Record<string, string> = { "banana-boat": "banana", kayak: "kayak", "alquiler-windsurf": "windsurf_rental", "alquiler-surf": "surf_rental", "paseos-barco": "boat_rides", donut: "donut", "big-paddle-surf": "big_paddle_surf", aquamarina: "aquamarina" };

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
  const items = dict.actividades.items as Record<string, { name: string; price?: string; capacity?: string; seoDesc?: string }>;
  const item = items[actividad];
  if (!item) notFound();

  const img = ACTIVITY_IMAGES[IMG_MAP[actividad]] || ACTIVITY_IMAGES["banana"];
  const emoji = EMOJIS[actividad] || "🎉";
  const pageUrl = `https://windsurftarragona.com/${locale}/actividades/${actividad}`;

  const backLabel = locale === "en" ? "Back to activities" : locale === "ca" ? "Tornar a activitats" : "Volver a actividades";
  const scheduleLabel = locale === "en"
    ? "Mon-Fri 10am-2pm · Weekends 11am-2pm / 4pm-7pm"
    : locale === "ca"
      ? "Dl-Dv 10h-14h · Cap de setmana 11h-14h / 16h-19h"
      : "L-V 10h-14h · Finde 11h-14h / 16h-19h";
  const bookLabel = locale === "en"
    ? "Book now"
    : locale === "ca"
      ? "Reserva ara"
      : "Reservar ahora";

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
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[280px] sm:min-h-[320px] md:min-h-[360px] overflow-hidden">
        <img src={img} alt={item.name} width={600} height={400} className="w-full h-full object-cover brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <span className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">{emoji}</span>
          <h1 className="font-display text-white" style={{ fontSize: "clamp(32px, 8vw, 80px)" }}>{item.name}</h1>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_8px_32px_rgba(0,104,214,0.06)]">

          {item.price && item.price !== "Consultar" && item.price !== "Ask for prices" ? (
            <div className="bg-gradient-to-br from-turq/[0.06] to-ocean/[0.04] rounded-xl sm:rounded-2xl p-5 sm:p-7 mb-6 sm:mb-8 border border-turq/15 text-center">
              <p className="font-display text-2xl sm:text-3xl text-midnight mb-1">{item.price}</p>
              {item.capacity && (
                <p className="font-body text-sm sm:text-base text-ocean font-semibold">{item.capacity}</p>
              )}
              <p className="font-body text-[11px] sm:text-xs text-gray-400 mt-2">{scheduleLabel}</p>
            </div>
          ) : (
            <div className="bg-ice rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-ocean/10">
              <p className="font-body text-[13px] sm:text-sm text-gray-400 text-center">
                {locale === "en" ? "Prices and availability — contact us for more info" : locale === "ca" ? "Preus i disponibilitat — contacta'ns per a més info" : "Precios y disponibilidad — contáctanos para más info"}
              </p>
              <p className="font-body text-[11px] sm:text-xs text-gray-300 text-center mt-1">{scheduleLabel}</p>
            </div>
          )}

          <div className="flex gap-2.5 sm:gap-3 flex-wrap">
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-wa py-3 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base no-underline">💬 {bookLabel}</a>
            <a href={SITE.phoneHref} className="btn-primary py-3 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base no-underline">📞 {SITE.phone}</a>
            <Link href={`/${locale}#actividades`} className="font-body py-3 sm:py-3.5 px-5 sm:px-6 rounded-full border-2 border-ocean/15 text-ocean font-semibold text-[13px] sm:text-base no-underline transition-all hover:bg-ocean/5">← {backLabel}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
