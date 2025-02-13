import { Pressable } from '../../base/pressable';
import { Icon } from '../../lib/Icon';
import { cn } from '../../lib/utils';
import { OptionType } from './types';

export type OptionProps = OptionType & {
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
};
export function Option(props: OptionProps) {
  return (
    <Pressable
      onPress={props.onSelect}
      className={cn(
        'p-3 flex-row items-center justify-between transition-colors rounded-xl w-full',
        props.isSelected ? 'bg-background' : 'hover:bg-background',
        props.disabled && 'opacity-50'
      )}
    >
      {props.label}
      <Icon
        name="check-line"
        className={cn(
          'fill-content transition-opacity',
          props.isSelected ? 'opacity-100' : 'opacity-0'
        )}
      />
    </Pressable>
  );
}
