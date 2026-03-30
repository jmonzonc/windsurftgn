import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SetHtmlLang from "@/components/ui/SetHtmlLang";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);

  const languageAlternates: Record<string, string> = {
    "x-default": "https://windsurftarragona.com/es",
  };
  for (const loc of locales) {
    languageAlternates[loc] = `https://windsurftarragona.com/${loc}`;
  }

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `https://windsurftarragona.com/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      url: `https://windsurftarragona.com/${locale}`,
      siteName: "Windsurf Tarragona",
      locale: locale === "ca" ? "ca_ES" : locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [
        {
          url: "https://windsurftarragona.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: dict.meta.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      images: ["https://windsurftarragona.com/og-image.jpg"],
    },
  };
}

function buildJsonLd(locale: Locale, dict: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        "@id": "https://windsurftarragona.com/#business",
        name: "Windsurf Tarragona",
        alternateName: ["Escola Nàutica Tarragona", "Escuela Náutica Tarragona"],
        description: dict.meta.description,
        url: `${SITE.url}/${locale}`,
        telephone: "+34977232715",
        email: SITE.email,
        foundingDate: "2004",
        priceRange: "€€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card",
        inLanguage: locale === "ca" ? "ca" : locale === "en" ? "en" : "es",
        availableLanguage: ["es", "ca", "en"],
        logo: {
          "@type": "ImageObject",
          url: "https://windsurftarragona.com/logo.png",
        },
        image: [
          "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg",
          "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg",
        ],
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
        hasMap: SITE.mapsUrl,
        sameAs: [SITE.instagram, SITE.facebook, SITE.mapsUrl],
        openingHoursSpecification: [
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
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
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
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Curso de Windsurf",
                url: `https://windsurftarragona.com/${locale}/escuela/windsurf`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Banana Boat",
                url: `https://windsurftarragona.com/${locale}/actividades/banana-boat`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Kayak",
                url: `https://windsurftarragona.com/${locale}/actividades/kayak`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Curso de Surf",
                url: `https://windsurftarragona.com/${locale}/escuela/surf`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Catamarán",
                url: `https://windsurftarragona.com/${locale}/escuela/catamaran`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Paseos en Barco",
                url: `https://windsurftarragona.com/${locale}/actividades/paseos-barco`,
              },
            },
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
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const jsonLd = buildJsonLd(locale, dict);

  return (
    <div lang={locale}>
      <SetHtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar dict={dict.nav} locale={locale} />
      <main>{children}</main>
      <Footer dict={dict.footer} locale={locale} />
      <WhatsAppButton />
    </div>
  );
}
