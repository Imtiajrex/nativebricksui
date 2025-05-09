import * as ToggleGroupPrimitive from '@rn-primitives/toggle-group';
import { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import { createContext, forwardRef, useContext } from 'react';
import { TextClassContext } from '../../components/base/text';
import { toggleTextVariants, toggleVariants } from '../../components/base/toggle';
import { cn } from '../../lib/utils';

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants> | null>(null);

const ToggleGroup = forwardRef<
  ToggleGroupPrimitive.RootRef,
  ToggleGroupPrimitive.RootProps & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn('flex flex-row items-center justify-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      'ToggleGroup compound components cannot be rendered outside the ToggleGroup component'
    );
  }
  return context;
}

const ToggleGroupItem = forwardRef<
  ToggleGroupPrimitive.ItemRef,
  ToggleGroupPrimitive.ItemProps & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useToggleGroupContext();
  const { value } = ToggleGroupPrimitive.useRootContext();

  return (
    <TextClassContext.Provider
      value={cn(
        toggleTextVariants({ variant, size }),
        ToggleGroupPrimitive.utils.getIsSelected(value, props.value)
          ? 'text-accent-foreground'
          : 'group-hover:text-muted-foreground'
      )}
    >
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          props.disabled && 'pointer-events-none opacity-50',
          ToggleGroupPrimitive.utils.getIsSelected(value, props.value) && 'bg-accent',
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    </TextClassContext.Provider>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

function ToggleGroupIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };
