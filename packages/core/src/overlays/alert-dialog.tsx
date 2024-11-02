import * as AlertDialogPrimitive from '@rn-primitives/alert-dialog';
import { Text } from 'react-native';

export type AlertDialogProps = {
  title: string;
  description: string;
  cancelText: string;
  actionText: string;
  onAction: () => void;
  onCancel: () => void;
};
export function AlertDialog() {
  return (
    <AlertDialogPrimitive.Root>
      <AlertDialogPrimitive.Trigger>
        <Text>Show Alert Dialog</Text>
      </AlertDialogPrimitive.Trigger>

      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay>
          <AlertDialogPrimitive.Content>
            <AlertDialogPrimitive.Title>Are you absolutely sure?</AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </AlertDialogPrimitive.Description>

            <AlertDialogPrimitive.Cancel>
              <Text>Cancel</Text>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action>
              <Text>Continue</Text>
            </AlertDialogPrimitive.Action>
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Overlay>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}
