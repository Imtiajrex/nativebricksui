import { View, Text } from 'react-native';
import React from 'react';
import { WheelPicker } from '@nativebricks/core';

export default function WheelPickerScreen() {
  return (
    <View>
      <WheelPicker
        onChange={(value) => {
          console.log(value);
        }}
        options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
        selectedIndex={0}
      />
    </View>
  );
}
