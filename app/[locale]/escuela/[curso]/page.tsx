import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { isValidLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { COURSE_IMAGES, SITE } from "@/lib/constants";

const COURSE_KEYS = ["windsurf", "vela", "surf", "wakesurf", "catamaran", "patin-catalan"] as const;
const EMOJIS: Record<string, string> = { windsurf: "🏄", vela: "⛵", surf: "🌊", wakesurf: "🏂", catamaran: "🛥️", "patin-catalan": "🚩" };

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
  const courses = dict.escuela.courses as Record<string, { name: string; desc: string }>;
  const course = courses[curso];
  if (!course) return {};
  return {
    title: `${course.name} · Windsurf Tarragona`,
    description: course.desc,
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
  const courses = dict.escuela.courses as Record<string, { name: string; desc: string }>;
  const course = courses[curso];
  if (!course) notFound();

  const img = COURSE_IMAGES[curso] || COURSE_IMAGES["windsurf"];
  const emoji = EMOJIS[curso] || "🏄";

  const backLabel = locale === "en" ? "Back to courses" : locale === "ca" ? "Tornar als cursos" : "Volver a cursos";
  const priceLabel = locale === "en" ? "Prices and schedules — contact us for more info" : locale === "ca" ? "Preus i horaris — contacta'ns per a més info" : "Precios y horarios — contáctanos para más info";

  return (
    <div className="min-h-screen bg-ice">
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src={img} alt={course.name} className="w-full h-full object-cover brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="text-6xl mb-4">{emoji}</span>
          <h1 className="font-display text-white" style={{ fontSize: "clamp(40px, 8vw, 80px)" }}>{course.name}</h1>
          <p className="font-body text-white/60 mt-4 max-w-lg text-lg">{course.desc}</p>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_32px_rgba(0,104,214,0.06)]">
          <h2 className="font-display text-2xl text-midnight mb-4">{dict.escuela.allLevels}</h2>
          <p className="font-body text-gray-500 leading-relaxed mb-8">{course.desc}</p>
          <div className="bg-ice rounded-2xl p-6 mb-8 border border-ocean/10">
            <p className="font-body text-sm text-gray-400 text-center">{priceLabel}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href={SITE.phoneHref} className="btn-primary py-3.5 px-8 text-base no-underline">📞 {SITE.phone}</a>
            <Link href={`/${locale}#escuela`} className="font-body py-3.5 px-6 rounded-full border-2 border-ocean/15 text-ocean font-semibold no-underline transition-all hover:bg-ocean/5">← {backLabel}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
