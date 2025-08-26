import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'www.google.com', 'kaarwan.s3.amazonaws.com', 'via.placeholder.com'],
  },
  typescript:{
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
