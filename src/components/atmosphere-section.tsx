import { useEffect, useRef, useState } from "react";
import neon from "@/assets/fosfor-atmosfera-neon.webp";
import bartender from "@/assets/fosfor-atmosfera-barmen.webp";
import toast from "@/assets/fosfor-atmosfera-zdravica.webp";
import glasses from "@/assets/fosfor-atmosfera-case.webp";
import friends from "@/assets/fosfor-atmosfera-drustvo.webp";
import { useCopy } from "@/i18n";

// One evening in the bar, told in five photos.
// Captions and descriptions are in i18n.ts, in the same order.
const shots = [
  { src: neon, time: "19:02" },
  { src: bartender, time: "21:40" },
  { src: toast, time: "22:55" },
  { src: glasses, time: "23:30" },
  { src: friends, time: "01:10" },
];

export function AtmosphereSection() {
  const t = useCopy().evening;
  const photos = shots.map((shot, index) => ({ ...shot, ...t.photos[index] }));
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [seen, setSeen] = useState(false);
  const [near, setNear] = useState(false);
  const [swipe, setSwipe] = useState(false);

  // Photos light up one after another as soon as the section starts to scroll into view.
  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) { setSeen(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setSeen(true); observer.disconnect(); }
    }, { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // The photos start loading about a screen before the section, so they don't compete with the first screen.
  useEffect(() => {
    const element = section.current;
    if (!element || !("IntersectionObserver" in window)) { setNear(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "100% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // On phones the gallery is a swipe track: the photo snapped to the left edge is the lit one.
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const media = window.matchMedia("(max-width: 767px)");
    function pick() {
      if (!element) return;
      const figures = [...element.children] as HTMLElement[];
      const distance = (figure: HTMLElement) => Math.abs(figure.offsetLeft - figures[0].offsetLeft - element.scrollLeft);
      setActive(figures.reduce((best, figure, index) => distance(figure) < distance(figures[best]) ? index : best, 0));
    }
    function update() {
      setSwipe(media.matches);
      if (media.matches) pick(); else setActive(null);
    }
    update();
    const onScroll = () => { if (media.matches) pick(); };
    element.addEventListener("scroll", onScroll, { passive: true });
    media.addEventListener("change", update);
    return () => { element.removeEventListener("scroll", onScroll); media.removeEventListener("change", update); };
  }, []);

  const current = photos[active ?? 0];

  return (
    <section id="evening" ref={section} className="atmosphere-section" data-seen={seen} aria-labelledby="atmosphere-title">
      <div className="atmosphere-heading">
        <h2 id="atmosphere-title">{t.title}</h2>
        <p className="atmosphere-clock" aria-hidden="true"><span key={current.time}>{current.time}</span></p>
      </div>
      <div
        ref={track}
        className="atmosphere-track"
        data-focus={active !== null}
        role="region"
        aria-label={t.gallery}
        tabIndex={0}
        onPointerLeave={() => { if (!swipe) setActive(null); }}
      >
        {/* Not loading="lazy": on phones most photos sit off to the side of the swipe track, where lazy loading waits
            until they are swiped in. They get their src once the section is near instead (see above). */}
        {photos.map((photo, index) => (
          <figure
            key={photo.src}
            className="atmosphere-photo"
            data-active={active === index}
            style={{ ["--reveal-delay" as string]: `${index * 70}ms` }}
            onPointerEnter={event => { if (!swipe && event.pointerType === "mouse") setActive(index); }}
          >
            <img src={near ? photo.src : undefined} alt={photo.alt} width={800} height={1000} fetchPriority="low" decoding="async" />
            <figcaption><span className="atmosphere-time">{photo.time}</span><span>{photo.caption}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
