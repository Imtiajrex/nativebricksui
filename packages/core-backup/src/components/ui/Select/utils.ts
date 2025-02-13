import { SelectItemOption, SelectItemGroup, SelectOption } from './types';

export const isGroupedOption = <T extends SelectItemOption | string>(
  option: SelectOption
): option is SelectItemGroup<T> => typeof option != 'string' && 'group' in option;
export const isFormattedGroupedOption = (
  option: SelectOption
): option is SelectItemGroup<SelectItemOption> => typeof option !== 'string' && 'group' in option;
export const isStringOption = (option: SelectOption): option is string =>
  typeof option === 'string';
export const isBaseOption = (option: SelectOption): option is SelectItemOption =>
  typeof option !== 'string' && 'value' in option;
