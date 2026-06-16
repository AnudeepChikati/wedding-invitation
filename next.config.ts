import type { NextConfig } from "next";

process.env.NEXT_TELEMETRY_DISABLED ??= "1";
process.env.NEXT_DISABLE_FONT_DOWNLOADS ??= "1";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
