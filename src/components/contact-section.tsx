import { useEffect, useState } from "react";
import { PulaMap } from "@/components/pula-map";

const hours = [
  { days: [1, 2, 3, 4], label: "Ponedjeljak - četvrtak", time: "18-01 h" },
  { days: [5, 6], label: "Petak i subota", time: "18-02 h" },
  { days: [0], label: "Nedjelja", time: "18-24 h" },
];

const OPENS = 18;
/** Closing hour per weekday (0 = Sunday), counted from that day's midnight, so 25 means 1 am the next night. */
const CLOSES = [24, 25, 25, 25, 25, 26, 26];

type Status = { open: boolean; minutes: number; day: number };

/** Bar nights run past midnight, so after midnight the bar can still be open on the previous evening's hours. */
function barStatus(now: Date): Status {
  const day = now.getDay();
  const yesterday = (day + 6) % 7;
  const hour = now.getHours() + now.getMinutes() / 60;
  const until = (end: number) => Math.round((end - hour) * 60);
  if (hour < CLOSES[yesterday] - 24) return { open: true, minutes: until(CLOSES[yesterday] - 24), day: yesterday };
  if (hour >= OPENS) return { open: true, minutes: until(CLOSES[day]), day };
  return { open: false, minutes: until(OPENS), day };
}

function duration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

export function ContactSection() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const update = () => setStatus(barStatus(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="kontakt" className="contact-section" aria-label="Kontakt">
      <div>
        <div className="contact-hours-heading">
          <h2>Radno vrijeme</h2>
          <div className="contact-sign" data-open={status?.open} aria-live="polite">
            {status && <>
              <p className="contact-sign-label" key={String(status.open)}>{status.open ? "Otvoreno" : "Zatvoreno"}</p>
              <p className="contact-sign-countdown">{status.open ? `Zatvaramo za ${duration(status.minutes)}` : `Otvaramo za ${duration(status.minutes)}`}</p>
            </>}
          </div>
        </div>
        <dl className="contact-hours">
          {hours.map(row => <div key={row.label} className={status && row.days.includes(status.day) ? "contact-today" : undefined}><dt>{row.label}</dt><dd>{row.time}</dd></div>)}
        </dl>
      </div>
      <div>
        <h2>Gdje smo</h2>
        <p className="contact-place">Pula, centar</p>
        <p className="contact-note">Ovo je koncept, bar ne postoji pa nema ni adrese.</p>
        <PulaMap />
      </div>
    </section>
  );
}
