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

// Sistema de imágenes local. Sube los archivos a /public/images/ con estos nombres exactos.
// Mientras no existan, se usa el fallback de Pexels (FALLBACK_*) para no romper el render.
const IMG = (name: string) => `/images/${name}`;

const FALLBACK = {
  windsurf: "https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=900",
  surf: "https://images.pexels.com/photos/390051/pexels-photo-390051.jpeg?auto=compress&cs=tinysrgb&w=900",
  wake: "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg?auto=compress&cs=tinysrgb&w=900",
  vela: "https://images.pexels.com/photos/273886/pexels-photo-273886.jpeg?auto=compress&cs=tinysrgb&w=900",
  boat: "https://images.pexels.com/photos/163236/pexels-photo-163236.jpeg?auto=compress&cs=tinysrgb&w=900",
  kayak: "https://images.pexels.com/photos/1497582/pexels-photo-1497582.jpeg?auto=compress&cs=tinysrgb&w=900",
} as const;

// Cambia USE_LOCAL_IMAGES a true cuando hayas subido las fotos reales a /public/images/.
export const USE_LOCAL_IMAGES = false;

export const COURSE_IMAGES: Record<string, string> = USE_LOCAL_IMAGES
  ? {
      windsurf: IMG("curso-windsurf.jpg"),
      "wing-foil": IMG("curso-wing-foil.jpg"),
      "paddle-surf": IMG("curso-paddle-surf.jpg"),
      "esqui-wake": IMG("curso-esqui-wake.jpg"),
      vela: IMG("curso-vela.jpg"),
      catamaran: IMG("curso-catamaran.jpg"),
      "patin-catalan": IMG("curso-patin-catalan.jpg"),
    }
  : {
      windsurf: FALLBACK.windsurf,
      "wing-foil": FALLBACK.windsurf,
      "paddle-surf": FALLBACK.surf,
      "esqui-wake": FALLBACK.wake,
      vela: FALLBACK.vela,
      catamaran: FALLBACK.boat,
      "patin-catalan": FALLBACK.vela,
    };

export const ACTIVITY_IMAGES: Record<string, string> = USE_LOCAL_IMAGES
  ? {
      banana: IMG("actividad-banana.jpg"),
      kayak: IMG("actividad-kayak.jpg"),
      windsurf_rental: IMG("actividad-alquiler-windsurf.jpg"),
      surf_rental: IMG("actividad-alquiler-surf.jpg"),
      boat_rides: IMG("actividad-paseos-barco.jpg"),
      big_paddle_surf: IMG("actividad-big-paddle-surf.jpg"),
    }
  : {
      banana: FALLBACK.wake,
      kayak: FALLBACK.kayak,
      windsurf_rental: FALLBACK.windsurf,
      surf_rental: FALLBACK.surf,
      boat_rides: FALLBACK.boat,
      big_paddle_surf: FALLBACK.surf,
    };
