// Tremor Select [v1.0.5]

import React, { useMemo } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { PressableRef } from '@rn-primitives/types';
import { Popover } from '../../base/popover';
import { Pressable } from '../../base/pressable';
import { Text } from '../../base/text';
import { View } from '../../base/view';
import { Icon } from '../../lib/Icon';
import { cn, focusInput, hasErrorInput } from '../../lib/utils';
import { OptionType } from './types';
import { renderOptions } from './utils';

const selectStyles = tv({
  base: [
    // base
    'relative w-full h-10 appearance-none rounded-md border px-2.5 py-2 outline-none transition sm:text-sm',
    // border color
    'border-border',
    // text color
    'text-content',
    // placeholder color
    'placeholder:text-content-subtle',
    // background color
    'bg-background-emphasis',
    // disabled
    'disabled:bg-background-emphasis disabled:border-muted disabled:text-content-muted',
    // focus
    focusInput,
    // invalid (optional)
    // "aria-[invalid=true]:dark:ring-red-400/20 aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-red-200 aria-[invalid=true]:border-red-500 invalid:ring-2 invalid:ring-red-200 invalid:border-red-500"
    // remove search cancel button (optional)
    '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
  },
});

interface SelectProps extends VariantProps<typeof selectStyles> {
  inputClassName?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select = React.forwardRef<PressableRef, SelectProps>(
  ({ className, inputClassName, hasError, ...props }: SelectProps, forwardedRef) => {
    const hasLeadingNode = !!props.leading;
    const hasTrailingNode = !!props.trailing;
    const selectedOption = useMemo(() => {
      return props.options.find((option) => option.value === props.value);
    }, [props.options, props.value]);

    return (
      <Popover
        from={
          <Pressable ref={forwardedRef} className={cn('relative w-full', className)}>
            <View
              className={cn(
                selectStyles({ hasError }),
                {
                  'pl-8': hasLeadingNode,
                  'pr-10': hasTrailingNode,
                },
                inputClassName,
                selectedOption ? 'text-content' : 'text-content-subtle'
              )}
              {...props}
            >
              <Text className="select-none">{selectedOption?.label || props.placeholder}</Text>
            </View>
            {hasLeadingNode && (
              <View
                className={cn(
                  // base
                  'pointer-events-none absolute bottom-0 left-0 flex h-full items-center justify-center'
                )}
              >
                {props.leading}
              </View>
            )}
            <View
              className={cn('absolute bottom-0 right-0 flex h-full items-center justify-center')}
            >
              {props.trailing || (
                <Icon name="expand-up-down-line" className="mr-2 size-5 fill-content-subtle" />
              )}
            </View>
          </Pressable>
        }
        offset={4}
      >
        <View className="border-border p-2 gap-1 rounded-xl bg-background-emphasis w-96">
          {renderOptions({
            options: props.options,
            value: props.value,
            onChange: props.onChange,
          })}
        </View>
      </Popover>
    );
  }
);
Select.displayName = 'Select';

export { Select, selectStyles, type SelectProps };
