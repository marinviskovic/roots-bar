// Puts the rendered page into dist/index.html so the content shows before JavaScript loads.
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const { render } = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);
const file = resolve(root, "dist/index.html");
let html = readFileSync(file, "utf8").replace("<!--app-->", render());
// Server build emits assets under /assets; the client build uses relative ./assets.
html = html.replaceAll('"/assets/', '"./assets/');
// React hoists a preload for the first cocktail photo; the hero photo matters more for first paint.
html = html.replace(/<link rel="preload" as="image"[^>]*>/g, "");
const heroDesktop = html.match(/\.\/assets\/fosfor-bar-desktop-[^"]+/)[0];
const heroMobile = html.match(/\.\/assets\/fosfor-bar-mobile-[^"]+/)[0];
html = html.replace("</head>", `<link rel="preload" as="image" href="${heroMobile}" media="(max-width: 767px)" fetchpriority="high">\n<link rel="preload" as="image" href="${heroDesktop}" media="(min-width: 768px)" fetchpriority="high">\n</head>`);
writeFileSync(file, html);
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerendered", file, html.length, "bytes");
