import {
  Calendar as BaseCalendar,
  CalendarProps as BaseCalendarProps,
  toDateId,
} from '@marceloterreiro/flash-calendar';
import { TextStyle, ViewStyle } from 'react-native';
import { useTw } from '~/contexts/Theme';
import { useColorScheme } from '~/lib/useColorScheme';

export type CalendarProps = BaseCalendarProps & {
  rowMonthContainerClassName?: string;
  rowMonthContentClassName?: string;
  rowWeekContainerClassName?: string;
  rowWeekContentClassName?: string;
  itemWeekNameContainerClassName?: string;
  itemWeekNameContentClassName?: string;
  itemDayContainerClassName?: string;
  itemDayContentClassName?: string;
  itemDayIdleContainerClassName?: string;
  itemDayIdleContentClassName?: string;
  itemDayTodayContainerClassName?: string;
  itemDayTodayContentClassName?: string;
  itemDayActiveContainerClassName?: string;
  itemDayActiveContentClassName?: string;
  itemDayContainerSpacerClassName?: string;
  itemEmptyContainerClassName?: string;
  itemDayDisabledContainerClassName?: string;
  itemDayDisabledContentClassName?: string;
};
export { toDateId };

const Calendar = (props: CalendarProps) => {
  const { colorScheme } = useColorScheme();
  const tw = useTw();
  const toStyle = (style: ViewStyle, ...className: string[]): ViewStyle | TextStyle => ({
    ...tw.style(...className),
    ...style,
  });
  return (
    <BaseCalendar
      calendarColorScheme={colorScheme}
      {...props}
      theme={{
        rowMonth: {
          container: toStyle(props.theme?.rowMonth?.container, props.rowMonthContainerClassName),
          content: toStyle(props.theme?.rowMonth?.content, props.rowMonthContentClassName),
        },
        itemDayContainer: {
          activeDayFiller: toStyle(
            props?.theme?.itemDayContainer?.activeDayFiller,
            props.itemDayActiveContainerClassName
          ),
          spacer: toStyle(
            props?.theme?.itemDayContainer?.spacer,
            props.itemDayContainerSpacerClassName
          ),
        },
        itemEmpty: {
          container: toStyle(props?.theme?.itemEmpty?.container, props.itemEmptyContainerClassName),
        },
        itemWeekName: {
          container: toStyle(
            props?.theme?.itemWeekName?.container,
            props.itemWeekNameContainerClassName
          ),
          content: toStyle(props?.theme?.itemWeekName?.content, props.itemWeekNameContentClassName),
        },
        rowWeek: {
          container: toStyle(props?.theme?.rowWeek?.container, props.rowWeekContainerClassName),
        },
        itemDay: {
          today: (params) => ({
            container: toStyle({}, 'bg-card', props.itemDayTodayContainerClassName),
            content: toStyle({}, props.itemDayTodayContentClassName),
          }),
          base: (params) => ({
            container: toStyle({}, props.itemDayContainerClassName),
            content: toStyle({}, props.itemDayContentClassName),
          }),
          disabled: (params) => ({
            container: toStyle({}, props.itemDayDisabledContainerClassName),
            content: toStyle({}, 'text-muted-foreground', props.itemDayDisabledContentClassName),
          }),
          idle: (params) => ({
            container: toStyle({}, props.itemDayIdleContainerClassName),
            content: toStyle({}, 'text-muted-foreground', props.itemDayIdleContentClassName),
          }),
          active: (params) => ({
            container: toStyle({}, 'bg-primary', props.itemDayActiveContainerClassName),
            content: toStyle({}, 'text-primary-foreground', props.itemDayActiveContentClassName),
          }),
          ...props?.theme?.itemDay,
        },
      }}
    />
  );
};
export const CalendarList = BaseCalendar.List;

export { Calendar };
