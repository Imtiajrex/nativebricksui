import { Calendar as CalendarIcon } from 'lucide-react-native';
import { useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import { DateData } from 'react-native-calendars';
import { Popover, PopoverContent, PopoverTrigger } from '../../../base';
import { iconWithClassName } from '../../../lib/iconWithClassName';
import { useColor } from '../../../lib/useColor';
import { InputContainer, InputContainerProps } from '../misc/InputContainer';
import { Calendar, CalendarProps } from './Calendar';

type InputProps =
  | {
      type: 'single';
      value?: Date;
      onChange: (date: Date) => void;
    }
  | {
      type: 'range';
      value?: {
        start?: Date;
        end?: Date;
      };
      onChange: (dates: { start?: Date; end?: Date }) => void;
    };
export type CalendarInputProps = InputContainerProps & {
  placeholder?: string;
  calendarProps?: CalendarProps;
} & InputProps;
iconWithClassName(CalendarIcon);
export function CalendarInput({
  state,
  containerClassName,
  leading,
  trailing,
  placeholder,
  ...props
}: CalendarInputProps) {
  const renderContent = useMemo(() => {
    return <CalendarPicker {...props.calendarProps} {...props} />;
  }, [props.calendarProps, props.onChange, props.value]);
  const toDateString = (date?: Date) =>
    date
      ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '';
  return (
    <Popover>
      <PopoverTrigger>
        <InputContainer
          disabled
          leading={
            <View className="h-full w-10 p-2 items-center justify-center">
              <CalendarIcon size={20} className=" text-muted-foreground" />
            </View>
          }
          {...props}
        >
          <View className="flex-1 h-full justify-center">
            {(props.type == 'single' && props?.value) || (props.type == 'range' && props.value) ? (
              <Text className="text-base text-foreground" selectable>
                {props.type == 'single'
                  ? toDateString(props.value)
                  : props.type == 'range'
                  ? `${toDateString(props.value.start)} - ${toDateString(props.value?.end)}`
                  : ''}
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

const toDateString = (date: Date) => date.toISOString().split('T')[0];
const CalendarPicker = (props: CalendarProps & InputProps) => {
  const primaryColor = useColor('primary');
  const markedDates = useMemo(() => {
    const dates: CalendarProps['markedDates'] = {};
    if (props.type === 'single' && props.value) {
      dates[toDateString(props.value)] = {
        selected: true,
        color: primaryColor,
      };
    } else if (props.type === 'range' && props.value) {
      if (props.value.start && !props.value.end) {
        dates[toDateString(props.value.start)] = {
          marked: true,
          startingDay: true,
          selected: true,
          color: primaryColor,
          selectedColor: primaryColor,
        };
      } else if (props.value.start && props.value.end) {
        const startingDay = toDateString(props.value.start);
        const endingDay = toDateString(props.value.end);
        const allDaysInRange = [startingDay];
        const endDate = new Date(endingDay);
        let currentDate = new Date(startingDay);
        while (currentDate.toISOString() !== endDate.toISOString()) {
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
    }
    return dates;
  }, [props.value, primaryColor, props.type]);
  const onDayPress = useCallback(
    (day: DateData) => {
      if (props.type == 'single') {
        props.onChange?.(new Date(day.dateString));
      } else if (props.type == 'range') {
        const value = props.value || {};
        if (!value.start) {
          props.onChange({
            start: new Date(day.dateString),
            end: undefined,
          });
        } else if (value.start && !value.end) {
          if (new Date(day.dateString) < value.start) {
            props.onChange({
              start: new Date(day.dateString),
              end: value.start,
            });
          } else
            props.onChange({
              start: value.start,
              end: new Date(day.dateString),
            });
        } else if (value.start && value.end) {
          props.onChange({
            start: new Date(day.dateString),
            end: undefined,
          });
        }
      }
    },
    [props.onChange, props.type, props.value]
  );

  return (
    <PopoverContent className="sm:w-96 w-80 bg-background" align="start">
      <Calendar
        onDayPress={onDayPress}
        markingType={props.type == 'single' ? 'dot' : 'period'}
        markedDates={markedDates}
        {...props}
      />
    </PopoverContent>
  );
};
