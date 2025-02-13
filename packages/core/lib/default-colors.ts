import colors from 'tailwindcss/colors';
export const getColors = (c: ColorsType['dark']) => {
  return Object.entries(c).reduce(
    (acc, [key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subKey === 'DEFAULT') acc[`--${key}`] = subValue;
          else acc[`--${key}-${subKey}`] = subValue;
        });
        return acc;
      }
      return acc;
    },
    {} as {
      [key: string]: string;
    }
  );
};
type ColorVariants =
  | 'faint'
  | 'muted'
  | 'subtle'
  | 'emphasis'
  | 'strong'
  | 'inverted'
  | 'hover'
  | 'disabled'
  | 'DEFAULT';
type ColorVariant = Partial<Record<ColorVariants, string>>;
type ColorTypeVariants =
  | 'brand'
  | 'background'
  | 'border'
  | 'ring'
  | 'content'
  | 'destructive'
  | 'success'
  | 'warning';
type ColorType = Record<ColorTypeVariants, ColorVariant>;
export type ColorsType = {
  light: Partial<ColorType>;
  dark: Partial<ColorType>;
};
export const DEFAULT_COLORS: ColorsType = {
  light: {
    brand: {
      faint: colors.blue[100],
      muted: colors.blue[200],
      subtle: colors.blue[300],
      DEFAULT: colors.blue[500],
      emphasis: colors.blue[700],
      inverted: colors.white,
      disabled: colors.blue[300],
      hover: colors.blue[600],
      strong: colors.blue[900],
    },
    background: {
      muted: colors.neutral[300],
      subtle: colors.neutral[200],
      DEFAULT: colors.neutral[100],
      emphasis: colors.white,
      disabled: colors.neutral[300],
      hover: colors.neutral[200],
      inverted: colors.neutral[900],
      strong: colors.neutral[900],
    },
    border: {
      DEFAULT: colors.gray[200],
      muted: colors.gray[300],
    },
    ring: {
      DEFAULT: colors.gray[200],
    },
    content: {
      subtle: colors.gray[400],
      DEFAULT: colors.gray[700],
      strong: colors.gray[900],
      inverted: colors.white,
    },
    destructive: {
      DEFAULT: colors.red[500],
      hover: colors.red[600],
      disabled: colors.red[300],
      inverted: colors.white,
    },
    success: {
      DEFAULT: colors.green[500],
      hover: colors.green[600],
      disabled: colors.green[300],
      inverted: colors.white,
    },
    warning: {
      DEFAULT: colors.yellow[500],
      hover: colors.yellow[600],
      disabled: colors.yellow[300],
      inverted: colors.yellow[900],
    },
  },
  dark: {
    brand: {
      faint: colors.blue[950],
      muted: colors.blue[900],
      subtle: colors.blue[800],
      DEFAULT: colors.blue[500],
      emphasis: colors.blue[400],
      inverted: colors.blue[950],
    },
    background: {
      faint: colors.neutral[950],
      muted: colors.neutral[950],
      subtle: colors.neutral[800],
      DEFAULT: colors.neutral[900],
      emphasis: colors.neutral[800],
    },
    border: {
      DEFAULT: colors.gray[800],
      muted: colors.gray[900],
    },
    ring: {
      DEFAULT: colors.gray[800],
    },
    content: {
      subtle: colors.gray[600],
      DEFAULT: colors.gray[100],
      strong: colors.gray[50],
      inverted: colors.gray[950],
    },
    destructive: {
      DEFAULT: colors.red[700],
      hover: colors.red[600],
      disabled: colors.red[950],
      inverted: colors.red[300],
    },
    success: {
      DEFAULT: colors.green[500],
      hover: colors.green[600],
      disabled: colors.green[300],
      inverted: colors.green[900],
    },
    warning: {
      DEFAULT: colors.yellow[500],
      hover: colors.yellow[600],
      disabled: colors.yellow[300],
      inverted: colors.yellow[900],
    },
  },
};
