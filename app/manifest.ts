import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: weddingData.seo.title,
    short_name: "Wedding",
    description: weddingData.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff8ef",
    theme_color: "#7a2337",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
