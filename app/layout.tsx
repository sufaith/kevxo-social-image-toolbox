import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kevxo.com"),
  title: { default: "Kevxo — Social Media Image Resizer", template: "%s | Kevxo" },
  description: "Free, private social media image resizer with exact 2026 sizes, safe-zone previews and batch exports for every major platform.",
  applicationName: "Kevxo",
  category: "Design tools",
  keywords: ["social media image sizes", "image resizer", "Instagram image size", "TikTok image size", "YouTube thumbnail size", "social media size guide"],
  authors: [{ name: "Kevxo Editorial Team", url: "https://kevxo.com/about/" }],
  creator: "Kevxo",
  publisher: "Kevxo",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kevxo.com/",
    siteName: "Kevxo",
    title: "Kevxo — One image. Every social size.",
    description: "Resize, crop and batch-export images for every major social platform. Free, private and no sign-up.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Kevxo turns one image into every social media size" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevxo — One image. Every social size.",
    description: "Free social image resizer with exact platform sizes and safe-zone previews.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }], apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }] },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#6758e8", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
