import { View } from 'react-native';
import { Label, Text } from '../../../base';
import { cn } from '../../../lib/utils';
export type InputDetailsProps = {
  label?: string;
  helperText?: string;
  description?: string;
  message?: string;
  error?: boolean;
  success?: boolean;
  asterisk?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  helperTextClassName?: string;
  messageClassName?: string;
};

export function InputDetails({
  description,
  error,
  helperText,
  label,
  message,
  success,
  children,
  asterisk,
  containerClassName,
  labelClassName,
  descriptionClassName,
  helperTextClassName,
  messageClassName,
}: InputDetailsProps & {
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <View className={cn('flex flex-col gap-1', containerClassName)}>
      <Label className={cn('flex-row', labelClassName, error && 'text-destructive')}>
        {label}
        {asterisk ? <Text className="text-base text-destructive leading-none">*</Text> : null}
      </Label>
      {description ? (
        <Text
          className={cn(
            'text-sm text-muted-foreground font-normal leading-none',
            descriptionClassName
          )}
        >
          {description}
        </Text>
      ) : null}
      {children}
      {helperText ? (
        <Text
          className={cn(
            'text-sm text-muted-foreground font-normal leading-none',
            helperTextClassName
          )}
        >
          {helperText}
        </Text>
      ) : null}
      {message ? (
        <Text
          className={cn(
            'text-sm text-muted-foreground font-normal leading-none',
            messageClassName,
            success && 'text-success',
            error && 'text-destructive'
          )}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}
