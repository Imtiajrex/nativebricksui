'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicatorProps, ViewProps, View } from 'react-native';
import { cn } from '..';

const badgeVariants = cva(
  ' gap-2 items-center justify-center  transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground  hover:bg-destructive/90',
        outline: 'border border-input bg-background  hover:bg-accent hover:text-accent-foreground',
        light: 'bg-light-primary text-light-primary-foreground  hover:bg-light/90',
        secondary: 'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps extends ViewProps, VariantProps<typeof badgeVariants> {
  isLoading?: boolean;
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  activityIndicatorProps?: ActivityIndicatorProps;
  shadow?: boolean;
  rounded?: boolean;
}

const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      children,
      activityIndicatorProps,
      rounded = true,
      ...props
    },
    ref
  ) => {
    return (
      <View
        className={cn(
          rounded && 'rounded-radius',
          props.shadow && ' shadow-shadow',
          badgeVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
        {props.rightSection}
      </View>
    );
  }
);

export { Badge, badgeVariants };
