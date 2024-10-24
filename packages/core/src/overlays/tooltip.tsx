import React, { useRef, useState } from 'react';
import { Easing, Pressable, Text, View } from 'react-native';
import { OverlayContainer, OverlayProvider, useOverlayPosition } from 'react-native-aria';
import { cn, Paper } from '..';

import { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
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
export type TooltipProps = {
  children: React.ReactNode;
  label?: string;
  placement: (typeof positions)[number];
  containerClassname?: any;
};
export function Tooltip(props: TooltipProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const targetRef = useRef<View>(null);
  return (
    <>
      <TooltipLabel
        isVisible={isTooltipVisible}
        label={props.label}
        placement={props.placement}
        targetRef={targetRef}
      />
      <Pressable
        ref={targetRef}
        onHoverIn={() => setIsTooltipVisible(true)}
        onHoverOut={() => setIsTooltipVisible(false)}
        className={cn('flex-none w-max ', props.containerClassname)} // this is a hack to make sure the tooltip is positioned correctly
      >
        {props.children}
      </Pressable>
    </>
  );
}

//on hover show tooltip
const TooltipLabel = ({
  isVisible,
  label,
  targetRef,
  placement,
}: {
  isVisible: boolean;
  label?: string;
  placement: (typeof positions)[number];
  targetRef?: React.MutableRefObject<View>;
}) => {
  const overlayRef = useRef<View>(null);
  const position = useOverlayPosition({
    overlayRef,
    placement: placement,
    targetRef,
  });
  if (!isVisible) return null;
  return (
    <OverlayContainer>
      <Paper
        shadow
        rounded
        border
        style={{
          ...position.overlayProps.style,
        }}
        className="p-2.5"
        ref={overlayRef}
        entering={FadeIn.duration(150).easing(Easing.bounce)}
        exiting={FadeOut.duration(250).easing(Easing.bounce)}
        layout={LinearTransition}
      >
        <Text className="text-sm font-medium">{label}</Text>
      </Paper>
    </OverlayContainer>
  );
};
