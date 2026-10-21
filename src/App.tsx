import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CocktailMenu } from "@/components/cocktail-menu";
import { AtmosphereSection } from "@/components/atmosphere-section";
import { ContactSection } from "@/components/contact-section";
import { FaqSection } from "@/components/faq-section";
import { StorySection } from "@/components/story-section";
import { Footer } from "@/components/footer";
import { copy, LocaleProvider, type Locale } from "@/i18n";

export function App({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider value={locale}>
      <a className="skip-link" href="#menu">{copy[locale].skipLink}</a>
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
    </LocaleProvider>
  );
}
