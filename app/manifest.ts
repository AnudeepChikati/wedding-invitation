import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: weddingData.seo.title,
    short_name: "Wedding",
    description: weddingData.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2ef",
    theme_color: "#8b7355",
    icons: [],
  };
}
