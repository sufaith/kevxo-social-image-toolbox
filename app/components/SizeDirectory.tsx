import Link from "next/link";
import { platforms } from "../data/presets";

export function SizeDirectory({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "size-directory compact" : "size-directory"} id="sizes" aria-labelledby="size-guide-title">
      <div className="shell">
        <div className="section-heading">
          <div><span className="eyebrow">2026 SIZE DIRECTORY</span><h2 id="size-guide-title">Every major platform, ready to export.</h2></div>
          <p>{platforms.length} platform guides and {platforms.reduce((sum, item) => sum + item.presets.length, 0)} practical presets, kept in one searchable library.</p>
        </div>
        <div className="platform-card-grid">
          {platforms.map((platform, index) => (
            <Link className="platform-card" href={`/${platform.slug}/`} key={platform.id} style={{ "--platform": platform.color } as React.CSSProperties}>
              <span className="platform-card-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="platform-card-mark">{platform.mark}</span>
              <div><h3>{platform.name}</h3><p>{platform.tagline}</p></div>
              <span className="platform-card-count">{platform.presets.length} sizes</span>
              <span className="platform-card-arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
