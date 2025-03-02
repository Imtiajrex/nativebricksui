import * as Slot from '@rn-primitives/slot';
import { SlottableViewProps, ViewRef } from '@rn-primitives/types';
import { TextClassContext } from 'base';
import { useExtractTextClasses } from 'hooks/useExtractTextClasses';
import { forwardRef } from 'react';
import { View as RNView } from 'react-native';
import { cn } from '../../lib/utils';
import { renderChildren } from './pressable';

const View = forwardRef<ViewRef, SlottableViewProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot.View : RNView;
    const textClasses = useExtractTextClasses(className);
    return (
      <TextClassContext.Provider value={textClasses}>
        <Component className={cn('bg-background', className)} ref={ref} {...props}>
          {renderChildren(children)}
        </Component>
      </TextClassContext.Provider>
    );
  }
);

export { View };
