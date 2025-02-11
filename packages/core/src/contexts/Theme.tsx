import { createContext, ReactNode, useContext, useEffect, useMemo } from 'react';
import { create, TailwindFn, TwConfig, useAppColorScheme, useDeviceContext } from 'twrnc';
import { useColorScheme } from '../lib/useColorScheme';
import { PortalHost } from '../components/ui/Portal';
import { Platform, View } from 'react-native';

const ThemeContext = createContext<{
  tailwind: TailwindFn | null;
}>({
  tailwind: null,
});

type ThemeProviderProps = {
  tailwindConfig: TwConfig;
  colors: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  children: ReactNode;
};
export function ThemeProvider({ tailwindConfig, colors, children }: ThemeProviderProps) {
  const { colorScheme } = useColorScheme();
  const tw = useMemo(
    () =>
      create({
        theme: {
          ...tailwindConfig.theme,
          colors: colorScheme === 'dark' ? colors.dark : colors.light,
        },
        plugins: [],
      }),
    [tailwindConfig, colors, colorScheme]
  );
  const [twrncColorScheme, _, setTwrncColorScheme] = useAppColorScheme(tw);

  useDeviceContext(tw);
  useEffect(() => {
    if (colorScheme && Platform.OS === 'web' && window && window.document) {
      document.body.classList.add(colorScheme);
      document.body.classList.remove(colorScheme === 'dark' ? 'light' : 'dark');
    }
  }, [colorScheme]);
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
