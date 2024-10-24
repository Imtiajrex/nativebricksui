'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  Pressable,
  PressableProps,
  View,
} from 'react-native';
import { cn } from '..';

const buttonVariants = cva(
  'inline-flex gap-2 items-center justify-center whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 translate-y-0 active:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground  hover:bg-destructive/90',
        outline: 'border border-border bg-transparent',
        light: 'bg-light-primary text-light-primary-foreground  hover:bg-light/90',
        secondary: 'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
        ghost: '',
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

export interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  children?: React.ReactNode;
  rightSection?: React.ReactNode;
  leftSection?: React.ReactNode;
  activityIndicatorProps?: ActivityIndicatorProps;
  shadow?: boolean;
  rounded?: boolean;
}

const Button = React.forwardRef<View, ButtonProps>(
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
      <Pressable
        className={cn(
          rounded && 'rounded-radius',
          props.shadow && ' shadow-shadow',
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" {...activityIndicatorProps} />
        ) : (
          <>
            {props.leftSection}
            {children}
            {props.rightSection}
          </>
        )}
      </Pressable>
    );
  }
);

export { Button, buttonVariants };
