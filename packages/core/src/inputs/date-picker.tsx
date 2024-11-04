import { memo, useCallback } from 'react';
import { Paper } from '../layout';
import { cn } from '../utils/cn';
import { Picker } from './picker';

export type DatePickerProps = {
  wrapperClassName?: string;
  onDayChange?: (day: number) => void;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
};
const getNumberOptions = (from: number, to: number) => {
  const numbers = Array.from({ length: to - from + 1 }, (_, i) => i + from);
  const numbersString = numbers.map((number) => (number < 10 ? `0${number}` : `${number}`));
  const numbersOptions = numbersString.map((number) => ({ label: number, value: number }));
  return {
    numbers,
    numbersString,
    numbersOptions,
  };
};
const days = getNumberOptions(0, 31);
const months = [
  {
    label: 'Jan',
    value: 1,
  },
  {
    label: 'Feb',
    value: 2,
  },
  {
    label: 'Mar',
    value: 3,
  },
  {
    label: 'Apr',
    value: 4,
  },
  {
    label: 'May',
    value: 5,
  },
  {
    label: 'Jun',
    value: 6,
  },
  {
    label: 'Jul',
    value: 7,
  },
  {
    label: 'Aug',
    value: 8,
  },
  {
    label: 'Sep',
    value: 9,
  },
  {
    label: 'Oct',
    value: 10,
  },
  {
    label: 'Nov',
    value: 11,
  },
  {
    label: 'Dec',
    value: 12,
  },
];
const years = getNumberOptions(1900, 2024);
export const DatePicker = memo((props: DatePickerProps) => {
  console.log('rendering date picker');
  return (
    <Paper className={cn('flex-row p-3 items-start h-64 gap-2', props.wrapperClassName)}>
      <Picker
        data={days.numbersOptions}
        className="w-full"
        onChange={useCallback(
          (value) => {
            props.onDayChange && props.onDayChange(parseInt(value));
          },
          [props.onDayChange]
        )}
      />
      <Picker
        data={months}
        onChange={useCallback(
          (value) => {
            props.onMonthChange && props.onMonthChange(parseInt(value));
          },
          [props.onMonthChange]
        )}
      />

      <Picker
        data={years.numbersOptions.toReversed()}
        onChange={useCallback(
          (value) => {
            props.onYearChange && props.onYearChange(parseInt(value));
          },
          [props.onYearChange]
        )}
      />
    </Paper>
  );
});
