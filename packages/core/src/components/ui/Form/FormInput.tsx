import { Controller } from 'react-hook-form';
import { Input, InputProps } from '../Input';
import { FormControlProps, FormFields } from './types';

export const FormInput = <T extends FormFields>(props: InputProps & FormControlProps<T>) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <Input {...props} value={field.value} onChangeText={field.onChange} />
      )}
      name={props.name!}
      control={props.control}
    />
  );
};
