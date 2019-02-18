import * as React from 'react'
import { Field, FieldProps } from "formik";
import { FormGroup, InputGroup, Label, ITextAreaProps, TextArea, ISwitchProps, Switch, ControlGroup, IInputGroupProps } from '@blueprintjs/core';
import { css } from 'glamor';
import { colors, styles } from '../../../config/theme';
import { IRadioButtonGroupProps, RadioButtonGroup } from './RadioButtonGroup';



type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
interface ITextAreaWithoutFormProps extends Omit<ITextAreaProps, 'form'> { }

interface IFormikTextAreaProps<TForm> extends FieldProps<TForm>, ITextAreaWithoutFormProps {
    outerDivProps: any;
}

export class FormikTextArea<TFormProps> extends React.PureComponent<IFormikTextAreaProps<TFormProps>> {
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
                    {...props}
                />
            </div>
        );
    }
}

interface ISwitchWithoutFormProps extends Omit<ISwitchProps, 'form'> { }

interface IFormikSwitchProps<TForm> extends FieldProps<TForm>, ISwitchWithoutFormProps {
    outerDivProps: any;
    switchProps: any;
}

const toggleItem = css({
    boxSizing: 'border-box',
    padding: '5px 20px 5px 20px',
    backgroundColor: colors.white,
    writingMode: 'horizontal-tb',
});
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

export class FormikRadioButtonGroup<TFormProps> extends React.PureComponent<IFormikRadioButtonGroupProps<TFormProps>> {
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
export class FormikInputGroup<TFormProps> extends React.PureComponent<IFormikInputGroupProps<TFormProps>> {
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
