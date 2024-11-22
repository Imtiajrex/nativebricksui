import { useId } from 'react';
import { TextInputProps } from 'react-native';
import { Input as BaseInput } from '~/base';
import { cn } from '~/lib/utils';
import { InputDetails, InputDetailsProps } from '../misc/InputDetails';
import { getInputBorderState } from '../misc/utils';

export type InputProps = TextInputProps & InputDetailsProps;
export function Input(props: InputProps) {
  const id = useId();
  return (
    <InputDetails {...props}>
      <BaseInput
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
        id={id}
        {...props}
        className={cn(props.className, getInputBorderState(props))}
      />
    </InputDetails>
  );
}
