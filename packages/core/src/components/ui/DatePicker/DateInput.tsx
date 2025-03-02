import { Calendar, Clock } from 'lucide-react-native';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { Popover, PopoverContent, PopoverTrigger } from '../../../base';
import { iconWithClassName } from '../../../lib/iconWithClassName';
import { InputContainer, InputContainerProps } from '../misc/InputContainer';
import { DatePicker, DatePickerProps } from './DatePicker';
import { cn } from '../../../lib/utils';

export type DateInputProps = InputContainerProps & {
  placeholder?: string;
  datePickerProps?: Omit<DatePickerProps, 'onChange'>;
  value?: Date;
  onChange?: DatePickerProps['onChange'];
  popoverContentClassName?: string;
};
iconWithClassName(Clock);
export function DateInput({
  state,
  containerClassName,
  leading,
  trailing,
  placeholder,
  popoverContentClassName,
  ...props
}: DateInputProps) {
  const renderContent = useMemo(() => {
    return (
      <PopoverContent className={cn('w-72 bg-background', popoverContentClassName)} align="start">
        <DatePicker
          containerClassName="flex-1"
          {...props.datePickerProps}
          onChange={props.onChange}
        />
      </PopoverContent>
    );
  }, [props.datePickerProps, props.onChange, popoverContentClassName]);
  return (
    <Popover>
      <PopoverTrigger>
        <InputContainer
          disabled
          leading={
            <View className="h-full w-10 p-2 items-center justify-center">
              <Calendar size={20} className=" text-muted-foreground" />
            </View>
          }
          {...props}
        >
          <View className="flex-1 h-full justify-center">
            {props?.value ? (
              <Text className="text-base text-foreground" selectable>
                {props.value?.toDateString()}
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
