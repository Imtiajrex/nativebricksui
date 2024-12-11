import React, { createContext, RefObject, useRef } from 'react';
import { create, TailwindFn, TwConfig, useDeviceContext } from 'twrnc';

const ThemeContext = createContext<RefObject<TailwindFn | null>>(null);

type ThemeProviderProps = {
  tailwindConfig: TwConfig;
  children: React.ReactNode;
  cssFile?: any;
};
export function ThemeProvider({ tailwindConfig, cssFile, children }: ThemeProviderProps) {
  console.log('css', cssFile);
  const tw = create({
    theme: tailwindConfig.theme,
    plugins: [],
  });
  const tailwind = useRef(tw);
  useDeviceContext(tailwind.current);
  return <ThemeContext.Provider value={tailwind}>{children}</ThemeContext.Provider>;
}
export const useTw = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTw must be used within a ThemeProvider');
  }
  return context.current;
};
