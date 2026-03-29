import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { ACTIVITY_IMAGES, SITE } from "@/lib/constants";

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
  const items = dict.actividades.items as Record<string, { name: string }>;
  const item = items[actividad];
  if (!item) return {};
  return {
    title: `${item.name} · Windsurf Tarragona`,
    description: `${item.name} en Playa Larga, Tarragona`,
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
  const items = dict.actividades.items as Record<string, { name: string }>;
  const item = items[actividad];
  if (!item) notFound();

  const img = ACTIVITY_IMAGES[IMG_MAP[actividad]] || ACTIVITY_IMAGES["banana"];
  const emoji = EMOJIS[actividad] || "🎉";

  const backLabel = locale === "en" ? "Back to activities" : locale === "ca" ? "Tornar a activitats" : "Volver a actividades";
  const priceLabel = locale === "en" ? "Prices and availability — contact us for more info" : locale === "ca" ? "Preus i disponibilitat — contacta'ns per a més info" : "Precios y disponibilidad — contáctanos para más info";

  return (
    <div className="min-h-screen bg-ice">
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
