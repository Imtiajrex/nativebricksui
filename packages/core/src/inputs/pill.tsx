import * as React from 'react';
import { View } from 'react-native';
import { Badge, BadgeProps, CloseButton } from '..';

export interface PillProps extends BadgeProps {
  withRemoveButton?: boolean;
  onRemove?: () => void;
}

const Pill = React.forwardRef<View, PillProps>((props, ref) => {
  return (
    <Badge
      {...props}
      ref={ref}
      rightSection={
        props.withRemoveButton ? <CloseButton size={props.size} onPress={props.onRemove} /> : null
      }
    />
  );
});

export { Pill };
