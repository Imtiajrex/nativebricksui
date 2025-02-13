import * as FormInputs from './FormInput';
import { wrapFormInputContainer } from './FormInputContainer';
import * as FormSelects from './FormSelect';

export const Form = {
  Input: wrapFormInputContainer(FormInputs.FormInput),
  PinInput: wrapFormInputContainer(FormInputs.FormPinInput),
  PasswordInput: wrapFormInputContainer(FormInputs.FormPasswordInput),
  Select: wrapFormInputContainer(FormSelects.FormSelect),
  MultiSelect: wrapFormInputContainer(FormSelects.FormMultiSelect),
};

export * from './FormInput';
export * from './FormSelect';
