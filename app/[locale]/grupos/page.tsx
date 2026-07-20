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
  return { title: `${dict.gruposPage.title} · Windsurf Tarragona` };
}

const GROUP_KEYS = ["colegios", "team-building", "amigos", "despedidas"] as const;
const EMOJIS: Record<string, string> = { colegios: "🏫", "team-building": "🏢", amigos: "👯", despedidas: "💍" };

export default async function GruposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-ice pt-24 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-[960px] mx-auto">
        <h1 className="font-display text-midnight text-center mb-3 sm:mb-4" style={{ fontSize: "clamp(30px, 6vw, 60px)" }}>
          {dict.grupos.title1} <span className="gradient-text-ocean">{dict.grupos.title2}</span>{dict.grupos.title3}
        </h1>
        <p className="font-body text-gray-400 text-center text-base sm:text-lg mb-8 sm:mb-12">{dict.gruposPage.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {GROUP_KEYS.map((key) => {
            const items = dict.grupos.items as Record<string, { title: string; desc: string; long?: string; highlight?: string }>;
            const g = items[key];
            return (
              <div key={key} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-ocean/5 shadow-[0_4px_20px_rgba(0,104,214,0.04)] hover:shadow-[0_12px_36px_rgba(0,104,214,0.08)] hover:-translate-y-1 transition-all duration-400 ease-expo">
                <span className="text-4xl sm:text-5xl">{EMOJIS[key]}</span>
                <h2 className="font-display text-xl sm:text-2xl text-midnight mt-3 sm:mt-4 mb-1.5 sm:mb-2">{g.title}</h2>
                <p className="font-body text-sm sm:text-base text-gray-500 leading-relaxed mb-3 sm:mb-4">{g.long ?? g.desc}</p>
                {g.highlight && (
                  <p className="font-body text-xs sm:text-sm font-semibold text-ocean bg-ocean/5 rounded-xl px-3 py-2 mb-4 sm:mb-6">{g.highlight}</p>
                )}
                <a href={SITE.phoneHref} className="btn-primary py-2.5 sm:py-3 px-5 sm:px-6 text-[13px] sm:text-sm no-underline inline-block">📞 {SITE.phone}</a>
              </div>
            );
          })}
        </div>

        {dict.grupos.custom && (
          <div className="mt-8 sm:mt-12 bg-gradient-to-br from-ocean to-deep rounded-2xl sm:rounded-3xl p-7 sm:p-10 text-center text-white">
            <h2 className="font-display text-2xl sm:text-3xl mb-2 sm:mb-3">{dict.grupos.custom.title}</h2>
            <p className="font-body text-sm sm:text-base text-white/85 leading-relaxed max-w-[640px] mx-auto">{dict.grupos.custom.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
