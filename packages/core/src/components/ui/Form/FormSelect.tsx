import { Controller } from 'react-hook-form';
import { Select } from '../Select';
import { SelectProps } from '../Select/types';
import { FormControlProps, FormFields } from './types';
import { MultiSelect, MultiSelectProps } from '../MultiSelect';
import { FormInputContainer, FormInputContainerProps } from './FormInputContainer';
export type FormSelectProps<T extends FormFields> = FormInputContainerProps &
  SelectProps<any> &
  FormControlProps<T>;
export const FormSelect = <T extends FormFields>(props: FormSelectProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <FormInputContainer
            state={!fieldState.error?.message ? 'default' : 'invalid'}
            {...props}
            message={fieldState.error?.message}
          >
            <Select
              state={!fieldState.error?.message ? 'default' : 'invalid'}
              {...props}
              value={field.value}
              onChange={field.onChange}
            />
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
      <Select {...props} />
    </FormInputContainer>
  );
};
export type FormMultiSelectProps<T extends FormFields> = FormInputContainerProps &
  MultiSelectProps<any> &
  FormControlProps<T>;

export const FormMultiSelect = <T extends FormFields>(props: FormMultiSelectProps<T>) => {
  if (props.control && props.name) {
    return (
      <Controller
        render={({ field, fieldState }) => (
          <FormInputContainer
            state={!fieldState.error?.message ? 'default' : 'invalid'}
            {...props}
            message={fieldState.error?.message}
          >
            <MultiSelect
              state={!fieldState.error?.message ? 'default' : 'invalid'}
              {...props}
              value={field.value}
              onChange={field.onChange}
            />
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
      <MultiSelect {...props} />
    </FormInputContainer>
  );
};
