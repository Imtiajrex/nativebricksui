import { IconCheck } from '@tabler/icons-react-native';
import { Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInUp, LinearTransition } from 'react-native-reanimated';
import { cn, cva } from '../utils/cn';
import { VariantProps } from 'tailwind-variants';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const chipWrapperVariants = cva(
  'flex-row items-center justify-center gap-1 h-max origin-top-left rounded-full w-max flex-none overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-card',
        light: 'bg-card',
        outline: 'border border-border bg-transparent',
        destructive: 'bg-card',
      },
      size: {
        xs: 'px-[12px] py-1',
        sm: 'px-[16px] py-1',
        default: 'px-[20px] py-1',
        lg: 'px-[24px] py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
const wrapperCheckedVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-primary',
      light: 'bg-light-primary',
      outline: 'border-primary',
      destructive: 'bg-destructive',
    },
    size: {
      xs: 'px-[2px]',
      sm: 'px-[6px]',
      default: 'px-[10px] ',
      lg: 'px-[14px]',
    },
  },
});
const textVariants = cva('text-foreground select-none', {
  variants: {
    size: {
      xs: 'text-xs ',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
    },
  },
});
const textCheckedVariants = cva('', {
  variants: {
    variant: {
      default: 'text-primary-foreground',
      light: 'text-light-primary-foreground',
      outline: 'text-foreground',
      destructive: 'text-destructive-foreground',
    },
  },
});
export type ChipProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  wrapperClassname?: string;
  wrapperActiveClassname?: string;
  textActiveClassname?: string;
  icon?: React.ReactNode;
} & VariantProps<typeof chipWrapperVariants>;

export function Chip({
  checked,
  onChange,
  label,
  wrapperActiveClassname,
  wrapperClassname,
  icon,
  size = 'default',
  variant = 'default',
}: ChipProps) {
  return (
    <AnimatedPressable
      className={cn(
        chipWrapperVariants({ variant, size, className: wrapperClassname }),
        checked &&
          wrapperCheckedVariants({
            variant,
            size,
            className: wrapperActiveClassname,
          })
      )}
      layout={LinearTransition.springify(150)}
      onPress={() => onChange && onChange(!checked)}
    >
      {checked && (
        <Animated.View
          entering={FadeInDown.springify(75)}
          layout={LinearTransition.springify(75)}
          key={'checked'}
          className={'w-4 h-4 items-center justify-center'}
        >
          {icon || (
            <IconCheck
              size={16}
              className={cn(
                textVariants({
                  size,
                }),
                textCheckedVariants({
                  variant,
                  className: wrapperActiveClassname,
                }),
                checked && variant === 'outline' && 'text-primary'
              )}
              strokeWidth={4}
            />
          )}
        </Animated.View>
      )}
      <Animated.Text
        className={cn(
          textVariants({
            size,
          }),
          checked &&
            textCheckedVariants({
              variant,
            })
        )}
        selectable={false}
        layout={LinearTransition.springify(75)}
      >
        {label}
      </Animated.Text>
    </AnimatedPressable>
  );
}
