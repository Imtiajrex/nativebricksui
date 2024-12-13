import { Clock } from 'lucide-react-native';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Popover, PopoverContent, PopoverTrigger } from '~/base';
import { iconWithClassName } from '~/lib/iconWithClassName';
import { InputContainer, InputContainerProps } from '../misc/InputContainer';
import { TimePicker, TimePickerProps } from './TimePicker';

export type TimeInputProps = InputContainerProps & {
  placeholder?: string;
  timePickerProps?: Omit<TimePickerProps, 'onChange'>;
  value?: string;
  onChange?: TimePickerProps['onChange'];
};
iconWithClassName(Clock);
export function TimeInput({
  state,
  containerClassName,
  leading,
  trailing,
  placeholder,
  ...props
}: TimeInputProps) {
  const renderContent = useMemo(() => {
    return (
      <PopoverContent className="w-72 bg-background" align="start">
        <TimePicker
          containerClassName="flex-1"
          pickSecond={false}
          {...props.timePickerProps}
          onChange={props.onChange}
        />
      </PopoverContent>
    );
  }, [props.timePickerProps, props.onChange]);
  return (
    <Popover>
      <PopoverTrigger>
        <InputContainer
          disabled
          leading={
            <View className="h-full w-10 p-2 items-center justify-center">
              <Clock size={20} className="text-muted-foreground" />
            </View>
          }
          {...props}
        >
          <View className="flex-1 h-full justify-center">
            {props?.value ? (
              <Text className="text-base text-foreground" selectable>
                {props.value}
              </Text>
            ) : (
              <Text className=" text-sm text-muted-foreground">{placeholder}</Text>
            )}
          </View>
        </InputContainer>
      </PopoverTrigger>
      {renderContent}
    </Popover>
  );
}
