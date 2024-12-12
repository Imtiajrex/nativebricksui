import { cssInterop } from 'nativewind';
import {
  Calendar as BaseCalendar,
  CalendarProps as BaseCalendarProps,
} from 'react-native-calendars';

cssInterop(BaseCalendar, {
  className: 'style',
  headerClassName: 'headerStyle',
});
export type CalendarProps = BaseCalendarProps & {
  headerClassName?: string;
  className?: string;
  contentClassName?: string;
};

export const Calendar = (props: CalendarProps) => {
  return <BaseCalendar {...props} />;
};
