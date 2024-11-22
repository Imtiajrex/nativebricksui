import { useMemo } from 'react';
import { SelectOptions } from './types';
import { isBaseOption, isGroupedOption, isStringOption } from './utils';

export const useSearchedOptions = (options: SelectOptions, searchText: string) => {
  return useMemo(() => {
    if (!searchText) {
      return options;
    }

    return options
      .filter((option) => {
        if (isStringOption(option)) {
          return option.toLowerCase().includes(searchText.toLowerCase());
        }

        if (isBaseOption(option)) {
          return option.label.toLowerCase().includes(searchText.toLowerCase());
        }

        return option.items.some((o) => {
          if (isStringOption(o)) {
            return o.toLowerCase().includes(searchText.toLowerCase());
          }

          return o.label.toLowerCase().includes(searchText.toLowerCase());
        });
      })
      .map((option) => {
        if (isGroupedOption(option)) {
          return {
            ...option,
            items: option.items.filter((o) => {
              if (isStringOption(o)) {
                return o.toLowerCase().includes(searchText.toLowerCase());
              }

              return o.label.toLowerCase().includes(searchText.toLowerCase());
            }),
          };
        }
        return option;
      });
  }, [options, searchText]);
};
