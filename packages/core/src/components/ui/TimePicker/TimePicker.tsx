import React, { useCallback, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '~/base';
import { WheelPicker, WheelPickerProps } from '~/components/base/wheel-picker';
import { cn } from '~/lib/utils';
import { formatNumber, hours, hours12, meridiam, minutes, seconds } from './utils';
export interface TimePickerProps {
  onChange?: (time: {
    hour: string;
    minute: string;
    second: string;
    meridiam: 'AM' | 'PM';
  }) => void;
  containerClassName?: string;
  pickMinute?: boolean;
  pickSecond?: boolean;
  pickHour?: boolean;
  hour12?: boolean;
  showLabel?: boolean;
  showScrollIndicators?: boolean;
}
export function TimePicker({
  pickHour = true,
  pickMinute = true,
  pickSecond = true,
  showLabel = true,
  ...props
}: TimePickerProps) {
  const [selectedHour, setSelectedHour] = React.useState(0);
  const [selectedMinute, setSelectedMinute] = React.useState(0);
  const [selectedSecond, setSelectedSecond] = React.useState(0);
  const [selectedMeridiem, setSelectedMeridiem] = React.useState<(typeof meridiam)[number]>('AM');
  const updateTime = useCallback((pick: 'hour' | 'minute' | 'second' | 'meridiam') => {
    return (value: string, index: number) => {
      if (pick === 'hour') {
        setSelectedHour(Number(value));
      } else if (pick === 'minute') {
        setSelectedMinute(Number(value));
      } else if (pick === 'second') {
        setSelectedSecond(Number(value));
      } else if (pick === 'meridiam') {
        setSelectedMeridiem(value as (typeof meridiam)[number]);
      }
    };
  }, []);
  useEffect(() => {
    props.onChange?.({
      hour: formatNumber(selectedHour),
      minute: formatNumber(selectedMinute),
      second: formatNumber(selectedSecond),
      meridiam: selectedMeridiem,
    });
  }, [selectedHour, selectedMinute, selectedSecond, selectedMeridiem]);
  const renderHour = useMemo(() => {
    if (!pickHour) return null;
    return (
      <WheelPickerContainer
        label="Hours"
        showLabel={showLabel}
        options={props.hour12 ? hours12 : hours}
        onChange={updateTime('hour')}
        selectedIndex={hours.findIndex((hour) => Number(hour) === selectedHour)}
      />
    );
  }, [selectedHour, , updateTime, pickHour, showLabel]);
  const renderMinute = useMemo(() => {
    if (!pickMinute) return null;
    return (
      <WheelPickerContainer
        label="Minutes"
        showLabel={showLabel}
        options={minutes}
        onChange={updateTime('minute')}
        selectedIndex={minutes.findIndex((minute) => Number(minute) === selectedMinute)}
      />
    );
  }, [selectedMinute, updateTime, pickMinute, showLabel]);
  const renderSecond = useMemo(() => {
    if (!pickSecond) return null;
    return (
      <WheelPickerContainer
        label="Seconds"
        showLabel={showLabel}
        options={seconds}
        onChange={updateTime('second')}
        selectedIndex={seconds.findIndex((second) => Number(second) === selectedSecond)}
      />
    );
  }, [selectedSecond, updateTime, pickSecond, showLabel]);
  const renderMeridiem = useMemo(() => {
    if (!props.hour12) return null;
    return (
      <WheelPickerContainer
        label="Meridiem"
        showLabel={showLabel}
        options={['AM', 'PM']}
        onChange={updateTime('meridiam')}
        selectedIndex={0}
      />
    );
  }, [props.hour12, updateTime, showLabel]);
  return (
    <View className={cn('flex-row gap-2 w-full', props.containerClassName)}>
      {renderHour}
      {renderMinute}
      {renderSecond}
      {renderMeridiem}
    </View>
  );
}
const WheelPickerContainer = ({
  label,
  showLabel,
  ...props
}: WheelPickerProps & {
  label?: string;
  showLabel?: boolean;
}) => {
  return (
    <View className="flex-1 gap-2">
      {showLabel && <Text className="text-center text-sm text-muted-foreground">{label}</Text>}
      <WheelPicker {...props} />
    </View>
  );
};
