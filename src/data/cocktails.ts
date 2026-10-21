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

export type Cocktail = { name: string; ingredients: string; price: number; image: string; serve: string; alt: string };
export type CocktailCategory = { id: string; label: string; items: Cocktail[] };

export const cocktailCategories: CocktailCategory[] = [
  {
    id: "autorski", label: "Autorski", items: [
      { name: "Biska Sour", ingredients: "istarska biska, limun, bjelanjak, angostura", price: 10, image: biska, serve: "Niska čaša, velika kocka leda", alt: "Zlatno-žuti Biska Sour s velikom kockom leda, debelom bijelom pjenom i tri kapi angosture." },
      { name: "Roots", ingredients: "mezcal, aperol, crveni grejp, limeta", price: 11, image: roots, serve: "Niska čaša, velika kocka leda", alt: "Crveno-narančasti Roots u niskoj teškoj čaši s velikom prozirnom kockom leda i korom grejpa." },
      { name: "Paloma", ingredients: "tekila, ružičasti grejp, limeta, morska sol, gazirani grejp", price: 10, image: paloma, serve: "Visoka čaša, štapić leda, sol na rubu", alt: "Blijedo ružičasta Paloma u visokoj čaši s prozirnim štapićem leda, solju na pola ruba i kriškom grejpa na tamnom šanku." },
      { name: "Arena", ingredients: "istarski gin, rabarbara, limun, tonik", price: 10, image: arena, serve: "Visoka čaša, štapić leda", alt: "Blijedo ružičasta pjenušava Arena u visokoj čaši s prozirnim štapićem leda i vrpcom rabarbare." },
      { name: "Neon Spritz", ingredients: "pjenušava malvazija, aperol, naranča", price: 9, image: spritz, serve: "Velika vinska čaša, puno leda", alt: "Svijetlo narančasti Neon Spritz u velikoj vinskoj čaši s puno leda i kolutom naranče." },
      { name: "Ponoćni espresso", ingredients: "votka, espresso, liker od kave, prstohvat morske soli", price: 10, image: espresso, serve: "Mala čaša na stalku, bez leda", alt: "Tamni Ponoćni espresso u maloj čaši na stalku, sa svijetlom kremom i pahuljicama morske soli." },
    ],
  },
  {
    id: "klasici", label: "Klasici", items: [
      { name: "Espresso Martini", ingredients: "votka, espresso, liker od kave", price: 10, image: espressoMartini, serve: "Martini čaša, bez leda", alt: "Tamni Espresso Martini bez leda u čaši u obliku slova V s gustom kremom i tri zrna kave." },
      { name: "Negroni", ingredients: "gin, campari, crveni vermut", price: 9, image: negroni, serve: "Niska čaša, velika kocka leda", alt: "Tamnocrveni Negroni u niskoj čaši s velikom kristalno prozirnom kockom leda i korom naranče na neonski osvijetljenom šanku." },
      { name: "Old Fashioned", ingredients: "bourbon, šećer, angostura, kora naranče", price: 10, image: oldFashioned, serve: "Niska čaša, velika kocka leda", alt: "Jantarni Old Fashioned u niskoj čaši od brušenog stakla s velikom prozirnom kockom leda i dugom korom naranče." },
      { name: "Margarita", ingredients: "tekila, triple sec, limeta, sol", price: 9, image: margarita, serve: "Niska čaša, sol na rubu, velika kocka leda", alt: "Blijedo žuto-zelena Margarita u niskoj čaši sa solju na pola ruba, velikom kockom leda i kolutom limete." },
      { name: "Daiquiri", ingredients: "bijeli rum, limeta, šećer", price: 9, image: daiquiri, serve: "Široka čaša na stalku, bez leda", alt: "Mutno bjelkasto-zeleni Daiquiri bez leda u širokoj plitkoj čaši na stalku s tankom kriškom limete na rubu." },
      { name: "Moscow Mule", ingredients: "votka, đumbirovo pivo, limeta", price: 9, image: moscowMule, serve: "Bakreni vrč, drobljeni led", alt: "Moscow Mule u orošenom bakrenom vrču s drobljenim ledom, limetom i grančicom mente na tamnom šanku." },
    ],
  },
  {
    id: "bez-alkohola", label: "Bez alkohola", items: [
      { name: "Virgin Mule", ingredients: "đumbirovo pivo, limeta, menta", price: 6, image: virginMule, serve: "Bakreni vrč, drobljeni led", alt: "Virgin Mule u bakrenom vrču s drobljenim ledom, obiljem svježe mente i kolutom limete na neonski osvijetljenom šanku." },
      { name: "Crvena laguna", ingredients: "crveni grejp, ružmarin, soda", price: 6, image: crvenaLaguna, serve: "Visoka čaša, štapić leda", alt: "Ružičasto-crvena Crvena laguna s mjehurićima u visokoj čaši s prozirnim štapićem leda i grančicom ružmarina." },
      { name: "Limunada s bosiljkom", ingredients: "limun, bosiljak, soda", price: 5, image: limunada, serve: "Srednja čaša, kockice leda", alt: "Blijedožuta limunada u srednje visokoj čaši s kockicama leda, listovima bosiljka i kolutom limuna." },
    ],
  },
];
