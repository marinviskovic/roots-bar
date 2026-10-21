// Renders each language into its own static page (/ in English, /hr/ in Croatian) with its own title, description,
// social preview and language links, so the content and the SEO tags are there before JavaScript loads.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const { render, LOCALES, localePath } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);

// SITE_URL wins; on Vercel the project's production address is the fallback, so links are right before a domain exists.
const site = (process.env.SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://roots-pula.vercel.app")
).replace(/\/$/, "");
const url = locale => site + localePath(locale);

const template = readFileSync(resolve(dist, "index.html"), "utf8");
const escape = text => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

for (const locale of LOCALES) {
  const { html: app, meta } = render(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Roots",
    url: url(locale),
    image: `${site}/og-image-${locale}.jpg`,
    servesCuisine: "Cocktails",
    priceRange: "€€",
    address: { "@type": "PostalAddress", addressLocality: "Pula", addressCountry: "HR" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "18:00", closes: "01:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "18:00", closes: "02:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "23:59" },
    ],
  };
  const head = [
    `<meta name="description" content="${escape(meta.description)}" />`,
    `<link rel="canonical" href="${url(locale)}" />`,
    ...LOCALES.map(other => `<link rel="alternate" hreflang="${other}" href="${url(other)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${url("en")}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Roots" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${url(locale)}" />`,
    `<meta property="og:locale" content="${meta.ogLocale}" />`,
    `<meta property="og:image" content="${site}/og-image-${locale}.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${escape(meta.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
  ].join("\n    ");

  let html = template
    .replace('<html lang="en">', `<html lang="${locale}">`)
    .replace(/<title>.*<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace("<!--head-->", head)
    .replace("<!--app-->", app);
  // React hoists a preload for the first cocktail photo; the hero photo matters more for first paint.
  html = html.replace(/<link rel="preload" as="image"[^>]*>/g, "");
  const heroDesktop = html.match(/\/assets\/fosfor-bar-desktop-[^"]+/)[0];
  const heroMobile = html.match(/\/assets\/fosfor-bar-mobile-[^"]+/)[0];
  html = html.replace("</head>", `<link rel="preload" as="image" href="${heroMobile}" media="(max-width: 767px)" fetchpriority="high">\n<link rel="preload" as="image" href="${heroDesktop}" media="(min-width: 768px)" fetchpriority="high">\n</head>`);

  const file = resolve(dist, `.${localePath(locale)}index.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log("prerendered", locale, file, html.length, "bytes");
}

const alternates = LOCALES.map(other => `<xhtml:link rel="alternate" hreflang="${other}" href="${url(other)}"/>`).join("");
writeFileSync(resolve(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LOCALES.map(locale => `  <url><loc>${url(locale)}</loc>${alternates}</url>`).join("\n")}
</urlset>
`);
writeFileSync(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
