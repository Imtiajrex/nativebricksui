import { Controller } from 'react-hook-form';
import { Input, InputProps, PasswordInput, PinInput, PinInputProps } from '../Input';
import { FormControlProps, FormFields } from './types';

export const FormInput = <T extends FormFields>(props: InputProps & FormControlProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <Input {...props} value={field.value} onChangeText={field.onChange} />
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return <Input {...props} />;
};

export const FormPinInput = <T extends FormFields>(props: PinInputProps & FormControlProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <PinInput {...props} pin={field.value} onPinChange={field.onChange} />
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return <PinInput {...props} />;
};

export const FormPasswordInput = <T extends FormFields>(
  props: InputProps & FormControlProps<T>
) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <PasswordInput {...props} value={field.value} onChangeText={field.onChange} />
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return <PasswordInput {...props} />;
};
