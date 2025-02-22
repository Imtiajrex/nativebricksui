import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '../../../lib/utils';
export type FormInputContainerProps = {
  label?: string;
  description?: string;
  helperText?: string;
  asterisk?: boolean;
  message?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  helperTextClassName?: string;
  messageClassName?: string;
  formInputContainerClassName?: string;
  asteriskClassName?: string;
};
export function FormInputContainer(
  props: FormInputContainerProps & {
    children: React.ReactNode;
  }
) {
  return (
    <View className={cn('flex flex-col gap-1', props.formInputContainerClassName)}>
      {props.label && (
        <Text className={cn('text-sm font-semibold text-foreground', props.labelClassName)}>
          {props.label}
          {props.asterisk && <Text className={cn('text-error', props.asteriskClassName)}>*</Text>}
        </Text>
      )}
      {props.description && (
        <Text className={cn('text-xs text-muted-foreground', props.descriptionClassName)}>
          {props.description}
        </Text>
      )}
      {props.children}
      {props.helperText && (
        <Text className={cn('text-xs text-muted-foreground', props.helperTextClassName)}>
          {props.helperText}
        </Text>
      )}
      {props.message && (
        <Text className={cn('text-xs text-muted-foreground', props.messageClassName)}>
          {props.message}
        </Text>
      )}
    </View>
  );
}
export const wrapFormInputContainer =
  <T extends any>(Component: React.FC<T>) =>
  (props: T & Omit<FormInputContainerProps, 'children'>) => {
    return (
      <FormInputContainer {...props}>
        <Component {...props} />
      </FormInputContainer>
    );
  };
