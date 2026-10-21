import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#prica", label: "Priča" },
  { href: "#kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const update = () => setActive(window.location.hash);
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // On phones the hero photo opens with a strip of dark wall under the bar. While the bar sits on that wall it stays
  // clear, as part of the wall, and turns to frosted glass once the neon below reaches it.
  const [overWall, setOverWall] = useState(true);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".fosfor-hero");
    if (!hero) { setOverWall(false); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const wall = parseFloat(getComputedStyle(hero).getPropertyValue("--hero-wall")) || 0;
      setOverWall(wall > 0 && hero.getBoundingClientRect().top > -wall);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const close = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  return (
    <header className="fosfor-navbar" data-over-wall={overWall}>
      <a className="fosfor-wordmark" href="#" aria-label="ROOTS, naslovna">ROOTS</a>
      <nav className="desktop-nav" aria-label="Glavni izbornik">
        {links.map(({ href, label }) => (
          <a key={href} href={href} aria-current={active === href ? "location" : undefined}>{label}</a>
        ))}
        <a className="fosfor-button fosfor-button-nav" href="#karta">Koktel karta</a>
      </nav>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button type="button" className="fosfor-icon-button mobile-menu-trigger" aria-label="Otvori izbornik"><Menu /></button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="menu-overlay" />
          <Dialog.Content className="mobile-menu" aria-describedby={undefined}>
            <Dialog.Title className="sr-only">Glavni izbornik</Dialog.Title>
            <div className="mobile-menu-header">
              <a className="fosfor-wordmark" href="#" onClick={() => setOpen(false)}>ROOTS</a>
              <Dialog.Close asChild><button type="button" className="fosfor-icon-button" aria-label="Zatvori izbornik"><X /></button></Dialog.Close>
            </div>
            <nav className="mobile-menu-links" aria-label="Mobilni izbornik">
              {links.map(({ href, label }) => (
                <a key={href} href={href} onClick={() => setOpen(false)} aria-current={active === href ? "location" : undefined}>{label}</a>
              ))}
              <a className="fosfor-button" href="#karta" onClick={() => setOpen(false)}>Koktel karta</a>
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
