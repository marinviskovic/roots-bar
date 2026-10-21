import { useEffect, useRef } from "react";
import { Martini } from "lucide-react";
import desktopImage from "@/assets/fosfor-bar-desktop.webp";
import mobileImage from "@/assets/fosfor-bar-mobile.webp";

const TOP = 17;
const RADIUS = 83;
/** Width of the name written in a straight line (wider than the ring, so it reads at normal spacing), and its length once it wraps the whole ring (the circumference). */
const STRAIGHT = 380;
/** The closing "• " only belongs to the ring; while it is faded out, the straight line shifts right by about its width to stay centred. */
const TAIL_SHIFT = 14;
const RING = 2 * Math.PI * RADIUS;
const HOLD = 900;
const CURL = 1700;

/**
 * Path the name sits on: an arc of the given length that touches the top of the ring, bent by `bend`
 * from 0 (a straight line) to 1 (the full ring). The arc's centre slides down as it bends, so the
 * name curls around the glass from the middle out. The text starts at the path's start (no centring
 * anchor), because Safari centres textPath text by its unstretched width and cuts off the start.
 */
function namePath(length: number, bend: number) {
  const cx = 100 + TAIL_SHIFT * (1 - bend);
  if (bend < 0.001) return `M ${cx - length / 2},${TOP} H ${cx + length / 2}`;
  const radius = RADIUS / bend;
  const angle = Math.min(Math.PI, length / radius / 2);
  const cy = TOP + radius;
  const dx = radius * Math.sin(angle);
  const y = cy - radius * Math.cos(angle);
  return `M ${(cx - dx).toFixed(2)},${y.toFixed(2)} A ${radius.toFixed(2)},${radius.toFixed(2)} 0 0,1 ${cx.toFixed(2)},${TOP} A ${radius.toFixed(2)},${radius.toFixed(2)} 0 0,1 ${(cx + dx).toFixed(2)},${y.toFixed(2)}`;
}

export function Hero() {
  const orbit = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const name = useRef<SVGTextPathElement>(null);
  const tail = useRef<SVGTSpanElement>(null);

  // The name starts as a straight line, then curls into the ring and starts spinning. Frames only run
  // while the page is on screen, so a page loaded in the background still plays when it is first seen.
  useEffect(() => {
    const ring = orbit.current, line = path.current, text = name.current, end = tail.current;
    if (!ring || !line || !text || !end) return;
    const draw = (progress: number) => {
      const length = STRAIGHT + (RING - STRAIGHT) * progress;
      line.setAttribute("d", namePath(length, progress));
      text.setAttribute("textLength", length.toFixed(2));
      end.setAttribute("fill-opacity", Math.min(1, progress * 2).toFixed(2));
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { draw(1); return; }
    let frame = 0;
    let start: number | null = null;
    const step = (now: number) => {
      start ??= now;
      const t = Math.min(1, Math.max(0, now - start - HOLD) / CURL);
      if (t > 0) ring.dataset.spin = "true";
      // Ease in and out so the line starts bending gently and settles into the ring.
      draw(t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(frame); draw(1); ring.dataset.spin = "true"; };
  }, []);

  return (
    <section className="fosfor-hero" aria-labelledby="hero-title">
      <picture className="hero-picture">
        <source media="(max-width: 767px)" srcSet={mobileImage} />
        <img src={desktopImage} alt="Intimni koktel bar noću, gosti za šankom i crveno-narančaste neonske linije iza barmena." width={2400} height={1350} loading="eager" fetchPriority="high" />
      </picture>
      <div className="hero-shade" aria-hidden="true" />
      <div ref={orbit} className="fosfor-orbit" role="img" aria-label="ROOTS, koktel bar, Pula">
        <svg className="orbit-type" viewBox="0 0 200 200" aria-hidden="true">
          <defs><path ref={path} id="orbit-circle" d={namePath(STRAIGHT, 0)} /></defs>
          <text>
            <textPath ref={name} href="#orbit-circle" textLength={STRAIGHT} lengthAdjust="spacing">
              ROOTS • KOKTEL BAR • PULA<tspan ref={tail} fillOpacity={0}>{" • "}</tspan>
            </textPath>
          </text>
        </svg>
        <Martini className="orbit-martini" aria-hidden="true" strokeWidth={1.4} />
      </div>
      <div className="hero-content">
        <h1 id="hero-title"><span>Kokteli do kasno</span><span>u srcu Pule</span></h1>
        <p>Autorski kokteli, klasici i bezalkoholna karta. Bez rezervacije, samo dođi.</p>
        <div className="hero-actions">
          <a className="fosfor-button" href="#karta">Koktel karta</a>
          <a className="fosfor-story-link" href="#prica">Priča o Palomi</a>
        </div>
      </div>
    </section>
  );
}
