import * as NavigationMenuPrimitive from '@rn-primitives/navigation-menu';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { cn } from '../../lib/utils';

const NavigationMenu = forwardRef<
  NavigationMenuPrimitive.RootRef,
  NavigationMenuPrimitive.RootProps
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex flex-row max-w-max items-center justify-center', className)}
    {...props}
  >
    {children}
    {Platform.OS === 'web' && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = forwardRef<
  NavigationMenuPrimitive.ListRef,
  NavigationMenuPrimitive.ListProps
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 flex-row list-none items-center justify-center gap-1',
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'group inline-flex flex-row h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent active:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
);

const NavigationMenuTrigger = forwardRef<
  NavigationMenuPrimitive.TriggerRef,
  NavigationMenuPrimitive.TriggerProps
>(({ className, children, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    value === itemValue ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle(),
        'group gap-1.5',
        value === itemValue && 'bg-accent',
        className
      )}
      {...props}
    >
      <>{children as any}</>
      <Animated.View style={chevronStyle}>
        <ChevronDown
          size={12}
          className={cn('relative text-foreground h-3 w-3 transition duration-200')}
        />
      </Animated.View>
    </NavigationMenuPrimitive.Trigger>
  );
});
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = forwardRef<
  NavigationMenuPrimitive.ContentRef,
  NavigationMenuPrimitive.ContentProps & {
    portalHost?: string;
  }
>(({ className, children, portalHost, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();
  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
          'w-full border border-border rounded-lg shadow-lg bg-popover text-popover-foreground overflow-hidden',
          value === itemValue
            ? 'animate-in fade-in slide-in-from-right-20'
            : 'animate-out fade-out slide-out-to-left-20',
          className
        )}
        {...props}
      >
        <Animated.View
          entering={Platform.OS !== 'web' ? FadeInLeft : undefined}
          exiting={Platform.OS !== 'web' ? FadeOutLeft : undefined}
        >
          {children}
        </Animated.View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
});
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = forwardRef<
  NavigationMenuPrimitive.ViewportRef,
  NavigationMenuPrimitive.ViewportProps
>(({ className, ...props }, ref) => {
  return (
    <View className={cn('absolute left-0 top-full flex justify-center')}>
      <View
        className={cn(
          'origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg animate-in zoom-in-90',
          className
        )}
        ref={ref}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
});
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = forwardRef<
  NavigationMenuPrimitive.IndicatorRef,
  NavigationMenuPrimitive.IndicatorProps
>(({ className, ...props }, ref) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        value === itemValue ? 'animate-in fade-in' : 'animate-out fade-out',
        className
      )}
      {...props}
    >
      <View className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md shadow-foreground/5" />
    </NavigationMenuPrimitive.Indicator>
  );
});
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
