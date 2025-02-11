import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { forwardRef } from 'react';
import { Platform } from 'react-native';
import { Check } from '../../lib/icons/Check';
import { cn } from '../../lib/utils';

const Checkbox = forwardRef<CheckboxPrimitive.RootRef, CheckboxPrimitive.RootProps>(
  ({ className, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'peer h-4 w-4 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          props.checked && 'bg-primary',
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('items-center justify-center h-full w-full')}>
          <Check
            size={12}
            strokeWidth={Platform.OS === 'web' ? 2.5 : 3.5}
            className="text-primary-foreground"
          />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
