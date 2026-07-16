"use client";

import { useRef, useEffect, useCallback } from "react";
import { GALLERY_IMAGES } from "@/lib/constants";
import { useReveal } from "@/lib/hooks";

type GalleryDict = { title1: string; title2: string; subtitle: string };

// Duplicamos la lista para el loop infinito.
const SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function Gallery({ dict }: { dict: GalleryDict }) {
  const [ref, vis] = useReveal();
  const scroller = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const paused = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const SPEED = 0.5; // px por frame

  // Pausa el auto-scroll y programa reanudación tras inactividad.
  const pauseThenResume = useCallback((ms: number) => {
    paused.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, ms);
  }, []);

  const tick = useCallback(() => {
    const el = scroller.current;
    if (el && !paused.current) {
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        // reset sin salto perceptible
        el.scrollLeft -= half;
      }
      el.scrollLeft += SPEED;
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, [tick]);

  // Loop al hacer swipe manual hacia el inicio (el avance lo gestiona tick).
  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    if (el.scrollLeft <= 0) {
      el.scrollLeft += el.scrollWidth / 2;
    }
  }, []);

  return (
    <section
      id="galeria"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-gradient-to-b from-deep to-midnight py-14 sm:py-20 md:py-28 overflow-hidden"
    >
      <div
        className="max-w-[1140px] mx-auto px-4 sm:px-5 text-center mb-8 sm:mb-12"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h2 className="font-display text-white leading-[0.95] m-0" style={{ fontSize: "clamp(28px, 6vw, 60px)" }}>
          {dict.title1} <span className="gradient-text-turq">{dict.title2}</span>
        </h2>
        <p className="font-body text-white/55 mt-3 text-sm sm:text-base md:text-lg">{dict.subtitle}</p>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => pauseThenResume(4000)}
        onTouchMove={() => pauseThenResume(4000)}
        onTouchEnd={() => pauseThenResume(2500)}
        className="gallery-scroller flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar px-4 sm:px-5"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          overscrollBehaviorX: "contain",
        }}
      >
        {SLIDES.map((img, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            style={{
              width: "clamp(280px, 78vw, 560px)",
              aspectRatio: "4 / 3",
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              width={560}
              height={420}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `#galeria .no-scrollbar::-webkit-scrollbar{display:none}`,
        }}
      />
    </section>
  );
}
