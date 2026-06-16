export const sanitizeText = (value: string): string =>
  value
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
