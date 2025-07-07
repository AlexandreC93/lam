import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⛔ ignore les erreurs ESLint au build
  },
};
export default nextConfig;
