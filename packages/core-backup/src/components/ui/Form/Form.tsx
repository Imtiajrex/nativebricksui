import { FormInput, FormPasswordInput, FormPinInput } from './FormInput';
import { wrapFormInputContainer } from './FormInputContainer';
import { FormMultiSelect, FormSelect } from './FormSelect';

export const Form = {
  Input: wrapFormInputContainer(FormInput),
  PinInput: wrapFormInputContainer(FormPinInput),
  PasswordInput: wrapFormInputContainer(FormPasswordInput),
  Select: wrapFormInputContainer(FormSelect),
  MultiSelect: wrapFormInputContainer(FormMultiSelect),
};
