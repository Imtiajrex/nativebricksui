import { IconX } from '@tabler/icons-react-native';
import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { cn } from '..';

const buttonVariants = cva(
  'items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 translate-y-0 active:translate-y-0.5 bg-transparent translate-y-0 active:translate-y-0.5',
  {
    variants: {
      variant: {
        subtle: 'hover:bg-black/10 dark:hover:bg-white/10  ',
        transparent: '',
      },
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        lg: 'h-6 h-6',
        xl: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'transparent',
      size: 'sm',
    },
  }
);

const iconSize = {
  xs: 10,

  sm: 14,

  lg: 18,
  xl: 22,
};
interface CloseButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  rounded?: boolean;
  icon?: React.ReactNode;
}

const CloseButton = forwardRef<View, CloseButtonProps>(
  ({ className, variant, size, isLoading, rounded = true, icon, ...props }, ref) => {
    return (
      <Pressable
        className={cn(rounded && 'rounded-radius', buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {icon ? icon : <IconX size={iconSize[size] || iconSize.sm} />}
      </Pressable>
    );
  }
);

export { CloseButton, CloseButtonProps };
