import { Control, Path } from 'react-hook-form';

export type FormFields = Record<string, any>;
export type FormControlProps<T = FormFields> = {
  control?: Control<T, any>;
  name?: Path<T>;
};
