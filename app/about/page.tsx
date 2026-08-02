import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "About Kevxo", description: "How Kevxo maintains a fast, private and practical social media image toolkit.", alternates: { canonical: "/about/" } };

export default function AboutPage() {
  return <><SiteHeader /><main className="legal-main"><div className="shell legal-shell"><span className="eyebrow">ABOUT KEVXO</span><h1>A focused image toolkit for people who publish everywhere.</h1><p className="legal-lede">Kevxo reduces the repetitive work between a finished design and a complete social campaign.</p><section><h2>What we build</h2><p>Kevxo provides exact platform presets, visual crop controls, safe-zone previews and batch exports. It is designed for creators, marketers, founders and small teams that need dependable output without learning a complex editor.</p></section><section><h2>Privacy is part of the product</h2><p>The image editor runs in your browser. Source images are not uploaded to Kevxo, stored in an account or used for training. Closing the page clears the working session.</p></section><section><h2>How size guides are maintained</h2><p>We review official platform documentation and visible product changes, update the practical export presets, and date platform guides when they are reviewed. Responsive crops can still vary by device, so the editor includes safe-zone guidance where placement risk is highest.</p></section><section><h2>Corrections and contact</h2><p>Platforms change often. If a dimension or crop has changed, email <a href="mailto:hello@kevxo.com">hello@kevxo.com</a> with the platform, placement and an official reference. We review corrections before updating a guide.</p></section><Link className="primary-cta" href="/#studio">Open the image resizer <span>↗</span></Link></div></main><SiteFooter /></>;
}
