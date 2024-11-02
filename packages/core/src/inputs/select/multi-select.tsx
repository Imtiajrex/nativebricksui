import * as PopoverPrimitive from '@rn-primitives/popover';
import { IconCheck, IconChevronDown } from '@tabler/icons-react-native';
import { Pressable, Text, useWindowDimensions, View } from 'react-native';
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { cn } from '../../utils/cn';
import { Pill } from '../pill';
import { SelectOptionsType } from './type';

export type MultiSelectProps = {
  options: SelectOptionsType[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  label?: string;
};
const isSelectOptionsType = (
  option: SelectOptionsType
): option is { label: string; value: string } => typeof option === 'object';
export function MultiSelect({ options, value, onChange, label, placeholder }: MultiSelectProps) {
  const selectedOptions = options.filter((option) => {
    const optionValue = isSelectOptionsType(option) ? option.value : option;
    return value?.includes(optionValue);
  });

  const hasSelection = selectedOptions.length > 0;
  const dimensions = useWindowDimensions();
  const contentWidth = Math.min(dimensions.width - 32, 450);

  return (
    <PopoverPrimitive.Root className="w-full">
      <PopoverPrimitive.Trigger className="w-full border border-border bg-card rounded-xl p-3 flex-row items-center justify-between min-h-12 ">
        <View className="flex-row items-center flex gap-1 flex-wrap">
          {selectedOptions.map((option) => {
            const label = isSelectOptionsType(option) ? option.label : option;
            return (
              <Pill
                key={label}
                className="text-sm text-foreground"
                withRemoveButton
                size="xs"
                onRemove={() => {
                  onChange &&
                    onChange(
                      value?.filter((v) => {
                        const optionValue = isSelectOptionsType(option) ? option.value : option;
                        return v !== optionValue;
                      }) || []
                    );
                }}
              >
                {label}
              </Pill>
            );
          })}
          <Text
            className={cn(
              'text-sm text-left',
              hasSelection ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            {placeholder}
          </Text>
        </View>
        <IconChevronDown size={16} color={'black'} />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content>
          <Animated.View
            entering={ZoomIn.springify().duration(180)}
            exiting={ZoomOut.springify().duration(180)}
            className="bg-card border border-border rounded-radius p-1.5 origin-top-left gap-1"
            style={{
              width: contentWidth,
            }}
          >
            {options.map((option) => {
              const label = isSelectOptionsType(option) ? option.label : option;
              const optionValue = isSelectOptionsType(option) ? option.value : option;
              const isSelected = value?.includes(optionValue);
              return (
                <Pressable
                  key={optionValue}
                  className={cn(
                    'flex flex-row cursor-pointer gap-1 items-center p-2 rounded-xl text-sm border border-transparent transition-all',
                    isSelected ? 'bg-primary/15 border-primary' : 'hover:bg-background'
                  )}
                  onPress={() => {
                    if (isSelected) {
                      onChange && onChange(value?.filter((v) => v !== optionValue) || []);
                    } else {
                      onChange && onChange([...(value || []), optionValue]);
                    }
                  }}
                >
                  {isSelected && <IconCheck size={16} color={'blue'} />}
                  <Animated.Text
                    layout={LinearTransition.springify().duration(180)}
                    className="text-sm"
                  >
                    {label}
                  </Animated.Text>
                </Pressable>
              );
            })}
          </Animated.View>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
