import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { LinearTransition, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { HStack, Paper } from '../layout';
import { cn } from '../utils/cn';

export type AlertDialogProps = {
  title: string;
  description?: string;
  cancelTextClassName?: string;
  actionTextClassName?: string;
  cancelText?: string;
  actionText?: string;
  onAction?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
};
export function AlertDialog({
  title,
  actionText = 'Continue',
  cancelText = 'Cancel',
  actionTextClassName,
  cancelTextClassName,
  children,
  description,
  onAction,
  onCancel,
}: AlertDialogProps) {
  return (
    <AlertDialogPrimitive.Root
      onOpenChange={(open) => {
        console.log('open', open);
      }}
    >
      <AlertDialogPrimitive.Trigger>{children}</AlertDialogPrimitive.Trigger>

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay
          style={StyleSheet.absoluteFill}
          className="bg-black/50 backdrop-blur-sm items-center justify-center"
        >
          <AlertDialogPrimitive.Content className="w-full items-center justify-center">
            <Paper
              className={'p-3 max-w-sm gap-1 w-full'}
              entering={ZoomIn.springify().damping(0.2).duration(150)}
              exiting={ZoomOut.springify().damping(0.2).duration(150)}
              layout={LinearTransition.springify()}
            >
              <AlertDialogPrimitive.Title className="text-lg text-center font-medium">
                {title}
              </AlertDialogPrimitive.Title>
              {description && (
                <AlertDialogPrimitive.Description className="text-center text-muted-foreground">
                  {description}
                </AlertDialogPrimitive.Description>
              )}

              <HStack className="gap-2 border-t border-border/50 py-1 mt-2">
                <AlertDialogPrimitive.Cancel
                  className="flex-1 items-center justify-center py-1 border-r border-border/50"
                  onPress={onCancel}
                >
                  <Text className={cn(cancelTextClassName)}>{cancelText}</Text>
                </AlertDialogPrimitive.Cancel>
                <AlertDialogPrimitive.Action
                  className="flex-1 items-center justify-center py-1"
                  onPress={onAction}
                >
                  <Text className={cn('text-primary font-medium', actionTextClassName)}>
                    {actionText}
                  </Text>
                </AlertDialogPrimitive.Action>
              </HStack>
            </Paper>
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Overlay>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
