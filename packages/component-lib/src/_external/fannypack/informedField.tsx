import * as React from 'react';
// import { Value } from 'react-powerplug';
import {
    Form,
    BasicText,
    asField,
    FieldContext,
    Omit,
    FieldApi,
    FieldState,
    FormValue,
} from 'informed';
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
const CHECKBOXES = ['Checkbox', 'CheckboxField', 'Switch', 'SwitchField', 'Radio', 'RadioField'];

const bindFns = (...fns: Array<((...args: any) => void) | undefined>) => (...args: any) => {
    fns.forEach(fn => fn && fn(...args));
};

import { FieldProps as ReakitFieldProps } from 'reakit/ts/Field/Field';
import { IAsFieldContext, Input, IFieldProps } from '../../atoms';
import { ClassAttributes, InputHTMLAttributes } from 'react';
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

type AnyEventCallback = (event: any) => void;

// interface IInformedFieldProps<TComponent> {
export interface IInformedFieldProps {
    fieldState: FieldState<FormValue>;
    fieldApi: FieldApi<FormValue>;

    initialValue: any;
    value?: any;
    maskedValue?: any;

    state?: string;
    validationText?: string;

    field: string;
    // forwardedRef: React.Ref<TComponent>;
    forwardedRef: React.Ref<any>;

    children?: React.ReactNode;

    onBlur?: AnyEventCallback;
    onChange?: AnyEventCallback;
    type?: string;
    debug?: boolean;
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>;
export type IComponentProps = InputHTMLAttributes<HTMLInputElement> &
    ClassAttributes<HTMLInputElement>;

const getOnChangeByType = (componentName: string, fieldApi: FieldApi<FormValue>): any => {
    console.log('getOnChangeByType componentName', componentName);
    if (SELECT_MENUS.includes(componentName)) {
        console.log('getOnChangeByType SELECT_MENUS');
        return (_value: any, _option: any, newValues: any) => fieldApi.setValue(newValues);
    }
    if (CHECKBOXES.includes(componentName)) {
        console.log('getOnChangeByType CHECKBOXES');
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            fieldApi.setValue(event.target.checked);
        };
    }
    console.log('getOnChangeByType THE REST');
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        fieldApi.setValue(event.target.value);
    };
};
const getWrappedOnChangeByType = (
    componentName: string,
    fieldApi: FieldApi<FormValue>,
    props: any,
): any => {
    const typedOnChange = getOnChangeByType(componentName, fieldApi);
    return (...args: any) => {
        console.log('WRAPPED onChange(args)', args);
        console.log('WRAPPED onChange props.onChange', props.onChange);
        typedOnChange(...args);
        if (props.onChange) {
            props.onChange(...args);
        }
    };
};

const getOverridePropsByType = (
    componentName: string,
    fieldState: FieldState<FormValue>,
    fieldApi: FieldApi<FormValue>,
    props: any,
) => {
    const overrideProps: any = {};
    const { touched, error, value } = fieldState;
    const { setTouched } = fieldApi;

    if (FIELDS_WITH_FIELD_WRAPPERS.includes(componentName)) {
        let state = touched && error ? 'danger' : undefined;
        if (props.state) {
            state = props.state;
        }

        let validationText = touched && error ? error : undefined;
        if (props.validationText) {
            validationText = props.validationText;
        }

        overrideProps.state = state;
        overrideProps.validationText = validationText;
        console.log('getOverridePropsByType IS FIELDWRAPPER! overrideProps.state = ', state);
        console.log(
            'getOverridePropsByType IS FIELDWRAPPER! overrideProps.validationText = ',
            validationText,
        );
    }

    if (CHECKBOXES.includes(componentName)) {
        console.log('getOverridePropsByType IS CHECK BOX! overrideProps.checked = ', value);
        // overrideProps.checked = value;
    }

    // onBlur - Function to invoke when focus is lost
    overrideProps.onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setTouched(true);
        if (props.onBlur) {
            props.onBlur(event);
        }
    };

    // onChange - Function to invoke when the select field has changed
    overrideProps.onChange = getWrappedOnChangeByType(componentName, fieldApi, props);

    return overrideProps;
};

// InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>
export const InformedField = (Component: any) => {
    return asField(({ fieldState, fieldApi, ...props }: IInformedFieldProps & any) => {
        console.log('$$$ InformedField $$$');
        console.log('InformedField fieldState', fieldState);
        console.log('InformedField fieldApi', fieldApi);
        console.log('InformedField props', props);
        const { maskedValue, value } = fieldState;
        const { forwardedRef, debug, ...rest } = props;

        const overrideProps = getOverridePropsByType(Component.name, fieldState, fieldApi, props);

        // console.log('InformedField forwardedRef', forwardedRef);
        // console.log('InformedField fieldApi', fieldApi);
        // console.log('InformedField fieldState', fieldState);
        // console.log('InformedField value', value);
        // console.log('InformedField maskedValue', maskedValue);
        // console.log('InformedField props', props);
        // console.log('InformedField rest', rest);
        console.log('InformedField overrideProps', overrideProps);
        // console.log('InformedField rest', rest);
        if (CHECKBOXES.includes(Component.name)) {
            console.log('InformedField returning CHECKBOX comp');
            return (
                <Component
                    {...rest}
                    inputRef={forwardedRef}
                    fieldState={fieldState}
                    fieldApi={fieldApi}
                    checked={maskedValue === true}
                    {...overrideProps}
                />
            );
        }
        return (
            <Component
                {...rest}
                inputRef={forwardedRef}
                fieldState={fieldState}
                fieldApi={fieldApi}
                value={!maskedValue && maskedValue !== 0 ? '' : maskedValue}
                {...overrideProps}
            />
        );
    });
};
// export const InformedField = (Component: any) => {
//     return asField(
//         ({ fieldState, fieldApi, ...props }: IAsFieldContext<any> & FieldWrapperProps) => {
//             console.log('InformedField fieldState', fieldState);
//             console.log('InformedField fieldApi', fieldApi);
//             console.log('InformedField props', props);
//             // console.log('InformedField props.type', props.type);
//             props.type = props.type || 'text';

