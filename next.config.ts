import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This rewrites /api/... → http://localhost:4001/... in development
  // and to your real backend in production
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // Change this to your production backend URL when you deploy
        destination:
          process.env.NODE_ENV === "production"
            ? "https://your-production-api.com/:path*" // ← UPDATE THIS LATER
            : "http://localhost:4001/:path*",
      },
    ];
  },
};

export default nextConfig;
