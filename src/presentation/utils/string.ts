export const concat = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(" ");
