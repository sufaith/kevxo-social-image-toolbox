import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kevxo Social Image Toolkit",
    short_name: "Kevxo",
    description: "Resize images for every social media platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7fb",
    theme_color: "#6758e8",
    icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
