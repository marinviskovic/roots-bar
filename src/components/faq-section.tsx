import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import friends from "@/assets/fosfor-atmosfera-drustvo.webp";
import lemonade from "@/assets/cocktail-limunada-bosiljak.webp";
import negroni from "@/assets/cocktail-negroni.webp";
import counter from "@/assets/fosfor-atmosfera-case.webp";

// Each answer gets a small photo from the bar; it reveals each time the answer opens (the answer mounts on open).
const questions = [
  { question: "Primate li rezervacije?", answer: "Ne primamo. Stolovi i šank su za one koji prvi dođu, a za šankom se mjesto uvijek brzo nađe.", image: friends, position: "30% 70%" },
  { question: "Imate li bezalkoholne koktele?", answer: "Imamo, na karti su pod Bez alkohola.", image: lemonade, position: "50% 40%" },
  { question: "Zašto velika kocka leda?", answer: "Topi se sporije, pa koktel ostaje hladan, a ne vodenast, do zadnjeg gutljaja. Led smrzavamo i režemo sami.", image: negroni, position: "50% 38%" },
  { question: "Primate li kartice?", answer: "Da, gotovinu i kartice.", image: counter, position: "50% 75%" },
];

export function FaqSection() {
  return (
    <section id="cesta-pitanja" className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title">Česta pitanja</h2>
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
