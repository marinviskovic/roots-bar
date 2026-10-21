import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CocktailMenu } from "@/components/cocktail-menu";
import { AtmosphereSection } from "@/components/atmosphere-section";
import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/faq-section";
import { StorySection } from "@/components/story-section";
import { Footer } from "@/components/footer";

export function App() {
  return (
    <>
      <a className="skip-link" href="#karta">Preskoči na koktel kartu</a>
      <Navbar />
      <main>
        <Hero />
        <CocktailMenu />
        <AtmosphereSection />
        <ContactSection />
        <FaqSection />
        <StorySection />
      </main>
      <Footer />
    </>
  );
}
