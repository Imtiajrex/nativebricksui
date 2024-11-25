import { View } from 'react-native';
import { Label, Text } from '~/base';
import { cn } from '~/lib/utils';
export type InputDetailsProps = {
  label?: string;
  helperText?: string;
  description?: string;
  message?: string;
  error?: boolean;
  success?: boolean;
  asterisk?: boolean;
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
}: InputDetailsProps & {
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <View className={cn('flex flex-col gap-1')}>
      <Label className={cn('flex-row', error && 'text-destructive')}>
        {label}
        {asterisk ? <Text className="text-base text-destructive leading-none">*</Text> : null}
      </Label>
      {description ? (
        <Text className="text-sm text-muted-foreground font-normal leading-none">
          {description}
        </Text>
      ) : null}
      {children}
      {helperText ? (
        <Text className="text-sm text-muted-foreground font-normal leading-none">{helperText}</Text>
      ) : null}
      {message ? (
        <Text
          className={cn(
            'text-sm text-muted-foreground font-normal leading-none',
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
