// Tremor Button [v0.2.0]

import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { PressableRef } from '@rn-primitives/types';
import { PressableProps } from 'react-native-gesture-handler';
import { Pressable } from '../base/pressable';
import { View } from '../base/view';
import { Icon } from '../lib/Icon';
import { cn, focusRing } from '../lib/utils';
const buttonVariants = tv({
  base: [
    // base
    'relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out',
    // disabled
    'disabled:pointer-events-none disabled:shadow-none',
    // focus
    focusRing,
  ],
  variants: {
    variant: {
      primary: [
        // border
        'border-transparent',
        // text color
        'text-brand-inverted',
        // background color
        'bg-brand',
        // hover color
        'hover:bg-brand-emphasis',
        // disabled
        'disabled:bg-brand-muted disabled:text-brand-content-subtle',
      ],
      secondary: [
        'shadow-none',
        // border
        'border-border',
        // text color
        'text-content',
        // background color
        'bg-card',
        //hover color
        'hover:bg-brand-faint',
        // disabled
        'disabled:text-content-subtle',
      ],
      light: [
        // base
        'shadow-none',
        // border
        'border-transparent',
        // text color
        'text-content',
        // background color
        'bg-brand-muted',
        // hover color
        'hover:bg-brand-subtle',
        // disabled
        'disabled:bg-brand-faint disabled:text-content-subtle',
      ],
      ghost: [
        // base
        'shadow-none',
        // border
        'border-transparent',
        // text color
        'text-content',
        // hover color
        'bg-transparent hover:bg-brand-faint',
        // disabled
        'disabled:text-content-subtle',
      ],
      destructive: [
        // text color
        'text-white',
        // border
        'border-transparent',
        // background color
        'bg-destructive',
        // hover color
        'hover:bg-red-700 dark:hover:bg-red-600',
        // disabled
        'disabled:bg-red-300 disabled:text-white',
        'disabled:dark:bg-red-950 disabled:dark:text-red-400',
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef<PressableRef, ButtonProps>(
  (
    {
      asChild,
      isLoading = false,
      loadingText,
      className,
      disabled,
      variant,
      children,
      ...props
    }: ButtonProps,
    forwardedRef
  ) => {
    const Component = asChild ? Slot : Pressable;
    return (
      <Component
        ref={forwardedRef}
        className={cn(buttonVariants({ variant }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <View className="pointer-events-none flex shrink-0 items-center justify-center gap-1.5">
            <Icon
              name="loader-2-fill"
              className="size-4 shrink-0 animate-spin"
              aria-hidden="true"
            />
            <View className="sr-only">{loadingText ? loadingText : 'Loading'}</View>
            {loadingText ? loadingText : children}
          </View>
        ) : (
          children
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
