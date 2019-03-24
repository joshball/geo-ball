import * as React from 'react';
// import { Value } from 'react-powerplug';
import { Form, BasicText, asField, FieldContext, Omit } from 'informed';
// export { Button as FpButton, Switch as FpSwitch, Card as FpCard } from 'fannypack';

const FIELDS_WITH_FIELD_WRAPPERS = [
    'CheckboxField',
    'InputField',
    'RadioField',
    'RadioGroupField',
    'SelectField',
    'SelectMenuField',
    'SwitchField',
    'TextareaField',
];
const SELECT_MENUS = ['SelectMenu', 'SelectMenuField'];

const bindFns = (...fns: Array<((...args: any) => void) | undefined>) => (...args: any) => {
    fns.forEach(fn => fn && fn(...args));
};

import { FieldProps as ReakitFieldProps } from 'reakit/ts/Field/Field';
import { IAsFieldContext, Input, IFieldProps } from '../../atoms';
export interface IFieldElementProps {
    a11yId?: ILocalFieldWrapperProps['a11yId'];
    isRequired?: ILocalFieldWrapperProps['isRequired'];
    state?: ILocalFieldWrapperProps['state'];
    marginTop?: string;
}
// export const FormikInputField = formikField(InputField);
export interface ILocalFieldWrapperProps {
    a11yId?: string;
    children:
        | (({ elementProps }: { elementProps: IFieldElementProps }) => React.ReactNode)
        | React.ReactElement<any>;
    className?: string;
    description?: string | React.ReactElement<any>;
    hint?: string | React.ReactElement<any>;
    isOptional?: boolean;
    isRequired?: boolean;
    label?: string | React.ReactElement<any>;
    state?: string;
    validationText?: string;
}

export declare type FieldWrapperProps = Omit<ReakitFieldProps, 'label'> & ILocalFieldWrapperProps;

const isUnset = (v: any): boolean => v === undefined || v === null;
// tslint:disable-next-line: triple-equals
const isEmptyOrUnset = (v: any): boolean => isUnset(v) || v == '';

const getValOrUndef = (v: any): any => (isEmptyOrUnset(v) ? undefined : v);
const propsTypeConversion = (v: any, pt: string): any => (pt === 'number' ? v.toString() : v);

const getValueOrDefault = (v: any, iV: any, def: any = ''): any =>
    getValOrUndef(v) || getValOrUndef(iV) || def;

const getPropsTypeValueOrDefault = (v: any, iV: any, pt: string, def: any = ''): any =>
    propsTypeConversion(getValueOrDefault(v, iV, def), pt);

// const InformedInputFieldRedux = asField(
//     ({ fieldApi, fieldState, ...props }: IAsFieldContext<string>) => {
//         console.log('InformedInputFieldRedux.fieldState', fieldState);
//         console.log('InformedInputFieldRedux.fieldApi', fieldApi);
//         console.log('InformedInputFieldRedux.props', props);

//         const { maskedValue } = fieldState;
//         const { setValue, setTouched } = fieldApi;
//         const { onChange, onBlur, initialValue, field, forwardedRef, debug, mask, ...rest } = props;
//         const newVal = getValueOrDefault(maskedValue, initialValue);

//         // logger('Render', field);
//         // for debugging
//         // useLayoutEffect(() => {
//         //     if (debug && forwardedRef && forwardedRef.current) {
//         //         forwardedRef.current.style.background = 'red';
//         //         setTimeout(() => {
//         //             // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//         //             forwardedRef!.current!.style.background = 'white';
//         //         }, 500);
//         //     }
//         // });

//         return (
//             <Input
//                 {...rest as any}
//                 name={field}
//                 inputRef={forwardedRef}
//                 // value={!maskedValue && maskedValue !== 0 ? '' : maskedValue}
//                 value={newVal}
//                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                     setValue(event.target.value);
//                     if (onChange) {
//                         onChange(event);
//                     }
//                 }}
//                 onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
//                     setTouched(true);
//                     if (onBlur) {
//                         onBlur(event);
//                     }
//                 }}
//             />
//         );
//     },
// );

