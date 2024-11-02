import { Text } from 'react-native';
import { Center, FlatList, Paper } from '../layout';
import { cn } from '../utils/cn';

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
      <FlatList
        data={hours24.numbersOptions}
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
        data={minutes.numbersOptions}
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
      <FlatList
        data={ampm}
        renderItem={({ item }) => (
          <Center className="p-2 h-12 w-12">
            <Text className="text-center">{item.label}</Text>
          </Center>
        )}
        snapToInterval={48}
        contentContainerClassName="items-center"
        className="h-12"
      />
    </Paper>
  );
}
