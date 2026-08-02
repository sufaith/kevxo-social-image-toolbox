export type SafeZone = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
};

export type ImagePreset = {
  id: string;
  name: string;
  width: number;
  height: number;
  note: string;
  safeZone?: SafeZone;
};

export type Platform = {
  id: string;
  name: string;
  mark: string;
  color: string;
  slug: string;
  tagline: string;
  description: string;
  updated: string;
  presets: ImagePreset[];
  tips: string[];
  faq: { question: string; answer: string }[];
};

const storySafeZone: SafeZone = {
  x: 0.08,
  y: 0.13,
  width: 0.84,
  height: 0.70,
  label: "Keep text and logos inside this area",
};

export const platforms: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    mark: "IG",
    color: "#f04d8a",
    slug: "instagram-image-sizes",
    tagline: "Posts, Stories, Reels and profile images",
    description: "Resize images for Instagram posts, carousels, Stories, Reels covers and profile photos without stretching or guesswork.",
    updated: "August 2026",
    presets: [
      { id: "instagram-square", name: "Square post", width: 1080, height: 1080, note: "1:1 feed and carousel" },
      { id: "instagram-portrait", name: "Portrait post", width: 1080, height: 1350, note: "4:5 high-impact feed" },
      { id: "instagram-tall", name: "Tall portrait", width: 1080, height: 1440, note: "3:4 supported photo" },
      { id: "instagram-landscape", name: "Landscape post", width: 1080, height: 566, note: "1.91:1 wide feed" },
      { id: "instagram-story", name: "Story", width: 1080, height: 1920, note: "9:16 full-screen", safeZone: storySafeZone },
      { id: "instagram-reel-cover", name: "Reel cover", width: 1080, height: 1920, note: "9:16 cover", safeZone: storySafeZone },
      { id: "instagram-profile", name: "Profile photo", width: 320, height: 320, note: "1:1, displayed as circle" },
    ],
    tips: ["Use 1080 px width to preserve detail after platform compression.", "Keep important text near the center of Stories and Reel covers.", "Use PNG for graphics and JPEG/WebP for photography."],
    faq: [
      { question: "What is the best Instagram post size?", answer: "1080 × 1350 px (4:5) uses more vertical feed space, while 1080 × 1080 px is the most reusable square format." },
      { question: "What size should Instagram Stories be?", answer: "Use 1080 × 1920 px at a 9:16 aspect ratio and keep important content away from the top and bottom interface areas." },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    mark: "f",
    color: "#4f78ff",
    slug: "facebook-image-sizes",
    tagline: "Feed, Stories, covers, events and profiles",
    description: "Create sharp Facebook feed images, Page covers, event covers, Stories and profile photos with recommended dimensions.",
    updated: "August 2026",
    presets: [
      { id: "facebook-post", name: "Feed post", width: 1200, height: 630, note: "1.91:1 link and feed" },
      { id: "facebook-square", name: "Square post", width: 1080, height: 1080, note: "1:1 versatile feed" },
      { id: "facebook-story", name: "Story", width: 1080, height: 1920, note: "9:16 full-screen", safeZone: storySafeZone },
      { id: "facebook-cover", name: "Page cover", width: 851, height: 315, note: "Fast-loading Page cover", safeZone: { x: 0.18, y: 0.10, width: 0.72, height: 0.80, label: "Avoid the profile-photo overlap" } },
      { id: "facebook-event", name: "Event cover", width: 1920, height: 1005, note: "Wide event header" },
      { id: "facebook-profile", name: "Profile photo", width: 320, height: 320, note: "Displayed as circle" },
    ],
    tips: ["Use a PNG when the image contains a logo or crisp text.", "Keep Page-cover details away from the left-side profile image.", "Preview crops on both mobile and desktop."],
    faq: [
      { question: "What size is a Facebook Page cover?", answer: "851 × 315 px is a fast-loading recommended export, while Facebook displays covers responsively and may crop the edges." },
      { question: "What size is a Facebook profile photo?", answer: "Export at least 320 × 320 px and keep the subject centered because Facebook displays it inside a circle." },
    ],
  },
  {
    id: "x",
    name: "X (Twitter)",
    mark: "X",
    color: "#111827",
    slug: "twitter-image-sizes",
    tagline: "Posts, headers and profile photos",
    description: "Prepare images for X posts, profile headers and avatars with crops that stay clear across responsive layouts.",
    updated: "August 2026",
    presets: [
      { id: "x-landscape", name: "Landscape post", width: 1600, height: 900, note: "16:9 media post" },
      { id: "x-link", name: "Link card", width: 1200, height: 628, note: "1.91:1 website card" },
      { id: "x-square", name: "Square post", width: 1080, height: 1080, note: "1:1 reusable social" },
      { id: "x-header", name: "Profile header", width: 1500, height: 500, note: "3:1 responsive banner", safeZone: { x: 0.12, y: 0.18, width: 0.76, height: 0.64, label: "60 px may crop from top and bottom" } },
      { id: "x-profile", name: "Profile photo", width: 400, height: 400, note: "1:1, displayed as circle" },
    ],
    tips: ["Keep header text inside the middle band because top and bottom can crop.", "Use 16:9 for a familiar media preview.", "Export text-heavy cards as PNG."],
    faq: [
      { question: "What is the X header image size?", answer: "The recommended X header size is 1500 × 500 px. Allow extra breathing room because parts of the image can crop on different displays." },
      { question: "What is the X profile photo size?", answer: "Use 400 × 400 px in JPEG or PNG format and center the subject for the circular crop." },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    mark: "in",
    color: "#1474d4",
    slug: "linkedin-image-sizes",
    tagline: "Posts, profiles and Company Pages",
    description: "Resize LinkedIn post graphics, personal cover images, Company Page covers and logos for a professional, sharp result.",
    updated: "August 2026",
    presets: [
      { id: "linkedin-post", name: "Landscape post", width: 1200, height: 627, note: "1.91:1 feed image" },
      { id: "linkedin-portrait", name: "Portrait post", width: 1080, height: 1350, note: "4:5 feed image" },
      { id: "linkedin-square", name: "Square post", width: 1080, height: 1080, note: "1:1 carousel-friendly" },
      { id: "linkedin-cover", name: "Profile cover", width: 1584, height: 396, note: "4:1 personal banner", safeZone: { x: 0.16, y: 0.12, width: 0.76, height: 0.76, label: "Allow for profile-photo overlap" } },
      { id: "linkedin-company-cover", name: "Company cover", width: 4200, height: 700, note: "6:1 Company Page" },
      { id: "linkedin-company-logo", name: "Company logo", width: 400, height: 400, note: "1:1 Page logo" },
    ],
    tips: ["LinkedIn accepts post ratios from 3:1 through 4:5.", "Center key copy in profile covers to survive responsive cropping.", "Use a high-contrast square company logo."],
    faq: [
      { question: "What size is a LinkedIn profile cover?", answer: "Use 1584 × 396 px for a personal LinkedIn profile cover and keep important details away from the lower-left profile-photo area." },
      { question: "What size should a LinkedIn post image be?", answer: "1200 × 627 px works well for landscape posts. LinkedIn also supports taller images up to a 4:5 ratio." },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    mark: "▶",
    color: "#ff4343",
    slug: "youtube-image-sizes",
    tagline: "Thumbnails, channel art and Shorts",
    description: "Build YouTube thumbnails, channel banners, profile images and Shorts covers with the right safe areas and aspect ratios.",
    updated: "August 2026",
    presets: [
      { id: "youtube-thumbnail", name: "Video thumbnail", width: 1280, height: 720, note: "16:9 thumbnail" },
      { id: "youtube-banner", name: "Channel banner", width: 2560, height: 1440, note: "TV-ready channel art", safeZone: { x: 0.198, y: 0.383, width: 0.604, height: 0.294, label: "1546 × 423 px text and logo safe area" } },
      { id: "youtube-profile", name: "Profile picture", width: 800, height: 800, note: "1:1 channel avatar" },
      { id: "youtube-shorts", name: "Shorts cover", width: 1080, height: 1920, note: "9:16 vertical cover", safeZone: storySafeZone },
      { id: "youtube-community", name: "Community post", width: 1200, height: 1200, note: "1:1 community image" },
    ],
    tips: ["Design thumbnails at 1280 × 720 with large, readable focal elements.", "Keep channel-banner text inside the 1546 × 423 px safe area.", "Avoid putting critical detail near the Shorts interface edges."],
    faq: [
      { question: "What size is a YouTube thumbnail?", answer: "Use 1280 × 720 px at a 16:9 aspect ratio for a crisp YouTube video thumbnail." },
      { question: "What is the safe area for YouTube channel art?", answer: "For a 2560 × 1440 px banner, keep text and logos inside the centered 1546 × 423 px safe area." },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    mark: "♪",
    color: "#21d4c3",
    slug: "tiktok-image-sizes",
    tagline: "Vertical covers, carousels and profiles",
    description: "Resize TikTok vertical covers, story graphics, carousel images and profile photos while protecting content from interface overlays.",
    updated: "August 2026",
    presets: [
      { id: "tiktok-vertical", name: "Video cover", width: 1080, height: 1920, note: "9:16 full-screen", safeZone: storySafeZone },
      { id: "tiktok-story", name: "Story", width: 1080, height: 1920, note: "9:16 story", safeZone: storySafeZone },
      { id: "tiktok-carousel-vertical", name: "Vertical carousel", width: 720, height: 1280, note: "9:16 image carousel", safeZone: storySafeZone },
      { id: "tiktok-carousel-square", name: "Square carousel", width: 640, height: 640, note: "1:1 image carousel" },
      { id: "tiktok-carousel-wide", name: "Wide carousel", width: 1200, height: 628, note: "Horizontal carousel" },
      { id: "tiktok-profile", name: "Profile photo", width: 200, height: 200, note: "1:1 profile image" },
    ],
    tips: ["Keep captions, logos and faces away from the bottom and right interface areas.", "Start with a 1080 × 1920 master for vertical creative.", "Use a consistent crop across carousel cards."],
    faq: [
      { question: "What size is a TikTok image or cover?", answer: "A 1080 × 1920 px, 9:16 canvas is the best starting point for full-screen TikTok creative." },
      { question: "What sizes work for TikTok carousel images?", answer: "Common carousel exports include 720 × 1280 vertical, 640 × 640 square and 1200 × 628 horizontal." },
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    mark: "P",
    color: "#e43b45",
    slug: "pinterest-image-sizes",
    tagline: "Standard Pins, Idea Pins and profile covers",
    description: "Create Pinterest standard Pins, square Pins, full-screen Idea Pins and business profile covers with feed-friendly crops.",
    updated: "August 2026",
    presets: [
      { id: "pinterest-standard", name: "Standard Pin", width: 1000, height: 1500, note: "2:3 recommended Pin" },
      { id: "pinterest-square", name: "Square Pin", width: 1000, height: 1000, note: "1:1 Pin or carousel" },
      { id: "pinterest-idea", name: "Idea Pin", width: 1080, height: 1920, note: "9:16 full-screen", safeZone: { x: 0.06, y: 0.14, width: 0.76, height: 0.63, label: "Pinterest UI safe area" } },
      { id: "pinterest-cover", name: "Profile cover", width: 800, height: 450, note: "16:9 business cover" },
    ],
    tips: ["Use 1000 × 1500 px for the recommended 2:3 Pin ratio.", "Taller-than-2:3 Pins may be cut off in the feed.", "Add useful titles and descriptions after uploading to improve discovery."],
    faq: [
      { question: "What is the recommended Pinterest Pin size?", answer: "Pinterest recommends a 2:3 aspect ratio, commonly exported at 1000 × 1500 px." },
      { question: "What happens if a Pin is too tall?", answer: "Pins taller than a 2:3 ratio can be cut off in feeds, so place the key message near the top and use the recommended canvas." },
    ],
  },
  {
    id: "threads",
    name: "Threads",
    mark: "@",
    color: "#8b5cf6",
    slug: "threads-image-sizes",
    tagline: "Square, portrait, landscape and profile images",
    description: "Prepare flexible Threads images for square, portrait and landscape posts plus profile photos.",
    updated: "August 2026",
    presets: [
      { id: "threads-square", name: "Square post", width: 1080, height: 1080, note: "1:1 post" },
      { id: "threads-portrait", name: "Portrait post", width: 1080, height: 1350, note: "4:5 post" },
      { id: "threads-landscape", name: "Landscape post", width: 1200, height: 675, note: "16:9 post" },
      { id: "threads-profile", name: "Profile photo", width: 320, height: 320, note: "1:1, circular display" },
    ],
    tips: ["Choose 4:5 when you want more feed height.", "Keep profile-photo subjects centered for circular cropping.", "Use square as the most reusable cross-platform format."],
    faq: [
      { question: "What image size works best on Threads?", answer: "1080 × 1350 px is a strong portrait choice, while 1080 × 1080 px is the most reusable square option." },
      { question: "Can I use landscape images on Threads?", answer: "Yes. A 1200 × 675 px 16:9 image works well for wide photography and link-style graphics." },
    ],
  },
  {
    id: "snapchat",
    name: "Snapchat",
    mark: "S",
    color: "#f6d900",
    slug: "snapchat-image-sizes",
    tagline: "Stories, ads and profile assets",
    description: "Format Snapchat Stories, full-screen image ads and profile assets on a mobile-first 9:16 canvas.",
    updated: "August 2026",
    presets: [
      { id: "snapchat-story", name: "Story", width: 1080, height: 1920, note: "9:16 full-screen", safeZone: storySafeZone },
      { id: "snapchat-ad", name: "Single image ad", width: 1080, height: 1920, note: "9:16 mobile ad", safeZone: storySafeZone },
      { id: "snapchat-square", name: "Square asset", width: 1080, height: 1080, note: "1:1 reusable image" },
    ],
    tips: ["Design vertically first at 1080 × 1920 px.", "Keep copy away from top navigation and bottom calls to action.", "Use a simple focal point that reads instantly on mobile."],
    faq: [
      { question: "What size is a Snapchat Story image?", answer: "Use 1080 × 1920 px at a 9:16 aspect ratio for a full-screen Snapchat Story." },
      { question: "Where should text go on a Snapchat image?", answer: "Keep text and logos inside the central safe area so interface elements do not cover them." },
    ],
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    mark: "WA",
    color: "#1ec97f",
    slug: "whatsapp-image-sizes",
    tagline: "Status, profile and link preview images",
    description: "Resize WhatsApp Status graphics, profile photos and link preview images with fast local exports.",
    updated: "August 2026",
    presets: [
      { id: "whatsapp-status", name: "Status", width: 1080, height: 1920, note: "9:16 full-screen", safeZone: storySafeZone },
      { id: "whatsapp-profile", name: "Profile photo", width: 640, height: 640, note: "1:1, displayed as circle" },
      { id: "whatsapp-link", name: "Link preview", width: 1200, height: 630, note: "1.91:1 share preview" },
      { id: "whatsapp-square", name: "Square share", width: 1080, height: 1080, note: "1:1 image share" },
    ],
    tips: ["Use 9:16 for a screen-filling Status image.", "Center profile subjects because the display crop is circular.", "Keep link-preview headlines large and concise."],
    faq: [
      { question: "What size is a WhatsApp Status image?", answer: "Use 1080 × 1920 px at a 9:16 aspect ratio for a full-screen Status image." },
      { question: "What size should a WhatsApp profile photo be?", answer: "A 640 × 640 px square gives enough detail; center the subject for the circular display crop." },
    ],
  },
  {
    id: "discord",
    name: "Discord",
    mark: "D",
    color: "#6875ef",
    slug: "discord-image-sizes",
    tagline: "Server icons, banners and profile assets",
    description: "Create Discord server icons, profile avatars and banners that stay crisp in compact and wide interface placements.",
    updated: "August 2026",
    presets: [
      { id: "discord-server-icon", name: "Server icon", width: 512, height: 512, note: "1:1 server icon" },
      { id: "discord-profile", name: "Profile avatar", width: 512, height: 512, note: "1:1 profile image" },
      { id: "discord-profile-banner", name: "Profile banner", width: 960, height: 540, note: "16:9 banner" },
      { id: "discord-server-banner", name: "Server banner", width: 960, height: 540, note: "16:9 server banner" },
      { id: "discord-invite", name: "Invite splash", width: 1920, height: 1080, note: "16:9 invite background" },
    ],
    tips: ["Use a bold, centered icon that remains clear at small sizes.", "Avoid tiny text in profile and server banners.", "Export transparent logos as PNG."],
    faq: [
      { question: "What size is a Discord server icon?", answer: "Use a 512 × 512 px square image and keep the key mark centered for the rounded display crop." },
      { question: "What size is a Discord banner?", answer: "A 960 × 540 px 16:9 image works well for profile and server banners." },
    ],
  },
  {
    id: "twitch",
    name: "Twitch",
    mark: "T",
    color: "#9b5cff",
    slug: "twitch-image-sizes",
    tagline: "Channel banners, thumbnails and profile images",
    description: "Prepare Twitch profile images, offline screens, profile banners and video thumbnails for a consistent channel brand.",
    updated: "August 2026",
    presets: [
      { id: "twitch-profile", name: "Profile picture", width: 800, height: 800, note: "1:1 channel avatar" },
      { id: "twitch-offline", name: "Offline banner", width: 1920, height: 1080, note: "16:9 offline screen" },
      { id: "twitch-profile-banner", name: "Profile banner", width: 1200, height: 480, note: "5:2 channel banner" },
      { id: "twitch-thumbnail", name: "Video thumbnail", width: 1280, height: 720, note: "16:9 video card" },
      { id: "twitch-panel", name: "Channel panel", width: 640, height: 320, note: "2:1 information panel" },
    ],
    tips: ["Use a 1920 × 1080 offline screen for sharp full-width display.", "Keep banner details centered across responsive widths.", "Design panels as a visually consistent series."],
    faq: [
      { question: "What size is a Twitch offline banner?", answer: "Use 1920 × 1080 px at 16:9 for a crisp offline channel screen." },
      { question: "What size should a Twitch profile picture be?", answer: "An 800 × 800 px square export gives enough detail for Twitch's profile display." },
    ],
  },
  {
    id: "bluesky",
    name: "Bluesky",
    mark: "B",
    color: "#1684ff",
    slug: "bluesky-image-sizes",
    tagline: "Posts, profile photos and banners",
    description: "Resize Bluesky post images, profile avatars and header banners for crisp cross-device presentation.",
    updated: "August 2026",
    presets: [
      { id: "bluesky-landscape", name: "Landscape post", width: 1200, height: 675, note: "16:9 post image" },
      { id: "bluesky-square", name: "Square post", width: 1080, height: 1080, note: "1:1 post image" },
      { id: "bluesky-portrait", name: "Portrait post", width: 1080, height: 1350, note: "4:5 post image" },
      { id: "bluesky-banner", name: "Profile banner", width: 1500, height: 500, note: "3:1 profile header" },
      { id: "bluesky-profile", name: "Profile photo", width: 400, height: 400, note: "1:1 avatar" },
    ],
    tips: ["Use landscape for photography and square for reusable graphics.", "Add meaningful alt text when posting.", "Keep banner copy centered for responsive cropping."],
    faq: [
      { question: "What image size works for a Bluesky post?", answer: "1200 × 675 px is a strong 16:9 landscape option; 1080 × 1080 px is a flexible square alternative." },
      { question: "What size is a Bluesky profile banner?", answer: "A 1500 × 500 px, 3:1 canvas provides a practical high-resolution profile banner." },
    ],
  },
];

export const allPresets = platforms.flatMap((platform) =>
  platform.presets.map((preset) => ({ ...preset, platformId: platform.id, platformName: platform.name, platformColor: platform.color, platformMark: platform.mark }))
);

export function getPlatformBySlug(slug: string) {
  return platforms.find((platform) => platform.slug === slug);
}

export function getPresetById(id: string) {
  return allPresets.find((preset) => preset.id === id);
}
