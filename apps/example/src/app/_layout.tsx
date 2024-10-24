import { Slot } from 'expo-router';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import '../global.css';
import { OverlayProvider } from '@nativebricks/core';

export default function Layout() {
  return (
    <OverlayProvider>
      <Slot />
    </OverlayProvider>
  );
}
