import { PortalHost } from '@nativebricks/core';
import { Slot } from 'expo-router';
import Head from 'expo-router/head';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import '../components/gesture-handler';
import '../global.css';

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
      <Head>
        <title>Native Bricks UI</title>
      </Head>
      <Slot />
      <PortalHost />
    </GestureHandlerRootView>
  );
}
