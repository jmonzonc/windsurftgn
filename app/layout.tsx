import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Outfit } from "next/font/google";
import "./globals.css";

const delaGothic = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000B18",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://windsurftarragona.com"),
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${delaGothic.variable} ${outfit.variable} m-0 p-0 overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
