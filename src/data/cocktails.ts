import roots from "@/assets/cocktail-fosfor.webp";
import paloma from "@/assets/cocktail-paloma.webp";
import arena from "@/assets/cocktail-arena.webp";
import biska from "@/assets/cocktail-biska-sour.webp";
import spritz from "@/assets/cocktail-neon-spritz.webp";
import espresso from "@/assets/cocktail-ponocni-espresso.webp";
import negroni from "@/assets/cocktail-negroni.webp";
import oldFashioned from "@/assets/cocktail-old-fashioned.webp";
import margarita from "@/assets/cocktail-margarita.webp";
import daiquiri from "@/assets/cocktail-daiquiri.webp";
import espressoMartini from "@/assets/cocktail-espresso-martini.webp";
import moscowMule from "@/assets/cocktail-moscow-mule.webp";
import crvenaLaguna from "@/assets/cocktail-crvena-laguna.webp";
import limunada from "@/assets/cocktail-limunada-bosiljak.webp";
import virginMule from "@/assets/cocktail-virgin-mule.webp";
import type { Locale } from "@/i18n";

type Text = { name: string; ingredients: string; serve: string; alt: string };
type Drink = { price: number; image: string } & Record<Locale, Text>;
type Category = { id: string; label: Record<Locale, string>; listLabel: Record<Locale, string>; items: Drink[] };

export type Cocktail = { price: number; image: string } & Text;
export type CocktailCategory = { id: string; label: string; listLabel: string; items: Cocktail[] };

const ROCKS = { hr: "Niska čaša, velika kocka leda", en: "Rocks glass, one big ice cube" };
const HIGHBALL = { hr: "Visoka čaša, štapić leda", en: "Highball, ice spear" };
const COPPER = { hr: "Bakreni vrč, drobljeni led", en: "Copper mug, crushed ice" };

