import { Accordion, alert, Chip, Text } from '@nativebricks/core';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { X as Close } from 'lucide-react-native';

export default function ChipPage() {
  return (
    <View className="container items-center justify-center">
      <Chip>
        <Text>React</Text>
      </Chip>
      <Chip variant="outline">
        <Text>Vue</Text>
      </Chip>
      <Chip variant="secondary">
        <Text>Svelte</Text>
      </Chip>
      <Chip variant="destructive" className="flex-row items-center gap-1">
        <Text className="">Angular</Text>
        <Pressable
          className=" items-center justify-center"
          onPress={() => {
            alert({
              title: 'Chip',
              description: 'Angular chip pressed',
            });
          }}
        >
          <Close color={'black'} size={12} />
        </Pressable>
      </Chip>
    </View>
  );
}
