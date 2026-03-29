import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, isValidLocale, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

  const alternates: Record<string, string> = {};
  for (const loc of locales) {
    alternates[loc] = `https://windsurftarragona.com/${loc}`;
  }

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `https://windsurftarragona.com/${locale}`,
      languages: alternates,
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.description,
      url: `https://windsurftarragona.com/${locale}`,
      siteName: "Windsurf Tarragona",
      locale: locale === "ca" ? "ca_ES" : locale === "en" ? "en_US" : "es_ES",
      type: "website",
    },
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

  return (
    <div lang={locale}>
      <Navbar dict={dict.nav} locale={locale} />
      <main>{children}</main>
      <Footer dict={dict.footer} locale={locale} />
    </div>
  );
}
