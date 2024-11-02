import { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { cn, cva } from '../utils/cn';
import { VariantProps } from 'tailwind-variants';

const switchWrapperVariants = cva(
  'flex-row transition-all items-center gap-1 bg-card p-0.5 rounded-full border border-border',
  {
    variants: {
      size: {
        xs: 'w-8',
        sm: 'w-9',
        md: 'w-12',
        lg: 'w-14',
        xl: 'w-16',
      },
    },
  }
);
const switchIndicatorVariants = cva('transition-all rounded-full', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-7 h-7',
    },
  },
});
export type SwitchProps = VariantProps<typeof switchWrapperVariants> & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};
export function Switch({ checked, onChange, label, size }: SwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);
  return (
    <Pressable
      className="flex-row items-center gap-1"
      onPress={() => {
        onChange && onChange(!isChecked);
        setIsChecked(!isChecked);
      }}
    >
      <SwitchButton checked={isChecked} size={size} />
      {label && (
        <Animated.Text className="text-sm text-foreground select-none">{label}</Animated.Text>
      )}
    </Pressable>
  );
}

const SwitchButton = ({ checked, size }: SwitchProps) => {
  return (
    <Animated.View
      className={cn(
        switchWrapperVariants({ size }),
        checked ? 'bg-primary justify-end' : 'bg-card justify-start'
      )}
    >
      <Animated.View
        className={cn(
          switchIndicatorVariants({ size }),
          checked ? 'bg-primary-foreground' : 'bg-foreground'
        )}
        layout={LinearTransition.springify().duration(180)}
      />
    </Animated.View>
  );
};
