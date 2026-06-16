import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: weddingData.seo.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
