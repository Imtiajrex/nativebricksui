import { forwardRef } from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import { cn } from '../../lib/utils';
export type Input = React.ElementRef<typeof TextInput>;

const Input = forwardRef<Input, TextInputProps>(
  ({ className, placeholderClassName, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={cn(
          'px-3 h-full py-2 text-sm lg:text-sm focus:outline-none rounded-input',
          props.editable === false && 'opacity-50 cursor-not-allowed',
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
