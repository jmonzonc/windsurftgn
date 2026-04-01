import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: `${dict.privacy.title} · Windsurf Tarragona`,
    robots: { index: false, follow: false },
  };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-ice pt-24 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-[700px] mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl text-midnight mb-6 sm:mb-8">{dict.privacy.title}</h1>
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_4px_20px_rgba(0,104,214,0.04)] font-body text-sm sm:text-base text-gray-500 leading-relaxed space-y-4 sm:space-y-6">
          {locale === "en" ? (
            <>
              <p>Windsurf Tarragona, located at Ctra. N-340, Km 1168, Tarragona (Spain), is committed to protecting the privacy of its users in accordance with Regulation (EU) 2016/679 (GDPR) and Organic Law 3/2018 on Personal Data Protection (LOPDGDD).</p>
              <p>Personal data collected through our website (name, email, phone) will be used exclusively to manage inquiries, bookings, and communications related to our services. Data will not be shared with third parties unless legally required.</p>
              <p>Users have the right to access, rectify, delete, limit, port, and object to the processing of their data. To exercise these rights, contact us at <strong>977 23 27 15</strong>.</p>
            </>
          ) : locale === "ca" ? (
            <>
              <p>Windsurf Tarragona, amb domicili a Ctra. N-340, Km 1168, Tarragona (Espanya), es compromet a protegir la privacitat dels seus usuaris d&apos;acord amb el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018 de Protecció de Dades Personals (LOPDGDD).</p>
              <p>Les dades personals recollides a través del nostre web (nom, email, telèfon) s&apos;utilitzaran exclusivament per gestionar consultes, reserves i comunicacions relacionades amb els nostres serveis. Les dades no seran cedides a tercers excepte obligació legal.</p>
              <p>Els usuaris tenen dret a accedir, rectificar, suprimir, limitar, portar i oposar-se al tractament de les seves dades. Per exercir aquests drets, contacteu-nos al <strong>977 23 27 15</strong>.</p>
            </>
          ) : (
            <>
              <p>Windsurf Tarragona, con domicilio en Ctra. N-340, Km 1168, Tarragona (España), se compromete a proteger la privacidad de sus usuarios de acuerdo con el Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).</p>
              <p>Los datos personales recogidos a través de nuestro sitio web (nombre, email, teléfono) se utilizarán exclusivamente para gestionar consultas, reservas y comunicaciones relacionadas con nuestros servicios. Los datos no serán cedidos a terceros salvo obligación legal.</p>
              <p>Los usuarios tienen derecho a acceder, rectificar, suprimir, limitar, portar y oponerse al tratamiento de sus datos. Para ejercer estos derechos, contacte con nosotros en el <strong>977 23 27 15</strong>.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
