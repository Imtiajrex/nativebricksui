import { useMemo, useState } from 'react';
import { Input, Text } from '~/base';
import {
  Select as NativeSelect,
  SelectItem as NativeSelectItem,
  Option as NativeSelectOption,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
} from '~/components/base/select';
import { Separator } from '~/components/base/separator';
import { cn } from '~/lib/utils';
import { InputDetailsProps } from '../Input/types';
import InputDetails from '../misc/InputDetails';
import { getInputBorderState } from '../misc/utils';
import { useSearchedOptions } from './hooks';
import { SelectOption, SelectOptions, type SelectItem } from './types';
import { isGroupedOption, isStringOption } from './utils';

export type SelectProps = {
  defaultValue?: NativeSelectOption;
  value?: NativeSelectOption;
  onChange?: (value: NativeSelectOption) => void;
  contentClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  placeholder?: string;
  options: SelectOptions;
  searchEnabled?: boolean;
} & InputDetailsProps;
export const Select = (props: SelectProps) => {
  const [searchText, setSearchText] = useState('');
  const filteredOptions = useSearchedOptions(props.options, searchText);

  const renderOptions = useMemo(
    () =>
      filteredOptions.map((option: SelectOption) => {
        if (isGroupedOption(option)) {
          return (
            <SelectGroup key={option.group} className="w-full">
              <SelectLabel>{option.group}</SelectLabel>
              {option.items.map((option) => (
                <Option key={isStringOption(option) ? option : option.value} option={option} />
              ))}
              <Separator />
            </SelectGroup>
          );
        }
        return <Option key={isStringOption(option) ? option : option.value} option={option} />;
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
      <NativeSelect
        defaultValue={props.defaultValue}
        value={props.value}
        onValueChange={props.onChange}
      >
        <SelectTrigger className={cn('w-full', props.triggerClassName, getInputBorderState(props))}>
          {props.value ? (
            <Text className={cn('text-foreground text-sm native:text-lg', props.valueClassName)}>
              {props.value?.label}
            </Text>
          ) : (
            <Text className="text-muted-foreground text-sm native:text-lg">
              {props.placeholder}
            </Text>
          )}
        </SelectTrigger>
        <SelectContent>
          {renderSearch}
          {renderOptions}
        </SelectContent>
      </NativeSelect>
    </InputDetails>
  );
};

const Option = ({ option }: { option: SelectItem | string }) => {
  if (isStringOption(option)) {
    return (
      <NativeSelectItem key={option} value={option} label={option}>
        {option}
      </NativeSelectItem>
    );
  }
  return (
    <NativeSelectItem key={option.value} value={option.value} label={option.label}>
      {option.label}
    </NativeSelectItem>
  );
};
