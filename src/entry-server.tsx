import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { copy, type Locale } from "./i18n";

export { LOCALES, localePath } from "./i18n";

export function render(locale: Locale) {
  return { html: renderToString(<StrictMode><App locale={locale} /></StrictMode>), meta: copy[locale].meta };
}
