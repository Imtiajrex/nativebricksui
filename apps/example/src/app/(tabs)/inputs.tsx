import {
  ContextMenu,
  Dialog,
  MultiSelect,
  Select,
  Slider,
  toast,
  Toaster,
} from '@nativebricks/core';
import React from 'react';
import { View } from 'react-native';

export default function Inputs() {
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  const [multiSelected, setMultiSelected] = React.useState<string[]>([]);
  return (
    <View className="p-4 pt-64">
      <Select
        options={['Apple', 'Banana', 'Blueberry']}
        value={selected}
        onChange={(value) => {
          setSelected(value);
          toast.show({ message: value, type: 'info', duration: 50000, placement: 'bottom center' });
        }}
        placeholder="Select a fruit"
      />
      <MultiSelect
        options={['Apple', 'Banana', 'Blueberry']}
        value={multiSelected}
        onChange={(value) => {
          setMultiSelected(value);
          toast.show({
            message: value.join(','),
            type: 'info',
            duration: 50000,
            placement: 'bottom center',
          });
        }}
        placeholder="Select a fruit"
      />
      <Slider />
      <Toaster />
      <ContextMenu />
      <Dialog />
    </View>
  );
}
