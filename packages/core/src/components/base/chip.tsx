import * as Slot from '@rn-primitives/slot';
import type { SlottableViewProps } from '@rn-primitives/types';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';
import { cn } from '~/lib/utils';
import { TextClassContext } from '~/components/base/text';

const chipVariants = cva(
  'flex-row web:inline-flex items-center rounded-full border border-border px-2.5 py-0.5 web:transition-colors web:focus:outline-none web:focus:ring-2 web:focus:ring-ring web:focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary web:hover:opacity-80 active:opacity-80',
        secondary: 'border-transparent bg-secondary web:hover:opacity-80 active:opacity-80',
        destructive: 'border-transparent bg-destructive web:hover:opacity-80 active:opacity-80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const chipTextVariants = cva('text-xs font-semibold ', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type ChipProps = SlottableViewProps & VariantProps<typeof chipVariants>;

function Chip({ className, variant, asChild, ...props }: ChipProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={chipTextVariants({ variant })}>
      <Component className={cn(chipVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Chip, chipTextVariants, chipVariants };
export type { ChipProps };