import * as React from 'react';
import { View } from 'react-native';
import { Label } from '../../base/label';
import { RadioGroup, RadioGroupItem } from '../../base/radio-group';
import { cn } from '../../../lib/utils';
import { isStringOption } from '../Select/utils';

type BaseRadioOptionType = {
  label: string;
  value: string;
  disabled?: boolean;
};
type RadioOptionType = BaseRadioOptionType | string;
type RenderOptionFunction = (args: {
  option: RadioOptionType;
  isActive: boolean;
  select: () => void;
}) => React.ReactNode;
export type RadioProps = {
  options: RadioOptionType[];
  value?: string;
  onValueChange?: (value: string) => void;
  renderOption?: RenderOptionFunction;
  containerClassName?: string;
};
export function Radio(props: RadioProps) {
  const onLabelPress = React.useCallback(
    (value: string) => () => {
      if (props.onValueChange) {
        props.onValueChange(value);
      }
    },
    [props.onValueChange]
  );
  const renderOptions = React.useMemo(() => {
    return props.options.map((option) => {
      const value = isStringOption(option) ? option : option.value;
      if (props.renderOption) {
        return props.renderOption({
          option,
          isActive: value == props.value,
          select: onLabelPress(value),
        });
      }
      return (
        <RadioGroupItemWithLabel key={value} value={value} onLabelPress={onLabelPress(value)} />
      );
    });
  }, [props.options, props.value, props.renderOption, onLabelPress]);
  return (
    <RadioGroup
      value={props.value}
      onValueChange={props.onValueChange}
      className={cn('gap-3', props.containerClassName)}
    >
      {renderOptions}
    </RadioGroup>
  );
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={'flex-row gap-2 items-center'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}
