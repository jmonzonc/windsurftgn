import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { SITE, LOCATIONS } from "@/lib/constants";

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

const ICONS = ["📞", "📍", "⚓", "💬"];

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const items = [dict.contacto.phone, dict.contacto.location, dict.contacto.location2, dict.contacto.whatsapp];
  const hrefs = [SITE.phoneHref, LOCATIONS.playa.mapsUrl, LOCATIONS.puerto.mapsUrl, SITE.whatsapp];

  return (
    <div className="min-h-screen bg-ice pt-24 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-[900px] mx-auto text-center">
        <h1 className="font-display text-midnight mb-2 sm:mb-3" style={{ fontSize: "clamp(28px, 6vw, 56px)" }}>
          {dict.contacto.title1} <span className="gradient-text-ocean">{dict.contacto.title2}</span>{dict.contacto.title3}
        </h1>
        <p className="font-body text-gray-400 text-base sm:text-lg mb-8 sm:mb-12">{dict.contacto.subtitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8 sm:mb-12">
          {items.map((item, i) => (
            <a
              key={i}
              href={hrefs[i]}
              target={hrefs[i].startsWith("tel:") ? undefined : "_blank"}
              rel="noreferrer"
              className="no-underline"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl py-6 sm:py-8 px-3 sm:px-5 border border-ocean/5 shadow-[0_2px_16px_rgba(0,104,214,0.03)] hover:shadow-[0_12px_36px_rgba(0,212,170,0.1)] hover:-translate-y-1 transition-all duration-400 ease-expo h-full">
                <span className="text-2xl sm:text-4xl">{ICONS[i]}</span>
                <div className="font-body font-extrabold text-[13px] sm:text-base text-midnight mt-2 sm:mt-3 mb-0.5 sm:mb-1">{item.title}</div>
                <div className="font-body font-semibold text-[11px] sm:text-sm text-turq">{item.text}</div>
                <div className="font-body text-[10px] sm:text-xs text-gray-300 mt-0.5 sm:mt-1">{item.sub}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <MapBlock
            embed={LOCATIONS.playa.mapsEmbed}
            label={dict.contacto.mapLabel}
            address={dict.contacto.mapAddress}
            mapsUrl={LOCATIONS.playa.mapsUrl}
            cta={dict.contacto.mapCta}
            iframeTitle="Windsurf Tarragona · Playa Larga"
          />
          <MapBlock
            embed={LOCATIONS.puerto.mapsEmbed}
            label={dict.contacto.mapLabel2}
            address={dict.contacto.mapAddress2}
            mapsUrl={LOCATIONS.puerto.mapsUrl}
            cta={dict.contacto.mapCta}
            iframeTitle="Windsurf Tarragona · Puerto de Tarragona"
          />
        </div>
      </div>
    </div>
  );
}

function MapBlock({ embed, label, address, mapsUrl, cta, iframeTitle }: {
  embed: string; label: string; address: string; mapsUrl: string; cta: string; iframeTitle: string;
}) {
  return (
    <div>
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-[240px] sm:h-[300px] md:h-[340px] border border-ocean/10">
        <iframe
          src={embed}
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={iframeTitle}
        />
      </div>
      <div className="mt-2 sm:mt-3 flex items-center justify-between gap-3">
        <div className="text-left min-w-0">
          <div className="font-body font-bold text-[13px] sm:text-[15px] text-midnight truncate">{label}</div>
          <div className="font-body text-[11px] sm:text-[13px] text-gray-400 truncate">{address}</div>
        </div>
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn-primary py-2 sm:py-2.5 px-4 sm:px-5 text-[11px] sm:text-[13px] no-underline shrink-0">
          {cta}
        </a>
      </div>
    </div>
  );
}
