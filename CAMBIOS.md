# Windsurf Tarragona — Cambios v2.1

## Archivos modificados / nuevos

### NUEVO
- `components/ui/WhatsAppButton.tsx` — botón flotante WhatsApp con ping animado
- `app/sitemap.ts` — 36 URLs con prioridades correctas
- `app/robots.ts` — crawl budget optimizado

### MODIFICADOS

| Archivo | Cambios |
|---------|---------|
| `lib/constants.ts` | Coords exactas (41.13006, 1.3171216) · WhatsApp correcto (+34609874869) · mapsEmbed con Place ID real · mapsUrl con URL completa de Google Maps |
| `app/globals.css` | Añadidos `.btn-ghost` y `.btn-wa` |
| `app/[locale]/layout.tsx` | JSON-LD Schema.org (LocalBusiness + SportsActivityLocation + aggregateRating) · WhatsAppButton flotante |
| `components/layout/Navbar.tsx` | Fix navbar flash en páginas claras (isLightPage) · Botón WhatsApp en desktop y mobile · </a> huérfanos eliminados |
| `components/sections/Hero.tsx` | btn-ghost definido · CTA1 → /actividades/banana-boat · CTA2 → #escuela · CTA3 → #actividades |
| `components/sections/BananaBoat.tsx` | Pill comercial eliminado · CTA "quiero" → WhatsApp · "Ver precio" → /actividades/banana-boat |
| `components/sections/Stats.tsx` | Contador animado con easing cúbico (useCounter hook) |
| `components/sections/Actividades.tsx` | Altura uniforme 360px para todas las cards · Badge "Nº1" eliminado |
| `components/sections/Contact.tsx` | Maps con SITE.mapsEmbed · ContactCard envuelto en <a> con hrefs reales |
| `app/[locale]/contacto/page.tsx` | import SITE · Maps con SITE.mapsEmbed · Cards de contacto clickables · Botón "Cómo llegar" |
| `messages/es.json` | banana.pill sin tono comercial · banana.price → "Ver más info" |
| `messages/ca.json` | Ídem en catalán |
| `messages/en.json` | Ídem en inglés |

## Checklist de deploy

- [ ] `git add .` y `git commit -m "v2.1: maps, whatsapp, navbar, schema, sitemap"`
- [ ] `git push` → Vercel build automático
- [ ] Verificar build logs en Vercel (sin errores TypeScript)
- [ ] Comprobar https://windsurftarragona.com/sitemap.xml
- [ ] Comprobar https://windsurftarragona.com/robots.txt
- [ ] Validar JSON-LD en https://search.google.com/test/rich-results
- [ ] Enviar sitemap en Google Search Console
