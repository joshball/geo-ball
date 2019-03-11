// Forms
import {
    Checkbox,
    CheckboxField,
    FieldSet,
    FieldWrapper,
    Input,
    InputField,
    Label,
    Radio,
    // RadioField,
    RadioGroup,
    RadioGroupField,
    Select,
    SelectField,
    SelectMenu,
    SelectMenuField,
    Switch,
    SwitchField,
    Textarea,
    TextareaField,
} from '../_external/fannypack';

export {
    Checkbox,
    CheckboxField,
    FieldSet,
    FieldWrapper,
    Input,
    InputField,
    Label,
    Radio,
    // RadioField,
    RadioGroup,
    RadioGroupField,
    Select,
    SelectField,
    SelectMenu,
    SelectMenuField,
    Switch,
    SwitchField,
    Textarea,
    TextareaField,
};

import { formikField } from '../_external/fannypack/formikField';

export const FormikCheckboxField = formikField(CheckboxField);
export const FormikInputField = formikField(InputField);
// export const FormikRadioField = formikField(RadioField);
export const FormikRadioGroupField = formikField(RadioGroupField);
export const FormikSelectField = formikField(SelectField);
export const FormikSelectMenuField = formikField(SelectMenuField);
export const FormikSwitchField = formikField(SwitchField);
export const FormikTextareaField = formikField(TextareaField);
