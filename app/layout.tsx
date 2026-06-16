import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Sans, Great_Vibes } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/data/wedding";

const bodyFont = localFont({
  src: "../public/fonts/body.ttf",
  variable: "--font-body",
  display: "swap",
});

const displayFont = localFont({
  src: "../public/fonts/display.ttf",
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geom",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-names",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(weddingData.seo.canonicalUrl),
  title: weddingData.seo.title,
  description: weddingData.seo.description,
  keywords: [...weddingData.seo.keywords],
  alternates: {
    canonical: weddingData.seo.canonicalUrl,
  },
  openGraph: {
    type: "website",
    title: weddingData.seo.title,
    description: weddingData.seo.description,
    url: weddingData.seo.canonicalUrl,
    siteName: weddingData.seo.title,
    images: [
      {
        url: "/images/couple-photo.jpg",
        width: 1200,
        height: 900,
        alt: weddingData.couple.heroImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingData.seo.title,
    description: weddingData.seo.description,
    images: ["/images/couple-photo.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable} ${dmSans.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  );
}
