import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Cocktail } from "@/data/cocktails";
import { keepShortWords } from "@/lib";

/**
 * Photo of the selected drink with its caption. Two stacked <img> elements swap
 * roles: the next photo is decoded off-screen first, then slides in while the
 * old one slides out, so the frame never flashes empty.
 */
export function CocktailPhoto({ item, categoryLabel, direction, mobile = false }: { item: Cocktail; categoryLabel: string; direction: number; mobile?: boolean }) {
  const initial = useRef(item);
  const [displayed, setDisplayed] = useState({ item, categoryLabel });
  const first = useRef<HTMLImageElement>(null);
  const second = useRef<HTMLImageElement>(null);
  const caption = useRef<HTMLElement>(null);
  const animations = useRef<Animation[]>([]);

  useEffect(() => {
    const a = first.current;
    const b = second.current;
    if (!a || !b) return;
    let cancelled = false;
    const freeze = () => {
      // Keep the on-screen state before cancelling, including rapid mid-slide changes.
      for (const element of [a, b, caption.current]) {
        if (!element) continue;
        const style = getComputedStyle(element);
        element.style.transform = style.transform;
        element.style.opacity = style.opacity;
      }
      animations.current.forEach(animation => animation.cancel());
      animations.current = [];
      for (const element of [a, b, caption.current]) if (element) element.style.willChange = "";
    };
    freeze();
    function showCaption() {
      flushSync(() => setDisplayed({ item, categoryLabel }));
    }
    async function slideCaption() {
      const text = caption.current;
      if (!text) return;
      const current = getComputedStyle(text);
      const from = { opacity: current.opacity, transform: current.transform };
      const easing = current.getPropertyValue("--ease-out").trim() || "ease-out";
      text.style.willChange = "transform, opacity";
      const exit = text.animate([from, { opacity: 0, transform: `translateX(${-12 * direction}px)` }], { duration: 120, easing, fill: "both" });
      animations.current.push(exit);
      try { await exit.finished; } catch { return; }
      if (cancelled) return;
      // Keep the whole old caption until it is invisible, then swap every field at once.
      text.style.opacity = "0";
      text.style.transform = `translateX(${12 * direction}px)`;
      exit.cancel();
      showCaption();
      const enter = text.animate([
        { opacity: 0, transform: `translateX(${12 * direction}px)` },
        { opacity: 1, transform: "translateX(0px)" },
      ], { duration: 220, easing, fill: "both" });
      animations.current.push(enter);
      try { await enter.finished; } catch { return; }
      if (cancelled) return;
      text.style.opacity = "1";
      text.style.transform = "none";
      enter.cancel();
      text.style.willChange = "";
    }
    async function replace() {
      if (!a || !b) return;
      const start = performance.now();
      const decoded = new Image();
      decoded.src = item.image;
      try { await decoded.decode(); } catch { return; }
      if (cancelled) return;
      const old = Number(getComputedStyle(a).opacity) >= Number(getComputedStyle(b).opacity) ? a : b;
      const next = old === a ? b : a;
      if (old.getAttribute("src") === item.image) {
        old.style.opacity = "1"; old.style.transform = "none"; next.style.opacity = "0";
        old.alt = item.alt; old.removeAttribute("aria-hidden"); next.setAttribute("aria-hidden", "true");
        if (caption.current) { caption.current.style.opacity = "1"; caption.current.style.transform = "none"; }
        showCaption();
        return;
      }
      next.style.opacity = "0";
      next.src = item.image;
      try { await next.decode(); } catch { return; }
      if (cancelled) return;
      next.alt = item.alt; next.removeAttribute("aria-hidden"); old.alt = ""; old.setAttribute("aria-hidden", "true");
      const outgoingStyle = getComputedStyle(old);
      const from = { opacity: outgoingStyle.opacity, transform: outgoingStyle.transform };
      next.style.zIndex = "2"; old.style.zIndex = "1";
      next.style.transform = "none"; next.style.opacity = "1";
      old.style.opacity = "0";
      if (performance.now() - start > 300 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (caption.current) { caption.current.style.opacity = "1"; caption.current.style.transform = "none"; }
        showCaption();
        return;
      }
      const distance = (mobile ? 40 : 60) * direction;
      const options = { duration: mobile ? 380 : 450, easing: "cubic-bezier(0.23, 1, 0.32, 1)" };
      next.style.willChange = "transform, opacity"; old.style.willChange = "transform, opacity";
      const incoming = next.animate([
        { transform: `translateX(${distance}px)`, opacity: 0, offset: 0 },
        { transform: `translateX(${-distance * 0.06}px)`, opacity: 1, offset: 0.82 },
        { transform: "translateX(0px)", opacity: 1, offset: 1 },
      ], options);
      const outgoing = old.animate([from, { transform: `translateX(${-distance}px)`, opacity: 0 }], options);
      animations.current = [incoming, outgoing];
      void slideCaption();
      void Promise.all([incoming.finished, outgoing.finished]).then(() => {
        if (!cancelled) for (const element of [a, b]) element.style.willChange = "";
      }).catch(() => {});
    }
    void replace();
    return () => { cancelled = true; freeze(); };
  }, [item, categoryLabel, direction, mobile]);

  return <figure className="cocktail-preview" data-drink={displayed.item.name}>
    <div className="cocktail-photo-frame">
      <img ref={first} src={initial.current.image} alt={initial.current.alt} width={1024} height={1280} />
      <img ref={second} className="cocktail-photo-buffer" src={initial.current.image} alt="" aria-hidden="true" width={1024} height={1280} />
    </div>
    <figcaption ref={caption} aria-live="polite">
      <span className="cocktail-caption-category">{displayed.categoryLabel}</span>
      <span className="cocktail-caption-name">{keepShortWords(displayed.item.name)}</span>
      {displayed.item.serve && <span className="cocktail-caption-serve">{keepShortWords(displayed.item.serve)}</span>}
    </figcaption>
  </figure>;
}
