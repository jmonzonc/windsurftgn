/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:locale/escuela/surf",
        destination: "/:locale/escuela/paddle-surf",
        permanent: true,
      },
      {
        source: "/:locale/escuela/wakesurf",
        destination: "/:locale/escuela/esqui-wake",
        permanent: true,
      },
      {
        source: "/:locale/actividades/aquamarina",
        destination: "/:locale/actividades/big-paddle-surf",
        permanent: true,
      },
      {
        source: "/:locale/actividades/donut",
        destination: "/:locale/actividades",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
