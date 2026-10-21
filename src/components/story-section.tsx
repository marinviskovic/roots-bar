import { useEffect, useRef, useState } from "react";
import desktopImage from "@/assets/paloma-story-desktop.webp";
import mobileImage from "@/assets/paloma-story-mobile.webp";
import { keepShortWords } from "@/lib";

const paragraphs = [
  "Paloma je meksička klasika od tekile, grejpa i limete, a u Rootsu smo složili svoju: jedinstvenu i nezaobilaznu.",
  "Ružičasti grejp cijedimo svaku večer, rub čaše solimo morskom soli, a na vrh ide hladni gazirani grejp koji je drži živom do zadnjeg gutljaja.",
];

export function StorySection() {
  const section = useRef<HTMLElement>(null);
  const [motion, setMotion] = useState<"static" | "scroll" | "fallback">("static");

  // Words light up as the paragraph scrolls in: CSS scroll timeline where supported, IntersectionObserver otherwise.
  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    function update() {
      observer?.disconnect();
      if (!element) return;
      element.querySelectorAll(".story-paragraph").forEach(p => p.removeAttribute("data-lit"));
      if (media.matches) { setMotion("static"); return; }
      if (CSS.supports("animation-timeline: view()") && CSS.supports("animation-range: entry 0% entry 100%")) {
        setMotion("scroll");
        return;
      }
      if (!("IntersectionObserver" in window)) { setMotion("static"); return; }
      setMotion("fallback");
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const lit = entry.isIntersecting || entry.boundingClientRect.top < 0;
          entry.target.setAttribute("data-lit", String(lit));
        });
      }, { rootMargin: "0px 0px -20% 0px", threshold: 0 });
      element.querySelectorAll(".story-paragraph").forEach(p => observer?.observe(p));
    }
    update();
    media.addEventListener("change", update);
    return () => { observer?.disconnect(); media.removeEventListener("change", update); };
  }, []);

  return <section id="prica" ref={section} className="story-section" data-motion={motion} aria-labelledby="story-title">
    <picture className="story-picture">
      <source media="(max-width: 767px)" srcSet={mobileImage} />
      <img src={desktopImage} alt="Blijedo ružičasta Paloma u visokoj čaši s prozirnim štapićem leda, solju na pola ruba i kriškom grejpa na tamnom šanku, uz crveno-narančasti neon." width={1792} height={1024} loading="lazy" decoding="async" />
    </picture>
    <div className="story-shade" aria-hidden="true" />
    <div className="story-content">
      <p className="story-eyebrow">Autorski koktel</p>
      <h2 id="story-title">Naša Paloma</h2>
      <div className="story-copy">
        {paragraphs.map((paragraph, index) => {
          const text = keepShortWords(paragraph);
          const words = text.split(" ");
          return <p className="story-paragraph" key={index}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">{words.map((word, wordIndex) => {
              const start = 10 + wordIndex / words.length * 65;
              return <span key={wordIndex}><span className="story-word" style={{ animationRangeStart: `entry ${start}%`, animationRangeEnd: `entry ${start + 20}%` }}>{word}</span>{wordIndex < words.length - 1 ? " " : ""}</span>;
            })}</span>
          </p>;
        })}
      </div>
      <p className="story-sign">Ne propusti priliku da je probaš.</p>
    </div>
  </section>;
}
