import { Controller } from 'react-hook-form';
import { Select } from '../Select';
import { SelectProps } from '../Select/types';
import { FormControlProps, FormFields } from './types';
import { MultiSelect, MultiSelectProps } from '../MultiSelect';

export const FormSelect = <T extends FormFields>(props: SelectProps<any> & FormControlProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <Select {...props} value={field.value} onChange={field.onChange} />
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return <Select {...props} />;
};

export const FormMultiSelect = <T extends FormFields>(
  props: MultiSelectProps<any> & FormControlProps<T>
) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <MultiSelect {...props} value={field.value} onChange={field.onChange} />
        )}
        name={props.name!}
        control={props.control}
      />
    );
  }
  if (props.control && !props.name) {
    throw new Error('name is required when control is provided');
  }

  return <MultiSelect {...props} />;
};
