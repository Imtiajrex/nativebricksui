import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Paper } from '../layout';
import { Entering, Exiting } from '../animations/entering';

export type ContextMenuProps = {
  children: React.ReactNode;
};
export function ContextMenu({ children }: ContextMenuProps) {
  return (
    <ContextMenuPrimitive.Root>
      <ContextMenuPrimitive.Trigger className="active:scale-[1.02] origin-top-left scale-100 transition-all">
        {children}
      </ContextMenuPrimitive.Trigger>

      <ContextMenuPrimitive.Portal>
        <ContextMenuPrimitive.Overlay
          className="bg-black/50 backdrop-blur-sm"
          style={StyleSheet.absoluteFill}
        >
          <ContextMenuPrimitive.Content>
            <Animated.View entering={Entering} exiting={Exiting}>
              {children}
              {/* <ContextMenuPrimitive.Item>
              <Text>Back</Text>
            </ContextMenuPrimitive.Item>
            <ContextMenuPrimitive.Item>
              <Text>Forward</Text>
            </ContextMenuPrimitive.Item>
            <ContextMenuPrimitive.Item>
              <Text>Reload</Text>
            </ContextMenuPrimitive.Item>

            <ContextMenuPrimitive.Separator />
            <ContextMenuPrimitive.Item>
              <Text>Reload</Text>
            </ContextMenuPrimitive.Item> */}
            </Animated.View>
          </ContextMenuPrimitive.Content>
        </ContextMenuPrimitive.Overlay>
      </ContextMenuPrimitive.Portal>
    </ContextMenuPrimitive.Root>
  );
}
