import { useTw } from '../contexts/Theme';
import { ColorsType } from '../lib/default-colors';

type FlattenedColors =
  | keyof ColorsType['dark']
  | `${keyof ColorsType['dark']}-${
      | 'faint'
      | 'muted'
      | 'subtle'
      | 'emphasis'
      | 'strong'
      | 'inverted'}`;
export const useColor = (color: FlattenedColors) => {
  const tw = useTw();
  const localColor =
    !color.includes('bg') || !color.includes('text') || !color.includes('border')
      ? `bg-${color}`
      : color;

  const style = tw.style(localColor);
  if (localColor.includes('bg-')) return String(style.backgroundColor);
  else if (localColor.includes('text-')) return String(style.color);
  else if (localColor.includes('border-')) return String(style.borderColor);
  return tw.color(localColor);
};
