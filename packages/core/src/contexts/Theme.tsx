import { colorScheme as nativeColorScheme } from 'nativewind';
import React, { createContext, useEffect, useMemo } from 'react';
import { create, TailwindFn, TwConfig, useDeviceContext } from 'twrnc';
import { useColorScheme } from '../lib/useColorScheme';

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
  useDeviceContext(tw);
  useEffect(() => {
    nativeColorScheme.set(colorScheme);
  }, [colorScheme]);
  return (
    <ThemeContext.Provider
      value={{
        tailwind: tw,
      }}
    >
      {/* <View className={cn('flex-1', colorScheme === 'dark' ? 'dark' : '')}>{children}</View> */}
      {children}
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
