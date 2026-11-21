import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Keep the MongoDB driver outside the serverless bundle. Its internal
  // globals/connection pools must be shared correctly across warm invocations.
  serverExternalPackages: ["mongodb"],
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
