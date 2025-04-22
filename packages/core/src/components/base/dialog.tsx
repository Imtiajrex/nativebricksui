import * as DialogPrimitive from '@rn-primitives/dialog';
import { forwardRef, useCallback } from 'react';
import { Modal, Platform, StyleSheet, View, type ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { X } from '../../lib/icons/X';
import { cn } from '../../lib/utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlayWeb = forwardRef<DialogPrimitive.OverlayRef, DialogPrimitive.OverlayProps>(
  ({ className, ...props }, ref) => {
    const { open } = DialogPrimitive.useRootContext();
    return (
      <DialogPrimitive.Overlay
        className={cn(
          'bg-black/25 flex justify-center items-center p-2 absolute top-0 right-0 bottom-0 left-0',
          open ? 'animate-in fade-in-0' : 'animate-out fade-out-0',
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);

DialogOverlayWeb.displayName = 'DialogOverlayWeb';

const DialogOverlayNative = forwardRef<DialogPrimitive.OverlayRef, DialogPrimitive.OverlayProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Overlay
        style={StyleSheet.absoluteFill}
        className={cn('flex bg-black/25 justify-center items-center p-2', className)}
        {...props}
        ref={ref}
      >
        <View>
          <>{children as any}</>
        </View>
      </DialogPrimitive.Overlay>
    );
  }
);

DialogOverlayNative.displayName = 'DialogOverlayNative';

const DialogOverlay = Platform.select({
  web: DialogOverlayWeb,
  default: DialogOverlayNative,
});

const DialogContent = forwardRef<
  DialogPrimitive.ContentRef,
  DialogPrimitive.ContentProps & {
    portalHost?: string;
    showCloseButton?: boolean;
    overlayClassName?: string;
  }
>(({ className, children, portalHost, showCloseButton = true, ...props }, ref) => {
  const { open, onOpenChange } = DialogPrimitive.useRootContext();
  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);
  return (
    <Modal visible={open} transparent onRequestClose={close}>
      <DialogOverlay className={cn('w-full h-full', props.overlayClassName)}>
        <View
          ref={ref}
          className={cn(
            'max-w-lg gap-4 border border-border cursor-default bg-background p-6 shadow-lg duration-200 rounded-lg',
            open ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out-95',
            className
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close
              className={
                'absolute right-4 top-4 p-0.5 group rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none'
              }
            >
              <X
                size={Platform.OS === 'web' ? 16 : 18}
                className={cn('text-muted-foreground', open && 'text-accent-foreground')}
              />
            </DialogPrimitive.Close>
          )}
        </View>
      </DialogOverlay>
    </Modal>
  );
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: ViewProps) => (
  <View className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: ViewProps) => (
  <View
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = forwardRef<DialogPrimitive.TitleRef, DialogPrimitive.TitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      className={cn('text-lg text-foreground font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  DialogPrimitive.DescriptionRef,
  DialogPrimitive.DescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
