import { DatePicker, Picker, TimePicker } from '@nativebricks/core';
import React from 'react';
import { Text, View } from 'react-native';
import { create } from 'zustand';

const useSelected = create<{
  selected: string | null;
  setSelected: (selected: string) => void;
}>((set) => {
  return {
    selected: null,
    setSelected: (selected: string) => set({ selected }),
  };
});
export default function Package() {
  return (
    <View className="flex-1 p-4 gap-4 items-center">
      <TimePicker wrapperClassName="max-w-xs w-full" />
      <DatePicker wrapperClassName="max-w-lg w-full" />
      <SelectedText />
      <View className="bg-card p-2 flex-row gap-2 w-max items-center justify-center rounded-radius">
        <Picker
          data={Array.from({ length: 24 }, (_, i) => ({
            label: i.toString(),
            value: i.toString(),
          }))}
          onChange={(value) => {
            useSelected.getState().setSelected(value);
          }}
        />
        <Picker
          data={Array.from({ length: 24 }, (_, i) => ({
            label: i.toString(),
            value: i.toString(),
          }))}
          onChange={(value) => {
            useSelected.getState().setSelected(value);
          }}
        />
        <Picker
          data={Array.from({ length: 24 }, (_, i) => ({
            label: i.toString(),
            value: i.toString(),
          }))}
          onChange={(value) => {
            useSelected.getState().setSelected(value);
          }}
        />
      </View>
    </View>
  );
}

const SelectedText = () => {
  const { selected } = useSelected();
  return <Text className="text-black">{selected || 'undefined'}</Text>;
};
