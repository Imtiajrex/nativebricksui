import { useTw } from '../contexts/Theme';

export const useColor = (color: string) => {
  const tw = useTw();
  const localColor =
    color.includes('bg-') || color.includes('text-') || color.includes('border-')
      ? color
      : `text-${color}`;
  const style = tw.style(localColor);
  if (localColor.includes('bg-')) return String(style.backgroundColor);
  else if (localColor.includes('text-')) return String(style.color);
  else if (localColor.includes('border-')) return String(style.borderColor);
  return tw.color(color);
};
