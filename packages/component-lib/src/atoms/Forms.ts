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

export const FormikCheckbox = formikField(Checkbox);
export const FormikCheckboxField = formikField(CheckboxField);
export const FormikInput = formikField(Input);
export const FormikInputField = formikField(InputField);
// export const FormikRadioField = formikField(RadioField);
export const FormikRadioGroupField = formikField(RadioGroupField);
export const FormikSelectField = formikField(SelectField);
export const FormikSelectMenuField = formikField(SelectMenuField);
export const FormikSwitchField = formikField(SwitchField);
export const FormikTextareaField = formikField(TextareaField);

import { InformedField } from '../_external/fannypack/informedField';

// tslint:disable-next-line: no-submodule-imports
// import { InputFieldProps, LocalInputFieldProps } from 'fannypack/ts/Input/InputField';
// tslint:disable-next-line: no-submodule-imports
// import { InputProps } from 'reakit/ts';
import { ClassAttributes, InputHTMLAttributes } from 'react';

// export declare type InputFieldProps = LocalInputFieldProps & InputProps;

export type InputProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>;
// export const InformedInput = InformedField(Input);

export const InformedCheckbox = InformedField(Checkbox);
export const InformedCheckboxField = InformedField(CheckboxField);

export const InformedInput = InformedField(Input);
export const InformedInputField = InformedField(InputField);

// export const InformedRadioField = InformedField(RadioField);
export const InformedRadioGroupField = InformedField(RadioGroupField);

export const InformedSelect = InformedField(Select);
export const InformedSelectField = InformedField(SelectField);

export const InformedSelectMenuField = InformedField(SelectMenuField);

export const InformedSwitch = InformedField(Switch);
export const InformedSwitchField = InformedField(SwitchField);

export const InformedTextarea = InformedField(Textarea);
export const InformedTextareaField = InformedField(TextareaField);

export * from '../_external/informed';
