import plugin from 'tailwindcss/plugin';
const attachColors = (_colors?: ColorsType): PluginCreator => {
  return function ({ addBase }) {
    const Colors = { ...DEFAULT_COLORS, ..._colors };
    const lightColors = getColors(Colors.light);
    const darkColors = getColors(Colors.dark);
    addBase({
      ':root': lightColors,
      '.dark': darkColors,
    });
  };
};

export default function setupColors(_colors?: ColorsType) {
  return plugin(attachColors(_colors), {
    theme: {
      extend: {
        colors: {
          brand: {
            faint: 'var(--brand-faint)',
            muted: 'var(--brand-muted)',
            subtle: 'var(--brand-subtle)',
            DEFAULT: 'var(--brand)',
            emphasis: 'var(--brand-emphasis)',
            inverted: 'var(--brand-inverted)',
          },
          background: {
            muted: 'var(--background-muted)',
            subtle: 'var(--background-subtle)',
            DEFAULT: 'var(--background)',
            emphasis: 'var(--background-emphasis)',
          },
          border: {
            DEFAULT: 'var(--border)',
          },
          ring: {
            DEFAULT: 'var(--ring)',
          },
          content: {
            subtle: 'var(--content-subtle)',
            DEFAULT: 'var(--content)',
            emphasis: 'var(--content-emphasis)',
            strong: 'var(--content-strong)',
            inverted: 'var(--content-inverted)',
          },
          destructive: {
            DEFAULT: 'var(--destructive)',
            hover: 'var(--destructive-hover)',
            disabled: 'var(--destructive-disabled)',
            inverted: 'var(--destructive-inverted)',
          },
          success: {
            DEFAULT: 'var(--success)',
            hover: 'var(--success-hover)',
            disabled: 'var(--success-disabled)',
            inverted: 'var(--success-inverted)',
          },
          warning: {
            DEFAULT: 'var(--warning)',
            hover: 'var(--warning-hover)',
            disabled: 'var(--warning-disabled)',
            inverted: 'var(--warning-inverted)',
          },
        },
      },
    },
  });
}
import { PluginCreator } from 'tailwindcss/types/config';
import { ColorsType, DEFAULT_COLORS, getColors } from '../lib/default-colors';
