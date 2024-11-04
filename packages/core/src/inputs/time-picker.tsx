import { Text } from 'react-native';
import { Center, FlatList, Paper } from '../layout';
import { cn } from '../utils/cn';
import { Picker } from './picker';

export type TimePickerProps = {
  wrapperClassName?: string;
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
const minutes = getNumberOptions(0, 59);
const hours12 = getNumberOptions(1, 12);
const hours24 = getNumberOptions(0, 23);

const ampm = [
  {
    label: 'AM',
    value: 'AM',
  },
  {
    label: 'PM',
    value: 'PM',
  },
];
export function TimePicker(props: TimePickerProps) {
  return (
    <Paper className={cn('flex-row p-3 items-start h-64', props.wrapperClassName)}>
      <Picker data={hours24.numbersOptions} infiniteLoop className="w-full" />
      <Picker data={minutes.numbersOptions} infiniteLoop />
      <Picker data={ampm} />
    </Paper>
  );
}
