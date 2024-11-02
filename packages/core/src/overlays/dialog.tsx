import * as DialogPrimitive from '@rn-primitives/dialog';
import { Text } from 'react-native';

export function Dialog() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger>
        <Text>Show Dialog</Text>
      </DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay>
          <DialogPrimitive.Content>
            <DialogPrimitive.Title>Dialog Title</DialogPrimitive.Title>
            <DialogPrimitive.Description>Dialog description.</DialogPrimitive.Description>
            <DialogPrimitive.Close>
              <Text>Close</Text>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
