import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fonts.google.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['iconoir-react'],
    webpackMemoryOptimizations: true,
    nextScriptWorkers: true,
  },
  serverExternalPackages: [
    "@tailwindcss/postcss",
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "@types/mdx",
    "@types/three",
    "tailwindcss",
    "typescript",
  ],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// export default MillionLint.next({
//   rsc: false, // Disable RSC for this project
//   filter: {
//     include: "**/*.{ts,js,tsx,jsx}",
//   },
//   react: '19',
//   turbo: true,
//   telemetry: false,
// })(withMDX(nextConfig));

export default withBundleAnalyzer(withMDX(nextConfig));