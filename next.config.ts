import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com', 'dyaksa-api.laice.tech'],
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
