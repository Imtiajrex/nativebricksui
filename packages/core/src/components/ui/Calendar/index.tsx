import {
  Calendar as BaseCalendar,
  CalendarProps as BaseCalendarProps,
} from '@marceloterreiro/flash-calendar';

export type CalendarProps = BaseCalendarProps;
export const Calendar = (props: CalendarProps) => {
  return (
    <BaseCalendar
      theme={{
        itemDay: {
          active: (theme) => ({
            container: {},
            content: {},
          }),
          base: (theme) => ({
            container: {},
            content: {},
          }),
          disabled: (theme) => ({
            container: {},
            content: {},
          }),
          idle: (theme) => ({
            container: {},
            content: {},
          }),
          today: (theme) => ({
            container: {},
            content: {},
          }),
        },
      }}
      {...props}
    />
  );
};
