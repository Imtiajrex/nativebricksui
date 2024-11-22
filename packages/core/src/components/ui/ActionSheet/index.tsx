import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '~/base';
import { DialogContent, Dialog as NativeDialog } from '~/components/base/dialog';
import { Separator } from '~/components/base/separator';

type ActionType = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  onPress: () => void;
};
export type ActionSheetProps = {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  actions?: ActionType[];
  cancelAction?: ActionType;
};
export type ActionSheet = {
  show: () => void;
  hide: () => void;
};
export const ActionSheet = forwardRef<ActionSheet, ActionSheetProps>((props, ref) => {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(props.open || false);
  const show = useCallback(() => setIsActionSheetOpen(true), [setIsActionSheetOpen]);
  const hide = useCallback(() => setIsActionSheetOpen(false), [setIsActionSheetOpen]);

  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    [show, hide]
  );
  useEffect(() => {
    if (props.open !== undefined) {
      setIsActionSheetOpen(props.open);
    }
  }, [props.open]);
  useEffect(() => {
    if (props.onOpenChange) {
      props.onOpenChange(isActionSheetOpen);
    }
  }, [isActionSheetOpen]);
  const cancelAction = props.cancelAction || { label: 'Cancel', onPress: hide };

  return (
    <NativeDialog open={isActionSheetOpen} onOpenChange={setIsActionSheetOpen}>
      <DialogContent
        className="md:max-w-[425px] min-w-[250px] w-full bg-transparent p-0 gap-0 border-none rounded-2xl overflow-hidden"
        overlayClassName="justify-end"
        showCloseButton={false}
      >
        {/* {props.title && <Text className='text-center text-base'>{props.title}</Text>}
        {props.description && <Text className='text-center text-sm'>{props.description}</Text>} */}
        <View className="bg-card rounded-xl overflow-hidden">
          {props.actions?.map((action, index) => (
            <View key={`action-${index}`}>
              <Pressable
                key={index}
                onPress={action.onPress}
                className={'p-4 bg-card flex-row items-center justify-center'}
              >
                <Text className="text-center text-sm font-bold text-primary">{action.label}</Text>
                {action.icon}
              </Pressable>
              <Separator />
            </View>
          ))}
        </View>
        <Pressable
          onPress={cancelAction.onPress}
          className={'p-4 bg-card flex-row items-center justify-center rounded-xl mt-2'}
        >
          <Text className="text-center text-sm font-bold text-destructive">
            {cancelAction.label}
          </Text>
          {cancelAction.icon}
        </Pressable>
      </DialogContent>
    </NativeDialog>
  );
});
