import { createContext, useContext } from "react";
import { keepShortWords } from "@/lib";

export type Locale = "en" | "hr";
export const LOCALES: Locale[] = ["en", "hr"];
/** English is the default page at /, Croatian lives at /hr/. */
export const localePath = (locale: Locale) => (locale === "en" ? "/" : "/hr/");
export const localeFromPath = (pathname: string): Locale => (/^\/hr(\/|$)/.test(pathname) ? "hr" : "en");

const hr = {
  meta: {
    title: "Roots, koktel bar u Puli (koncept)",
    description: "Koncept stranice koktel bara u Puli: autorski kokteli, klasici, bezalkoholna karta i priča o našoj Palomi. Izrada: Webradiona.",
    ogLocale: "hr_HR",
    ogImageAlt: "ROOTS, koncept koktel bara u Puli: neonski šank noću",
  },
  skipLink: "Preskoči na koktel kartu",
  nav: {
    home: "ROOTS, naslovna",
    main: "Glavni izbornik",
    mobile: "Mobilni izbornik",
    open: "Otvori izbornik",
    close: "Zatvori izbornik",
    story: "Priča",
    visit: "Kontakt",
    menu: "Koktel karta",
    switchTo: { label: "EN", name: "English" },
  },
  hero: {
    title: ["Kokteli do kasno", "u srcu Pule"],
    intro: "Autorski kokteli, klasici i bezalkoholna karta. Bez rezervacije, samo dođi.",
    story: "Priča o Palomi",
    ring: "ROOTS • KOKTEL BAR • PULA",
    ringLabel: "ROOTS, koktel bar, Pula",
    photoAlt: "Intimni koktel bar noću, gosti za šankom i crveno-narančaste neonske linije iza barmena.",
  },
  menu: {
    title: "Koktel karta",
    categories: "Kategorije koktela",
    note: "Cijene su u eurima. Za alergije pitaj barmena.",
  },
  evening: {
    title: "Večer u Rootsu",
    gallery: "Fotografije atmosfere bara Roots",
    photos: [
      { caption: "Neon se pali", alt: "Detalj crveno-narančastih neonskih linija na tamnom zidu bara Roots." },
      { caption: "Prva tura iz shakera", alt: "Ruke barmena koji miješa koktel u metalnom shakeru pod neonskim svjetlom." },
      { caption: "Zdravica za stolom", alt: "Ruke gostiju koje nazdravljaju narančastim koktelima za stolom." },
      { caption: "Tri čaše, jedan šank", alt: "Tri čaše koktela na šanku s crveno-narančastim neonskim odsjajem." },
      { caption: "Još jedna, pa doma", alt: "Društvo snimljeno s leđa za stolom u polumraku bara Roots." },
    ],
  },
  visit: {
    label: "Kontakt",
    hoursTitle: "Radno vrijeme",
    hours: ["Ponedjeljak - četvrtak", "Petak i subota", "Nedjelja"],
    times: ["18-01 h", "18-02 h", "18-24 h"],
    open: "Otvoreno",
    closed: "Zatvoreno",
    closesIn: "Zatvaramo za",
    opensIn: "Otvaramo za",
    whereTitle: "Gdje smo",
    place: "Pula, centar",
    concept: "Ovo je koncept, bar ne postoji pa nema ni adrese.",
  },
  map: {
    label: "Skica centra Pule: luka, stari grad oko Kaštela, Arena i Roots na južnoj strani starog grada.",
    harbour: "LUKA",
    gate: "ZLATNA VRATA",
    caption: "U starom gradu, ispod Kaštela",
  },
  faq: {
    title: "Česta pitanja",
    items: [
      { question: "Primate li rezervacije?", answer: "Ne primamo. Stolovi i šank su za one koji prvi dođu, a za šankom se mjesto uvijek brzo nađe." },
      { question: "Imate li bezalkoholne koktele?", answer: "Imamo, na karti su pod Bez alkohola." },
      { question: "Zašto velika kocka leda?", answer: "Topi se sporije, pa koktel ostaje hladan, a ne vodenast, do zadnjeg gutljaja. Led smrzavamo i režemo sami." },
      { question: "Primate li kartice?", answer: "Da, gotovinu i kartice." },
    ],
  },
  story: {
    eyebrow: "Autorski koktel",
    title: "Naša Paloma",
    paragraphs: [
      "Paloma je meksička klasika od tekile, grejpa i limete, a u Rootsu smo složili svoju: jedinstvenu i nezaobilaznu.",
      "Ružičasti grejp cijedimo svaku večer, rub čaše solimo morskom soli, a na vrh ide hladni gazirani grejp koji je drži živom do zadnjeg gutljaja.",
    ],
    sign: "Ne propusti priliku da je probaš.",
    photoAlt: "Blijedo ružičasta Paloma u visokoj čaši s prozirnim štapićem leda, solju na pola ruba i kriškom grejpa na tamnom šanku, uz crveno-narančasti neon.",
  },
  footer: {
    concept: "Koncept stranice za portfolio. Roots nije stvarni bar.",
    credit: "Izrada: Webradiona",
    age: "Alkohol se ne poslužuje osobama mlađim od 18 godina.",
    label: "Koktel bar, Pula",
    farewell: "Vidimo se večeras.",
  },
};

