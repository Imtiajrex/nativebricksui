import { useCallback, useMemo } from 'react';
import {
  SelectFormattedOption,
  SelectItemOption,
  SelectOption,
  SelectOptions,
  SelectProps,
} from './types';
import { isBaseOption, isFormattedGroupedOption, isGroupedOption, isStringOption } from './utils';

import { Check } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';
import { Separator } from '../../base/separator';
import { cn } from '../../../lib/utils';
import { Input } from '../Input';

export const useOptions = ({
  options,
  searchText,
  setSearchText,
  ...props
}: {
  options: SelectOptions<SelectOption>;
  searchText: string;
  setSearchText: (text: string) => void;
  onChange: (value: string) => void;
  renderOption?: SelectProps<SelectOption>['renderOption'];
  searchEnabled?: boolean;
  defaultValue?: string;
}) => {
  const formattedOptions = useMemo(() => {
    return options.map((option: SelectOption) => {
      if (isBaseOption(option)) {
        return option;
      }
      if (isStringOption(option)) {
        return {
          label: option,
          value: option,
        };
      }
      return {
        group: option.group,
        items: option.items.map((o) => {
          if (isBaseOption(o)) {
            return o;
          }
          return {
            label: o,
            value: o,
          };
        }),
      };
    });
  }, [options]);
  const normalizedOptions = useMemo(() => {
    return formattedOptions.flatMap((option) => {
      if (isBaseOption(option)) {
        return [option];
      }
      return option.items.map((o) => {
        return o;
      });
    });
  }, [options]);
  const filteredOptions: SelectFormattedOption[] = useMemo(() => {
    if (!searchText) {
      return formattedOptions;
    }

    return formattedOptions
      .filter((option) => {
        if (isBaseOption(option)) {
          return option.label.toLowerCase().includes(searchText.toLowerCase());
        }

        return option.items.some((o) => {
          return o.label.toLowerCase().includes(searchText.toLowerCase());
        });
      })
      .map((option) => {
        if (isGroupedOption(option)) {
          return {
            ...option,
            items: option.items.filter((o) => {
              return o.label.toLowerCase().includes(searchText.toLowerCase());
            }),
          };
        }
        return option;
      });
  }, [options, searchText]);

  const defaultOption = useMemo(
    () =>
      normalizedOptions.find((option) => {
        return option.value === props.defaultValue;
      }),
    [normalizedOptions, props.defaultValue]
  );
  const onValueChange = useMemo(
    () =>
      props.onChange
        ? (option: SelectItemOption) => {
            props.onChange?.(option.value);
          }
        : undefined,
    [props.onChange]
  );
  return {
    filteredOptions,
    normalizedOptions,
    onValueChange,
    defaultOption,
  };
};
export const useRenderOptions = <IValue extends string | string[]>({
  options,
  ...props
}: {
  options: SelectFormattedOption[];
  searchText: string;
  setSearchText: (text: string) => void;
  value: IValue;
  onChange: (value: string) => void;
  renderOption?: SelectProps<SelectItemOption>['renderOption'];
  searchEnabled?: boolean;
  defaultValue?: string;
}) => {
  const renderOptions = useMemo(
    () =>
      options.map((option) => {
        if (isFormattedGroupedOption(option)) {
          return (
            <View key={option.group} className="w-full gap-1 pb-1 mb-1">
              <Text className="font-medium text-sm px-2 py-1 text-foreground">{option.group}</Text>
              {option.items.map((option) => {
                return (
                  <Option
                    key={option.value}
                    option={option}
                    renderOption={props.renderOption}
                    selectedValue={props.value}
                    onChange={props.onChange}
                  />
                );
              })}
              <Separator />
            </View>
          );
        }
        return (
          <Option
            key={option.value}
            option={option}
            renderOption={props.renderOption}
            selectedValue={props.value}
            onChange={props.onChange}
          />
        );
      }),
    [options, props.value, props.onChange, props.renderOption]
  );
  return renderOptions;
};

export const useRenderSearch = ({
  searchEnabled,
  searchText,
  setSearchText,
}: {
  searchEnabled: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
}) => {
  const renderSearch = useMemo(() => {
    if (!searchEnabled) return null;
    return (
      <Input
        placeholder="Search"
        className="w-full mb-2 text-sm"
        value={searchText}
        onChangeText={setSearchText}
      />
    );
  }, [searchEnabled, searchText, setSearchText]);
  return renderSearch;
};
const Option = <IValue extends string | string[]>({
  option,
  renderOption,
  selectedValue,
  onChange,
}: {
  option: SelectItemOption;
  renderOption?: SelectProps<SelectItemOption>['renderOption'];
  selectedValue?: IValue;
  onChange?: (value: string) => void;
}) => {
  const optionValue = option.value;
  const isSelected = useMemo(() => {
    if (typeof selectedValue == 'string') {
      return optionValue === selectedValue;
    } else {
      return selectedValue.includes(optionValue);
    }
  }, [option, selectedValue, optionValue]);
  const handleSelect = useCallback(() => {
    onChange(optionValue);
  }, [onChange, optionValue]);
  if (renderOption) {
    return renderOption({
      option,
      isSelected,
      setOption: handleSelect,
    });
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
      <Text className="text-sm text-foreground">{label}</Text>
      <Check
        size={16}
        className={cn('text-foreground w-4 h-4', isSelected ? 'opacity-100' : 'opacity-0')}
      />
    </Pressable>
  );
};

export const useSelectedOption = (options: SelectItemOption[], value: string) => {
  return useMemo(
    () =>
      options.find((option) => {
        return option.value === value;
      }) || null,
    [options, value]
  );
};
