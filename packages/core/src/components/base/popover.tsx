import * as PopoverPrimitive from '@rn-primitives/popover';
import { forwardRef } from 'react';
import { Modal, Platform, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TextClassContext } from '../../components/base/text';
import { cn } from '../../lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;
export type PopoverContentRef = PopoverPrimitive.ContentRef;

const PopoverPortal = Platform.select({
  web: (props: any) => <PopoverPrimitive.Portal {...props} />,
  native: (props: any) => <Modal {...props} />,
})!;
const PopoverContent = forwardRef<
  PopoverPrimitive.ContentRef,
  PopoverPrimitive.ContentProps & { portalHost?: string }
>(({ className, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => {
  const { open } = PopoverPrimitive.useRootContext();

  return (
    <PopoverPortal visible={open} transparent hostName={portalHost}>
      <PopoverPrimitive.Overlay style={Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined}>
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut}>
          <TextClassContext.Provider value="text-popover-foreground">
            <PopoverPrimitive.Content
              ref={ref}
              align={align}
              sideOffset={sideOffset}
              className={cn(
                'z-50 rounded-md cursor-auto border border-border bg-popover p-4 shadow-md shadow-foreground/5 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 animate-in zoom-in-95 fade-in-0',
                className
              )}
              {...props}
            />
          </TextClassContext.Provider>
        </Animated.View>
      </PopoverPrimitive.Overlay>
    </PopoverPortal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
