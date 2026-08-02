# Kevxo Social Image Toolkit

Kevxo is a free, private social media image resizer for creators and marketing teams. It includes 65 exact presets across 13 platforms, safe-zone previews, crop controls, custom sizes, PNG/JPG/WebP export and multi-size ZIP downloads.

## Product highlights

- Browser-only image processing; source images are never uploaded
- Instagram, Facebook, X, LinkedIn, YouTube, TikTok, Pinterest, Threads, Snapchat, WhatsApp, Discord, Twitch and Bluesky guides
- Platform-specific static landing pages with unique metadata and structured data
- Static `robots.txt`, XML sitemap, PWA manifest, Open Graph card and legal pages
- Atomic GitHub Actions deployment to the production server

## Local development

Requires Node.js 24.

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run lint
npm test
npm run build
```

`npm test` creates the static production export and verifies key HTML and crawler signals.

## Deployment

Pushes to `main` run `.github/workflows/deploy.yml`, build the static export and atomically switch the production release at `/www/wwwroot/kevxo.com/current`.

Required GitHub Actions secrets:

- `DEPLOY_HOST`
- `DEPLOY_PORT`
- `DEPLOY_USER`
- `DEPLOY_SSH_KEY`

Production: [https://kevxo.com](https://kevxo.com)
