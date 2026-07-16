"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { GALLERY_IMAGES } from "@/lib/constants";
import { useReveal } from "@/lib/hooks";

type GalleryDict = { title1: string; title2: string; subtitle: string };

// Duplicamos la lista para dar sensación de loop infinito.
const SLIDES = [...GALLERY_IMAGES, ...GALLERY_IMAGES];

export default function Gallery({ dict }: { dict: GalleryDict }) {
  const [ref, vis] = useReveal();
  const scroller = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const paused = useRef(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const [isDown, setIsDown] = useState(false);

  const SPEED = 0.5; // px por frame

  const tick = useCallback(() => {
    const el = scroller.current;
    if (el && !paused.current && !dragging.current) {
      el.scrollLeft += SPEED;
      // reset invisible al llegar a la mitad (lista duplicada)
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    }
    rafId.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [tick]);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    dragging.current = true;
    setIsDown(true);
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !dragging.current) return;
    el.scrollLeft = startScroll.current - (e.clientX - startX.current);
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    if (el.scrollLeft < 0) el.scrollLeft += half;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = scroller.current;
    dragging.current = false;
    setIsDown(false);
    if (el) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    }
  };

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onTouchStart={() => (paused.current = true)}
        onTouchEnd={() => (paused.current = false)}
        className="flex gap-3 sm:gap-4 overflow-x-scroll no-scrollbar select-none px-4 sm:px-5"
        style={{
          cursor: isDown ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
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
              className="w-full h-full object-cover pointer-events-none"
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
