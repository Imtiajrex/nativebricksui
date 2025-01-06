import { Calendar, CalendarInput, CalendarProps, useColor } from '@nativebricks/core';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

export default function CalendarPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const primaryColor = useColor('primary');
  const markedDates = useMemo(() => {
    const dates: CalendarProps['markedDates'] = {};
    if (selected.length === 1) {
      dates[selected[0]] = {
        marked: true,
        startingDay: true,
        selected: true,
        color: primaryColor,
        selectedColor: primaryColor,
      };
    } else if (selected.length === 2) {
      const startingDay = selected[0];
      const endingDay = selected[1];
      const allDaysInRange = [startingDay];
      let currentDate = new Date(startingDay);
      while (currentDate.toISOString() !== new Date(endingDay).toISOString()) {
        currentDate.setDate(currentDate.getDate() + 1);
        allDaysInRange.push(currentDate.toISOString().split('T')[0]);
      }
      allDaysInRange.push(endingDay);
      allDaysInRange.forEach((day, index) => {
        dates[day] = {
          selected: true,
          color: primaryColor,
          selectedColor: primaryColor,
          ...(index === 0 && { startingDay: true }),
          ...(index === allDaysInRange.length - 1 && { endingDay: true }),
        };
      });
    }
    return dates;
  }, [selected]);
  const [value, setValue] = useState<Date>(new Date());
  const [range, setRange] = useState<{ start: Date; end: Date }>();

  return (
    <View className="flex-1 max-w-2xl mx-auto p-4 w-full gap-4">
      <Calendar
        onDayPress={useCallback(
          (day) => {
            if (selected.length === 0) {
              setSelected([day.dateString]);
            } else if (selected.length === 1) {
              if (new Date(day.dateString) < new Date(selected[0])) {
                setSelected([day.dateString, selected[0]]);
              } else setSelected([selected[0], day.dateString]);
            } else if (selected.length === 2) {
              setSelected([day.dateString]);
            }
          },
          [selected]
        )}
        markingType="period"
        markedDates={markedDates}
      />
      <CalendarInput value={value} onChange={setValue} type="single" />
      <CalendarInput
        value={range}
        onChange={({ start, end }) => {
          setRange({ start, end });
        }}
        type="range"
        placeholder="Select range"
      />
    </View>
  );
}
