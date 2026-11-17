import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash — used for high-quality hero / marketing imagery
      { protocol: "https", hostname: "images.unsplash.com" },
      // ImgBB — technician uploads (services, avatars)
      { protocol: "https", hostname: "i.ibb.co" },
    ],
  },
}

export default nextConfig
