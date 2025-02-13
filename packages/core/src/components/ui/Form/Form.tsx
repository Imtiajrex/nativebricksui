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

export const FormInput = wrapFormInputContainer(FormInputs.FormInput);
export const FormPinInput = wrapFormInputContainer(FormInputs.FormPinInput);
export const FormPasswordInput = wrapFormInputContainer(FormInputs.FormPasswordInput);
export const FormSelect = wrapFormInputContainer(FormSelects.FormSelect);
export const FormMultiSelect = wrapFormInputContainer(FormSelects.FormMultiSelect);
