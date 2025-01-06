import {
  useMemo,
  useState,
  useCallback,
  useRef,
  forwardRef,
  createContext,
  useContext,
} from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';
export type Input = React.ElementRef<typeof TextInput>;

const Input = forwardRef<Input, TextInputProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'px-3 h-full web:py-2 text-sm lg:text-sm native:text-lg native:leading-[1.25] web:focus:outline-none',
          props.editable === false && 'opacity-50 web:cursor-not-allowed',
          className
        )}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input };
