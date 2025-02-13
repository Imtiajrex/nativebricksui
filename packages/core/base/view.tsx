import { SlottableTextProps, ViewRef } from '@rn-primitives/types';
import { forwardRef, useMemo } from 'react';
import { View as RNView } from 'react-native';
import { useExtractTextClasses } from '../hooks/useExtractTextClasses';
import { cn } from '../lib/utils';
import { TextClassContext } from './text';
import { renderChildren } from '../lib/renderTextChildren';
const View = forwardRef<ViewRef, SlottableTextProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const textClasses = useExtractTextClasses(className);
    return (
      <TextClassContext.Provider value={textClasses}>
        <RNView className={cn(className)} ref={ref} {...props}>
          <>{renderChildren(children)}</>
        </RNView>
      </TextClassContext.Provider>
    );
  }
);
View.displayName = 'View';
export type View = typeof RNView;

export { View };
