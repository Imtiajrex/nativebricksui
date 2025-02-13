import React, { forwardRef } from 'react';
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native';
import { useExtractTextClasses } from '../hooks/useExtractTextClasses';
import { cn } from '../lib/utils';
import { TextClassContext } from './text';
const ScrollView = forwardRef<RNScrollView, ScrollViewProps>(({ className, ...props }, ref) => {
  const textClasses = useExtractTextClasses(className);

  return (
    <TextClassContext.Provider value={textClasses}>
      <RNScrollView className={cn(className)} ref={ref} {...props} />
    </TextClassContext.Provider>
  );
});
ScrollView.displayName = 'ScrollView';
export type ScrollView = typeof RNScrollView;

export { ScrollView };
