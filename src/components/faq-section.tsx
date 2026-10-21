import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import friends from "@/assets/fosfor-atmosfera-drustvo.webp";
import lemonade from "@/assets/cocktail-limunada-bosiljak.webp";
import negroni from "@/assets/cocktail-negroni.webp";
import counter from "@/assets/fosfor-atmosfera-case.webp";
import { useCopy } from "@/i18n";

// Each answer gets a small photo from the bar; it reveals each time the answer opens (the answer mounts on open).
// The questions are in i18n.ts, in the same order.
const photos = [
  { image: friends, position: "30% 70%" },
  { image: lemonade, position: "50% 40%" },
  { image: negroni, position: "50% 38%" },
  { image: counter, position: "50% 75%" },
];

export function FaqSection() {
  const t = useCopy().faq;
  const questions = t.items.map((item, index) => ({ ...item, ...photos[index] }));
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title">{t.title}</h2>
      <Accordion.Root type="single" collapsible>
        {questions.map(({ question, answer, image, position }, index) => (
          <Accordion.Item key={question} value={`question-${index}`} className="faq-item">
            <Accordion.Header asChild>
              <h3>
                <Accordion.Trigger className="faq-trigger"><span>{question}</span><Plus aria-hidden="true" /></Accordion.Trigger>
              </h3>
            </Accordion.Header>
            <Accordion.Content className="faq-answer">
              <div className="faq-answer-body">
                <span className="faq-photo" aria-hidden="true"><img src={image} alt="" width={96} height={96} loading="lazy" decoding="async" style={{ objectPosition: position }} /></span>
                <p>{answer}</p>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
