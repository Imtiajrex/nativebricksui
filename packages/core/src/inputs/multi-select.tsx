import { IconCheck, IconChevronDown } from '@tabler/icons-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeInDown, LinearTransition, ZoomInLeft } from 'react-native-reanimated';
import { Pill } from './pill';
import { Popover } from '../overlays';
import { cn } from '../utils/cn';
import { SelectProps } from './select';

export type MultiSelectProps = Omit<Omit<SelectProps, 'value'>, 'onChange'> & {
  value?: string[];
  onChange?: (value: string[]) => void;
};
const isOptionString = (
  options: (string | { label: string; value: string })[]
): options is string[] => typeof options[0] === 'string';

export function MultiSelect(props: MultiSelectProps) {
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
              'min-h-10 px-2 py-2 border flex-row items-center border-border rounded-radius bg-card focus:outline-none focus:border-primary',
              props.error ? 'border-destructive ' : 'text-muted-foreground',
              props.valid ? 'border-success' : '',
              props.className
            )}
          >
            <Animated.View
              className={'flex-1 flex-row flex-wrap items-center gap-2 overflow-hidden'}
            >
              {props.value &&
                props.value.map((value, index) => {
                  const optionLabel = isOptionString(props.options)
                    ? value
                    : props.options.find((o) => typeof o != 'string' && o.value === value);
                  const label = typeof optionLabel === 'string' ? optionLabel : optionLabel?.label;
                  return (
                    <Pill
                      withRemoveButton
                      onRemove={() => {
                        if (props.onChange) {
                          props.onChange(props.value.filter((v) => v !== value));
                        }
                      }}
                      layout={LinearTransition.springify(75)}
                      entering={ZoomInLeft.springify(75)}
                    >
                      {label}
                    </Pill>
                  );
                })}
              {props.placeholder && (
                <Animated.Text
                  className={cn(
                    'text-muted-foreground select-none',
                    props.error ? 'text-destructive' : ''
                  )}
                  layout={LinearTransition.springify(75)}
                >
                  {props.placeholder}
                </Animated.Text>
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
            const isSelected = props.value?.includes(
              typeof option === 'string' ? option : option.value
            );
            return (
              <Pressable
                key={index}
                className="p-2 flex-row items-center transition-all gap-1 rounded-radius bg-card hover:bg-background border border-transparent hover:border-border z-50 "
                onPress={() => {
                  if (props.onChange) {
                    props.onChange(
                      isSelected
                        ? props.value?.filter(
                            (v) => v !== (typeof option === 'string' ? option : option.value)
                          )
                        : [
                            ...(props.value ?? []),
                            typeof option === 'string' ? option : option.value,
                          ]
                    );
                  }
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
