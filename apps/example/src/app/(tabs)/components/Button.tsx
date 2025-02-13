import { Button } from '@nativebricks/core';
import { View } from 'react-native';

export default function InputPage() {
  return (
    <View className="flex-1 pt-12 container">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="light">Light</Button>
      <Button variant="destructive">Destructive</Button>
    </View>
  );
}
