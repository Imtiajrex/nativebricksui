'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { ActivityIndicatorProps, Text, View, ViewProps } from 'react-native';
import { cn } from '..';
import Animated, { AnimateProps } from 'react-native-reanimated';

const badgeVariants = cva(
  ' gap-2 items-center justify-center px-2 py-1 transition-all border border-transparent',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        destructive: 'bg-destructive text-destructive-foreground ',
        outline: 'border border-border bg-transparent  ',
        light: 'bg-light-primary text-light-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        card: 'bg-card text-card-foreground',
      },
      size: {
        xs: '',
        sm: '',
        lg: '',
        xl: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);
const textVariants = cva('text-sm font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      destructive: 'text-destructive-foreground',
      outline: 'text-foreground',
      light: 'text-light-primary-foreground',
      secondary: 'text-secondary-foreground',
      card: 'text-foreground',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

export interface BadgeProps extends AnimateProps<ViewProps>, VariantProps<typeof badgeVariants> {
  isLoading?: boolean;
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  activityIndicatorProps?: ActivityIndicatorProps;
  shadow?: boolean;
  rounded?: boolean;
  textClassName?: string;
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
      <Animated.View
        className={cn(
          'w-max flex-none self-start flex-row items-center rounded-full h-max',
          props.shadow && ' shadow-shadow',
          badgeVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {props.leftSection}
        <Text className={cn(textVariants({ variant, size }), props.textClassName)}>{children}</Text>
        {props.rightSection}
      </Animated.View>
    );
  }
);

export { Badge, badgeVariants };
