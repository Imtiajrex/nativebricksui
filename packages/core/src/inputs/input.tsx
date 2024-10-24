import { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { cn } from '../utils/cn';

export type InputProps = TextInputProps & {
  label?: string;
  description?: string;
  error?: string;
  valid?: boolean;
  validMessage?: string;
  info?: string;
  withAsterisk?: boolean;
};
export const Input = forwardRef<TextInput, InputProps>(function Input(props, ref) {
  return (
    <View className=" gap-1">
      {props.label && (
        <Text className="text-sm text-foreground font-medium">
          {props.label}
          {props.withAsterisk && <Text className="text-red-500">*</Text>}
        </Text>
      )}
      {props.description && (
        <Text className="text-sm text-muted-foreground">{props.description}</Text>
      )}
      <TextInput
        ref={ref}
        {...props}
        className={cn(
          'h-10 px-2 border border-border rounded-radius bg-card focus:outline-none focus:border-primary',
          props.error
            ? 'border-destructive placeholder:text-destructive-foreground'
            : 'text-muted-foreground',
          props.valid ? 'border-success' : '',
          props.className
        )}
      />
      {props.info && <Text className="text-xs text-muted-foreground">{props.info}</Text>}
      {props.error && <Text className="text-xs text-destructive">{props.error}</Text>}
      {props.validMessage && (
        <Text className="text-xs text-success font-medium">{props.validMessage}</Text>
      )}
    </View>
  );
});
