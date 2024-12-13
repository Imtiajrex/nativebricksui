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
export type SelectOptions<Option extends SelectOption> = Array<Option> | ReadonlyArray<Option>;
