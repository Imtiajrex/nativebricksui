import { DatePicker, Picker, TimePicker } from '@nativebricks/core';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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
    <ScrollView
      className="flex-1 p-4 gap-4 items-center w-full"
      contentContainerClassName="w-full items-center"
    >
      <TimePicker wrapperClassName="max-w-xs w-full" />
      <SelectedText />
      <UnoptimizedDate />
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
    </ScrollView>
  );
}
const UnoptimizedDate = () => {
  const [date, setDate] = useState({
    day: 1,
    month: 1,
    year: 2022,
  });
  const datePicker = useMemo(() => {
    return (
      <DatePicker
        onDayChange={(day) => {
          setDate((prev) => ({ ...prev, day }));
        }}
        onMonthChange={(month) => {
          setDate((prev) => ({ ...prev, month }));
        }}
        onYearChange={(year) => {
          setDate((prev) => ({ ...prev, year }));
        }}
        wrapperClassName="max-w-sm w-full"
      />
    );
  }, [setDate]);
  return (
    <View className="gap-2 w-full items-center">
      <Text>
        {date.day}/{date.month}/{date.year}
      </Text>
      {datePicker}
    </View>
  );
};
const SelectedText = () => {
  const { selected } = useSelected();
  return <Text className="text-black">{selected || 'undefined'}</Text>;
};