//             const { value, maskedValue } = fieldState;

//             const { setValue, setTouched } = fieldApi;
//             // const { onChange, onBlur, initialValue, ...rest } = props as IFieldProps<string>;
//             const { initialValue, forwardedRef, label, ...rest } = props as (IFieldProps<string> &
//                 any);
//             const newVal = getPropsTypeValueOrDefault(value, initialValue, props.type);
//             // console.log('InformedField value', value);
//             // console.log('InformedField typeof value', typeof value);
//             // console.log('InformedField initialValue', initialValue);
//             // console.log('InformedField newVal', newVal);
//             // console.log('InformedField typeof newVal', typeof newVal);
//             // console.log('InformedField maskedValue', maskedValue);
//             // console.log('InformedField typeof maskedValue', typeof maskedValue);

//             // const { onChange, onBlur, initialValue, forwardedRef, ...rest } = props;
//             // const { initialValue, forwardedRef, ...rest } = props;
//             let overrideProps = {};
//             // tslint:disable-next-line: prettier
//             const fieldProps = (props as never) as FieldWrapperProps;
//             // console.log('HERE I AM ', field.value, typeof field.value);
//             // console.log('informedField typeof value', typeof field.value);
//             // console.log('informedField field', field);
//             // console.log('informedField form', form);
//             // console.log('informedField props', props);
//             if (FIELDS_WITH_FIELD_WRAPPERS.includes(Component.name)) {
//                 // let state = form.touched[field.name] && form.errors[field.name] ? 'danger' : undefined;
//                 let state = fieldState.touched && fieldState.error ? 'danger' : undefined;
//                 // let state = form.touched[field.name] && form.errors[field.name] ? 'danger' : undefined;
//                 if (fieldProps.state) {
//                     state = fieldProps.state;
//                 }

//                 // let validationText =
//                 //     form.touched[field.name] && form.errors[field.name]
//                 //         ? form.errors[field.name]
//                 //         : undefined;
//                 let validationText =
//                     fieldState.touched && fieldState.error ? fieldState.error : undefined;

//                 if (fieldProps.validationText) {
//                     validationText = fieldProps.validationText;
//                 }
//                 // if (props.validationText) {
//                 //     validationText = props.validationText;
//                 // }

//                 overrideProps = {
//                     ...overrideProps,
//                     state,
//                     validationText,
//                 };
//             }

//             const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
//                 setTouched(true);
//                 if (rest.onBlur) {
//                     rest.onBlur(event);
//                 }
//             };
//             let onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//                 setValue(event.target.value);
//                 if (rest.onChange) {
//                     rest.onChange(event);
//                 }
//             };
//             // let onBlur = field.onBlur;
//             // let onChange = field.onChange;
//             // let onBlur = fieldProps.onBlur!;
//             // // let onChange = fieldProps.onChange;
//             // let onChange = (event: any) => {
//             //     console.log('onChange.event:', event);
//             //     fieldProps.onChange!(event);
//             // };
//             if (SELECT_MENUS.includes(Component.name)) {
//                 // onBlur = () => form.setFieldTouched(field.name);
//                 // onBlur = () => fieldApi.setTouched(true);
//                 // @ts-ignore
//                 onChange = (_value: any, option: any, newValues: any) => {
//                     console.log('onChange:', _value, option, newValues);
//                     return fieldApi.setValue(newValues);
//                 };
//                 // form.setFieldValue(field.name, newValues);
//             }
//             // if (fieldProps.type === 'number') {
//             //     onChange = (event: any) => {
//             //         // console.log('onChange:', _value, option, newValues);
//             //         fieldApi.setValue(event.target.value);
//             //     };
//             // }
//             overrideProps = {
//                 ...overrideProps,
//                 onBlur: bindFns(onBlur, rest.onBlur),
//                 onChange: bindFns(onChange, rest.onChange),
//             };
//             // console.log('InformedField.ATR rest', rest);
//             // console.log('InformedField.ATR props', props);
//             // console.log('InformedField.ATR fieldState', fieldState);
//             // console.log('InformedField.ATR fieldApi', fieldApi);
//             // console.log('InformedField.ATR overrideProps', overrideProps);
//             // console.log(`InformedField.ATR name=props.field "${props.field}"`);
//             // console.log(`InformedField.ATR value=newVal "${newVal}"`);
//             return (
//                 <Component
//                     {...rest as any}
//                     {...props}
//                     {...fieldState}
//                     {...fieldApi}
//                     {...overrideProps}
//                     inputRef={forwardedRef}
//                     name={props.field}
//                     value={newVal}
//                     label={label}
//                 />
//             );
//         },
//     );
// };

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
