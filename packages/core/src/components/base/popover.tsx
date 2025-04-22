import { forwardRef } from 'react';
import { Modal, Platform } from 'react-native';
import { TextClassContext } from '../../components/base/text';
import { cn } from '../../lib/utils';
import * as PopoverPrimitive from '../primitives/popover';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;
export type PopoverContentRef = PopoverPrimitive.ContentRef;

const PopoverPortal = Platform.select({
  web: (props: any) => <Modal {...props} />,
  native: (props: any) => <Modal {...props} />,
})!;
const PopoverContent = forwardRef<
  PopoverPrimitive.ContentRef,
  PopoverPrimitive.ContentProps & { portalHost?: string }
>(({ className, align = 'center', sideOffset = 4, portalHost, ...props }, ref) => {
  const { open, onOpenChange } = PopoverPrimitive.useRootContext();

  return (
    <PopoverPortal visible={open} transparent hostName={portalHost}>
      <PopoverPrimitive.Overlay
        className="flex-1"
        onPress={() => {
          onOpenChange(false);
        }}
      >
        <TextClassContext.Provider value="text-popover-foreground">
          <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            className={cn(
              'z-50 rounded-md cursor-auto border border-border bg-popover p-4 shadow-md shadow-foreground/5 outline-none  zoom-in-95 fade-in-0',
              className
            )}
            {...props}
          />
        </TextClassContext.Provider>
      </PopoverPrimitive.Overlay>
    </PopoverPortal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
