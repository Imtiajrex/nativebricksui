import { SlottableTextProps, PressableRef, SlottablePressableProps } from '@rn-primitives/types';
import { forwardRef } from 'react';
import { Pressable as RNPressable } from 'react-native';
import { useExtractTextClasses } from '../hooks/useExtractTextClasses';
import { cn } from '../lib/utils';
import { TextClassContext } from './text';
import { renderChildren } from '../lib/renderTextChildren';
const Pressable = forwardRef<
  PressableRef,
  SlottablePressableProps & {
    children?: React.ReactNode;
  }
>(({ className, asChild = false, children, ...props }, ref) => {
  const textClasses = useExtractTextClasses(className);

  return (
    <TextClassContext.Provider value={textClasses}>
      <RNPressable className={cn(className)} ref={ref} {...props}>
        {renderChildren(children)}
      </RNPressable>
    </TextClassContext.Provider>
  );
});
Pressable.displayName = 'Pressable';
export type Pressable = typeof RNPressable;
export { Pressable };