export const InformedField = (Component: any) => {
    return asField(({ fieldState, fieldApi, ...props }: IAsFieldContext<any>) => {
        // console.log('InformedField fieldState', fieldState);
        // console.log('InformedField fieldApi', fieldApi);
        // console.log('InformedField props', props);
        // console.log('InformedField props.type', props.type);
        props.type = props.type || 'text';

        const { value, maskedValue } = fieldState;

        const { setValue, setTouched } = fieldApi;
        // const { onChange, onBlur, initialValue, ...rest } = props as IFieldProps<string>;
        const { initialValue, forwardedRef, ...rest } = props as IFieldProps<string>;
        const newVal = getPropsTypeValueOrDefault(value, initialValue, props.type);
        // console.log('InformedField value', value);
        // console.log('InformedField typeof value', typeof value);
        // console.log('InformedField initialValue', initialValue);
        // console.log('InformedField newVal', newVal);
        // console.log('InformedField typeof newVal', typeof newVal);
        // console.log('InformedField maskedValue', maskedValue);
        // console.log('InformedField typeof maskedValue', typeof maskedValue);

        // const { onChange, onBlur, initialValue, forwardedRef, ...rest } = props;
        // const { initialValue, forwardedRef, ...rest } = props;
        let overrideProps = {};
        // tslint:disable-next-line: prettier
        const fieldProps = (props as never) as FieldWrapperProps;
        // console.log('HERE I AM ', field.value, typeof field.value);
        // console.log('informedField typeof value', typeof field.value);
        // console.log('informedField field', field);
        // console.log('informedField form', form);
        // console.log('informedField props', props);
        if (FIELDS_WITH_FIELD_WRAPPERS.includes(Component.name)) {
            // let state = form.touched[field.name] && form.errors[field.name] ? 'danger' : undefined;
            let state = fieldState.touched && fieldState.error ? 'danger' : undefined;
            // let state = form.touched[field.name] && form.errors[field.name] ? 'danger' : undefined;
            if (fieldProps.state) {
                state = fieldProps.state;
            }

            // let validationText =
            //     form.touched[field.name] && form.errors[field.name]
            //         ? form.errors[field.name]
            //         : undefined;
            let validationText =
                fieldState.touched && fieldState.error ? fieldState.error : undefined;

            if (fieldProps.validationText) {
                validationText = fieldProps.validationText;
            }
            // if (props.validationText) {
            //     validationText = props.validationText;
            // }

            overrideProps = {
                ...overrideProps,
                state,
                validationText,
            };
        }

        const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            setTouched(true);
            if (rest.onBlur) {
                rest.onBlur(event);
            }
        };
        let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
            if (rest.onChange) {
                rest.onChange(event);
            }
        };
        // let onBlur = field.onBlur;
        // let onChange = field.onChange;
        // let onBlur = fieldProps.onBlur!;
        // // let onChange = fieldProps.onChange;
        // let onChange = (event: any) => {
        //     console.log('onChange.event:', event);
        //     fieldProps.onChange!(event);
        // };
        if (SELECT_MENUS.includes(Component.name)) {
            // onBlur = () => form.setFieldTouched(field.name);
            // onBlur = () => fieldApi.setTouched(true);
            // @ts-ignore
            onChange = (_value: any, option: any, newValues: any) => {
                console.log('onChange:', _value, option, newValues);
                return fieldApi.setValue(newValues);
            };
            // form.setFieldValue(field.name, newValues);
        }
        // if (fieldProps.type === 'number') {
        //     onChange = (event: any) => {
        //         // console.log('onChange:', _value, option, newValues);
        //         fieldApi.setValue(event.target.value);
        //     };
        // }
        overrideProps = {
            ...overrideProps,
            onBlur: bindFns(onBlur, rest.onBlur),
            onChange: bindFns(onChange, rest.onChange),
        };
        // console.log('InformedField.ATR rest', rest);
        // console.log('InformedField.ATR props', props);
        // console.log('InformedField.ATR fieldState', fieldState);
        // console.log('InformedField.ATR fieldApi', fieldApi);
        // console.log('InformedField.ATR overrideProps', overrideProps);
        // console.log(`InformedField.ATR name=props.field "${props.field}"`);
        // console.log(`InformedField.ATR value=newVal "${newVal}"`);
        return (
            <Component
                {...rest as any}
                {...props}
                {...fieldState}
                {...fieldApi}
                {...overrideProps}
                inputRef={forwardedRef}
                name={props.field}
                value={newVal}
            />
        );
    });
};

