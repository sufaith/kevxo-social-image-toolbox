import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Kevxo home">
          <span className="brand-mark">K</span>
          <span><strong>Kevxo</strong><small>Social Image Toolkit</small></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#studio">Image Resizer</Link>
          <Link href="/#sizes">Size Guide</Link>
          <Link href="/about/">About</Link>
        </nav>
        <Link className="header-cta" href="/#studio">Start resizing <span>↗</span></Link>
      </div>
    </header>
  );
}
