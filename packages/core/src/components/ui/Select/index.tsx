import { ChevronDown } from 'lucide-react-native';
import { RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import {
  Select as NativeSelect,
  SelectContent,
  SelectTrigger,
  SelectTriggerRef,
  Text,
} from '~/base';
import { iconWithClassName } from '~/lib/iconWithClassName';
import { cn } from '~/lib/utils';
import { InputContainer, useFocus } from '../misc/InputContainer';
import { useOptions, useRenderOptions, useRenderSearch, useSelectedOption } from './hooks';
import { SelectOption, SelectProps } from './types';

const BaseSelect = <Option extends SelectOption>(
  props: SelectProps<Option> & {
    selectRef?: RefObject<SelectTriggerRef>;
    onFocus?: () => void;
    onBlur?: () => void;
  }
) => {
  const [searchText, setSearchText] = useState('');
  const { normalizedOptions, filteredOptions, defaultOption, onValueChange } = useOptions({
    options: props.options,
    searchText,
    setSearchText,
    onChange: props.onChange,
    defaultValue: props.defaultValue,
    renderOption: props.renderOption,
    searchEnabled: props.searchEnabled,
  });
  const renderSearch = useRenderSearch({
    searchText,
    setSearchText,
    searchEnabled: props.searchEnabled,
  });
  const onChange = useCallback(
    (value: string) => {
      props.onChange?.(value);
    },
    [props.onChange]
  );
  const renderOptions = useRenderOptions({
    options: filteredOptions,
    searchText,
    setSearchText,
    onChange,
    value: props.value,
    renderOption: props.renderOption,
  });
  const selectedOption = useSelectedOption(normalizedOptions, props.value);
  const selectValue = useMemo(() => {
    return selectedOption ? (
      props.renderSelectedOption ? (
        props.renderSelectedOption({ option: selectedOption })
      ) : (
        <Text className={cn('text-foreground text-sm native:text-lg', props.valueClassName)}>
          {selectedOption?.label}
        </Text>
      )
    ) : (
      <Text className="text-muted-foreground text-sm native:text-lg">{props.placeholder}</Text>
    );
  }, [selectedOption, props.renderSelectedOption, props.valueClassName, props.placeholder]);
  return (
    <NativeSelect
      className="flex-1"
      value={selectedOption}
      defaultValue={defaultOption}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        ref={props.selectRef}
        className={cn('flex-1 p-2', props.triggerClassName)}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        {selectValue}
      </SelectTrigger>
      <SelectContent className={cn('p-1', props.contentClassName)} viewPortClassName="gap-1">
        {renderSearch}
        {renderOptions}
      </SelectContent>
    </NativeSelect>
  );
};
iconWithClassName(ChevronDown);

export const Select = <Option extends SelectOption>({
  containerClassName,
  leading,
  trailing,
  state,
  ...props
}: SelectProps<Option>) => {
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
      <BaseSelect {...props} selectRef={ref} onFocus={onFocus} onBlur={onBlur} />
    </InputContainer>
  );
};
