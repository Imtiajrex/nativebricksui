import { useId } from 'react';
import { Label, Text } from '~/base';
import { cn } from '~/lib/utils';
import { InputDetailsProps } from '../Input/types';

export default function InputDetails({
  description,
  error,
  helperText,
  label,
  message,
  success,
  children,
  id: propsId,
  asterisk,
}: InputDetailsProps & {
  children?: React.ReactNode;
  id?: string;
}) {
  const id = useId();
  return (
    <Label
      nativeID={propsId || id}
      htmlFor={propsId || id}
      className={cn('flex flex-col gap-1', error && 'text-destructive')}
    >
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
    </Label>
  );
}