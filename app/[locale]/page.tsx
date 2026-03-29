import { notFound } from "next/navigation";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import Hero from "@/components/sections/Hero";
import BananaBoat from "@/components/sections/BananaBoat";
import Stats from "@/components/sections/Stats";
import Escuela from "@/components/sections/Escuela";
import Actividades from "@/components/sections/Actividades";
import Grupos from "@/components/sections/Grupos";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Wave from "@/components/ui/Wave";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="overflow-x-hidden">
      <Hero dict={dict.hero} locale={locale} />
      <BananaBoat dict={dict.banana} locale={locale} />
      <Stats dict={dict.stats} />
      <Escuela dict={dict.escuela} locale={locale} />
      <Wave color="#001428" />
      <Actividades dict={dict.actividades} locale={locale} />
      <Wave color="#FFF8EF" />
      <Grupos dict={dict.grupos} locale={locale} />
      <Wave color="#002B5C" />
      <Reviews dict={dict.reviews} />
      <Wave color="#F4FAFF" />
      <Contact dict={dict.contacto} />
    </div>
  );
}
