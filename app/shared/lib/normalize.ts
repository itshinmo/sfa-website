const arabicToPersian: Record<string, string> = {
  ي: "ی",
  ك: "ک",
  ۀ: "ه",
  ة: "ه",
  أ: "ا",
  إ: "ا",
  آ: "ا",
  ٱ: "ا",
};

export function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/\u200c/g, " ")
    .replace(/[يكۀةأإآٱ]/g, (character) => arabicToPersian[character] ?? character)
    .replace(/\s+/g, " ")
    .trim();
}
