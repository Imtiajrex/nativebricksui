import { Controller } from 'react-hook-form';
import { Select, SelectProps } from '../Select';
import { FormControlProps, FormFields } from './types';

export const FormSelect = <T extends FormFields>(props: SelectProps & FormControlProps<T>) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <Select
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={fieldState.invalid}
          message={fieldState.error?.message}
        />
      )}
      name={props.name}
      control={props.control}
    />
  );
};
