import { Calendar, CalendarList, useTw } from '@nativebricks/core';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

export default function CalendarPage() {
  const [selected, setSelected] = React.useState<string>('');
  const tw = useTw();
  const onCalendarDayPress = useCallback((date: string) => {
    setSelected(date);
  }, []);
  const calendarActiveDateRanges = useMemo(() => {
    if (selected) {
      return [
        {
          endId: selected,
          startId: selected,
        },
      ];
    }
    return [];
  }, [selected]);
  return (
    <View className="flex-1">
      <CalendarList
        onCalendarDayPress={onCalendarDayPress}
        calendarActiveDateRanges={calendarActiveDateRanges}
      />
    </View>
  );
}
