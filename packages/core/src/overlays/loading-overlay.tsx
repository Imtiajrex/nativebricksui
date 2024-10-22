import { ActivityIndicator, View, ViewProps } from 'react-native';
import { mergeClasses } from '..';

export type LoadingOverlayProps = ViewProps & {
  visible?: boolean;
  children?: React.ReactNode;
};
export function LoadingOverlay(props: LoadingOverlayProps) {
  if (!props.visible) return null;
  return (
    <View
      {...props}
      className={mergeClasses('flex-1 bg-black/25 items-center justify-center', props.className)}
    >
      {props.children || (
        <>
          <ActivityIndicator color="white" />
        </>
      )}
    </View>
  );
}
