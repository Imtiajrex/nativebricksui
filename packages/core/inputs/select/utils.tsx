import { useCallback } from 'react';
import { Option } from './option';
import { OptionType } from './types';

export const renderOptions = (props: {
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
}) => {
  return props.options.map((option) => {
    return (
      <Option
        {...option}
        isSelected={option.value === props.value}
        onSelect={() => props.onChange(option.value)}
      />
    );
  });
};
