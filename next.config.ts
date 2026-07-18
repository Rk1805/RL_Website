import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow opening the dev server from phones/other devices on the local
  // network (e.g. http://192.168.x.x:3000) — without this, Next.js blocks
  // the dev assets cross-origin and the page loads without JavaScript.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.16.*.*", "*.local"],
};

export default nextConfig;
