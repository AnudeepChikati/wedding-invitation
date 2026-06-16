import type { MetadataRoute } from "next";
import { weddingData } from "@/data/wedding";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${weddingData.seo.canonicalUrl}/sitemap.xml`,
  };
}
