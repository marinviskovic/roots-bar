import { useEffect, useRef, useState } from "react";

export function Footer() {
  const signature = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  // The wordmark switches on like a neon sign, letter by letter, once the visitor reaches the bottom.
  useEffect(() => {
    const element = signature.current;
    if (!element || !("IntersectionObserver" in window)) { setLit(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setLit(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="fosfor-footer">
      <div className="footer-main">
        <p className="footer-concept">Koncept stranice za portfolio. Roots nije stvarni bar.</p>
        <a className="footer-credit" href="https://www.instagram.com/webradiona.hr/" target="_blank" rel="noopener">Izrada: Webradiona</a>
      </div>
      <p className="footer-age">Alkohol se ne poslužuje osobama mlađim od 18 godina.</p>
      <div ref={signature} className="footer-signature" data-lit={lit}>
        <p className="footer-label">Koktel bar, Pula</p>
        <p className="footer-wordmark" aria-hidden="true">
          <span>{"ROOTS".split("").map((letter, index) => <span key={index} className="footer-letter" style={{ ["--letter-delay" as string]: `${index * 220}ms` }}>{letter}</span>)}</span>
        </p>
        <p className="footer-farewell">Vidimo se večeras.</p>
      </div>
    </footer>
  );
}
