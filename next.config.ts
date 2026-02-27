import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === "development"

const WP_URL = (
  process.env.WORDPRESS_RESOURCES_URL ||
  "https://hypefy-landing-wp-prod-gncqf8hkg2e4bmbc.northeurope-01.azurewebsites.net"
).replace(/\/+$/, "")

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "imgigp.modash.io",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // In dev, Next.js handles the blog rewrite. In production, Netlify handles it (see netlify.toml).
  async rewrites() {
    if (!isDev) return []

    return [
      {
        source: "/blog",
        destination: `${WP_URL}/`,
      },
      {
        source: "/blog/:path*",
        destination: `${WP_URL}/:path*`,
      },
      // HubSpot tracking - reverse proxy for local dev
      {
        source: "/hs/script/:path*",
        destination: "https://js-eu1.hs-scripts.com/:path*",
      },
      {
        source: "/hs/analytics/:path*",
        destination: "https://js-eu1.hs-analytics.net/:path*",
      },
      /*   {
        source: "/wp-content/:path*",
        destination: `${WP_URL}/wp-content/:path*`,
      }, */
      /*   {
        source: "/wp-includes/:path*",
        destination: `${WP_URL}/wp-includes/:path*`,
      }, */
      {
        source: "/hs/banner/:path*",
        destination: "https://js-eu1.hs-banner.com/:path*",
      },
      {
        source: "/hs/forms/:path*",
        destination: "https://forms-eu1.hsforms.com/:path*",
      },
      {
        source: "/hs/collected/:path*",
        destination: "https://forms-eu1.hscollectedforms.net/:path*",
      },
    ]
  },
}

export default nextConfig
