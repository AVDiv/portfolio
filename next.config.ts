import type { NextConfig } from "next";
import MillionLint from "@million/lint";
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

};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

// export default MillionLint.next({
//   rsc: false, // Disable RSC for this project
// })(withMDX);

export default withMDX;