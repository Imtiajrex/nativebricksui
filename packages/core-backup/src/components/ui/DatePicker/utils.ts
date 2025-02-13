export const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const getNumberOptions = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => formatNumber(i + from));
export const meridiam = ['AM', 'PM'] as const;

export const hours = getNumberOptions(0, 23);
export const hours12 = getNumberOptions(1, 12);
export const minutes = getNumberOptions(0, 59);
export const seconds = getNumberOptions(0, 59);
