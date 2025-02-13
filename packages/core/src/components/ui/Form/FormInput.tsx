import { Controller } from 'react-hook-form';
import { Input, InputProps, PasswordInput, PinInput, PinInputProps } from '../Input';
import { FormInputContainer, FormInputContainerProps } from './FormInputContainer';
import { FormControlProps, FormFields } from './types';
export type FormInputProps<T extends FormFields> = FormInputContainerProps &
  InputProps &
  FormControlProps<T>;
export const FormInput = <T extends FormFields>(props: FormInputProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <FormInputContainer {...props} message={fieldState.error?.message}>
            <Input {...props} value={field.value} onChangeText={field.onChange} />
          </FormInputContainer>
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return (
    <FormInputContainer {...props}>
      <Input {...props} />
    </FormInputContainer>
  );
};

export type FormPinInputProps<T extends FormFields> = FormInputContainerProps &
  PinInputProps &
  FormControlProps<T>;
export const FormPinInput = <T extends FormFields>(props: FormPinInputProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <FormInputContainer {...props} message={fieldState.error?.message}>
            <PinInput {...props} pin={field.value} onPinChange={field.onChange} />
          </FormInputContainer>
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return (
    <FormInputContainer {...props}>
      <PinInput {...props} />
    </FormInputContainer>
  );
};
export type FormPasswordInputProps<T extends FormFields> = FormInputContainerProps &
  InputProps &
  FormControlProps<T>;
export const FormPasswordInput = <T extends FormFields>(props: FormPasswordInputProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <FormInputContainer {...props} message={fieldState.error?.message}>
            <PasswordInput {...props} value={field.value} onChangeText={field.onChange} />
          </FormInputContainer>
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return (
    <FormInputContainer {...props}>
      <PasswordInput {...props} />
    </FormInputContainer>
  );
};
