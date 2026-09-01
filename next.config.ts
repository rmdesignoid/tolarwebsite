import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The published site is a static export served directly by Nginx on the VPS.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
