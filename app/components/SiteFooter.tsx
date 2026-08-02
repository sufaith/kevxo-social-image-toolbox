import Link from "next/link";
import { platforms } from "../data/presets";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-about">
          <Link className="brand brand-footer" href="/">
            <span className="brand-mark">K</span>
            <span><strong>Kevxo</strong><small>Social Image Toolkit</small></span>
          </Link>
          <p>Free, private image resizing for every major social platform. Your images stay on your device.</p>
        </div>
        <div>
          <strong className="footer-title">Popular tools</strong>
          <div className="footer-links">
            {platforms.slice(0, 6).map((platform) => <Link href={`/${platform.slug}/`} key={platform.id}>{platform.name} sizes</Link>)}
          </div>
        </div>
        <div>
          <strong className="footer-title">Company</strong>
          <div className="footer-links">
            <Link href="/about/">About Kevxo</Link>
            <Link href="/privacy/">Privacy policy</Link>
            <Link href="/terms/">Terms of use</Link>
            <a href="mailto:hello@kevxo.com">Contact</a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Kevxo</span>
        <span>Built for creators, marketers and small teams.</span>
      </div>
    </footer>
  );
}
