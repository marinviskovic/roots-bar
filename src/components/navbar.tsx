import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { localePath, useCopy, useLocale } from "@/i18n";

/** Link to the same page in the other language, keeping the section the visitor is on. */
function LanguageLink({ className }: { className?: string }) {
  const locale = useLocale();
  const { switchTo } = useCopy().nav;
  const target = locale === "en" ? "hr" : "en";
  return (
    <a
      className={className}
      href={localePath(target)}
      hrefLang={target}
      lang={target}
      onClick={event => {
        if (!window.location.hash) return;
        event.preventDefault();
        window.location.assign(localePath(target) + window.location.hash);
      }}
    >
      {switchTo.label}<span className="sr-only"> ({switchTo.name})</span>
    </a>
  );
}

export function Navbar() {
  const t = useCopy().nav;
  const links = [
    { href: "#story", label: t.story },
    { href: "#visit", label: t.visit },
  ];
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
      <a className="fosfor-wordmark" href="#" aria-label={t.home}>ROOTS</a>
      <nav className="desktop-nav" aria-label={t.main}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} aria-current={active === href ? "location" : undefined}>{label}</a>
        ))}
        <LanguageLink />
        <a className="fosfor-button fosfor-button-nav" href="#menu">{t.menu}</a>
      </nav>
      <div className="navbar-end">
        <LanguageLink className="language-link" />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button type="button" className="fosfor-icon-button mobile-menu-trigger" aria-label={t.open}><Menu /></button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="mobile-menu" aria-describedby={undefined}>
              <Dialog.Title className="sr-only">{t.main}</Dialog.Title>
              <div className="mobile-menu-header">
                <a className="fosfor-wordmark" href="#" onClick={() => setOpen(false)}>ROOTS</a>
                <Dialog.Close asChild><button type="button" className="fosfor-icon-button" aria-label={t.close}><X /></button></Dialog.Close>
              </div>
              <nav className="mobile-menu-links" aria-label={t.mobile}>
                {links.map(({ href, label }) => (
                  <a key={href} href={href} onClick={() => setOpen(false)} aria-current={active === href ? "location" : undefined}>{label}</a>
                ))}
                <a className="fosfor-button" href="#menu" onClick={() => setOpen(false)}>{t.menu}</a>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
