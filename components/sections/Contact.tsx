"use client";

import { useState } from "react";
import { useReveal } from "@/lib/hooks";
import { SITE } from "@/lib/constants";

type ContactItem = { title: string; text: string; sub: string };
type ContactDict = {
  title1: string; title2: string; title3: string; subtitle: string;
  phone: ContactItem; location: ContactItem; social: ContactItem; whatsapp: ContactItem;
  mapLabel: string; mapAddress: string; mapCta: string;
};

const ICONS = ["📞", "📍", "📸", "💬"];

export default function Contact({ dict }: { dict: ContactDict }) {
  const [ref, vis] = useReveal();
  const items = [dict.phone, dict.location, dict.social, dict.whatsapp];
  const hrefs = [
    SITE.phoneHref,
    SITE.mapsUrl,
    "https://instagram.com/windsurftarragona",
    SITE.whatsapp,
  ];

  return (
    <section id="contacto" ref={ref as React.RefObject<HTMLElement>} className="bg-gradient-to-b from-ice to-white py-28 px-5 relative">
      <div className="max-w-[960px] mx-auto text-center">
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <h2 className="font-display text-midnight leading-none mb-3" style={{ fontSize: "clamp(34px, 6vw, 56px)" }}>
            {dict.title1} <span className="gradient-text-ocean">{dict.title2}</span>{dict.title3}
          </h2>
          <p className="font-body text-[17px] text-gray-400 mb-14 leading-[1.6]">{dict.subtitle}</p>
        </div>
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s" }}
        >
          {items.map((item, i) => (
            <ContactCard key={i} icon={ICONS[i]} href={hrefs[i]} {...item} />
          ))}
        </div>
        <div
          className="mt-12 rounded-[28px] overflow-hidden h-[280px] relative bg-gradient-to-br from-ocean/[0.08] to-turq/[0.06] border border-ocean/[0.06]"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.4s" }}
        >
          <iframe
            src={SITE.mapsEmbed}
            width="100%"
            height="100%"
            className="border-0 saturate-[0.7] brightness-[1.05]"
            allowFullScreen
            loading="lazy"
            title="Ubicación Windsurf Tarragona"
          />
          <div className="absolute bottom-5 left-5 right-5 bg-white/[0.92] backdrop-blur-[16px] rounded-2xl py-4 px-6 flex justify-between items-center shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex-wrap gap-3">
            <div className="text-left">
              <div className="font-body font-bold text-[15px] text-midnight">{dict.mapLabel}</div>
              <div className="font-body text-[13px] text-gray-400">{dict.mapAddress}</div>
            </div>
            <a href={SITE.mapsUrl} target="_blank" rel="noreferrer" className="btn-primary py-2.5 px-[22px] text-[13px] no-underline">
              {dict.mapCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, text, sub, href }: {
  icon: string; title: string; text: string; sub: string; href: string;
}) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("tel:") ? undefined : "_blank"}
      rel="noreferrer"
      className="no-underline"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      <div
        className="bg-white rounded-3xl py-9 px-[22px] cursor-pointer transition-all duration-400 ease-expo h-full"
        style={{
          boxShadow: h ? "0 12px 36px rgba(0,212,170,0.1)" : "0 2px 16px rgba(0,104,214,0.02)",
          border: h ? "2px solid rgba(0,212,170,0.2)" : "2px solid rgba(0,104,214,0.03)",
          transform: h ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        <div className="text-4xl mb-3.5 transition-transform duration-400 ease-expo" style={{ transform: h ? "scale(1.15)" : "scale(1)" }}>
          {icon}
        </div>
        <div className="font-body font-extrabold text-base text-midnight mb-1">{title}</div>
        <div className="font-body font-semibold text-sm text-turq">{text}</div>
        <div className="font-body text-xs text-gray-300 mt-1">{sub}</div>
      </div>
    </a>
  );
}
