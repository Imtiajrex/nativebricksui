import * as SelectPrimitive from '@rn-primitives/select';
import { IconCheck, IconChevronDown } from '@tabler/icons-react-native';
import { StyleSheet, Text, useWindowDimensions } from 'react-native';
import Animated, { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { cn } from '../../utils/cn';
import { SelectOptionsType } from './type';

export type SelectProps = {
  options: SelectOptionsType[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
};
const isSelectOptionsType = (
  option: SelectOptionsType
): option is { label: string; value: string } => typeof option === 'object';
export function Select({ options, value, onChange, label, placeholder }: SelectProps) {
  const selectedOption = options.find((option) => {
    const optionValue = isSelectOptionsType(option) ? option.value : option;
    return optionValue === value;
  });
  const selectedOptionLabel = selectedOption
    ? isSelectOptionsType(selectedOption)
      ? selectedOption.label
      : selectedOption
    : '';
  const dimensions = useWindowDimensions();
  const contentWidth = Math.min(dimensions.width - 32, 450);
  return (
    <SelectPrimitive.Root
      value={
        value
          ? {
              label: isSelectOptionsType(selectedOption) ? selectedOption.label : selectedOption,
              value,
            }
          : undefined
      }
      onValueChange={(value) => onChange && onChange(value.value)}
      className="w-full"
    >
      <SelectPrimitive.Trigger className="w-full border border-border bg-card rounded-xl p-3 px-4 flex-row items-center justify-between h-11 ">
        <Text
          className={cn(
            'text-sm text-left',
            selectedOptionLabel ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          {selectedOptionLabel || placeholder}
        </Text>

        <IconChevronDown size={16} color={'black'} />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Overlay style={StyleSheet.absoluteFill}>
          <SelectPrimitive.Content>
            <Animated.View
              entering={ZoomIn.springify().duration(180)}
              exiting={ZoomOut.springify().duration(180)}
              className="bg-card border border-border rounded-radius p-1.5 origin-top-left"
              style={{
                width: contentWidth,
              }}
            >
              <SelectPrimitive.ScrollUpButton />
              <SelectPrimitive.Viewport>
                {options.map((option) => {
                  const label = isSelectOptionsType(option) ? option.label : option;
                  const value = isSelectOptionsType(option) ? option.value : option;
                  const isSelected = value === selectedOption;
                  return (
                    <SelectPrimitive.Item
                      label={label}
                      value={value}
                      key={value}
                      className={cn(
                        'flex flex-row cursor-pointer gap-1 items-center p-2 rounded-xl text-sm border border-transparent transition-all',
                        isSelected ? 'bg-primary/15 border-primary' : 'hover:bg-background'
                      )}
                    >
                      <SelectPrimitive.ItemIndicator>
                        <IconCheck size={16} color={'blue'} />
                      </SelectPrimitive.ItemIndicator>
                      <Animated.Text
                        layout={LinearTransition.springify().duration(180)}
                        className="text-sm"
                      >
                        {label}
                      </Animated.Text>
                    </SelectPrimitive.Item>
                  );
                })}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton />
            </Animated.View>
          </SelectPrimitive.Content>
        </SelectPrimitive.Overlay>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
