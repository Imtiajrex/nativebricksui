import { forwardRef } from 'react';
import { Pressable } from 'react-native';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialog as BaseAlertDialog,
} from '~/components/base/alert-dialog';
import { Text } from '~/components/base/text';
import { cn } from '~/lib/utils';
import { useDialog } from '../Dialog/hooks';

type ButtonType = {
  text: string;
  className?: string;
  textClassName?: string;
  onPress: () => void;
};
export type AlertDialogProps = {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  buttons?: ButtonType[];
};
export type AlertDialog = {
  show: () => void;
  hide: () => void;
};
export const AlertDialog = forwardRef<AlertDialog, AlertDialogProps>((props, ref) => {
  const { isDialogOpen, onOpenChange } = useDialog({
    open: props.open,
    onOpenChange: props.onOpenChange,
    ref,
  });
  return (
    <BaseAlertDialog open={isDialogOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="gap-1 max-w-sm sm:max-w-md w-full">
        {props.title && (
          <AlertDialogTitle className="text-base font-medium text-center">
            {props.title}
          </AlertDialogTitle>
        )}
        {props.description && (
          <AlertDialogDescription className="text-sm text-muted-foreground text-center">
            {props.description}
          </AlertDialogDescription>
        )}
        <AlertDialogFooter
          className={cn(
            'flex flex-row items-center justify-between gap-2 border-t border-border mt-2',
            props.buttons?.length === 1 && 'justify-center',
            props.buttons?.length > 2 && 'flex-col justify-center'
          )}
        >
          {props.buttons?.map((button, index) => (
            <Pressable
              className={cn('flex-1 items-center pt-3', button.className)}
              key={`alert-dialog-button-${index}`}
              onPress={button.onPress}
            >
              <Text className={cn('text-sm font-medium', button.textClassName)}>{button.text}</Text>
            </Pressable>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </BaseAlertDialog>
  );
});
