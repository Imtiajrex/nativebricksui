import {
  BottomSheet,
  Button,
  DateInput,
  DatePicker,
  Text,
  TimeInput,
  TimePicker,
  useColorScheme,
  WheelPicker,
} from '@nativebricks/core';
import { PortalHost } from '@nativebricks/core/src/base';
import React, { useCallback, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

export default function WheelPickerScreen() {
  const [selectedValue, setSelectedValue] = useState('1');
  const options = Array.from({ length: 24 }, (_, i) => `${i + 1}`);
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="max-w-2xl w-full mx-auto p-4"
      nestedScrollEnabled
    >
      <Text>Value ({options[selectedValue]})</Text>
      <WheelPicker
        onChange={(value) => {
          setSelectedValue(value);
        }}
        options={options}
        selectedIndex={options.findIndex((option) => option == selectedValue)}
      />
      <Time />
      <DateComponent />
    </ScrollView>
  );
}

const Time = () => {
  const [selectedTime, setSelectedTime] = useState('00:00');
  const updateTime = useCallback((time) => {
    setSelectedTime(`${time.hour}:${time.minute} ${time.meridiam}`);
  }, []);
  return (
    <View className="py-12">
      <Text className="text-center text-2xl">Time Picker</Text>
      <Text className="text-center font-bold text-lg">Time: {selectedTime}</Text>
      <TimePicker
        containerClassName="max-w-sm self-center"
        onChange={updateTime}
        pickSecond={false}
        hour12
      />

      <TimeInput
        placeholder="Select Time"
        value={selectedTime}
        onChange={(time) => setSelectedTime(`${time.hour}:${time.minute}`)}
      />
    </View>
  );
};

const DateComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);
  return (
    <View className="py-12">
      <Text className="text-center text-2xl">Date Picker</Text>
      <Text className="text-center font-bold text-lg">
        Date: {selectedDate.toLocaleDateString()}
      </Text>
      <DatePicker
        containerClassName="max-w-sm self-center"
        onChange={updateDate}
        monthFormat="short"
      />
      <DateInput
        placeholder="Select Date"
        value={selectedDate}
        onChange={updateDate}
        datePickerProps={{
          monthFormat: 'short',
        }}
      />
      <DateSheet />
    </View>
  );
};
const DateSheet = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);
  return (
    <View className="py-12">
      <Text className="text-center font-bold text-lg">
        Date: {selectedDate.toLocaleDateString()}
      </Text>
      <Button
        onPress={() => {
          sheetRef.current?.show();
        }}
      >
        Open Date Picker
      </Button>
      <BottomSheet
        ref={sheetRef}
        title="Date Sheet"
        contentClassName="max-w-4xl mx-auto w-full px-4"
      >
        <PortalHost name="date-sheet" />
        <DateInput
          containerClassName="max-w-sm self-center"
          onChange={updateDate}
          portalHost="date-sheet"
        />
      </BottomSheet>
    </View>
  );
};
