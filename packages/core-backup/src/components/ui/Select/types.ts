import { InputContainerProps } from '../misc/InputContainer';

export interface SelectStringItem {
  value: string;
  disabled?: boolean;
}

export interface SelectItemOption extends SelectStringItem {
  label: string;
}

export interface SelectItemGroup<T = SelectItemOption | string> {
  group: string;
  items: T[];
}
export type SelectOption = string | SelectItemOption | SelectItemGroup;
export type SelectFormattedOption = SelectItemOption | SelectItemGroup<SelectItemOption>;
export type SelectOptions<Option extends SelectOption> = Array<Option> | ReadonlyArray<Option>;

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
    option: SelectItemOption;
    isSelected: boolean;
    setOption: () => void;
  }) => JSX.Element;
  renderSelectedOption?: (data: { option: SelectItemOption }) => JSX.Element;
  searchEnabled?: boolean;
} & InputContainerProps;