const categories: Category[] = [
  {
    id: "signature", label: { hr: "Autorski", en: "Signature" }, listLabel: { hr: "Autorski kokteli", en: "Signature cocktails" }, items: [
      {
        price: 10, image: biska,
        hr: { name: "Biska Sour", ingredients: "istarska biska, limun, bjelanjak, angostura", serve: ROCKS.hr, alt: "Zlatno-žuti Biska Sour s velikom kockom leda, debelom bijelom pjenom i tri kapi angosture." },
        en: { name: "Biska Sour", ingredients: "biska (Istrian mistletoe brandy), lemon, egg white, Angostura", serve: ROCKS.en, alt: "A golden-yellow Biska Sour with a big ice cube, thick white foam and three drops of Angostura." },
      },
      {
        price: 11, image: roots,
        hr: { name: "Roots", ingredients: "mezcal, aperol, crveni grejp, limeta", serve: ROCKS.hr, alt: "Crveno-narančasti Roots u niskoj teškoj čaši s velikom prozirnom kockom leda i korom grejpa." },
        en: { name: "Roots", ingredients: "mezcal, Aperol, red grapefruit, lime", serve: ROCKS.en, alt: "A red-orange Roots in a heavy rocks glass with a big clear ice cube and a grapefruit twist." },
      },
      {
        price: 10, image: paloma,
        hr: { name: "Paloma", ingredients: "tekila, ružičasti grejp, limeta, morska sol, gazirani grejp", serve: "Visoka čaša, štapić leda, sol na rubu", alt: "Blijedo ružičasta Paloma u visokoj čaši s prozirnim štapićem leda, solju na pola ruba i kriškom grejpa na tamnom šanku." },
        en: { name: "Paloma", ingredients: "tequila, pink grapefruit, lime, sea salt, grapefruit soda", serve: "Highball, ice spear, salted rim", alt: "A pale pink Paloma in a tall glass with a clear ice spear, salt on half the rim and a grapefruit slice on the dark bar." },
      },
      {
        price: 10, image: arena,
        hr: { name: "Arena", ingredients: "istarski gin, rabarbara, limun, tonik", serve: HIGHBALL.hr, alt: "Blijedo ružičasta pjenušava Arena u visokoj čaši s prozirnim štapićem leda i vrpcom rabarbare." },
        en: { name: "Arena", ingredients: "Istrian gin, rhubarb, lemon, tonic", serve: HIGHBALL.en, alt: "A pale pink sparkling Arena in a tall glass with a clear ice spear and a ribbon of rhubarb." },
      },
      {
        price: 9, image: spritz,
        hr: { name: "Neon Spritz", ingredients: "pjenušava malvazija, aperol, naranča", serve: "Velika vinska čaša, puno leda", alt: "Svijetlo narančasti Neon Spritz u velikoj vinskoj čaši s puno leda i kolutom naranče." },
        en: { name: "Neon Spritz", ingredients: "sparkling Malvazija, Aperol, orange", serve: "Large wine glass, lots of ice", alt: "A light orange Neon Spritz in a large wine glass with lots of ice and an orange wheel." },
      },
      {
        price: 10, image: espresso,
        hr: { name: "Ponoćni espresso", ingredients: "votka, espresso, liker od kave, prstohvat morske soli", serve: "Mala čaša na stalku, bez leda", alt: "Tamni Ponoćni espresso u maloj čaši na stalku, sa svijetlom kremom i pahuljicama morske soli." },
        en: { name: "Midnight Espresso", ingredients: "vodka, espresso, coffee liqueur, a pinch of sea salt", serve: "Small stemmed glass, no ice", alt: "A dark Midnight Espresso in a small stemmed glass with a pale crema and flakes of sea salt." },
      },
    ],
  },
  {
    id: "classics", label: { hr: "Klasici", en: "Classics" }, listLabel: { hr: "Klasici", en: "Classics" }, items: [
      {
        price: 10, image: espressoMartini,
        hr: { name: "Espresso Martini", ingredients: "votka, espresso, liker od kave", serve: "Martini čaša, bez leda", alt: "Tamni Espresso Martini bez leda u čaši u obliku slova V s gustom kremom i tri zrna kave." },
        en: { name: "Espresso Martini", ingredients: "vodka, espresso, coffee liqueur", serve: "Martini glass, no ice", alt: "A dark Espresso Martini without ice in a V-shaped glass with thick crema and three coffee beans." },
      },
      {
        price: 9, image: negroni,
        hr: { name: "Negroni", ingredients: "gin, campari, crveni vermut", serve: ROCKS.hr, alt: "Tamnocrveni Negroni u niskoj čaši s velikom kristalno prozirnom kockom leda i korom naranče na neonski osvijetljenom šanku." },
        en: { name: "Negroni", ingredients: "gin, Campari, sweet vermouth", serve: ROCKS.en, alt: "A deep red Negroni in a rocks glass with a big crystal-clear ice cube and an orange twist on the neon-lit bar." },
      },
      {
        price: 10, image: oldFashioned,
        hr: { name: "Old Fashioned", ingredients: "bourbon, šećer, angostura, kora naranče", serve: ROCKS.hr, alt: "Jantarni Old Fashioned u niskoj čaši od brušenog stakla s velikom prozirnom kockom leda i dugom korom naranče." },
        en: { name: "Old Fashioned", ingredients: "bourbon, sugar, Angostura, orange peel", serve: ROCKS.en, alt: "An amber Old Fashioned in a cut-glass tumbler with a big clear ice cube and a long orange twist." },
      },
      {
        price: 9, image: margarita,
        hr: { name: "Margarita", ingredients: "tekila, triple sec, limeta, sol", serve: "Niska čaša, sol na rubu, velika kocka leda", alt: "Blijedo žuto-zelena Margarita u niskoj čaši sa solju na pola ruba, velikom kockom leda i kolutom limete." },
        en: { name: "Margarita", ingredients: "tequila, triple sec, lime, salt", serve: "Rocks glass, salted rim, one big ice cube", alt: "A pale yellow-green Margarita in a rocks glass with salt on half the rim, a big ice cube and a lime wheel." },
      },
      {
        price: 9, image: daiquiri,
        hr: { name: "Daiquiri", ingredients: "bijeli rum, limeta, šećer", serve: "Široka čaša na stalku, bez leda", alt: "Mutno bjelkasto-zeleni Daiquiri bez leda u širokoj plitkoj čaši na stalku s tankom kriškom limete na rubu." },
        en: { name: "Daiquiri", ingredients: "white rum, lime, sugar", serve: "Coupe, no ice", alt: "A cloudy pale green Daiquiri without ice in a wide, shallow coupe with a thin lime slice on the rim." },
      },
      {
        price: 9, image: moscowMule,
        hr: { name: "Moscow Mule", ingredients: "votka, đumbirovo pivo, limeta", serve: COPPER.hr, alt: "Moscow Mule u orošenom bakrenom vrču s drobljenim ledom, limetom i grančicom mente na tamnom šanku." },
        en: { name: "Moscow Mule", ingredients: "vodka, ginger beer, lime", serve: COPPER.en, alt: "A Moscow Mule in a frosted copper mug with crushed ice, lime and a sprig of mint on the dark bar." },
      },
    ],
  },
  {
    id: "alcohol-free", label: { hr: "Bez alkohola", en: "Alcohol-free" }, listLabel: { hr: "Bez alkohola", en: "Alcohol-free" }, items: [
      {
        price: 6, image: virginMule,
        hr: { name: "Virgin Mule", ingredients: "đumbirovo pivo, limeta, menta", serve: COPPER.hr, alt: "Virgin Mule u bakrenom vrču s drobljenim ledom, obiljem svježe mente i kolutom limete na neonski osvijetljenom šanku." },
        en: { name: "Virgin Mule", ingredients: "ginger beer, lime, mint", serve: COPPER.en, alt: "A Virgin Mule in a copper mug with crushed ice, plenty of fresh mint and a lime wheel on the neon-lit bar." },
      },
      {
        price: 6, image: crvenaLaguna,
        hr: { name: "Crvena laguna", ingredients: "crveni grejp, ružmarin, soda", serve: HIGHBALL.hr, alt: "Ružičasto-crvena Crvena laguna s mjehurićima u visokoj čaši s prozirnim štapićem leda i grančicom ružmarina." },
        en: { name: "Red Lagoon", ingredients: "red grapefruit, rosemary, soda", serve: HIGHBALL.en, alt: "A sparkling pinkish-red Red Lagoon in a tall glass with a clear ice spear and a sprig of rosemary." },
      },
      {
        price: 5, image: limunada,
        hr: { name: "Limunada s bosiljkom", ingredients: "limun, bosiljak, soda", serve: "Srednja čaša, kockice leda", alt: "Blijedožuta limunada u srednje visokoj čaši s kockicama leda, listovima bosiljka i kolutom limuna." },
        en: { name: "Basil Lemonade", ingredients: "lemon, basil, soda", serve: "Medium glass, ice cubes", alt: "A pale yellow lemonade in a medium glass with ice cubes, basil leaves and a lemon wheel." },
      },
    ],
  },
];

// Built once per language: the menu and the photo slider compare drinks by identity.
const byLocale: Partial<Record<Locale, CocktailCategory[]>> = {};

export function cocktailCategories(locale: Locale): CocktailCategory[] {
  return (byLocale[locale] ??= categories.map(({ id, label, listLabel, items }) => ({
    id,
    label: label[locale],
    listLabel: listLabel[locale],
    items: items.map(({ price, image, ...text }) => ({ price, image, ...text[locale] })),
  })));
}
