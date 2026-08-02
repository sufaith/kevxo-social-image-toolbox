import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageStudio } from "../components/ImageStudio";
import { JsonLd } from "../components/JsonLd";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { getPlatformBySlug, platforms } from "../data/presets";

export const dynamicParams = false;

export function generateStaticParams() {
  return platforms.map((platform) => ({ platform: platform.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);
  if (!platform) return {};
  const title = `${platform.name} Image Sizes 2026 — Free Resizer`;
  const description = `${platform.description} Updated ${platform.updated}. Free crop preview, exact presets and private browser exports.`;
  return {
    title,
    description,
    alternates: { canonical: `/${platform.slug}/` },
    openGraph: { title, description, url: `https://kevxo.com/${platform.slug}/`, type: "website" },
  };
}

const sourceLinks: Record<string, { label: string; url: string }[]> = {
  instagram: [{ label: "Meta Help — Instagram image resolution", url: "https://www.facebook.com/help/1631821640426723/" }],
  facebook: [{ label: "Facebook Help — Page image dimensions", url: "https://www.facebook.com/help/125379114252045" }],
  x: [{ label: "X Help — profile and header image sizes", url: "https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo" }],
  linkedin: [{ label: "LinkedIn Help — profile cover specifications", url: "https://www.linkedin.com/help/linkedin/answer/a568217" }, { label: "LinkedIn Help — photo sharing requirements", url: "https://www.linkedin.com/help/linkedin/answer/a527229" }],
  youtube: [{ label: "YouTube Help — channel branding sizes", url: "https://support.google.com/youtube/answer/10456525" }],
  tiktok: [{ label: "TikTok Business — carousel specifications", url: "https://ads.tiktok.com/help/article/specifications-for-carousel-ads" }],
  pinterest: [{ label: "Pinterest Business — product specifications", url: "https://help.pinterest.com/en/business/article/pinterest-product-specs" }],
};

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform: slug } = await params;
  const platform = getPlatformBySlug(slug);
  if (!platform) notFound();
  const related = platforms.filter((item) => item.id !== platform.id).slice(0, 4);
  const sources = sourceLinks[platform.id] || [];
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Kevxo", item: "https://kevxo.com/" },
            { "@type": "ListItem", position: 2, name: `${platform.name} image sizes`, item: `https://kevxo.com/${platform.slug}/` },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: platform.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
        },
      ]} />
      <SiteHeader />
      <main>
        <section className="platform-hero" style={{ "--platform": platform.color } as React.CSSProperties}>
          <div className="shell">
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{platform.name} sizes</span></nav>
            <div className="platform-hero-grid">
              <div>
                <span className="platform-pill"><i>{platform.mark}</i> Updated {platform.updated}</span>
                <h1>{platform.name} image sizes<br /><em>& free resizer</em></h1>
                <p>{platform.description}</p>
                <div className="hero-actions"><Link className="primary-cta" href="#studio">Resize for {platform.name} <span>↓</span></Link><a className="secondary-cta" href="#size-chart">View size chart</a></div>
              </div>
              <div className="platform-ratio-stack" aria-hidden="true">
                {platform.presets.slice(0, 4).map((preset, index) => <span key={preset.id} style={{ aspectRatio: `${preset.width}/${preset.height}`, transform: `translate(${index * 26}px, ${index * 18}px)`, borderColor: index === 0 ? platform.color : undefined }}><b>{preset.width}<small>×</small>{preset.height}</b><em>{preset.name}</em></span>)}
              </div>
            </div>
          </div>
        </section>

        <ImageStudio initialPlatform={platform.id} />

        <section className="size-chart-section" id="size-chart">
          <div className="shell">
            <div className="section-heading"><div><span className="eyebrow">QUICK REFERENCE</span><h2>{platform.name} image size chart</h2></div><p>Exact export dimensions, aspect ratios and practical placement notes.</p></div>
            <div className="size-table-wrap">
              <table className="size-table">
                <thead><tr><th>Placement</th><th>Recommended size</th><th>Aspect ratio</th><th>Best used for</th></tr></thead>
                <tbody>{platform.presets.map((preset) => {
                  const divisor = (a: number, b: number): number => b === 0 ? a : divisor(b, a % b);
                  const gcd = divisor(preset.width, preset.height);
                  return <tr key={preset.id}><td><strong>{preset.name}</strong></td><td><code>{preset.width} × {preset.height} px</code></td><td>{preset.width / gcd}:{preset.height / gcd}</td><td>{preset.note}</td></tr>;
                })}</tbody>
              </table>
            </div>
            <p className="update-note"><span>✓</span> Reviewed {platform.updated}. Platforms can change crops by device; use the safe-zone preview for critical text and logos.</p>
          </div>
        </section>

        <section className="platform-guide-section">
          <div className="shell platform-guide-grid">
            <article>
              <span className="eyebrow">PUBLISHING GUIDE</span>
              <h2>How to resize an image for {platform.name}</h2>
              <ol>
                <li><b>1</b><span><strong>Upload the highest-quality source</strong><small>Kevxo reads it locally in your browser; the original is not sent to our servers.</small></span></li>
                <li><b>2</b><span><strong>Choose one or more {platform.name} presets</strong><small>Select the placements you plan to publish, from posts to profile assets.</small></span></li>
                <li><b>3</b><span><strong>Adjust the crop and safe area</strong><small>Keep the subject, logo and headline visible in responsive platform layouts.</small></span></li>
                <li><b>4</b><span><strong>Export one file or a complete ZIP</strong><small>Use PNG for graphics, or JPG/WebP for smaller photographic files.</small></span></li>
              </ol>
            </article>
            <aside className="tips-card" style={{ borderColor: platform.color }}>
              <span className="tips-mark" style={{ background: platform.color }}>{platform.mark}</span>
              <h3>{platform.name} design tips</h3>
              <ul>{platform.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
            </aside>
          </div>
        </section>

        <section className="faq-section platform-faq">
          <div className="shell faq-grid">
            <div><span className="eyebrow">{platform.name.toUpperCase()} FAQ</span><h2>Questions creators ask most.</h2><p>Dimensions are a starting point; always preview the final crop inside the platform before publishing.</p>{sources.length > 0 && <div className="sources"><strong>Official references</strong>{sources.map((source) => <a href={source.url} key={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a>)}</div>}</div>
            <div className="faq-list">{platform.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="related-section"><div className="shell"><div className="section-heading"><div><span className="eyebrow">KEEP CREATING</span><h2>Related image size guides</h2></div></div><div className="related-grid">{related.map((item) => <Link href={`/${item.slug}/`} key={item.id} style={{ "--platform": item.color } as React.CSSProperties}><i>{item.mark}</i><span><strong>{item.name}</strong><small>{item.presets.length} exact sizes</small></span><b>↗</b></Link>)}</div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
