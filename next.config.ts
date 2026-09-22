import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /gallery/index.html so Cloudflare Pages resolves /gallery reliably
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Keep Turbopack scoped to this app (avoids picking up ~/package.json)
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
