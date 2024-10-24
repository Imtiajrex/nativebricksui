import { View, type ViewProps } from 'react-native';
import { mergeClasses } from '../utils/cn';
import { forwardRef } from 'react';
import Animated, { AnimateProps } from 'react-native-reanimated';

export function Center(props: ViewProps) {
  return (
    <View
      {...props}
      className={mergeClasses('items-center justify-center p-12 bg-red-500', props.className)}
    />
  );
}

export type PaperProps = ViewProps &
  AnimateProps<ViewProps> & {
    shadow?: boolean;
    rounded?: boolean;
    border?: boolean;
  };
export const Paper = forwardRef<View, PaperProps>(function Paper(
  { rounded = true, border = true, shadow = true, ...props }: PaperProps,
  ref
) {
  return (
    <Animated.View
      {...props}
      className={mergeClasses(
        'bg-card',
        shadow && 'shadow-sm shadow-shadow',
        rounded && 'rounded-radius',
        border && 'border border-border',

        props.className
      )}
      ref={ref}
    />
  );
});
export function VStack(props: ViewProps) {
  return <View {...props} className={mergeClasses('flex flex-col', props.className)} />;
}
export function HStack(props: ViewProps) {
  return <View {...props} className={mergeClasses('flex flex-row', props.className)} />;
}
export function Spacer(props: ViewProps) {
  return <View {...props} className={mergeClasses('h-2', props.className)} />;
}

export function Divider(props: ViewProps) {
  return (
    <View {...props} className={mergeClasses('border-divider border-b min-w-5', props.className)} />
  );
}

export function Container(props: ViewProps) {
  return (
    <View
      {...props}
      className={mergeClasses('max-w-container-size mx-auto w-full', props.className)}
    />
  );
}

export * from './flatlist';
