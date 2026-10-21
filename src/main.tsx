import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";

// Focus rings are for keyboard users. Phones show them after a tap too (for example on the category buttons), so they
// are hidden from the first tap or click until a key is pressed again.
const input = (mode: string) => () => { document.documentElement.dataset.input = mode; };
window.addEventListener("pointerdown", input("pointer"), { capture: true, passive: true });
window.addEventListener("keydown", input("keyboard"), { capture: true });

const root = document.getElementById("root")!;
const app = <StrictMode><App /></StrictMode>;
// The build prerenders the page into index.html; hydrate it if it is there.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
