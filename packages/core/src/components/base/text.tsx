import * as Slot from '@rn-primitives/slot';
import { SlottableTextProps, TextRef } from '@rn-primitives/types';
import { createContext, forwardRef, useContext } from 'react';
import { Text as RNText } from 'react-native';
import { cn } from '../../lib/utils';

const TextClassContext = createContext<string | undefined>(undefined);
export const useTextClass = () => useContext(TextClassContext);

const Text = forwardRef<TextRef, SlottableTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const textClass = useContext(TextClassContext);
    const Component = asChild ? Slot.Text : RNText;
    return (
      <TextClassContext.Provider value={cn(textClass, className)}>
        <Component
          className={cn('text-base text-foreground select-text leading-none', textClass, className)}
          ref={ref}
          {...props}
        />
      </TextClassContext.Provider>
    );
  }
);
Text.displayName = 'Text';

export { Text, TextClassContext };
