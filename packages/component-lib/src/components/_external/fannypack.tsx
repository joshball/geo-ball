import * as FP from 'fannypack';
export { FP };
export default FP;

import * as React from 'react';
import { Value } from 'react-powerplug';

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

const bindFns = (...fns: Array<Function>) => (...args: any) => {
    fns.forEach(fn => fn && fn(...args));
};

export const formikField = (Component: any) => {
    return ({ field, form, ...props }: any) => {
        let overrideProps = {};

        // console.log('HERE I AM ', field.value, typeof field.value);
        // console.log('formikField typeof value', field.value);
        // console.log('formikField typeof value', typeof field.value);
        // console.log('formikField field', field);
        // console.log('formikField form', form);
        // console.log('formikField props', props);
        if (FIELDS_WITH_FIELD_WRAPPERS.includes(Component.name)) {
            let state = form.touched[field.name] && form.errors[field.name] ? 'danger' : undefined;
            if (props.state) {
                state = props.state;
            }

            let validationText =
                form.touched[field.name] && form.errors[field.name] ? form.errors[field.name] : undefined;
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
            onChange = (value: any, option: any, newValues: any) => form.setFieldValue(field.name, newValues);
        }
        if (props.type === 'number') {
            onChange = (event: any) => {
                form.setFieldValue(field.name, event.target.value);
            };
        }
        overrideProps = {
            ...overrideProps,
            onBlur: bindFns(onBlur, props.onBlur),
            onChange: bindFns(onChange, props.onChange),
        };
        return <Component {...props} {...field} {...overrideProps} />;
    };
};
