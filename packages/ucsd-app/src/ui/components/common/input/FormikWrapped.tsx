import * as React from 'react';
import { FieldProps } from 'formik';
import { IRadioButtonGroupProps } from '@geo-ball/component-lib/src';
import {
    InputGroup,
    ITextAreaProps,
    TextArea,
    ISwitchProps,
    Switch,
    IInputGroupProps,
    INumericInputProps,
    NumericInput,
} from '@blueprintjs/core';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
interface ITextAreaWithoutFormProps extends Omit<ITextAreaProps, 'form'> {}

interface IFormikTextAreaProps<TForm> extends FieldProps<TForm>, ITextAreaWithoutFormProps {
    outerDivProps: any;
}

export class FormikTextArea<TFormProps> extends React.PureComponent<
    IFormikTextAreaProps<TFormProps>
> {
    render() {
        // field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        const { field, form, outerDivProps, ...props } = this.props;
        return (
            <div {...outerDivProps}>
                <TextArea
                    name={field.name}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder={field.name}
                    fill={true}
                    {...field}
                    {...props}
                />
            </div>
        );
    }
}

interface ISwitchWithoutFormProps extends Omit<ISwitchProps, 'form'> {}

interface IFormikSwitchProps<TForm> extends FieldProps<TForm>, ISwitchWithoutFormProps {
    outerDivProps: any;
    switchProps: any;
}

export class FormikSwitch<TFormProps> extends React.PureComponent<IFormikSwitchProps<TFormProps>> {
    render() {
        // field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        const { field, form, label, outerDivProps, switchProps, ...props } = this.props;
        return (
            <div {...outerDivProps}>
                <Switch
                    name={field.name}
                    checked={field.value}
                    label={label}
                    onChange={field.onChange}
                    {...switchProps}
                    {...field}
                    {...props}
                />
            </div>
        );
    }
}

// const FormikRadioButtonGroup = ({
//     field, // { name, value, onChange, onBlur }
//     // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//     ...props
// }: FormFieldProps) => (
//         <RadioButtonGroup {...props} name={field.name} selectedButtonId={field.value} onChange={field.onChange}>
//             <RadioButton id="json">JSON</RadioButton>
//             <RadioButton id="jsonv2">JSONv2</RadioButton>
//             <RadioButton id="xml">XML</RadioButton>
//             <RadioButton id="html">HTML</RadioButton>
//         </RadioButtonGroup>
//     );
interface IFormikRadioButtonGroupProps<TForm> extends FieldProps<TForm>, IRadioButtonGroupProps {
    outerDivProps: any;
}

export class FormikRadioButtonGroup<TFormProps> extends React.PureComponent<
    IFormikRadioButtonGroupProps<TFormProps>
> {
    render() {
        // field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        const { field, form, outerDivProps, children, ...props } = this.props;
        return (
            <div {...outerDivProps}>
                <RadioButtonGroup
                    name={field.name}
                    selectedButtonId={field.value}
                    onChange={field.onChange}
                    {...field}
                    {...props}
                >
                    {children}
                </RadioButtonGroup>
            </div>
        );
    }
}

// interface ILabelAndInputProps extends Omit<React.HTMLProps<HTMLLabelElement>, 'form'> { }

interface IFormikInputGroupProps<TForm> extends FieldProps<TForm>, IInputGroupProps {
    // outerDivProps: any;
}
// return (
//     <ControlGroup fill={true} vertical={false}>
//         <Label htmlFor={field.name}>{label}</Label>
//         <input
//             name={field.name}
//             onChange={field.onChange}
//             onBlur={field.onBlur}
//             placeholder={field.name}
//             {...props}
//         />
//     </ControlGroup>
// );
export class FormikInputGroup<TFormProps> extends React.PureComponent<
    IFormikInputGroupProps<TFormProps>
> {
    render() {
        // field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        const { field, form, ...props } = this.props;
        return (
            <InputGroup
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder={field.name}
                {...field}
                {...props}
            />
        );
    }
}

// OLD WAY: required the form... weird
// interface FormFieldProps extends FieldProps<ReverseGeocodingApiPanelState> { }
// const FormikInputGroup = ({
//     field, // { name, value, onChange, onBlur }
//     // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
//     ...props
// }: FormFieldProps) => {
//     console.log('TEXT Input FIELD:', field)
//     console.log('TEXT Input props:', props)
//     return (
//         <InputGroup name={field.name} onChange={field.onChange} value={field.value} placeholder={field.name}/>
//     )};

interface IFormikNumericInputProps<TForm> extends FieldProps<TForm>, INumericInputProps {
    min?: number;
    max?: number;
}
export class FormikNumericInput<TFormProps> extends React.PureComponent<
    IFormikNumericInputProps<TFormProps>
> {
    render() {
        // field, // { name, value, onChange, onBlur }
        // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        const { field, form, min, max, ...props } = this.props;
        // console.log('NUMBER:')
        // console.log('NUMBER.field:', field)
        // console.log('NUMBER field.name:', field.name)
        // console.log('NUMBER field.value:', field.value)

        const onChange = (_valueAsNumber: number, valueAsString: string) => {
            // console.log("Value as number:", valueAsNumber);
            // console.log("Value as string:", valueAsString);
            // console.log('NUMBER. onCHANGE valueAsString:', valueAsString)
            const cleanVal = valueAsString.trim();
            // console.log('NUMBER. onCHANGE cleanVal:', cleanVal)
            if (cleanVal === '') {
                form.setFieldValue(field.name, cleanVal);
                return;
            }

            let changeVal = Number(cleanVal);
            // console.log('NUMBER. onCHANGE changeVal:', changeVal)
            if (min !== undefined && changeVal < min) {
                changeVal = min;
            } else if (max !== undefined && changeVal > max) {
                changeVal = max;
            }
            // console.log('NUMBER. onCHANGE FINAL changeVal:', changeVal)
            form.setFieldValue(field.name, changeVal);
        };

        return (
            <NumericInput
                name={field.name}
                onValueChange={onChange}
                onBlur={field.onBlur}
                placeholder={field.name}
                {...field}
                {...props}
            />
        );
    }
}
