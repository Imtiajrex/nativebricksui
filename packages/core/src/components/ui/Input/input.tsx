import { useId, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { Input as BaseInput } from '../../../base';
import { cn } from '../../../lib/utils';
import { InputContainer, InputContainerProps, useFocus } from '../misc/InputContainer';

export type InputProps = TextInputProps & InputContainerProps;
export function Input(props: InputProps) {
  const inputRef = useRef<BaseInput>(null);

  const { isFocused, onBlur, onFocus, focus, blur } = useFocus(inputRef);
  const id = useId();
  return (
    <InputContainer
      {...props}
      state={isFocused ? 'focused' : props.state}
      focus={focus}
      blur={blur}
    >
      <BaseInput
        aria-labelledby="inputLabel"
        aria-errormessage="inputError"
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        {...props}
        placeholderClassName={cn('text-muted-foreground', props.placeholderClassName)}
        className={cn(
          'flex-1 text-foreground placeholder-muted-foreground bg-transparent',
          props.leading && 'pl-1',
          props.trailing && 'pr-1',
          props.className
        )}
      />
    </InputContainer>
  );
}
