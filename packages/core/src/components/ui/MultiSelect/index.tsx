import { ChevronDown } from 'lucide-react-native';
import { RefObject, useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { Chip, Text } from '../../../base';
import { cn } from '../../../lib/utils';
import { Select, SelectContent, SelectTrigger, SelectTriggerRef } from '../../base/select';
import { InputContainer, InputContainerProps, useFocus } from '../misc/InputContainer';
import { useOptions, useRenderOptions, useRenderSearch } from '../Select/hooks';
import { SelectItemOption, SelectOption, SelectProps } from '../Select/types';
import { useSelectedOptions } from './hooks';
export type MultiSelectProps<Option extends SelectOption> = {
  value?: string[];
  onChange?: (value: string[]) => void;
  renderSelectedOption?: (data: { option: SelectItemOption }) => JSX.Element;
} & Omit<SelectProps<Option>, 'value' | 'onChange'> &
  InputContainerProps;
const BaseMultiSelect = <Option extends SelectOption>(
  props: MultiSelectProps<Option> & {
    selectRef?: RefObject<SelectTriggerRef>;
    onFocus?: () => void;
    onBlur?: () => void;
  }
) => {
  const [searchText, setSearchText] = useState('');
  const { filteredOptions, normalizedOptions } = useOptions({
    options: props.options,
    searchText,
    setSearchText,
    onChange: (value) => props.onChange?.([value]),
  });
  const selectedOptions = useSelectedOptions(normalizedOptions, props.value!);

  const onChange = useCallback(
    (value: string) => {
      props.onChange?.(
        props.value?.includes(value)
          ? props.value?.filter((v) => v !== value)
          : [...(props.value || []), value]
      );
    },
    [props.onChange, props.value]
  );
  const renderOptions = useRenderOptions({
    options: filteredOptions,
    onChange: onChange,
    searchText,
    setSearchText,
    value: props.value!,
    renderOption: props.renderOption,
    searchEnabled: props.searchEnabled,
  });
  const renderSearch = useRenderSearch({
    searchEnabled: props.searchEnabled!,
    searchText,
    setSearchText,
  });
  return (
    <Select className="flex-1">
      <SelectTrigger
        ref={props.selectRef}
        className={cn('flex-1 p-2', props.triggerClassName)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        {selectedOptions.length > 0 ? (
          <View className="flex-row gap-1 flex-wrap flex-1">
            {selectedOptions.map((selectedOption) =>
              props.renderSelectedOption ? (
                props.renderSelectedOption({ option: selectedOption })
              ) : (
                <Chip
                  key={selectedOption.value}
                  className={cn('text-sm', props.valueClassName)}
                  variant="outline"
                >
                  <Text>{selectedOption.label}</Text>
                </Chip>
              )
            )}
          </View>
        ) : (
          <Text className="text-muted-foreground text-sm native:text-lg">{props.placeholder}</Text>
        )}
      </SelectTrigger>
      <SelectContent className="gap-1 p-2" viewPortClassName="gap-1">
        {renderSearch}
        {renderOptions}
      </SelectContent>
    </Select>
  );
};

export const MultiSelect = <Option extends SelectOption>({
  containerClassName,
  leading,
  trailing,
  state,
  ...props
}: MultiSelectProps<Option>) => {
  const ref = useRef<SelectTriggerRef>(null);

  const { focused, onBlur, onFocus, focus, blur } = useFocus(ref);
  return (
    <InputContainer
      focus={focus}
      blur={blur}
      trailing={
        trailing || (
          <View className="h-full absolute right-0 p-2">
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </View>
        )
      }
      containerClassName={containerClassName}
      leading={leading}
      state={focused || state}
    >
      <BaseMultiSelect {...props} />
    </InputContainer>
  );
};
