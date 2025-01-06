import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../../../base';
import { WheelPicker, WheelPickerProps } from '../../../components/base/wheel-picker';
import { cn } from '../../../lib/utils';
import { getNumberOptions } from '../TimePicker/utils';
import { formatNumber } from './utils';
export interface DatePickerProps {
  onChange?: (date: Date) => void;
  containerClassName?: string;
  pickMonth?: boolean;
  pickDay?: boolean;
  pickYear?: boolean;
  showLabel?: boolean;
  showScrollIndicators?: boolean;
  monthFormat?: 'full' | 'short' | 'numeric';
}
export function DatePicker({
  pickYear = true,
  pickMonth = true,
  pickDay = true,
  showLabel = true,
  ...props
}: DatePickerProps) {
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const updateTime = useCallback((pick: 'year' | 'month' | 'day') => {
    return (value: string, index: number) => {
      if (pick === 'year') {
        setSelectedYear(index);
      } else if (pick === 'month') {
        setSelectedMonth(index);
      } else if (pick === 'day') {
        setSelectedDay(index);
      }
    };
  }, []);
  useEffect(() => {
    const date = dayjs(
      `${years[selectedYear]}-${numericMonths[selectedMonth]}-${days[selectedDay]}`,
      'YYYY-MM-DD'
    ).toDate();
    props.onChange?.(date);
  }, [selectedYear, selectedMonth, selectedDay, props.onChange]);
  const days = useMemo(() => {
    const date = new Date(Number(years[selectedYear]), selectedMonth, 1);
    const daysInMonth = dayjs(date).daysInMonth();

    return getNumberOptions(1, daysInMonth);
  }, [selectedYear, selectedMonth]);
  const renderYear = useMemo(() => {
    if (!pickYear) return null;
    return (
      <WheelPickerContainer
        label="Years"
        showLabel={showLabel}
        options={years}
        onChange={updateTime('year')}
        selectedIndex={selectedYear}
      />
    );
  }, [selectedYear, updateTime, pickYear, showLabel]);

  const monthArray = useMemo(
    () =>
      props.monthFormat === 'full'
        ? fullMonths
        : props.monthFormat === 'short'
        ? shortMonths
        : numericMonths,
    [props.monthFormat]
  );
  const renderMonth = useMemo(() => {
    if (!pickMonth) return null;
    return (
      <WheelPickerContainer
        label="Months"
        showLabel={showLabel}
        options={monthArray}
        onChange={updateTime('month')}
        selectedIndex={selectedMonth}
      />
    );
  }, [selectedMonth, updateTime, pickMonth, showLabel, monthArray]);
  const renderDay = useMemo(() => {
    if (!pickDay) return null;
    return (
      <WheelPickerContainer
        label="Days"
        showLabel={showLabel}
        options={days}
        onChange={updateTime('day')}
        selectedIndex={selectedDay}
      />
    );
  }, [selectedDay, days.length, updateTime, pickDay, showLabel]);
  return (
    <View className={cn('flex-row gap-2 w-full', props.containerClassName)}>
      {renderYear}
      {renderMonth}
      {renderDay}
    </View>
  );
}
const WheelPickerContainer = ({
  label,
  showLabel,
  ...props
}: WheelPickerProps & {
  label?: string;
  showLabel?: boolean;
}) => {
  return (
    <View className="flex-1 gap-2">
      {showLabel && <Text className="text-center text-sm text-muted-foreground">{label}</Text>}
      <WheelPicker {...props} />
    </View>
  );
};

const years = getNumberOptions(1900, new Date().getFullYear()).toReversed();
const numericMonths = Array.from({ length: 12 }, (_, i) => formatNumber(i + 1));
const fullMonths = numericMonths.map((month) => dayjs(`2021-${month}-01`).format('MMMM'));
const shortMonths = numericMonths.map((month) => dayjs(`2021-${month}-01`).format('MMM'));
const days = getNumberOptions(1, 31);
