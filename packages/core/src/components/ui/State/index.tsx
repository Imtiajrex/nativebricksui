import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '../../../lib/utils';

export type StateProps = {
  icon?: ReactNode;
  title?: string;
  description?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};
export function State(props: StateProps) {
  return (
    <View
      className={cn(
        'bg-card border border-border rounded-xl p-2 items-center justify-center',
        props.containerClassName
      )}
    >
      {props.icon}
      <View className="gap-1 mt-2 items-center justify-center">
        <Text className={cn('text-sm font-medium text-center', props.titleClassName)}>
          {props.title}
        </Text>
        <Text
          className={cn('text-xs text-muted-foreground text-center', props.descriptionClassName)}
        >
          {props.description}
        </Text>
      </View>
    </View>
  );
}
