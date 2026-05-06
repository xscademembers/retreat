# Salsons Retreat Static Landing Page

This is a static, mobile-first landing page built to optimize Google Ads Quality Score for Salsons Retreat. It has been built using plain HTML, vanilla CSS, and minimal JS for maximum performance.

## Files Structure

```
salsons-retreat-landing/
├── index.html               # The main landing page
├── styles/
│   └── main.css             # Vanilla CSS, mobile-first design
├── scripts/
│   └── analytics.js         # GTM dataLayer events for tracking
├── fonts/                   # Self-hosted Plus Jakarta Sans fonts
├── robots.txt               # SEO robots configuration
├── sitemap.xml              # SEO sitemap
├── CONTENT_NEEDED.md        # List of placeholders to fill
└── LAUNCH_CHECKLIST.md      # Final checks before going live
```

## How to Deploy

1. **Fill Placeholders**: Open `index.html` and replace all `{{PLACEHOLDER}}` strings with real content (see `CONTENT_NEEDED.md`).
2. **Setup GTM**: Replace `{{GTM_ID}}` in `index.html` with your Google Tag Manager container ID. The `analytics.js` script pushes custom events (like `call_click_hero`) to the `dataLayer`.
3. **Hosting**: This is a fully static site. It can be hosted easily on Vercel, Netlify, Cloudflare Pages, or any standard web server. Just upload the contents of the `salsons-retreat-landing/` directory.

## Maintenance

- **Adding New Photos**: To update gallery photos, replace the image URLs in `index.html`. Since the images use Wix CDN URLs with transform parameters (like `/v1/fill/w_1920,h_1080,al_c,q_80,enc_avif/img.webp`), you can use the same pattern for new Wix-hosted images to automatically get AVIF/WebP formats.
- **Updating CSS**: Edit `styles/main.css`. The CSS uses custom properties (variables) at the top for colors and fonts, making theme adjustments simple.
