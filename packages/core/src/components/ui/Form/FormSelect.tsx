import { Controller } from 'react-hook-form';
import { Select } from '../Select';
import { SelectProps } from '../Select/types';
import { FormControlProps, FormFields } from './types';

export const FormSelect = <T extends FormFields>(props: SelectProps<any> & FormControlProps<T>) => {
  return (
    <Controller
      render={({ field, fieldState }) => (
        <Select {...props} value={field.value} onChange={field.onChange} />
      )}
      name={props.name!}
      control={props.control}
    />
  );
};
