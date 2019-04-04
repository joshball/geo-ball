// import * as FP from 'fannypack';
// export { FP };
// export default FP;

import * as React from 'react';
// import { Value } from 'react-powerplug';

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

const bindFunctions = (...functions: Array<SpreadFunc>) => {
    console.log('***** BF.functions:', functions);
    return (...funcArgs: any) => {
        console.log('***** BF.functions:', functions);
        console.log('***** BF....funcArgs:', ...funcArgs);
        functions.forEach(func => {
            console.log('***** BF.func:', func, ...funcArgs);
            return func && func(...funcArgs);
        });
    };
};

export const formikField = (Component: any) => {
    // console.log('formikField', Component);
    return ({ field, form, ...props }: any) => {
        let overrideProps: any = {};

        // console.log('HERE I AM ', field.value, typeof field.value);
        // console.log('formikField typeof value', field.value);
        // console.log('formikField typeof value', typeof field.value);
        console.log('formikField field', field);
        console.log('formikField field.value', field.value);
        console.log('formikField form', form);
        console.log('formikField props', props);
        if (FIELDS_WITH_FIELD_WRAPPERS.includes(Component.name)) {
            let state = form.touched[field.name] && form.errors[field.name] ? 'danger' : undefined;
            if (props.state) {
                state = props.state;
            }

            let validationText =
                form.touched[field.name] && form.errors[field.name]
                    ? form.errors[field.name]
                    : undefined;
            if (props.validationText) {
                validationText = props.validationText;
            }

            overrideProps = {
                ...overrideProps,
                state,
                validationText,
            };
        }

        let onBlur = field.onBlur;
        let onChange = field.onChange;
        if (SELECT_MENUS.includes(Component.name)) {
            onBlur = () => form.setFieldTouched(field.name);
            // @ts-ignore
            onChange = (value: any, option: any, newValues: any) =>
                form.setFieldValue(field.name, newValues);
        }
        if (CHECKBOXES.includes(Component.name)) {
            overrideProps.checked = field.value;
            onChange = (event: any) => {
                form.setFieldValue(field.name, event.target.checked);
            };
        }
        if (props.type === 'number') {
            onChange = (event: any) => {
                form.setFieldValue(field.name, event.target.value);
            };
        }
        // console.log('overrideProps.onChange', onChange);
        // console.log('overrideProps.props.onChange', props.onChange);
        // console.log('overrideProps.bindFunctions', bindFunctions);
        overrideProps = {
            ...overrideProps,
            onBlur: bindFunctions(onBlur, props.onBlur),
            onChange: bindFunctions(onChange, props.onChange),
        };
        console.log('================================== ');
        console.log('Component props ', props);
        // console.log('Component ...props ', ...props);
        console.log('Component field ', field);
        // console.log('Component ...field ', ...field);
        console.log('Component overrideProps', overrideProps);
        // console.log('Component ...overrideProps', ...overrideProps);
        return <Component {...props} {...field} {...overrideProps} />;
    };
};
