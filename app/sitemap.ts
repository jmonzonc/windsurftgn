import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE = "https://windsurftarragona.com";

const COURSE_KEYS = ["windsurf", "vela", "surf", "wakesurf", "catamaran", "patin-catalan"];
const ACTIVITY_KEYS = ["banana-boat", "kayak", "alquiler-windsurf", "alquiler-surf", "paseos-barco", "donut"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${BASE}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });

    for (const curso of COURSE_KEYS) {
      entries.push({
        url: `${BASE}/${locale}/escuela/${curso}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const actividad of ACTIVITY_KEYS) {
      entries.push({
        url: `${BASE}/${locale}/actividades/${actividad}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const page of ["grupos", "contacto", "privacidad"]) {
      entries.push({
        url: `${BASE}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "privacidad" ? 0.3 : 0.7,
      });
    }
  }

  return entries;
}
