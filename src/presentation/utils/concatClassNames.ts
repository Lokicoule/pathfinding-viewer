export const concatClassNames = (...classNames: (string | undefined)[]) =>
  classNames.filter(Boolean).join(" ");
