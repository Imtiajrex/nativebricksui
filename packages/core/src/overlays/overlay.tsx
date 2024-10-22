import { View, ViewProps } from 'react-native';
import { mergeClasses } from '..';

export type OverlayProps = ViewProps & {
  visible?: boolean;
  children?: React.ReactNode;
};
export function Overlay(props: OverlayProps) {
  if (!props.visible) return null;
  return <View {...props} className={mergeClasses('flex-1 bg-black/25', props.className)} />;
}
