import { IconCheck } from '@tabler/icons-react-native';
import { Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInUp, LinearTransition } from 'react-native-reanimated';
import { Paper } from '../layout';
import { cn } from '../utils/cn';
export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};
export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <Pressable
      className="flex-row items-center gap-1"
      onPress={() => onChange && onChange(!checked)}
    >
      <Paper
        className={cn(
          'w-6 h-6 items-center justify-center transition-all overflow-hidden',
          checked && 'bg-primary'
        )}
        layout={LinearTransition}
      >
        {checked && (
          <Animated.View
            entering={FadeInDown.springify(150)}
            exiting={FadeInUp.springify(150)}
            layout={LinearTransition}
          >
            <IconCheck className={'text-primary-foreground'} size={12} strokeWidth={3} />
          </Animated.View>
        )}
      </Paper>
      {label && (
        <Animated.Text className="text-sm text-foreground select-none">{label}</Animated.Text>
      )}
    </Pressable>
  );
}
