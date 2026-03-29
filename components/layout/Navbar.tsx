"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/constants";

type NavDict = {
  escuela: string;
  actividades: string;
  grupos: string;
  contacto: string;
};

export default function Navbar({ dict, locale }: { dict: NavDict; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: dict.escuela, href: `/${locale}#escuela` },
    { label: dict.actividades, href: `/${locale}#actividades` },
    { label: dict.grupos, href: `/${locale}/grupos` },
    { label: dict.contacto, href: `/${locale}/contacto` },
  ];

  function localeSwitchPath(target: Locale) {
    const rest = pathname.replace(new RegExp(`^/${locale}`), "");
    return `/${target}${rest}`;
  }

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-[1000] transition-all duration-500",
        scrolled
          ? "py-2 px-5 bg-abyss/[0.88] backdrop-blur-2xl saturate-[1.4] border-b border-turq/[0.08]"
          : "py-4 px-5 bg-transparent"
      )}>
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href={`/${locale}`} className="flex items-center gap-2.5 z-10 no-underline">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-turq to-ocean flex items-center justify-center text-[22px] shadow-[0_4px_16px_rgba(0,212,170,0.2)]">🌊</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[15px] text-white tracking-wider">WINDSURF</span>
              <span className="font-display text-[15px] text-turq tracking-wider">TARRAGONA</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8 items-center">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="font-body text-sm font-medium text-white/65 no-underline hover:text-white transition-colors duration-300">{l.label}</Link>
            ))}
            <div className="flex gap-1 ml-2">
              {locales.map((loc) => (
                <Link key={loc} href={localeSwitchPath(loc)} className={cn(
                  "font-body text-xs font-semibold px-2 py-1 rounded-md transition-all duration-200 no-underline uppercase",
                  loc === locale ? "bg-turq/20 text-turq" : "text-white/40 hover:text-white/70"
                )}>{loc}</Link>
              ))}
            </div>
            <a href={SITE.phoneHref} className="no-underline">
              <button className="btn-primary px-6 py-2.5 text-sm">📞 {SITE.phone}</button>
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden relative z-[1001] w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none" aria-label="Menu">
            <span className={cn("block w-6 h-0.5 bg-white rounded transition-all duration-300", open && "rotate-45 translate-y-2")} />
            <span className={cn("block w-6 h-0.5 bg-white rounded transition-all duration-300", open && "opacity-0")} />
            <span className={cn("block w-6 h-0.5 bg-white rounded transition-all duration-300", open && "-rotate-45 -translate-y-2")} />
          </button>
        </div>
      </nav>

      <div className={cn(
        "fixed inset-0 z-[999] bg-abyss/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 transition-all duration-500 ease-expo md:hidden",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {links.map((l, i) => (
          <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
            className="font-display text-3xl text-white no-underline hover:text-turq transition-colors duration-300"
            style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms` }}
          >{l.label}</Link>
        ))}
        <div className="flex gap-3 mt-4">
          {locales.map((loc) => (
            <Link key={loc} href={localeSwitchPath(loc)} onClick={() => setOpen(false)} className={cn(
              "font-body text-base font-bold px-4 py-2 rounded-full no-underline uppercase transition-all",
              loc === locale ? "bg-turq/20 text-turq border border-turq/30" : "text-white/40 border border-white/10 hover:text-white/70"
            )}>{localeNames[loc]}</Link>
          ))}
        </div>
        <a href={SITE.phoneHref} className="no-underline mt-4">
          <button className="btn-primary px-8 py-4 text-lg">📞 {SITE.phone}</button>
        </a>
      </div>
    </>
  );
}
