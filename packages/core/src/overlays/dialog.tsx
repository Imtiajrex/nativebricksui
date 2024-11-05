import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Entering, Exiting } from '../animations/entering';
import { CloseButton } from '../buttons';
import { Paper } from '../layout';

export type DialogProps = {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export function Dialog({ trigger, children, open, onOpenChange }: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {trigger && <Pressable onPress={() => setIsOpen(true)}>{trigger}</Pressable>}

      <Modal visible={isOpen} transparent onRequestClose={() => setIsOpen(false)}>
        <Animated.View
          style={StyleSheet.absoluteFill}
          className="bg-black/50 backdrop-blur-sm items-center justify-center p-4"
          entering={FadeIn.springify().damping(0.2).duration(150)}
        >
          <Pressable
            onPress={() => setIsOpen(false)}
            style={StyleSheet.absoluteFill}
            className="-z-10"
          />
          <Paper
            entering={Entering}
            exiting={Exiting}
            className={'p-4 gap-1 max-w-lg w-full mx-auto'}
          >
            <Text className="text-lg font-medium">Dialog Title</Text>
            <Text className="text-sm text-muted-foreground">Dialog description.</Text>
            <CloseButton
              onPress={() => setIsOpen(false)}
              className="absolute top-4 right-4"
              size="lg"
              variant="subtle"
            />
          </Paper>
        </Animated.View>
      </Modal>
    </>
  );
}
