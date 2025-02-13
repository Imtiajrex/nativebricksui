import * as DropdownMenuPrimitive from '@rn-primitives/dropdown-menu';
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

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = forwardRef<
  DropdownMenuPrimitive.SubTriggerRef,
  DropdownMenuPrimitive.SubTriggerProps & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  const { open } = DropdownMenuPrimitive.useSubContext();
  const Icon = Platform.OS === 'web' ? ChevronRight : open ? ChevronUp : ChevronDown;
  return (
    <TextClassContext.Provider
      value={cn('select-none text-sm text-primary', open && 'text-accent-foreground')}
    >
      <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
          'flex flex-row cursor-default select-none gap-2 items-center focus:bg-accent hover:bg-accent active:bg-accent rounded-sm px-2 py-1.5 outline-none',
          open && 'bg-accent',
          inset && 'pl-8',
          className
        )}
        {...props}
      >
        <>{children as any}</>
        <Icon size={18} className="ml-auto text-foreground" />
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
});
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = forwardRef<
  DropdownMenuPrimitive.SubContentRef,
  DropdownMenuPrimitive.SubContentProps
>(({ className, ...props }, ref) => {
  const { open } = DropdownMenuPrimitive.useSubContext();
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border mt-1 bg-popover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        open ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out ',
        className
      )}
      {...props}
    />
  );
});
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = forwardRef<
  DropdownMenuPrimitive.ContentRef,
  DropdownMenuPrimitive.ContentProps & {
    overlayStyle?: StyleProp<ViewStyle>;
    overlayClassName?: string;
    portalHost?: string;
  }
>(({ className, overlayClassName, overlayStyle, portalHost, ...props }, ref) => {
  const { open } = DropdownMenuPrimitive.useRootContext();
  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay
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
        <DropdownMenuPrimitive.Content
          ref={ref}
          className={cn(
            'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            open ? 'animate-in fade-in-0 zoom-in-95' : 'animate-out fade-out-0 zoom-out-95',
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = forwardRef<
  DropdownMenuPrimitive.ItemRef,
  DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <TextClassContext.Provider value="select-none text-sm text-popover-foreground group-focus:text-accent-foreground">
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex flex-row cursor-default gap-2 items-center rounded-sm px-2 py-1.5 outline-none focus:bg-accent active:bg-accent hover:bg-accent group',
        inset && 'pl-8',
        props.disabled && 'opacity-50 pointer-events-none',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = forwardRef<
  DropdownMenuPrimitive.CheckboxItemRef,
  DropdownMenuPrimitive.CheckboxItemProps
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex flex-row cursor-default items-center group rounded-sm py-1.5 pl-8 pr-2 outline-none focus:bg-accent active:bg-accent',
      props.disabled && 'pointer-events-none opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check size={14} strokeWidth={3} className="text-foreground" />
      </DropdownMenuPrimitive.ItemIndicator>
    </View>
    <>{children as any}</>
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = forwardRef<
  DropdownMenuPrimitive.RadioItemRef,
  DropdownMenuPrimitive.RadioItemProps
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'relative flex flex-row cursor-default group items-center rounded-sm py-1.5 pl-8 pr-2 outline-none focus:bg-accent active:bg-accent',
      props.disabled && 'pointer-events-none opacity-50',
      className
    )}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <View className="bg-foreground h-2 w-2 rounded-full" />
      </DropdownMenuPrimitive.ItemIndicator>
    </View>
    <>{children as any}</>
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = forwardRef<
  DropdownMenuPrimitive.LabelRef,
  DropdownMenuPrimitive.LabelProps & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-foreground cursor-default',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = forwardRef<
  DropdownMenuPrimitive.SeparatorRef,
  DropdownMenuPrimitive.SeparatorProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
