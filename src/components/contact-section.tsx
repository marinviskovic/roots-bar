import { useEffect, useState } from "react";
import { PulaMap } from "@/components/pula-map";
import { useCopy } from "@/i18n";

/** Weekdays (0 = Sunday) for each row of opening hours; the labels and times are in i18n.ts. */
const rows = [[1, 2, 3, 4], [5, 6], [0]];

const OPENS = 18;
/** Closing hour per weekday (0 = Sunday), counted from that day's midnight, so 25 means 1 am the next night. */
const CLOSES = [24, 25, 25, 25, 25, 26, 26];

type Status = { open: boolean; minutes: number; day: number };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pulaClock = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zagreb", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" });

/** The bar keeps Pula time, whatever time zone the visitor's phone is in. */
function pulaTime(now: Date) {
  const parts = Object.fromEntries(pulaClock.formatToParts(now).map(part => [part.type, part.value]));
  return { day: WEEKDAYS.indexOf(parts.weekday), hour: Number(parts.hour) + Number(parts.minute) / 60 };
}

/** Bar nights run past midnight, so after midnight the bar can still be open on the previous evening's hours. */
function barStatus(now: Date): Status {
  const { day, hour } = pulaTime(now);
  const yesterday = (day + 6) % 7;
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
  const t = useCopy().visit;
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const update = () => setStatus(barStatus(new Date()));
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="visit" className="contact-section" aria-label={t.label}>
      <div>
        <div className="contact-hours-heading">
          <h2>{t.hoursTitle}</h2>
          <div className="contact-sign" data-open={status?.open} aria-live="polite">
            {status && <>
              <p className="contact-sign-label" key={String(status.open)}>{status.open ? t.open : t.closed}</p>
              <p className="contact-sign-countdown">{`${status.open ? t.closesIn : t.opensIn} ${duration(status.minutes)}`}</p>
            </>}
          </div>
        </div>
        <dl className="contact-hours">
          {rows.map((days, index) => <div key={index} className={status && days.includes(status.day) ? "contact-today" : undefined}><dt>{t.hours[index]}</dt><dd>{t.times[index]}</dd></div>)}
        </dl>
      </div>
      <div>
        <h2>{t.whereTitle}</h2>
        <p className="contact-place">{t.place}</p>
        <p className="contact-note">{t.concept}</p>
        <PulaMap />
      </div>
    </section>
  );
}
