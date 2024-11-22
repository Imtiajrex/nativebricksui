import { useMemo } from 'react';
import { SelectItem, SelectOptions } from './types';
import { isBaseOption, isGroupedOption, isStringOption } from './utils';

export const useOptions = (options: SelectOptions, searchText: string) => {
  const normalizedOptions = useMemo(() => {
    return options.flatMap((option) => {
      if (isBaseOption(option)) {
        return [option];
      } else if (isStringOption(option)) {
        return [
          {
            label: option,
            value: option,
          },
        ];
      }
      return option.items.map((o) => {
        if (isBaseOption(o)) {
          return o;
        }
        return {
          label: o,
          value: o,
        };
      });
    });
  }, [options]);
  const filteredOptions = useMemo(() => {
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
  return {
    filteredOptions,
    normalizedOptions,
  };
};

export const useSelectedOption = (options: SelectItem[], value: string) => {
  return useMemo(
    () =>
      options.find((option) => {
        return option.value === value;
      }) || null,
    [options, value]
  );
};
