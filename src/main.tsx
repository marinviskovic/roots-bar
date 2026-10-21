import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import { localeFromPath } from "./i18n";
// Self-hosted fonts (no request to Google): latin for English, latin-ext for č, ć, đ, š, ž.
import "@fontsource/anton/latin-400.css";
import "@fontsource/anton/latin-ext-400.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-ext-500.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-ext-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-ext-500.css";
import "./styles.css";

// Focus rings are for keyboard users. Phones show them after a tap too (for example on the category buttons), so they
// are hidden from the first tap or click until a key is pressed again.
const input = (mode: string) => () => { document.documentElement.dataset.input = mode; };
window.addEventListener("pointerdown", input("pointer"), { capture: true, passive: true });
window.addEventListener("keydown", input("keyboard"), { capture: true });

const root = document.getElementById("root")!;
const app = <StrictMode><App locale={localeFromPath(window.location.pathname)} /></StrictMode>;
// The build prerenders each language into its own index.html; hydrate it if it is there.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
