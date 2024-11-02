import { Text } from 'react-native';
import { Center, FlatList, Paper } from '../layout';
import { cn } from '../utils/cn';

export type DatePickerProps = {
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
const years = getNumberOptions(2000, 2024);
export function DatePicker(props: DatePickerProps) {
  return (
    <Paper className={cn('flex-row p-3 items-start h-64', props.wrapperClassName)}>
      <FlatList
        data={days.numbersOptions}
        renderItem={({ item }) => (
          <Center className="p-2 h-12 w-12">
            <Text className="text-center">{item.label}</Text>
          </Center>
        )}
        snapToInterval={48}
        style={{
          height: '100%',
        }}
        contentContainerClassName="items-center"
        infiniteLoop
      />
      <FlatList
        data={years.numbersOptions}
        renderItem={({ item }) => (
          <Center className="p-2 h-12 w-24">
            <Text className="text-center">{item.label}</Text>
          </Center>
        )}
        snapToInterval={48}
        style={{
          height: '100%',
        }}
        contentContainerClassName="items-center"
      />
      <FlatList
        data={months}
        renderItem={({ item }) => (
          <Center className="p-2 h-12 w-12">
            <Text className="text-center">{item.label}</Text>
          </Center>
        )}
        snapToInterval={48}
        contentContainerClassName="items-center"
        style={{
          height: '100%',
        }}
        infiniteLoop
      />
    </Paper>
  );
}
