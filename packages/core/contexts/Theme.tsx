import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { create, TailwindFn, TwConfig, useAppColorScheme, useDeviceContext } from 'twrnc';
import { PortalHost } from '../base/portal';
import { useColorScheme } from '../hooks/useColorScheme';
import { ColorsType, DEFAULT_COLORS, getColors } from '../lib/default-colors';

const ThemeContext = createContext<{
  tailwind: TailwindFn | null;
}>({
  tailwind: null,
});

type ThemeProviderProps = {
  tailwindConfig: TwConfig;
  colors: ColorsType;
  children: ReactNode;
  initialColorScheme?: 'light' | 'dark';
};

export function ThemeProvider({
  tailwindConfig,
  colors,
  children,
  initialColorScheme,
}: ThemeProviderProps) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const tw = useMemo(() => {
    const _colors = colors || DEFAULT_COLORS;
    const cols = Object.entries(
      getColors(colorScheme === 'dark' ? _colors.dark : _colors.light)
    ).reduce((acc, [key, value]) => {
      acc[key.replace('--', '')] = value;
      return acc;
    }, {} as Record<string, string>);
    console.log(cols);
    return create({
      theme: {
        ...tailwindConfig.theme,
        colors: cols,
      },
      plugins: [],
    });
  }, [tailwindConfig, colors, colorScheme]);
  const [twrncColorScheme, _, setTwrncColorScheme] = useAppColorScheme(tw);

  useDeviceContext(tw);
  useEffect(() => {
    if (colorScheme && Platform.OS === 'web' && window && window.document) {
      document.body.classList.add(colorScheme);
      document.body.classList.remove(colorScheme === 'dark' ? 'light' : 'dark');
    }
  }, [colorScheme]);
  useEffect(() => {
    if (initialColorScheme) {
      setColorScheme(initialColorScheme);
    }
  }, [initialColorScheme]);
  if (colorScheme !== twrncColorScheme) {
    setTwrncColorScheme(colorScheme);
  }
  return (
    <ThemeContext.Provider
      value={{
        tailwind: tw,
      }}
    >
      {children}
      <PortalHost />
    </ThemeContext.Provider>
  );
}
export const useTw = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTw must be used within a ThemeProvider');
  }
  return context.tailwind!;
};
