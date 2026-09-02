import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // All imagery is local and served from /public, so no remote patterns are needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
