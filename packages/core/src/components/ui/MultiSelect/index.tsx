import { Check } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Chip, Input, Text } from '~/base';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
} from '~/components/base/select';
import { Separator } from '~/components/base/separator';
import { iconWithClassName } from '~/lib/iconWithClassName';
import { cn } from '~/lib/utils';
import { InputDetails, InputDetailsProps } from '../misc/InputDetails';
import { getInputBorderState } from '../misc/utils';
import { useOptions } from '../Select/hooks';
import { SelectOption, SelectOptions, type SelectItem } from '../Select/types';
import { isGroupedOption, isStringOption } from '../Select/utils';
import { useSelectedOptions } from './hooks';
export type MultiSelectProps<Option extends SelectOption> = {
  value?: string[];
  onChange?: (value: string[]) => void;
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
  renderSelectedOption?: (data: { option: SelectItem }) => JSX.Element;
  searchEnabled?: boolean;
} & InputDetailsProps;
export const MultiSelect = <Option extends SelectOption>(props: MultiSelectProps<Option>) => {
  const [searchText, setSearchText] = useState('');
  const { filteredOptions, normalizedOptions } = useOptions(props.options, searchText);
  const selectedOptions = useSelectedOptions(normalizedOptions, props.value);

  const renderOptions = useMemo(
    () =>
      filteredOptions.map((option: SelectOption) => {
        if (isGroupedOption(option)) {
          return (
            <View key={option.group} className="w-full gap-1">
              <Text className="px-2 py-1 text-sm font-medium">{option.group}</Text>
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
  return (
    <InputDetails {...props}>
      <Select>
        <SelectTrigger
          className={cn(
            'w-full bg-card p-2 rounded-radius h-10 border border-border',
            props.triggerClassName,
            getInputBorderState(props)
          )}
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
            <Text className="text-muted-foreground text-sm native:text-lg">
              {props.placeholder}
            </Text>
          )}
        </SelectTrigger>
        <SelectContent className="gap-1 p-2" viewPortClassName="gap-1">
          {renderSearch}
          {renderOptions}
        </SelectContent>
      </Select>
    </InputDetails>
  );
};

const Option = <Option extends SelectItem | string>({
  option,
  renderOption,
  selectedValue,
  setSelectedValue,
}: {
  option: Option;
  renderOption?: MultiSelectProps<Option>['renderOption'];
  selectedValue?: string[];
  setSelectedValue?: (value: string[]) => void;
}) => {
  const isSelected = isStringOption(option)
    ? selectedValue?.includes(option)
    : selectedValue?.includes((option as SelectItem).value);
  const handleSelect = useCallback(() => {
    const value = isStringOption(option) ? (option as string) : (option as SelectItem).value;
    setSelectedValue?.(
      selectedValue?.includes(value)
        ? selectedValue?.filter((v) => v !== value)
        : [...(selectedValue || []), value]
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
      <SelectItem value={option} label={option} onPress={handleSelect} isSelected={isSelected} />
    );
  }

  return (
    <SelectItem
      value={option.value}
      label={option.label}
      onPress={handleSelect}
      isSelected={isSelected}
    />
  );
};
iconWithClassName(Check);
const SelectItem = ({
  value,
  label,
  onPress,
  isSelected,
}: SelectItem & {
  onPress: () => void;
  isSelected?: boolean;
}) => {
  return (
    <Pressable
      key={value}
      onPress={onPress}
      className={cn(
        'flex-row items-center justify-between gap-2 h-8 p-2 bg-card hover:bg-background active:bg-background rounded-radius',
        isSelected && 'bg-primary'
      )}
    >
      <Text className="text-sm">{label}</Text>
      <Check
        size={16}
        className={cn('text-primary w-4 h-4', isSelected ? 'opacity-100' : 'opacity-0')}
      />
    </Pressable>
  );
};
