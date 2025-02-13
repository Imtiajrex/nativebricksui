import * as Slot from '@rn-primitives/slot';
import { SlottableViewProps, TextRef } from '@rn-primitives/types';
import { createContext, forwardRef, useContext } from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../lib/utils';

const TextClassContext = createContext<string | undefined>(undefined);
export const useTextClass = () => {
  const context = useContext(TextClassContext);
  if (context === undefined) {
    return '';
  }
  return context;
};

const Text = forwardRef<TextRef, SlottableViewProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = useTextClass();
    const Component = asChild ? Slot.Text : RNText;
    return (
      <Component
        className={cn('text-base text-content select-text leading-none', textClass, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export type Text = typeof RNText;

export { Text, TextClassContext };
