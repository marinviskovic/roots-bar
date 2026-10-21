/** Keeps one-letter Croatian words (i, u, s, a, o, k, z) on the same line as the next word. */
export function keepShortWords(text: string) {
  return text.replace(/\b([osuiakz]) /gi, "$1 ");
}
