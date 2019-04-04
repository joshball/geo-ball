import * as React from 'react';
import { FunctionComponent } from 'react';

import { InformedInputField } from '@geo-ball/component-lib';

import { Form, FormProps } from 'informed';

export interface IGenericBodyParamsFormValues {
    query: string;
}

export class GenericBodyParamsFormValues implements IGenericBodyParamsFormValues {
    query: string;
    constructor(query: string = '') {
        this.query = query;
    }
}

export const GenericBodyParamsForm: FunctionComponent<FormProps<IGenericBodyParamsFormValues>> = (
    props: any,
) => {
    // console.log("GenericBodyParamsForm props", props)
    // const { isSubmitting } = props
    // props.values.name
    return (
        <Form>
            {({ formState }) => {
                return <InformedInputField label="Query" field="query" {...props} {...formState} />;
            }}
            {/* <InformedInputField label="Query" field="query" /> */}

            {/* <button type="submit" disabled={isSubmitting}>
                Submit
            </button> */}
        </Form>
    );
};
