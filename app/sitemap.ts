import type { MetadataRoute } from "next";
import { platforms } from "./data/presets";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-02T00:00:00.000Z");
  return [
    { url: "https://kevxo.com/", lastModified: updated, changeFrequency: "weekly", priority: 1 },
    ...platforms.map((platform) => ({ url: `https://kevxo.com/${platform.slug}/`, lastModified: updated, changeFrequency: "monthly" as const, priority: 0.85 })),
    { url: "https://kevxo.com/about/", lastModified: updated, changeFrequency: "yearly", priority: 0.4 },
    { url: "https://kevxo.com/privacy/", lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
    { url: "https://kevxo.com/terms/", lastModified: updated, changeFrequency: "yearly", priority: 0.2 },
  ];
}
