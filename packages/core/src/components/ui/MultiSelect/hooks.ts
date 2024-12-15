import { useMemo } from 'react';
import { SelectItemOption } from '../Select/types';

export const useSelectedOptions = (options: SelectItemOption[], value: string[]) => {
  return useMemo(
    () =>
      options.filter((option) => {
        return value.includes(option.value);
      }) || null,
    [options, value]
  );
};
