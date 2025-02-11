import { forwardRef, ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '../../../base';
import { DialogContent, Dialog as NativeDialog } from '../../../components/base/dialog';
import { Separator } from '../../../components/base/separator';
import { useDialog } from '../Dialog/hooks';

type ActionType = {
  label: string;
  icon?: ReactNode;
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
  const { isDialogOpen, onOpenChange, hide } = useDialog({
    open: props.open,
    onOpenChange: props.onOpenChange,
    ref,
  });
  const cancelAction = props.cancelAction || { label: 'Cancel', onPress: hide };

  return (
    <NativeDialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="md:max-w-[425px] min-w-[250px] w-full bg-transparent p-0 gap-0 border-none border-transparent rounded-2xl overflow-hidden"
        overlayClassName="justify-end"
        showCloseButton={false}
      >
        {/* {props.title && <Text className='text-center text-base'>{props.title}</Text>}
        {props.description && <Text className='text-center text-sm'>{props.description}</Text>} */}
        <View className="bg-card rounded-xl overflow-hidden">
          <View className="py-4 gap-1">
            {props.title && <Text className="text-center text-sm font-medium">{props.title}</Text>}
            {props.description && (
              <Text className="text-center text-sm text-muted-foreground">{props.description}</Text>
            )}
          </View>
          <Separator />
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
