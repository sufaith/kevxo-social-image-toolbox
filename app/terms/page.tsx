import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using the free Kevxo social image toolkit.", alternates: { canonical: "/terms/" } };

export default function TermsPage() {
  return <><SiteHeader /><main className="legal-main"><div className="shell legal-shell"><span className="eyebrow">TERMS OF USE</span><h1>Simple terms for a simple tool.</h1><p className="legal-lede">Effective August 2, 2026</p><section><h2>Using Kevxo</h2><p>You may use Kevxo to resize and export images you own or are authorized to edit. Do not use the service to infringe rights, distribute illegal material, attack the site or interfere with other users.</p></section><section><h2>Your content</h2><p>You retain all rights to your images. Because image processing happens locally, Kevxo does not take ownership of or receive a license to source images processed in the editor.</p></section><section><h2>Platform information</h2><p>Dimension guides are maintained in good faith, but social platforms can change display behavior without notice. Preview important assets in the destination platform before publishing.</p></section><section><h2>Availability</h2><p>The service is provided as available without warranties of uninterrupted operation or fitness for a specific purpose. We may update, suspend or discontinue features.</p></section><section><h2>Contact</h2><p>Questions about these terms can be sent to <a href="mailto:hello@kevxo.com">hello@kevxo.com</a>.</p></section></div></main><SiteFooter /></>;
}
