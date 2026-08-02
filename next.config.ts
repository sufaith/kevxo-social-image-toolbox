import type { NextConfig } from "next";

const isStaticExport = process.env.KEVXO_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: { root: process.cwd() },
  ...(isStaticExport ? { output: "export" as const, images: { unoptimized: true } } : {}),
};

export default nextConfig;
