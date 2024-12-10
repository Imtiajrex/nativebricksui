import { Fragment, useId, useMemo, useState } from 'react';
import { Input, PortalHost, Text } from '~/base';
import {
  Select as NativeSelect,
  SelectItem as NativeSelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
} from '~/components/base/select';
import { Separator } from '~/components/base/separator';
import { cn } from '~/lib/utils';
import { InputDetails, InputDetailsProps } from '../misc/InputDetails';
import { getInputBorderState } from '../misc/utils';
import { useOptions, useSelectedOption } from './hooks';
import { SelectOption, SelectOptions, type SelectItem } from './types';
import { isGroupedOption, isStringOption } from './utils';
import { Platform } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';

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
  renderSelectedOption?: (data: { option: SelectItem }) => JSX.Element;
  searchEnabled?: boolean;
} & InputDetailsProps;
export const Select = <Option extends SelectOption>(props: SelectProps<Option>) => {
  const [searchText, setSearchText] = useState('');
  const portalId = useId();
  const { filteredOptions, normalizedOptions } = useOptions(props.options, searchText);
  const selectedOption = useSelectedOption(normalizedOptions, props.value);

  const renderOptions = useMemo(
    () =>
      filteredOptions.map((option: SelectOption) => {
        if (isGroupedOption(option)) {
          return (
            <SelectGroup key={option.group} className="w-full">
              <SelectLabel>{option.group}</SelectLabel>
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
            </SelectGroup>
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
    <>
      <WindowOverlay>
        {/* #7 */}
        <PortalHost name={portalId} />
      </WindowOverlay>
      <InputDetails {...props}>
        <NativeSelect
          defaultValue={defaultOption}
          value={selectedOption}
          onValueChange={(value) => {
            props.onChange?.(value.value);
          }}
        >
          <SelectTrigger
            className={cn('w-full', props.triggerClassName, getInputBorderState(props))}
          >
            {selectedOption ? (
              props.renderSelectedOption ? (
                props.renderSelectedOption({ option: selectedOption })
              ) : (
                <Text
                  className={cn('text-foreground text-sm native:text-lg', props.valueClassName)}
                >
                  {selectedOption?.label}
                </Text>
              )
            ) : (
              <Text className="text-muted-foreground text-sm native:text-lg">
                {props.placeholder}
              </Text>
            )}
          </SelectTrigger>
          <SelectContent portalHost={portalId}>
            {renderSearch}
            {renderOptions}
          </SelectContent>
        </NativeSelect>
      </InputDetails>
    </>
  );
};

const Option = <Option extends SelectItem | string>({
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
  if (renderOption) {
    return renderOption({
      option,
      isSelected: isStringOption(option)
        ? option === selectedValue
        : option.value === selectedValue,
      setOption: () => {
        setSelectedValue?.(
          isStringOption(option) ? (option as string) : (option as SelectItem).value
        );
      },
    });
  }
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
