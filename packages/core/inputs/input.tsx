// Tremor Input [v1.0.5]

import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { TextInput, TextInputProps } from 'react-native';
import { Pressable } from '../base/pressable';
import { View } from '../base/view';
import { Icon } from '../lib/Icon';
import { cn, focusInput, focusRing, hasErrorInput } from '../lib/utils';

const inputStyles = tv({
  base: [
    // base
    'relative w-full appearance-none rounded-md border px-2.5 py-2 outline-none transition sm:text-sm',
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
    // number input
    enableStepper: {
      false:
        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
    },
  },
});

interface InputProps extends TextInputProps, VariantProps<typeof inputStyles> {
  inputClassName?: string;
  type?: InputTypes;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

type InputTypes = 'text' | 'password' | 'search';
const Input = React.forwardRef<TextInput, InputProps>(
  (
    { className, inputClassName, hasError, enableStepper = true, type, ...props }: InputProps,
    forwardedRef
  ) => {
    const [typeState, setTypeState] = React.useState<InputTypes>(type);

    const isPassword = type === 'password';
    const isSearch = type === 'search';
    const hasLeadingNode = isSearch || !!props.leading;
    const hasTrailingNode = isPassword || !!props.trailing;

    return (
      <View className={cn('relative w-full', className)}>
        <TextInput
          ref={forwardedRef}
          className={cn(
            inputStyles({ hasError, enableStepper }),
            {
              'pl-8': hasLeadingNode,
              'pr-10': hasTrailingNode,
            },
            inputClassName
          )}
          secureTextEntry={typeState === 'password'}
          {...props}
        />
        {hasLeadingNode && (
          <View
            className={cn(
              // base
              'pointer-events-none absolute bottom-0 left-0 flex h-full items-center justify-center'
            )}
          >
            {isSearch ? (
              <Icon
                name="search-line"
                className="size-[1.125rem] shrink-0 fill-content ml-2"
                aria-hidden="true"
              />
            ) : (
              props.leading
            )}
          </View>
        )}
        {hasTrailingNode && (
          <View className={cn('absolute bottom-0 right-0 flex h-full items-center justify-center')}>
            <PasswordToggler typeState={typeState} setTypeState={setTypeState} />
          </View>
        )}
      </View>
    );
  }
);
const PasswordToggler = ({
  setTypeState,
  typeState,
}: {
  typeState: InputTypes;
  setTypeState: (type: InputTypes) => void;
}) => {
  return (
    <Pressable
      aria-label="Change password visibility"
      className={cn(
        // base
        'h-fit w-fit rounded-sm outline-none transition-all mr-3',
        // text
        'text-content-subtle',
        // hover
        focusRing
      )}
      onPress={() => {
        setTypeState(typeState === 'password' ? 'text' : 'password');
      }}
    >
      <View className="sr-only">
        {typeState === 'password' ? 'Show password' : 'Hide password'}
      </View>
      {typeState === 'password' ? (
        <Icon name="eye-fill" aria-hidden="true" className=" fill-content size-5 shrink-0" />
      ) : (
        <Icon name="eye-off-fill" aria-hidden="true" className="fill-content size-5 shrink-0" />
      )}
    </Pressable>
  );
};

Input.displayName = 'Input';

export { Input, inputStyles, type InputProps };
