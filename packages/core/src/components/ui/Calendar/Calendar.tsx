import { useMemo } from 'react';
import {
  Calendar as BaseCalendar,
  CalendarProps as BaseCalendarProps,
} from 'react-native-calendars';
import { useTw } from '../../../contexts/Theme';
import { useColor } from '../../../lib/useColor';

export type CalendarProps = BaseCalendarProps & {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  dotClassName?: string;
  arrowClassName?: string;
  textDayClassName?: string;
};

const Calendar = (props: CalendarProps) => {
  const tw = useTw();
  const foregroundColor = useColor('foreground');
  const backgroundColor = useColor('background');
  const primaryColor = useColor('primary');
  const primaryForegroundColor = useColor('primary-foreground');
  const mutedForegroundColor = useColor('muted-foreground');

  const theme = useMemo(() => {
    return {
      dayTextColor: foregroundColor,
      contentStyle: tw.style(props.contentClassName),
      disabledDotColor: mutedForegroundColor,
      dotColor: primaryForegroundColor,
      calendarBackground: backgroundColor,
      arrowColor: foregroundColor,
      indicatorColor: primaryColor,
      inactiveDotColor: mutedForegroundColor,
      backgroundColor: backgroundColor,
      selectedDayBackgroundColor: primaryColor,
      selectedDayTextColor: primaryForegroundColor,
      selectedDotColor: primaryForegroundColor,
      todayTextColor: primaryColor,
      disabledArrowColor: mutedForegroundColor,
      monthTextColor: foregroundColor,
    };
  }, [
    props.contentClassName,
    foregroundColor,
    backgroundColor,
    primaryColor,
    primaryForegroundColor,
    mutedForegroundColor,
  ]);
  return <BaseCalendar {...props} theme={theme} />;
};

export { Calendar };
