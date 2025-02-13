import { ThemeProvider, useColor, useColorScheme } from '@nativebricks/core';
import { DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import Head from 'expo-router/head';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import '../components/gesture-handler';
import '../global.css';
import { DEFAULT_COLORS } from '@nativebricks/core';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});
// 'Warning: You are setting the style `{ shadowOffset: ... }` as a prop. You should nest it in a style object. E.g. `{ style: { shadowOffset: ... } }`',
// create regex to match the warning
// LogBox.ignoreLogs([
//   /You are setting the style `{ shadowOffset: ... }` as a prop. You should nest it in a style object. E.g. `{ style: { shadowOffset: ... } }`/,
// ]);

LogBox.install();
LogBox.ignoreLogs([
  /'You are setting the style `{ shadowOffset: ... }` as a prop. You should nest it in a style object. E.g. `{ style: { shadowOffset: ... } }`/,
]);
export default function Layout() {
  return (
    <GestureHandlerRootView>
      <ThemeProvider
        colors={DEFAULT_COLORS}
        tailwindConfig={require('../../tailwind.config')}
        initialColorScheme="light"
      >
        <Root />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
const Root = () => {
  return (
    <NavigationThemeProvider
      value={{
        ...DefaultTheme,
        colors: {
          background: useColor('background'),
          border: useColor('border'),
          card: useColor('background-emphasis'),
          primary: useColor('brand'),
          text: useColor('content'),
          notification: useColor('content'),
        },
        dark: useColorScheme().colorScheme === 'dark',
      }}
    >
      <Head>
        <title>Native Bricks UI</title>
      </Head>
      <Slot />
    </NavigationThemeProvider>
  );
};
