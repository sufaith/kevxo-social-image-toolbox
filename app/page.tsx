import type { Metadata } from "next";
import Link from "next/link";
import { ImageStudio } from "./components/ImageStudio";
import { JsonLd } from "./components/JsonLd";
import { SizeDirectory } from "./components/SizeDirectory";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { platforms } from "./data/presets";

export const metadata: Metadata = {
  title: "Social Media Image Resizer & Size Guide 2026",
  description: "Resize one image for Instagram, TikTok, YouTube, LinkedIn, Facebook, X, Pinterest and more. Crop, preview safe zones and batch download every social size free.",
  alternates: { canonical: "/" },
};

const commonFaq = [
  { question: "Is Kevxo free to use?", answer: "Yes. The social image resizer, platform presets, safe-zone previews and ZIP exports are free to use." },
  { question: "Are my images uploaded to a server?", answer: "No. Image processing runs locally in your browser. Kevxo does not upload or store the images you resize." },
  { question: "Which image formats can I export?", answer: "You can export PNG, JPG and WebP. PNG is best for graphics and logos; JPG or WebP is usually smaller for photographs." },
  { question: "Can I export several social media sizes at once?", answer: "Yes. Select any presets across the size library and download the finished images together in a ZIP file." },
];

export default function Home() {
  const presetCount = platforms.reduce((sum, platform) => sum + platform.presets.length, 0);
  return (
    <>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "WebSite", name: "Kevxo", url: "https://kevxo.com/", description: "Free social media image resizer and up-to-date platform size guide." },
        { "@context": "https://schema.org", "@type": "WebApplication", name: "Kevxo Social Image Resizer", url: "https://kevxo.com/", applicationCategory: "DesignApplication", operatingSystem: "Any", browserRequirements: "Requires a modern browser with Canvas support", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["Social media image resizing", "Safe zone previews", "PNG, JPG and WebP export", "Batch ZIP download", "Local browser processing"] },
        { "@context": "https://schema.org", "@type": "Organization", name: "Kevxo", url: "https://kevxo.com/", logo: "https://kevxo.com/icon-512.png" },
      ]} />
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <span className="hero-badge"><i /> Free · Private · No sign-up</span>
              <h1>One image.<br /><em>Every social size.</em></h1>
              <p>Resize, crop and batch-export perfect images for every major social platform — directly in your browser.</p>
              <div className="hero-actions"><Link className="primary-cta" href="#studio">Resize an image <span>↓</span></Link><Link className="secondary-cta" href="#sizes">Browse all {presetCount} sizes</Link></div>
              <div className="hero-trust"><span><b>0</b> uploads</span><span><b>{platforms.length}</b> platforms</span><span><b>{presetCount}</b> presets</span></div>
            </div>
            <div className="hero-product" aria-label="Social image workflow preview">
              <div className="hero-product-head"><span className="mini-brand"><b>K</b> kevxo</span><span className="product-dots"><i /><i /><i /></span></div>
              <div className="hero-workspace">
                <div className="hero-platform-list">
                  {platforms.slice(0, 5).map((platform, index) => <span className={index === 0 ? "active" : ""} key={platform.id}><i style={{ background: platform.color }}>{platform.mark}</i><small>{platform.name}</small></span>)}
                </div>
                <div className="hero-canvas"><span className="canvas-sun" /><span className="canvas-mountain one" /><span className="canvas-mountain two" /><b>CREATE<br />EVERYWHERE</b><small>1080 × 1350</small></div>
                <div className="hero-output-list"><span><i className="ratio-square" /><b>Square post</b><em>1080 × 1080</em></span><span className="active"><i className="ratio-portrait" /><b>Portrait post</b><em>1080 × 1350</em></span><span><i className="ratio-story" /><b>Story</b><em>1080 × 1920</em></span></div>
              </div>
              <div className="hero-product-foot"><span>Local processing</span><b>Download PNG ↓</b></div>
              <span className="hero-file-pill pill-one">✓ Instagram ready</span><span className="hero-file-pill pill-two">ZIP · {presetCount} files</span>
            </div>
          </div>
        </section>

        <ImageStudio />

        <section className="value-strip">
          <div className="shell value-grid">
            <article><span>01</span><div><h3>Private by design</h3><p>Your source image never leaves your browser. There is no account, upload queue or server copy.</p></div></article>
            <article><span>02</span><div><h3>Precision controls</h3><p>Choose fill or fit, reposition the focal point, zoom, rotate, flip and preview platform safe zones.</p></div></article>
            <article><span>03</span><div><h3>Batch-ready exports</h3><p>Select sizes across a platform and download clean PNG, JPG or WebP files together in one ZIP.</p></div></article>
          </div>
        </section>

        <SizeDirectory />

        <section className="seo-content-section">
          <div className="shell content-grid">
            <article>
              <span className="eyebrow">BUILT FOR REAL WORKFLOWS</span>
              <h2>Stop rebuilding the same design for every feed.</h2>
              <p>Social platforms display images in very different containers. A square post, vertical Story, wide header and video thumbnail can all start from the same source, but each needs a deliberate crop. Kevxo turns that repetitive task into one predictable workflow.</p>
              <p>Upload once, choose the destinations you need, adjust the focus on a live preview, then export. The original pixels stay on your device, which makes the tool useful for client work, launch materials and unreleased campaigns.</p>
            </article>
            <div className="process-list">
              <div><b>01</b><span><strong>Start with the largest source</strong><small>More source pixels give every landscape and portrait crop room to stay sharp.</small></span></div>
              <div><b>02</b><span><strong>Protect the focal point</strong><small>Use the horizontal and vertical focus controls to keep faces, products and copy visible.</small></span></div>
              <div><b>03</b><span><strong>Choose the right format</strong><small>PNG for clean graphics; JPG or WebP for smaller photographic files.</small></span></div>
              <div><b>04</b><span><strong>Check platform safe zones</strong><small>Keep critical content clear of interface buttons, profile overlays and responsive crops.</small></span></div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="shell faq-grid">
            <div><span className="eyebrow">COMMON QUESTIONS</span><h2>Social image resizing, explained.</h2><p>Short answers to the details that matter before you publish.</p></div>
            <div className="faq-list">{commonFaq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="final-cta">
          <div className="shell final-cta-inner"><div><span className="eyebrow">READY WHEN YOU ARE</span><h2>Make every post fit.</h2><p>No account. No watermark. No uploads.</p></div><Link className="primary-cta light" href="#studio">Resize your image <span>↑</span></Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
