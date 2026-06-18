import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: weddingData.seo.title,
    short_name: "Wedding",
    description: weddingData.seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3f9",
    theme_color: "#9b7fc9",
    icons: [],
  };
}
