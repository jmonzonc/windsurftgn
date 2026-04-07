import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { COURSE_IMAGES, SITE } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";

const COURSE_KEYS = ["windsurf", "wing-foil", "paddle-surf", "esqui-wake", "vela", "catamaran", "patin-catalan"] as const;
const EMOJIS: Record<string, string> = { windsurf: "🏄", "wing-foil": "🪁", "paddle-surf": "🏄", "esqui-wake": "🎿", vela: "⛵", catamaran: "🛥️", "patin-catalan": "🚩" };

export async function generateStaticParams() {
  const params: { locale: string; curso: string }[] = [];
  for (const locale of locales) {
    for (const key of COURSE_KEYS) {
      params.push({ locale, curso: key });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; curso: string }>;
}): Promise<Metadata> {
  const { locale, curso } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const courses = dict.escuela.courses as Record<string, { name: string; desc: string; seoDesc?: string }>;
  const course = courses[curso];
  if (!course) return {};

  const languageAlternates: Record<string, string> = {
    "x-default": `https://windsurftarragona.com/es/escuela/${curso}`,
  };
  for (const loc of locales) {
    languageAlternates[loc] = `https://windsurftarragona.com/${loc}/escuela/${curso}`;
  }

  return {
    title: `${course.name} · Windsurf Tarragona`,
    description: course.seoDesc || course.desc,
    alternates: {
      canonical: `https://windsurftarragona.com/${locale}/escuela/${curso}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: `${course.name} · Windsurf Tarragona`,
      description: course.seoDesc || course.desc,
      url: `https://windsurftarragona.com/${locale}/escuela/${curso}`,
      siteName: "Windsurf Tarragona",
      locale: locale === "ca" ? "ca_ES" : locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [
        {
          url: COURSE_IMAGES[curso] || COURSE_IMAGES["windsurf"],
          width: 900,
          height: 600,
          alt: course.name,
        },
      ],
    },
  };
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ locale: string; curso: string }>;
}) {
  const { locale, curso } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const courses = dict.escuela.courses as Record<string, { name: string; desc: string; price?: string; seoDesc?: string }>;
  const course = courses[curso];
  if (!course) notFound();

  const img = COURSE_IMAGES[curso] || COURSE_IMAGES["windsurf"];
  const emoji = EMOJIS[curso] || "🏄";
  const pageUrl = `https://windsurftarragona.com/${locale}/escuela/${curso}`;

  const backLabel = locale === "en" ? "Back to courses" : locale === "ca" ? "Tornar als cursos" : "Volver a cursos";
  const priceLabel = locale === "en"
    ? "Prices and schedules — contact us for more info"
    : locale === "ca"
      ? "Preus i horaris — contacta'ns per a més info"
      : "Precios y horarios — contáctanos para más info";
  const scheduleLabel = locale === "en"
    ? "Mon-Fri 10am-2pm · Weekends 11am-2pm / 4pm-7pm"
    : locale === "ca"
      ? "Dl-Dv 10h-14h · Cap de setmana 11h-14h / 16h-19h"
      : "L-V 10h-14h · Finde 11h-14h / 16h-19h";

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.seoDesc || course.desc,
    url: pageUrl,
    image: img,
    provider: {
      "@type": "SportsActivityLocation",
      "@id": "https://windsurftarragona.com/#business",
      name: "Windsurf Tarragona",
      sameAs: SITE.url,
    },
    courseMode: "onsite",
    availableLanguage: ["es", "ca", "en"],
    inLanguage: locale === "ca" ? "ca" : locale === "en" ? "en" : "es",
    locationCreated: {
      "@type": "Place",
      name: "Playa Larga",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ctra. N-340, Km 1168, Camping Las Palmeras",
        addressLocality: "Tarragona",
        addressRegion: "Cataluña",
        postalCode: "43007",
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.coords.lat,
        longitude: SITE.coords.lng,
      },
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Windsurf Tarragona", url: `https://windsurftarragona.com/${locale}` },
    { name: dict.nav.escuela, url: `https://windsurftarragona.com/${locale}#escuela` },
    { name: course.name, url: pageUrl },
  ]);

  return (
    <div className="min-h-screen bg-ice">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] min-h-[280px] sm:min-h-[320px] md:min-h-[360px] overflow-hidden">
        <img src={img} alt={course.name} width={900} height={600} className="w-full h-full object-cover brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <span className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">{emoji}</span>
          <h1 className="font-display text-white" style={{ fontSize: "clamp(32px, 8vw, 80px)" }}>{course.name}</h1>
          <p className="font-body text-white/60 mt-3 sm:mt-4 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed">{course.desc}</p>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_8px_32px_rgba(0,104,214,0.06)]">
          <h2 className="font-display text-xl sm:text-2xl text-midnight mb-3 sm:mb-4">{dict.escuela.allLevels}</h2>
          <p className="font-body text-sm sm:text-base text-gray-500 leading-relaxed mb-6 sm:mb-8">{course.desc}</p>

          {course.price && course.price !== "Consultar" && course.price !== "Ask for prices" ? (
            <div className="bg-gradient-to-br from-ocean/[0.04] to-turq/[0.04] rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-ocean/10">
              <p className="font-body font-bold text-base sm:text-lg text-ocean text-center mb-1">{course.price}</p>
              <p className="font-body text-[11px] sm:text-xs text-gray-400 text-center">{scheduleLabel}</p>
            </div>
          ) : (
            <div className="bg-ice rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-ocean/10">
              <p className="font-body text-[13px] sm:text-sm text-gray-400 text-center">{priceLabel}</p>
              <p className="font-body text-[11px] sm:text-xs text-gray-300 text-center mt-1">{scheduleLabel}</p>
            </div>
          )}

          <div className="flex gap-2.5 sm:gap-3 flex-wrap">
            <a href={SITE.phoneHref} className="btn-primary py-3 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base no-underline">📞 {SITE.phone}</a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="btn-wa py-3 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base no-underline">💬 WhatsApp</a>
            <Link href={`/${locale}#escuela`} className="font-body py-3 sm:py-3.5 px-5 sm:px-6 rounded-full border-2 border-ocean/15 text-ocean font-semibold text-[13px] sm:text-base no-underline transition-all hover:bg-ocean/5">← {backLabel}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
