import { Check } from 'lucide-react-native';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';
import { Input, Select as NativeSelect, SelectContent, SelectTrigger, Text } from '~/base';
import { Separator } from '~/components/base/separator';
import { cn } from '~/lib/utils';
import { InputDetails, InputDetailsProps } from '../misc/InputDetails';
import { getInputBorderState } from '../misc/utils';
import { useOptions, useSelectedOption } from './hooks';
import { SelectOption, SelectOptions, type SelectItemOption } from './types';
import { isGroupedOption, isStringOption } from './utils';

const WindowOverlay = Platform.OS === 'ios' ? FullWindowOverlay : Fragment;
export type SelectProps<Option extends SelectOption> = {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  contentClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  placeholder?: string;
  options: SelectOptions<Option>;
  renderOption?: (data: {
    option: Option;
    isSelected: boolean;
    setOption: () => void;
  }) => JSX.Element;
  renderSelectedOption?: (data: { option: SelectItemOption }) => JSX.Element;
  searchEnabled?: boolean;
} & InputDetailsProps;
export const Select = <Option extends SelectOption>(props: SelectProps<Option>) => {
  const [searchText, setSearchText] = useState('');
  const { filteredOptions, normalizedOptions } = useOptions(props.options, searchText);
  const selectedOption = useSelectedOption(normalizedOptions, props.value);

  const renderOptions = useMemo(
    () =>
      filteredOptions.map((option: SelectOption) => {
        if (isGroupedOption(option)) {
          return (
            <View key={option.group} className="w-full gap-1 pb-1 mb-1">
              <Text className="font-medium text-sm px-2 py-1">{option.group}</Text>
              {option.items.map((option) => {
                return (
                  <Option
                    key={isStringOption(option) ? option : option.value}
                    option={option}
                    renderOption={props.renderOption}
                    selectedValue={props.value}
                    setSelectedValue={props.onChange}
                  />
                );
              })}
              <Separator />
            </View>
          );
        }
        return (
          <Option
            key={isStringOption(option) ? option : option.value}
            option={option}
            renderOption={props.renderOption}
            selectedValue={props.value}
            setSelectedValue={props.onChange}
          />
        );
      }),
    [filteredOptions]
  );
  const renderSearch = useMemo(() => {
    if (!props.searchEnabled) return null;
    return (
      <Input
        placeholder="Search"
        className="w-full mb-2 text-sm"
        value={searchText}
        onChangeText={setSearchText}
      />
    );
  }, [props.searchEnabled, searchText]);
  const defaultOption = normalizedOptions.find((option) => {
    return isStringOption(option)
      ? option === props.defaultValue
      : option.value === props.defaultValue;
  });
  return (
    <InputDetails {...props}>
      <NativeSelect
        value={selectedOption}
        defaultValue={defaultOption}
        onValueChange={
          props.onChange
            ? (option) => {
                props.onChange?.(isStringOption(option) ? option : option.value);
              }
            : undefined
        }
      >
        <SelectTrigger className={cn('', props.triggerClassName, getInputBorderState(props))}>
          {selectedOption ? (
            props.renderSelectedOption ? (
              props.renderSelectedOption({ option: selectedOption })
            ) : (
              <Text className={cn('text-foreground text-sm native:text-lg', props.valueClassName)}>
                {selectedOption?.label}
              </Text>
            )
          ) : (
            <Text className="text-muted-foreground text-sm native:text-lg">
              {props.placeholder}
            </Text>
          )}
        </SelectTrigger>
        <SelectContent className={cn('p-1', props.contentClassName)} viewPortClassName="gap-1">
          {renderSearch}
          {renderOptions}
        </SelectContent>
      </NativeSelect>
    </InputDetails>
  );
};

const Option = <Option extends SelectItemOption | string>({
  option,
  renderOption,
  selectedValue,
  setSelectedValue,
}: {
  option: Option;
  renderOption?: SelectProps<Option>['renderOption'];
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
}) => {
  const isSelected = isStringOption(option)
    ? option === selectedValue
    : option.value === selectedValue;
  const handleSelect = useCallback(() => {
    setSelectedValue?.(
      isStringOption(option) ? (option as string) : (option as SelectItemOption).value
    );
  }, [selectedValue, option]);
  if (renderOption) {
    return renderOption({
      option,
      isSelected,
      setOption: handleSelect,
    });
  }
  if (isStringOption(option)) {
    return (
      <SelectItem
        key={option}
        value={option}
        label={option}
        onPress={handleSelect}
        isSelected={isSelected}
      />
    );
  }

  return (
    <SelectItem
      key={option.value}
      value={option.value}
      label={option.label}
      onPress={handleSelect}
      isSelected={isSelected}
    />
  );
};

export const SelectItem = ({
  value,
  label,
  onPress,
  isSelected,
}: SelectItemOption & {
  onPress: () => void;
  isSelected?: boolean;
}) => {
  return (
    <Pressable
      key={value}
      onPress={onPress}
      className={cn(
        'flex-row items-center justify-between gap-2 h-9 p-2 bg-card active:bg-background hover:bg-background rounded-radius',
        isSelected && 'bg-muted'
      )}
    >
      <Text className="text-sm">{label}</Text>
      <Check
        size={16}
        className={cn('text-foreground w-4 h-4', isSelected ? 'opacity-100' : 'opacity-0')}
      />
    </Pressable>
  );
};
