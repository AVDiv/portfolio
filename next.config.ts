import type { NextConfig } from "next";
import MillionLint from "@million/lint";

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

// export default MillionLint.next({
//   rsc: false, // Disable RSC for this project
// })(nextConfig);

export default nextConfig;