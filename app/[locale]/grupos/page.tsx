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
    <div className="min-h-screen bg-ice pt-32 pb-20 px-6">
      <div className="max-w-[960px] mx-auto">
        <h1 className="font-display text-midnight text-center mb-4" style={{ fontSize: "clamp(36px, 6vw, 60px)" }}>
          {dict.grupos.title1} <span className="gradient-text-ocean">{dict.grupos.title2}</span>{dict.grupos.title3}
        </h1>
        <p className="font-body text-gray-400 text-center text-lg mb-12">{dict.gruposPage.subtitle}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GROUP_KEYS.map((key) => {
            const items = dict.grupos.items as Record<string, { title: string; desc: string }>;
            const g = items[key];
            return (
              <div key={key} className="bg-white rounded-3xl p-8 border border-ocean/5 shadow-[0_4px_20px_rgba(0,104,214,0.04)] hover:shadow-[0_12px_36px_rgba(0,104,214,0.08)] hover:-translate-y-1 transition-all duration-400 ease-expo">
                <span className="text-5xl">{EMOJIS[key]}</span>
                <h2 className="font-display text-2xl text-midnight mt-4 mb-2">{g.title}</h2>
                <p className="font-body text-gray-500 leading-relaxed mb-6">{g.desc}</p>
                <a href={SITE.phoneHref} className="btn-primary py-3 px-6 text-sm no-underline inline-block">📞 {SITE.phone}</a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
