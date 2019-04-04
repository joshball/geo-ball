import * as React from 'react';
import { FunctionComponent } from 'react';

import { InformedInputField } from '@geo-ball/component-lib';

import { Form, FormProps } from 'informed';

export interface IGenericHeadersFormValues {
    secret: string;
}

export class GenericHeadersFormValues implements IGenericHeadersFormValues {
    secret: string;
    constructor(secret: string = '') {
        this.secret = secret;
    }
}

export const GenericHeadersForm: FunctionComponent<FormProps<IGenericHeadersFormValues>> = (
    props: any,
) => {
    // console.log("GenericHeadersForm formikProps", formikProps)
    // const { isSubmitting } = formikProps
    // props.submitForm
    // props.values.name
    return (
        <Form>
            {({ formState }) => (
                <InformedInputField label="Secret" field="secret" {...props} {...formState} />
            )}
        </Form>
    );
};
