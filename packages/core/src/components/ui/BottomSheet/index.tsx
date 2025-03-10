import { remapProps } from 'nativewind';
import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { View } from 'react-native';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { Text } from '../../../base';
import { cn } from '../../../lib/utils';
import { useColor } from '../../../lib/useColor';

remapProps(ActionSheet, {
  containerClassName: 'containerStyle',
});
export type BottomSheetProps = ActionSheetProps & {
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  contentClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
};
export type BottomSheet = ActionSheetRef;
export const BottomSheet = forwardRef<BottomSheet, BottomSheetProps>((props, ref) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(props.open || false);
  if (props.open !== undefined) {
    setIsBottomSheetOpen(props.open);
  }
  useEffect(() => {
    if (props.onOpenChange) {
      props.onOpenChange(isBottomSheetOpen);
    }
  }, [isBottomSheetOpen]);

  return (
    <ActionSheet
      ref={ref}
      onOpen={() => setIsBottomSheetOpen(true)}
      onClose={() => setIsBottomSheetOpen(false)}
      gestureEnabled
      containerClassName={cn('bg-background', props.containerClassName)}
      containerStyle={{
        backgroundColor: useColor('background'),
      }}
      {...props}
    >
      <View className={cn('bg-background px-4 pb-4 pt-2 gap-2', props.contentClassName)}>
        <Text className={cn('text-center text-base font-medium mb-1', props.titleClassName)}>
          {props.title}
        </Text>
        {props.children}
      </View>
    </ActionSheet>
  );
});
