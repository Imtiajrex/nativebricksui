import * as Slot from '@rn-primitives/slot';
import { SlottablePressableProps, PressableRef } from '@rn-primitives/types';
import { Text, TextClassContext, useTextClass } from './text';
import { useExtractTextClasses } from '../../hooks/useExtractTextClasses';
import { Children, forwardRef, ReactNode, useMemo } from 'react';
import { Pressable as RNPressable } from 'react-native';
import { cn } from '../../lib/utils';

const Pressable = forwardRef<
  PressableRef,
  SlottablePressableProps & {
    children?: React.ReactNode;
  }
>(({ className, asChild = false, children, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : RNPressable;
  const textClasses = useExtractTextClasses(className);
  const prevClasses = useTextClass();

  return (
    <TextClassContext.Provider value={cn(prevClasses, textClasses)}>
      <Component className={className} ref={ref} {...props}>
        {renderChildren(children)}
      </Component>
    </TextClassContext.Provider>
  );
});

export const renderChildren = (children: ReactNode) => {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      return <Text>{child}</Text>;
    }
    return child;
  });
};
export { Pressable };
