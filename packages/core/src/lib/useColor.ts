import { useTw } from '~/contexts/Theme';

export const useColor = (color: string) => {
  const tw = useTw();
  const style = tw.style(color);
  if (color.includes('bg-')) return String(style.backgroundColor);
  else if (color.includes('text-')) return String(style.color);
  else if (color.includes('border-')) return String(style.borderColor);
  return tw.color(color);
};
