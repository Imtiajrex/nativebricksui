import { IconCheck, IconChevronDown } from '@tabler/icons-react-native';
import { useState } from 'react';
import { Pressable, Text, View, ViewProps } from 'react-native';
import Animated, { FadeInDown, LinearTransition } from 'react-native-reanimated';
import { Popover } from '../overlays';
import { cn } from '../utils/cn';

type BaseOptionType =
  | {
      label: string;
      value: string;
    }
  | string;
type GroupOptionType = {
  group: string;
  options: BaseOptionType[];
};
export type OptionType = BaseOptionType;
export type SelectProps = ViewProps & {
  label?: string;
  description?: string;
  error?: string;
  valid?: boolean;
  validMessage?: string;
  info?: string;
  withAsterisk?: boolean;
  options: OptionType[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};
const AnimatedChevronDown = Animated.createAnimatedComponent(IconChevronDown);
export function Select(props: SelectProps) {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  return (
    <Popover placement="bottom left" isOpen={isOptionsVisible} setIsOpen={setIsOptionsVisible}>
      <View className=" gap-1">
        {props.label && (
          <Text className="text-sm text-foreground font-medium">
            {props.label}
            {props.withAsterisk && <Text className="text-red-500">*</Text>}
          </Text>
        )}
        {props.description && (
          <Text className="text-sm text-muted-foreground">{props.description}</Text>
        )}
        <Popover.Target onPress={() => setIsOptionsVisible(!isOptionsVisible)} className="w-full">
          <View
            {...props}
            className={cn(
              'h-10 px-2 border flex-row items-center border-border rounded-radius bg-card focus:outline-none focus:border-primary',
              props.error ? 'border-destructive ' : 'text-muted-foreground',
              props.valid ? 'border-success' : '',
              props.className
            )}
          >
            <Animated.View className={'flex-1'}>
              {!props.value && props.placeholder && (
                <Text
                  className={cn(
                    'text-muted-foreground select-none',
                    props.error ? 'text-destructive' : ''
                  )}
                >
                  {props.placeholder}
                </Text>
              )}
              {props.value && (
                <Text className="text-foreground font-medium select-none">{props.value}</Text>
              )}
            </Animated.View>
            <Animated.View className={'pr-2'}>
              <Animated.View
                layout={LinearTransition.springify(75)}
                className={cn(
                  'transition-all transform',
                  isOptionsVisible ? 'rotate-180' : 'rotate-0'
                )}
              >
                <IconChevronDown
                  strokeWidth={2}
                  size={18}
                  className={'text-muted-foreground transform transition-all'}
                />
              </Animated.View>
            </Animated.View>
          </View>
        </Popover.Target>
        <Popover.Dropdown className="p-2 z-50 gap-1">
          {props.options.map((option, index) => {
            const isSelected = props.value === (typeof option === 'string' ? option : option.value);
            return (
              <Pressable
                key={index}
                className="p-2 flex-row items-center transition-all gap-1 rounded-radius bg-card hover:bg-background border border-transparent hover:border-border z-50 "
                onPress={() => {
                  if (props.onChange) {
                    props.onChange(typeof option === 'string' ? option : option.value);
                  }
                  setIsOptionsVisible(false);
                }}
              >
                {isSelected && (
                  <Animated.View
                    layout={LinearTransition.springify(75)}
                    entering={FadeInDown.springify(75)}
                    exiting={FadeInDown.springify(75)}
                  >
                    <IconCheck strokeWidth={3} size={14} className="text-primary" />
                  </Animated.View>
                )}
                <Animated.Text
                  layout={LinearTransition.springify(75)}
                  className="text-sm text-foreground font-medium"
                >
                  {typeof option === 'string' ? option : option.label}
                </Animated.Text>
              </Pressable>
            );
          })}
        </Popover.Dropdown>
        {props.info && <Text className="text-xs text-muted-foreground">{props.info}</Text>}
        {props.error && <Text className="text-xs text-destructive">{props.error}</Text>}
        {props.validMessage && (
          <Text className="text-xs text-success font-medium">{props.validMessage}</Text>
        )}
      </View>
    </Popover>
  );
}
