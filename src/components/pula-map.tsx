import { useEffect, useRef, useState } from "react";

// A hand-drawn sketch of central Pula, not a real map: harbour on the west, the round old town
// around the Kaštel hill, the Arena to the north and the Golden Gate to the south-east.
const hill = { x: 214, y: 160 };
const roots = { x: 168, y: 228 };

export function PulaMap() {
  const figure = useRef<HTMLElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const element = figure.current;
    if (!element || !("IntersectionObserver" in window)) { setDrawn(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setDrawn(true); observer.disconnect(); }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={figure} className="pula-map" data-drawn={drawn}>
      <svg viewBox="0 0 400 300" role="img" aria-label="Skica centra Pule: luka, stari grad oko Kaštela, Arena i Roots na južnoj strani starog grada.">
        <path className="map-sea" d="M0 0 H132 C126 40 124 70 116 96 C106 130 98 160 84 192 C70 222 46 248 0 268 Z" />
        <g className="map-waves">
          <path d="M18 70 q8 -5 16 0 t16 0" /><path d="M40 130 q8 -5 16 0 t16 0" /><path d="M14 190 q8 -5 16 0 t16 0" />
        </g>
        <path className="map-coast" pathLength={1} d="M132 0 C126 40 124 70 116 96 C106 130 98 160 84 192 C70 222 46 248 0 268" />
        <g className="map-streets">
          <path pathLength={1} d="M146 0 C140 40 138 72 130 100 C120 134 112 164 98 196 C84 226 62 252 20 300" />
          <circle pathLength={1} cx={hill.x} cy={hill.y} r="82" />
          <circle pathLength={1} className="map-minor" cx={hill.x} cy={hill.y} r="56" />
          <path pathLength={1} d="M292 150 C330 146 360 150 400 142" />
          <path pathLength={1} d="M272 102 C300 70 320 40 340 0" />
          <path pathLength={1} d="M236 240 C244 262 248 280 252 300" />
          <path pathLength={1} d="M214 44 C280 50 340 64 400 62" />
          <path pathLength={1} className="map-minor" d="M282 208 C320 230 360 250 400 256" />
          <path pathLength={1} className="map-minor" d="M196 80 L208 46" />
        </g>
        <rect className="map-kastel" x={hill.x - 14} y={hill.y - 14} width="28" height="28" transform={`rotate(45 ${hill.x} ${hill.y})`} />
        <ellipse className="map-landmark" cx="196" cy="34" rx="24" ry="17" />
        <ellipse className="map-landmark" cx="196" cy="34" rx="15" ry="9" />
        <path className="map-landmark" d="M276 218 v-10 a6 6 0 0 1 12 0 v10" />
        <rect className="map-landmark" x="128" y="152" width="16" height="12" />
        <g className="map-labels">
          <text x="34" y="104" className="map-label-sea">LUKA</text>
          <text x="226" y="38">ARENA</text>
          <text x={hill.x} y={hill.y + 32} textAnchor="middle">KAŠTEL</text>
          <text x="146" y="144" textAnchor="middle">FORUM</text>
          <text x="294" y="228">ZLATNA VRATA</text>
        </g>
        <g className="map-roots">
          <circle className="map-pulse" cx={roots.x} cy={roots.y} r="7" />
          <circle className="map-pulse map-pulse-late" cx={roots.x} cy={roots.y} r="7" />
          <circle className="map-dot" cx={roots.x} cy={roots.y} r="6" />
          <text x={roots.x - 14} y={roots.y + 4} textAnchor="end" className="map-label-roots">ROOTS</text>
        </g>
      </svg>
      <figcaption>U starom gradu, ispod Kaštela</figcaption>
    </figure>
  );
}