// fieldApi={fieldApi}
// fieldState={fieldState}
// field={field}
// forwardedRef={ref}
// debug={debug}
// type={type}
// const InformedInputFieldRedux = asField(
//     ({ fieldApi, fieldState, ...props }: IAsFieldContext<string>) => {
//         console.log('InformedInputFieldRedux.fieldState', fieldState);
//         console.log('InformedInputFieldRedux.fieldApi', fieldApi);
//         console.log('InformedInputFieldRedux.props', props);

//         const { maskedValue } = fieldState;
//         const { setValue, setTouched } = fieldApi;
//         const { onChange, onBlur, initialValue, field, forwardedRef, debug, mask, ...rest } = props;
//         // eslint-disable-next-line @typescript-eslint/no-use-before-define
//         const newVal = getValueOrDefault(maskedValue, initialValue);

//         // logger('Render', field);
//         // for debugging
//         useLayoutEffect(() => {
//             if (debug && forwardedRef && forwardedRef.current) {
//                 forwardedRef.current.style.background = 'red';
//                 setTimeout(() => {
//                     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//                     forwardedRef!.current!.style.background = 'white';
//                 }, 500);
//             }
//         });

//         return (
//             <Input
//                 {...rest}
//                 name={field}
//                 inputRef={forwardedRef}
//                 // value={!maskedValue && maskedValue !== 0 ? '' : maskedValue}
//                 value={newVal}
//                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                     setValue(event.target.value);
//                     if (onChange) {
//                         onChange(event);
//                     }
//                 }}
//                 onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
//                     setTouched(true);
//                     if (onBlur) {
//                         onBlur(event);
//                     }
//                 }}
//             />
//         );
//     },
// );

// const InformedInputFieldEx = asField(({ fieldState, fieldApi, ...props }) => {
//     console.log('InformedInputField.fieldState', fieldState);
//     console.log('InformedInputField.fieldApi', fieldApi);
//     console.log('InformedInputField.props', props);
//     const { value } = fieldState;
//     const { setValue, setTouched } = fieldApi;
//     const { onChange, onBlur, initialValue, ...rest } = props as IFieldProps<string>;
//     const newVal = getValueOrDefault(value, initialValue);
//     console.log('InformedInputField.value', value);
//     console.log('InformedInputField.initialValue', initialValue);
//     return (
//         <React.Fragment>
//             <Input
//                 {...rest as any}
//                 // value={!value && value !== 0 ? '' : value}
//                 value={newVal}
//                 state={fieldState.error ? 'danger' : undefined}
//                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                     setValue(event.target.value);
//                     if (onChange) {
//                         onChange(event);
//                     }
//                 }}
//                 onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
//                     setTouched(true);
//                     if (onBlur) {
//                         onBlur(event);
//                     }
//                 }}
//                 // style={fieldState.error ? { border: 'solid 1px red' } : null}
//             />
//             {fieldState.error ? <small style={{ color: 'red' }}>{fieldState.error}</small> : null}{' '}
//         </React.Fragment>
//     );
// });
