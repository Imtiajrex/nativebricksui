import { remapProps } from 'nativewind';
import { forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { Text } from '~/base';
import { cn } from '~/lib/utils';

remapProps(ActionSheet, {
  containerClassName: 'containerStyle',
});
export type BottomSheetProps = {
  title?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  contentClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
} & ActionSheetProps;
export type BottomSheet = ActionSheetRef;
export const BottomSheet = forwardRef<BottomSheet, BottomSheetProps>((props, ref) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(props.open || false);
  useEffect(() => {
    if (props.open !== undefined) {
      setIsBottomSheetOpen(props.open);
    }
  }, [props.open]);
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
