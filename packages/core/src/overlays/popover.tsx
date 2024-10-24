import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Easing, Modal, Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { OverlayContainer, useOverlayPosition } from 'react-native-aria';
import { cn, Paper, PaperProps } from '..';

import Animated, { AnimateProps, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
const positions = [
  'top',
  'left',
  'right',
  'bottom',
  'top left',
  'top right',
  'left top',
  'left bottom',
  'bottom right',
  'bottom left',
  'right top',
  'right bottom',
] as const;
export type PopoverProps = {
  children: React.ReactNode;
  placement?: (typeof positions)[number];
  containerClassname?: any;
} & (
  | {
      isOpen?: never;
      setIsOpen?: never;
    }
  | {
      isOpen: boolean;
      setIsOpen: (isOpen: boolean) => void;
    }
);
const PopoverContext = React.createContext<{
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  targetRef: React.MutableRefObject<View> | null;
  placement: (typeof positions)[number];
  close: () => void;
}>({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => {},
  targetRef: null,
  placement: 'bottom',
  close: () => {},
});
const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover compound components cannot be rendered outside the Popover component');
  }
  return context;
};

function Popover(props: PopoverProps) {
  const [isVisible, setIsVisible] = useState(props.isOpen || false);
  useEffect(() => {
    setIsVisible(props.isOpen || false);
  }, [props.isOpen]);
  const targetRef = useRef<View>(null);
  const close = useCallback(() => {
    setIsVisible(false);
    props.setIsOpen && props.setIsOpen(false);
  }, [props.setIsOpen]);
  return (
    <PopoverContext.Provider
      value={{ isVisible, setIsVisible, targetRef, placement: props.placement, close }}
    >
      {props.children}
    </PopoverContext.Provider>
  );
}
export type PopoverTargetProps = AnimateProps<PressableProps> & {};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PopoverTarget = (props: PopoverTargetProps) => {
  const { setIsVisible, isVisible, targetRef } = usePopoverContext();
  return (
    <AnimatedPressable
      onPress={() => setIsVisible(!isVisible)}
      className={cn('flex-none w-max ', props.className)}
      ref={targetRef}
      {...props}
    />
  );
};

export type PopoverDropdownProps = PaperProps & {};
const useTargetSize = (targetRef: React.MutableRefObject<View> | null) => {
  const [size, setSize] = useState({ width: 0, height: 0, x: 0, y: 0 });
  useEffect(() => {
    if (targetRef?.current) {
      targetRef.current.measure((x, y, width, height) => {
        setSize({ width, height, x, y });
      });
    }
  }, [targetRef]);
  return size;
};
const PopoverDropdown = ({ children, ...props }: PopoverDropdownProps) => {
  const { isVisible, targetRef, placement, close } = usePopoverContext();
  const overlayRef = useRef<View>(null);
  const position = useOverlayPosition({
    overlayRef,
    placement: placement,
    targetRef,
  });
  console.log(targetRef);
  const targetSize = useTargetSize(targetRef);
  if (!isVisible) return null;
  return (
    <OverlayContainer>
      {isVisible && (
        <>
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex: -1,
              },
            ]}
            onPress={close}
          />

          <Paper
            shadow
            rounded
            border
            style={{
              ...position.overlayProps.style,
              width: props.className.includes('w-') ? undefined : targetSize.width,
            }}
            ref={overlayRef}
            entering={FadeIn.duration(150).easing(Easing.bounce)}
            exiting={FadeOut.duration(250).easing(Easing.bounce)}
            layout={LinearTransition}
            {...props}
            className={cn('p-2.5 z-50', props.className)}
          >
            {children}
          </Paper>
        </>
      )}
    </OverlayContainer>
  );
};

Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
export { Popover };
