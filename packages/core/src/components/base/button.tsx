import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, useMemo } from 'react';
import { Pressable } from './pressable';
import { Text, TextClassContext } from '../../components/base/text';
import { cn } from '../../lib/utils';
import { useExtractTextClasses } from '../../hooks/useExtractTextClasses';

const buttonVariants = cva(
  'group flex items-center justify-center rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all translate-y-0 active:translate-y-0.5 ',
  {
    variants: {
      variant: {
        default: 'bg-primary hover:opacity-90 active:opacity-90',
        destructive: 'bg-destructive hover:opacity-90 active:opacity-90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent',
        secondary: 'bg-secondary hover:opacity-80 active:opacity-80',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent',
        link: 'underline-offset-4 hover:underline focus:underline ',
      },
      size: {
        default: 'h-10 px-4 py-2 ',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8 ',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  'whitespace-nowrap text-sm font-medium text-foreground transition-colors',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-destructive-foreground',
        outline: 'group-active:text-accent-foreground',
        secondary: 'text-secondary-foreground group-active:text-secondary-foreground',
        ghost: 'group-active:text-accent-foreground',
        link: 'text-primary group-active:underline',
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  };

const Button = forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Pressable
        className={cn(
          props.disabled && 'opacity-50 pointer-events-none',
          buttonTextVariants({ variant, size }),
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
