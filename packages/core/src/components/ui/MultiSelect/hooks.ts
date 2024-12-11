import { useMemo } from 'react';
import { SelectItem } from '../Select/types';

export const useSelectedOptions = (options: SelectItem[], value: string[]) => {
  return useMemo(
    () =>
      options.filter((option) => {
        return value.includes(option.value);
      }) || null,
    [options, value]
  );
};
