import { RefObject, useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { cn } from '~/lib/utils';
export type InputContainerProps = {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  containerClassName?: string;
  state?: 'default' | 'focused' | 'invalid' | 'valid';
};

export function InputContainer(
  props: InputContainerProps & {
    children: React.ReactNode;
    focus?: () => void;
    blur?: () => void;
    disabled?: boolean;
  }
) {
  return (
    <Pressable
      className={cn(
        'web:flex flex-row items-center overflow-hidden h-10 native:h-12 web:w-full rounded-input border border-input bg-card text-foreground gap-0',
        props.state == 'invalid' && 'border-destructive',
        props.state == 'valid' && 'border-success',
        props.state == 'focused' && 'border-primary',
        props.containerClassName
      )}
      onFocus={props.focus}
      onPress={props.focus}
      disabled={props.disabled}
    >
      {props.leading}
      {props.children}
      {props.trailing}
    </Pressable>
  );
}

export const useFocus = (
  inputRef: RefObject<{
    focus?: () => void;
    blur?: () => void;
  }>
) => {
  const [isFocused, setIsFocused] = useState(false);
  return {
    onFocus: useCallback(() => setIsFocused(true), []),
    onBlur: useCallback(() => setIsFocused(false), []),
    isFocused,
    focused: isFocused ? ('focused' as const) : undefined,
    focus: useCallback(() => inputRef.current?.focus?.(), [inputRef]),
    blur: useCallback(() => inputRef.current?.blur?.(), [inputRef]),
  };
};
