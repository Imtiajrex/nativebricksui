import { View, Text } from 'react-native';
import React from 'react';
import { Button, PopoverMode, PopoverPlacement, Pressable } from '@nativebricks/core';
import { Popover } from '@nativebricks/core';

export default function PopoverPage() {
  return (
    <View className="container">
      <Popover from={<Button className="w-max">Open Popover</Button>}>
        <View className="w-44 p-4 bg-background-emphasis rounded-radius">
          <Text>Popover content</Text>
        </View>
      </Popover>
    </View>
  );
}
