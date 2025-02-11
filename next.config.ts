import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
