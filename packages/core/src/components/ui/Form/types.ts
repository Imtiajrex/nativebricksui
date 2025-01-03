import { Control, FieldValues, Path } from 'react-hook-form';

export type FormFields = Record<string, any>;
export type FormControlProps<T extends FieldValues = FieldValues> = {
  control?: Control<T, any>;
  name?: Path<T>;
};
