import * as ContextMenuPrimitive from '@rn-primitives/context-menu';
import { forwardRef } from 'react';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewStyle,
} from 'react-native';
import { TextClassContext } from '../../components/base/text';
import { Check } from '../../lib/icons/Check';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { ChevronRight } from '../../lib/icons/ChevronRight';
import { ChevronUp } from '../../lib/icons/ChevronUp';
import { cn } from '../../lib/utils';

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = forwardRef<
  ContextMenuPrimitive.SubTriggerRef,
  ContextMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const { open } = ContextMenuPrimitive.useSubContext();
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider value={cn('select-none text-sm text-primary', open && '')}>
      <ContextMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
          'flex flex-row cursor-default select-none items-center gap-2 focus:bg-accent active:bg-accent hover:bg-accent rounded-sm px-2 py-1.5 outline-none',
          open && 'bg-accent',
          inset && 'pl-8',
          className
        )}
        {...props}
      >
        <>{children as any}</>
        <Icon size={18} className="ml-auto text-foreground" />
      </ContextMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = forwardRef<
  ContextMenuPrimitive.SubContentRef,
  ContextMenuPrimitive.SubContentProps
>(({ className, ...props }, ref) => {
  const { open } = ContextMenuPrimitive.useSubContext();
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border mt-1 border-border bg-popover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        open ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out ',
        className
      )}
      {...props}
    />
  );
});
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = forwardRef<
  ContextMenuPrimitive.ContentRef,
  ContextMenuPrimitive.ContentProps & {
    overlayStyle?: StyleProp<ViewStyle>;
    overlayClassName?: string;
    portalHost?: string;
  }
>(({ className, overlayClassName, overlayStyle, portalHost, ...props }, ref) => {
  const { open } = ContextMenuPrimitive.useRootContext();
  return (
    <ContextMenuPrimitive.Portal hostName={portalHost}>
      <ContextMenuPrimitive.Overlay
        style={
          overlayStyle
            ? StyleSheet.flatten([
                Platform.OS !== 'web' ? StyleSheet.absoluteFill : undefined,
                overlayStyle,
              ] as unknown as ViewStyle)
            : Platform.OS !== 'web'
            ? StyleSheet.absoluteFill
            : undefined
        }
        className={overlayClassName}
      >
        <ContextMenuPrimitive.Content
          ref={ref}
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            open ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out-95',
            className
          )}
          {...props}
        />
      </ContextMenuPrimitive.Overlay>
    </ContextMenuPrimitive.Portal>
  );
});
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = forwardRef<
  ContextMenuPrimitive.ItemRef,
  ContextMenuPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <TextClassContext.Provider value="select-none text-sm text-popover-foreground group-focus:text-accent-foreground">
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex flex-row cursor-default items-center gap-2 rounded-sm px-2 py-1.5 outline-none focus:bg-accent active:bg-accent hover:bg-accent group',
        inset && 'pl-8',
        props.disabled && 'opacity-50 pointer-events-none',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = forwardRef<
  ContextMenuPrimitive.CheckboxItemRef,
  ContextMenuPrimitive.CheckboxItemProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex flex-row cursor-default items-center group rounded-sm py-1.5 pl-8 pr-2 outline-none focus:bg-accent active:bg-accent',
      props.disabled && 'pointer-events-none opacity-50',
      className
    )}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check size={14} strokeWidth={3} className="text-foreground" />
      </ContextMenuPrimitive.ItemIndicator>
    </View>
    <>{children as any}</>
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = forwardRef<
  ContextMenuPrimitive.RadioItemRef,
  ContextMenuPrimitive.RadioItemProps
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex flex-row cursor-default group items-center rounded-sm py-1.5 pl-8 pr-2 outline-none focus:bg-accent active:bg-accent',
      props.disabled && 'pointer-events-none opacity-50',
      className
    )}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <View className="bg-foreground h-2 w-2 rounded-full" />
      </ContextMenuPrimitive.ItemIndicator>
    </View>
    <>{children as any}</>
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = forwardRef<
  ContextMenuPrimitive.LabelRef,
  ContextMenuPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-foreground cursor-default',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = forwardRef<
  ContextMenuPrimitive.SeparatorRef,
  ContextMenuPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = 'ContextMenuShortcut';

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
