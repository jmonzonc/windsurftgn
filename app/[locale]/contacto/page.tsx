import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { SITE } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return { title: `${dict.contactoPage.title} · Windsurf Tarragona` };
}

const ICONS = ["📞", "📍", "📸", "💬"];
const HREFS = (phone: string, maps: string, ig: string, wa: string) => [phone, maps, ig, wa];

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const items = [dict.contacto.phone, dict.contacto.location, dict.contacto.social, dict.contacto.whatsapp];
  const hrefs = HREFS(SITE.phoneHref, SITE.mapsUrl, "https://instagram.com/windsurftarragona", SITE.whatsapp);

  return (
    <div className="min-h-screen bg-ice pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <h1 className="font-display text-midnight mb-3" style={{ fontSize: "clamp(34px, 6vw, 56px)" }}>
          {dict.contacto.title1} <span className="gradient-text-ocean">{dict.contacto.title2}</span>{dict.contacto.title3}
        </h1>
        <p className="font-body text-gray-400 text-lg mb-12">{dict.contacto.subtitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {items.map((item, i) => (
            <a
              key={i}
              href={hrefs[i]}
              target={hrefs[i].startsWith("tel:") ? undefined : "_blank"}
              rel="noreferrer"
              className="no-underline"
            >
              <div className="bg-white rounded-3xl py-8 px-5 border border-ocean/5 shadow-[0_2px_16px_rgba(0,104,214,0.03)] hover:shadow-[0_12px_36px_rgba(0,212,170,0.1)] hover:-translate-y-1 transition-all duration-400 ease-expo h-full">
                <span className="text-4xl">{ICONS[i]}</span>
                <div className="font-body font-extrabold text-midnight mt-3 mb-1">{item.title}</div>
                <div className="font-body font-semibold text-sm text-turq">{item.text}</div>
                <div className="font-body text-xs text-gray-300 mt-1">{item.sub}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden h-[400px] border border-ocean/10">
          <iframe
            src={SITE.mapsEmbed}
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            title="Windsurf Tarragona"
          />
        </div>
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary inline-block mt-6 no-underline"
        >
          {dict.contacto.mapCta}
        </a>
      </div>
    </div>
  );
}
