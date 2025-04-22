import * as Slot from '@rn-primitives/slot';
import { SlottableViewProps, ViewRef } from '@rn-primitives/types';
import { TextClassContext, useTextClass } from './text';
import { useExtractTextClasses } from '../../hooks/useExtractTextClasses';
import { forwardRef } from 'react';
import { View as RNView } from 'react-native';
import { cn } from '../../lib/utils';
import { renderChildren } from './pressable';

const View = forwardRef<ViewRef, SlottableViewProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot.View : RNView;
    const textClasses = useExtractTextClasses(className);
    const prevContextClasses = useTextClass();

    return (
      <TextClassContext.Provider value={cn(prevContextClasses, textClasses)}>
        <Component className={className} ref={ref} {...props}>
          {renderChildren(children)}
        </Component>
      </TextClassContext.Provider>
    );
  }
);

export { View };
