import { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { CocktailPhoto } from "@/components/cocktail-photo";
import { cocktailCategories } from "@/data/cocktails";
import { keepShortWords } from "@/lib";

export function CocktailMenu() {
  const [categoryId, setCategoryId] = useState(cocktailCategories[0].id);
  const [selected, setSelected] = useState(0);
  const [desktop, setDesktop] = useState(true);
  const [direction, setDirection] = useState(1);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const lastIndex = useRef(0);
  const category = cocktailCategories.find(value => value.id === categoryId) ?? cocktailCategories[0];
  const selectedItem = category.items[selected] ?? category.items[0];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Start decoding the photos of the open category shortly before the menu scrolls into view.
  useEffect(() => {
    if (!section.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "600px" });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    for (const item of category.items) {
      const image = new Image();
      image.src = item.image;
      void image.decode().catch(() => {});
    }
  }, [visible, category]);

  function changeCategory(id: string) {
    setCategoryId(id); setSelected(0); setDirection(1); lastIndex.current = 0;
  }
  function choose(index: number) {
    if (selected === index) return;
    setDirection(index >= lastIndex.current ? 1 : -1);
    lastIndex.current = index;
    setSelected(index);
  }

  return <section ref={section} id="karta" className="cocktail-section" aria-labelledby="cocktail-title">
    <h2 id="cocktail-title">Koktel karta</h2>
    <Tabs.Root value={categoryId} onValueChange={changeCategory}>
      <div className="cocktail-filter-scroll">
        <Tabs.List className="cocktail-filters" aria-label="Kategorije koktela">
          {cocktailCategories.map(value => <Tabs.Trigger key={value.id} value={value.id} className="cocktail-filter">{value.label}</Tabs.Trigger>)}
        </Tabs.List>
      </div>
      <div className="cocktail-layout">
        <div className="cocktail-desktop-preview"><CocktailPhoto item={selectedItem} categoryLabel={category.label} direction={direction} mobile={!desktop} /></div>
        <div className="cocktail-menu-body">
          <div className="cocktail-panels">
            {cocktailCategories.map(value => <Tabs.Content key={value.id} value={value.id} className="cocktail-panel">
              <ul className="cocktail-list" role="radiogroup" aria-label={value.id === "autorski" ? "Autorski kokteli" : value.label}>
                {value.items.map((item, index) => {
                  const active = value.id === categoryId && selected === index;
                  return <li key={item.name} className="cocktail-item" data-selected={active}>
                    <label className="cocktail-row">
                      <span className="cocktail-item-heading">
                        <input className="cocktail-radio" type="radio" name={`cocktail-${value.id}`} value={item.name} checked={active} aria-label={item.name} onChange={() => choose(index)} />
                        <span className="cocktail-name">{keepShortWords(item.name)}</span>
                        <span className="cocktail-price">{item.price}{" €"}</span>
                      </span>
                      <span className="cocktail-ingredients">{keepShortWords(item.ingredients)}</span>
                      {item.serve && <span className="cocktail-serve">{keepShortWords(item.serve)}</span>}
                    </label>
                  </li>;
                })}
              </ul>
            </Tabs.Content>)}
          </div>
          <p className="cocktail-note">Cijene su u eurima. Za alergije pitaj barmena.</p>
        </div>
      </div>
    </Tabs.Root>
  </section>;
}
