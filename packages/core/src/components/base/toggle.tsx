import * as TogglePrimitive from '@rn-primitives/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react-native';
import { forwardRef, useContext } from 'react';
import { TextClassContext } from '../../components/base/text';
import { cn } from '../../lib/utils';

const toggleVariants = cva(
  'group inline-flex items-center justify-center rounded-md ring-offset-background transition-colors hover:bg-muted active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent active:bg-accent active:bg-accent',
      },
      size: {
        default: 'h-10 px-3 ',
        sm: 'h-9 px-2.5 ',
        lg: 'h-11 px-5 ',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const toggleTextVariants = cva('text-sm  text-foreground font-medium', {
  variants: {
    variant: {
      default: '',
      outline: 'group-hover:text-accent-foreground group-active:text-accent-foreground',
    },
    size: {
      default: '',
      sm: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

const Toggle = forwardRef<
  TogglePrimitive.RootRef,
  TogglePrimitive.RootProps & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TextClassContext.Provider
    value={cn(
      toggleTextVariants({ variant, size }),
      props.pressed ? 'text-accent-foreground' : 'group-hover:text-muted-foreground',
      className
    )}
  >
    <TogglePrimitive.Root
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        props.disabled && 'pointer-events-none opacity-50',
        props.pressed && 'bg-accent',
        className
      )}
      {...props}
    />
  </TextClassContext.Provider>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

function ToggleIcon({
  className,
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<LucideIcon> & {
  icon: LucideIcon;
}) {
  const textClass = useContext(TextClassContext);
  return <Icon className={cn(textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleTextVariants, toggleVariants };
