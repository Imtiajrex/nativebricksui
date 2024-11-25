import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { useCallback, useId } from 'react';

import { View } from 'react-native';
import { Checkbox as BaseCheckbox, Label } from '~/base';

export type CheckboxProps = CheckboxPrimitive.RootProps & {
  label?: string | React.ReactNode;
};
export function Checkbox(props: CheckboxProps) {
  const id = useId();
  const handlePress = useCallback(() => {
    if (props.onCheckedChange) {
      props.onCheckedChange(!props.checked);
    }
  }, [props.onCheckedChange]);
  return (
    <View className="flex-row items-center gap-2">
      <BaseCheckbox aria-labelledby={id} {...props} id={id} />
      {props.label &&
        (typeof props.label === 'string' ? (
          <Label nativeID={id} onPress={handlePress}>
            {props.label}
          </Label>
        ) : (
          props.label
        ))}
    </View>
  );
}
