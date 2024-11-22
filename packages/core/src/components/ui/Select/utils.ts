import { SelectItem, SelectItemGroup, SelectOption } from './types';

export const isGroupedOption = <T extends SelectItem | string>(
  option: SelectOption
): option is SelectItemGroup<T> => typeof option != 'string' && 'group' in option;
export const isStringOption = (option: SelectOption): option is string =>
  typeof option === 'string';
export const isBaseOption = (option: SelectOption): option is SelectItem =>
  typeof option !== 'string' && 'value' in option;