export type Copy = typeof hr;

const en: Copy = {
  meta: {
    title: "Roots, a cocktail bar in Pula (concept)",
    description: "Concept website for a cocktail bar in Pula, Croatia: signature cocktails, classics, an alcohol-free menu and the story of our Paloma. Made by Webradiona.",
    ogLocale: "en_GB",
    ogImageAlt: "ROOTS, a concept cocktail bar in Pula: a neon-lit bar at night",
  },
  skipLink: "Skip to the cocktail menu",
  nav: {
    home: "ROOTS, home",
    main: "Main navigation",
    mobile: "Mobile navigation",
    open: "Open navigation",
    close: "Close navigation",
    story: "Story",
    visit: "Visit",
    menu: "Cocktail menu",
    switchTo: { label: "HR", name: "Hrvatski" },
  },
  hero: {
    title: ["Drinks till late", "in old-town Pula"],
    intro: "Signature cocktails, classics and an alcohol-free menu. No reservations, just come by.",
    story: "The Paloma story",
    ring: "ROOTS • COCKTAIL BAR • PULA",
    ringLabel: "ROOTS, cocktail bar, Pula",
    photoAlt: "An intimate cocktail bar at night, guests at the bar and red-orange neon lines behind the bartender.",
  },
  menu: {
    title: "Cocktail menu",
    categories: "Cocktail categories",
    note: "Prices are in euros. Ask the bartender about allergies.",
  },
  evening: {
    title: "An evening at Roots",
    gallery: "Photos of the evening at Roots",
    photos: [
      { caption: "The neon comes on", alt: "Close-up of red-orange neon lines on the dark wall at Roots." },
      { caption: "First round from the shaker", alt: "A bartender's hands shaking a cocktail in a metal shaker under neon light." },
      { caption: "A toast at the table", alt: "Guests' hands raising orange cocktails in a toast at a table." },
      { caption: "Three glasses, one bar", alt: "Three cocktails on the bar with a red-orange neon glow." },
      { caption: "One more, then home", alt: "Friends seen from behind at a table in the half-dark of Roots." },
    ],
  },
  visit: {
    label: "Visit",
    hoursTitle: "Opening hours",
    hours: ["Monday to Thursday", "Friday and Saturday", "Sunday"],
    times: ["6 pm - 1 am", "6 pm - 2 am", "6 pm - midnight"],
    open: "Open",
    closed: "Closed",
    closesIn: "Closing in",
    opensIn: "Opening in",
    whereTitle: "Where we are",
    place: "Pula, city centre",
    concept: "This is a concept. The bar doesn't exist, so there is no address.",
  },
  map: {
    label: "Sketch of central Pula: the port, the old town around the Kaštel hill, the Arena and Roots on the south side of the old town.",
    harbour: "PORT",
    gate: "GOLDEN GATE",
    caption: "In the old town, below the Kaštel",
  },
  faq: {
    title: "Good to know",
    items: [
      { question: "Do you take reservations?", answer: "We don't. Tables and bar seats are first come, first served, and there is nearly always room at the bar." },
      { question: "Do you have alcohol-free cocktails?", answer: "We do, they are on the menu under Alcohol-free." },
      { question: "Why the big ice cube?", answer: "It melts slower, so your drink stays cold, not watery, to the last sip. We freeze and cut our own ice." },
      { question: "Do you take cards?", answer: "Yes, cash and cards." },
    ],
  },
  story: {
    eyebrow: "Signature cocktail",
    title: "Our Paloma",
    paragraphs: [
      "The Paloma is a Mexican classic of tequila, grapefruit and lime. At Roots we made our own, and it is the one drink you shouldn't skip.",
      "We squeeze pink grapefruit every evening, rim the glass with sea salt and top it with cold grapefruit soda that keeps it lively to the last sip.",
    ],
    sign: "Don't leave Pula without trying it.",
    photoAlt: "A pale pink Paloma in a tall glass with a clear ice spear, salt on half the rim and a grapefruit slice on the dark bar, under red-orange neon.",
  },
  footer: {
    concept: "A concept website for a portfolio. Roots is not a real bar.",
    credit: "Made by Webradiona",
    age: "We don't serve alcohol to anyone under 18.",
    label: "Cocktail bar, Pula",
    farewell: "See you tonight.",
  },
};

export const copy: Record<Locale, Copy> = { en, hr };

const LocaleContext = createContext<Locale>("en");
export const LocaleProvider = LocaleContext.Provider;
export const useLocale = () => useContext(LocaleContext);
export const useCopy = () => copy[useLocale()];

/** Croatian keeps its one-letter words with the next word; English text is left as written. */
export function useTypeset() {
  const locale = useLocale();
  return (text: string) => (locale === "hr" ? keepShortWords(text) : text);
}
