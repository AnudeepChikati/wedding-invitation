import type { Metadata } from "next";
import localFont from "next/font/local";
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
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
