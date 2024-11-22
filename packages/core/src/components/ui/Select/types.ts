export interface SelectStringItem {
  value: string;
  disabled?: boolean;
}

export interface SelectItem extends SelectStringItem {
  label: string;
}

export interface SelectItemGroup<T = SelectItem | string> {
  group: string;
  items: T[];
}
export type SelectOption = string | SelectItem | SelectItemGroup;
export type SelectOptions = Array<SelectOption> | ReadonlyArray<SelectOption>;
