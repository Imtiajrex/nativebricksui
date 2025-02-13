import * as AccordionPrimitive from '@rn-primitives/accordion';
import { ReactNode, forwardRef } from 'react';
import { Platform, Pressable, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from '../../lib/icons/ChevronDown';
import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const Accordion = forwardRef<AccordionPrimitive.RootRef, AccordionPrimitive.RootProps>(
  ({ children, ...props }, ref) => {
    return (
      <LayoutAnimationConfig skipEntering>
        <AccordionPrimitive.Root ref={ref} {...props} asChild={Platform.OS !== 'web'}>
          <Animated.View layout={LinearTransition.duration(200)}>{children}</Animated.View>
        </AccordionPrimitive.Root>
      </LayoutAnimationConfig>
    );
  }
);

Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = forwardRef<AccordionPrimitive.ItemRef, AccordionPrimitive.ItemProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <Animated.View className={'overflow-hidden'} layout={LinearTransition.duration(200)}>
        <AccordionPrimitive.Item
          ref={ref}
          className={cn('border-b border-border', className)}
          value={value}
          {...props}
        />
      </Animated.View>
    );
  }
);
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const Trigger = Platform.OS === 'web' ? View : Pressable;

const AccordionTrigger = forwardRef<AccordionPrimitive.TriggerRef, AccordionPrimitive.TriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isExpanded } = AccordionPrimitive.useItemContext();

    const progress = useDerivedValue(() =>
      isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 200 })
    );
    const chevronStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${progress.value * 180}deg` }],
      opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
    }));

    return (
      <TextClassContext.Provider value=" font-medium group-hover:underline">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger ref={ref} {...props} asChild>
            <Trigger
              className={cn(
                'flex flex-row flex-1 items-center justify-between py-4 transition-all group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-muted-foreground',
                className
              )}
            >
              <>{children as any}</>
              <Animated.View style={chevronStyle}>
                <ChevronDown size={18} className={'text-foreground shrink-0'} />
              </Animated.View>
            </Trigger>
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
      </TextClassContext.Provider>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = forwardRef<AccordionPrimitive.ContentRef, AccordionPrimitive.ContentProps>(
  ({ className, children, ...props }, ref) => {
    const { isExpanded } = AccordionPrimitive.useItemContext();
    return (
      <TextClassContext.Provider value="">
        <AccordionPrimitive.Content
          className={cn(
            'overflow-hidden text-sm transition-all',
            isExpanded ? 'animate-accordion-down' : 'animate-accordion-up'
          )}
          ref={ref}
          {...props}
        >
          <InnerContent className={cn('pb-4', className)}>{children}</InnerContent>
        </AccordionPrimitive.Content>
      </TextClassContext.Provider>
    );
  }
);

function InnerContent({ children, className }: { children: ReactNode; className?: string }) {
  if (Platform.OS === 'web') {
    return <View className={cn('pb-4', className)}>{children}</View>;
  }
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutUp.duration(200)}
      className={cn('pb-4', className)}
    >
      {children}
    </Animated.View>
  );
}

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
