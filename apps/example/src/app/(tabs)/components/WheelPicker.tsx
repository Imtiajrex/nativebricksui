import { Button, Text, useColor, useColorScheme, WheelPicker } from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function WheelPickerScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View>
      <View
        style={{
          backgroundColor: useColor('primary'),
          padding: 10,
        }}
      />
      <Button
        onPress={() => {
          setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
        }}
      >
        <Text>Toggle Color ({colorScheme})</Text>
      </Button>
      <WheelPicker />
    </View>
  );
}
