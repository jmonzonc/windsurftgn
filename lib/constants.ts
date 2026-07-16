export type LocationKey = "playa" | "puerto" | "ambas";

export const SITE = {
  name: "Windsurf Tarragona",
  phone: "977 23 27 15",
  phoneHref: "tel:+34977232715",
  whatsapp: "https://wa.me/34609874869",
  whatsappHref: "https://wa.me/34609874869",
  email: "info@windsurftarragona.com",
  address: "Ctra. N-340, Km 1168, Camping Las Palmeras",
  city: "Tarragona",
  coords: { lat: 41.13006, lng: 1.3171216 },
  mapsUrl:
    "https://www.google.com/maps/place/windsurftarragona/@41.1300896,1.3151239,16.68z/data=!4m6!3m5!1s0x12a3fb3cd930a36b:0xd6adc5684d4fa06d!8m2!3d41.13006!4d1.3171216!16s%2Fg%2F11g6wbz5bk",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1234!2d1.3171216!3d41.13006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a3fb3cd930a36b%3A0xd6adc5684d4fa06d!2sWindsurf%20Tarragona!5e0!3m2!1ses!2ses!4v1",
  instagram: "https://instagram.com/windsurftarragona",
  facebook: "https://facebook.com/windsurftarragona",
  url: "https://windsurftarragona.com",
} as const;

export const LOCATIONS = {
  playa: {
    id: "https://windsurftarragona.com/#playa-larga",
    slug: "playa-larga",
    streetAddress: "Ctra. N-340, Km 1168, Camping Las Palmeras",
    postalCode: "43007",
    coords: { lat: 41.13006, lng: 1.3171216 },
    mapsUrl: SITE.mapsUrl,
    mapsEmbed: SITE.mapsEmbed,
  },
  puerto: {
    id: "https://windsurftarragona.com/#puerto-tarragona",
    slug: "puerto-tarragona",
    streetAddress: "Moll de Costa, Port de Tarragona",
    postalCode: "43004",
    coords: { lat: 41.1096568, lng: 1.2464933 },
    mapsUrl:
      "https://www.google.com/maps/place/Moll+de+la+Costa,+43004,+Tarragona/@41.1096568,1.2464933,17z/data=!3m1!4b1!4m6!3m5!1s0x12a3e2d4728afe5b:0xaa7c881fdd4d7cab!8m2!3d41.1096568!4d1.2464933!16s%2Fg%2F12vtjxtms",
    mapsEmbed:
      "https://www.google.com/maps?q=Moll+de+la+Costa,+43004+Tarragona&ll=41.1096568,1.2464933&z=16&output=embed",
  },
} as const;

export const ACTIVITY_LOCATION: Record<string, LocationKey> = {
  "banana-boat": "puerto",
  kayak: "playa",
  "alquiler-windsurf": "playa",
  "alquiler-surf": "playa",
  "paseos-barco": "puerto",
  "big-paddle-surf": "playa",
};

export const COURSE_LOCATION: Record<string, LocationKey> = {
  windsurf: "playa",
  "wing-foil": "ambas", // fases 1 y 3 en Playa Larga · fase 2 (training-foil) en el Puerto
  "paddle-surf": "playa",
  "esqui-wake": "puerto",
  vela: "playa",
  catamaran: "playa",
  "patin-catalan": "playa",
};

// Sistema de imágenes local. Archivos en /public/images/.
const IMG = (name: string) => `/images/${name}`;

// Imagen base real (stand de Playa Larga). Se usa como placeholder para los
// cursos que aún no tienen foto propia. Sustituye cada curso-*.jpg cuando lleguen.
const BASE = IMG("base-playa-larga.jpg");

export const COURSE_IMAGES: Record<string, string> = {
  windsurf: IMG("curso-windsurf.jpg"),
  "wing-foil": IMG("curso-wing-foil.jpg"),
  "paddle-surf": IMG("curso-paddle-surf.jpg"),
  "esqui-wake": IMG("actividad-paseos-barco.jpg"), // lancha (arrastre esquí/wake)
  vela: BASE,
  catamaran: BASE,
  "patin-catalan": BASE,
};

export const ACTIVITY_IMAGES: Record<string, string> = {
  banana: IMG("actividad-banana.jpg"),
  kayak: IMG("actividad-kayak.jpg"),
  windsurf_rental: IMG("actividad-alquiler-windsurf.jpg"),
  surf_rental: IMG("actividad-alquiler-surf.jpg"),
  boat_rides: IMG("actividad-paseos-barco.jpg"),
  big_paddle_surf: IMG("actividad-big-paddle-surf.jpg"),
};

// Imágenes específicas para el header (hero) de la página de detalle, por slug.
// Si un slug no está aquí, el header usa la misma imagen de la card (ACTIVITY_IMAGES).
// [src, objectPosition] — objectPosition mantiene visible el sujeto bajo el título.
export const ACTIVITY_HEADER_IMAGES: Record<string, { src: string; position: string }> = {
  "banana-boat": { src: IMG("actividad-banana.jpg"), position: "center 35%" },
};

// Galería "clientes felices" — marquee horizontal auto + manual.
// Selección sin caras reconocibles de terceros/menores (blur suave por cara donde aplica).
export const GALLERY_IMAGES: { src: string; alt: string }[] = [
  { src: IMG("gal-windsurf-1.jpg"), alt: "Windsurfistas navegando en la Costa Dorada" },
  { src: IMG("gal-foil-2.jpg"), alt: "Wing-foil en el Puerto de Tarragona" },
  { src: IMG("gal-monitores.jpg"), alt: "Equipo de monitores de Windsurf Tarragona" },
  { src: IMG("gal-windsurf-salto.jpg"), alt: "Windsurf con salto de ola en Tarragona" },
  { src: IMG("gal-paddle-orilla.jpg"), alt: "Clase de paddle surf en Playa Larga" },
  { src: IMG("gal-generica-corro.jpg"), alt: "Actividad de grupo en el agua en la Costa Dorada" },
  { src: IMG("gal-banana-kayak.jpg"), alt: "Banana boat y kayak en aguas de la Costa Dorada" },
  { src: IMG("gal-windsurf-doble.jpg"), alt: "Windsurf en la Costa Dorada" },
  { src: IMG("gal-atardecer.jpg"), alt: "Atardecer en Playa Larga, Tarragona" },
];
