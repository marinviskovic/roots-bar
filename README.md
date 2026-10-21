# Roots, a cocktail bar website (concept)

**Live:** https://roots-pula.vercel.app (English) and https://roots-pula.vercel.app/hr/ (Croatian)

A one-page website for a cocktail bar in Pula, Croatia. Roots is a concept made for a portfolio: the bar, the menu and
the prices are invented, and the footer says so.

It started as a Lovable prototype ("Roots Bar Showcase"). This repository is the same design rebuilt by hand in React,
Vite and Tailwind CSS 4, prerendered to static HTML and hosted on Vercel.

## What a guest gets

- The menu on their phone: signature cocktails, classics and alcohol-free drinks, each with a photo, ingredients,
  glass and price.
- Opening hours with a live "Open / Closed" sign and a countdown, in Pula time wherever the visitor's phone is set.
- A sketch map of the old town, a short FAQ and the story of the house Paloma.
- English by default and Croatian at `/hr/`, switchable from the top bar on every screen size. The switch keeps the
  section the guest was reading.

## What changed from the Lovable prototype

| | Lovable prototype | This site |
| --- | --- | --- |
| Languages | Croatian only | English and Croatian, each its own page with `hreflang` |
| Canonical and social links | Pointed at an old project address that returns 404, so link previews had no image | Correct per page, with a photo preview card per language |
| Fonts | Google Fonts | Self-hosted, no third-party requests |
| Opening hours | Static list | Live "Open / Closed" sign in Pula time (`Europe/Zagreb`) |
| Location | Text only | Sketch map of the old town |
| SEO | Title, description, Open Graph | Plus `hreflang`, `BarOrPub` structured data, sitemap, robots |
| Security headers | HSTS, `nosniff`, referrer policy | Plus a Content Security Policy, frame and permissions policies (`vercel.json`) |

## Results on the live site

- Lighthouse performance, mobile: 96 (Lovable prototype: 76), median of 5 runs each. Desktop: 100 (prototype: 88).
- Accessibility 97, best practices 100, SEO 100.
- `tests/smoke.mjs`: 9/9 checks pass against https://roots-pula.vercel.app.
- On a phone the first screen loads the hero, the first drink photo and the fonts; the gallery waits until it is
  about a screen away and the menu's other photos until the page has finished loading.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173 (the Croatian page is /hr/)
npm run build        # dist/: index.html (en), hr/index.html, sitemap.xml, robots.txt
npm run typecheck
npx vite preview --port 4173 & npm run test:e2e -- http://localhost:4173
```

`npm run build` renders each language with `src/entry-server.tsx` and writes its page through
`scripts/prerender.mjs`. All text lives in `src/i18n.ts` and the drinks in `src/data/cocktails.ts`, one entry per
language side by side, so a translation can't silently go missing (TypeScript checks both have the same fields).

## Deploy

Import the repository in Vercel; `vercel.json` sets the build and headers. Canonical and social links use `SITE_URL`
when it is set, otherwise the project's production `*.vercel.app` address. For a custom domain, add it under
Settings > Domains, set `SITE_URL` to it and redeploy.

Made by Webradiona.
