import * as React from 'react';
import { FunctionComponent } from 'react';

import { InformedInputField } from '@geo-ball/component-lib';
import { ActionFormikProps } from '@geo-ball/api-couturier';

import { Form, FormProps, FormState } from 'informed';

export interface IGenericUrlParamsFormValues {
    id: string;
    count: string;
}

export class GenericUrlParamsFormValues implements IGenericUrlParamsFormValues {
    id: string;
    count: string;
    constructor(id: string = '', count: string = '10') {
        this.id = id;
        this.count = count;
    }
}

// export interface InformedComponentParams {
//     formState: FormState<IGenericUrlParamsFormValues>;
//     label: string;
//     props:any;
// }

// export const GenericUrlParamsForm: React.FunctionComponent<InformedComponentParams> = ({
export const GenericUrlParamsForm: React.FunctionComponent<any> = ({ formState, ...props }) => (
    <React.Fragment>
        <InformedInputField label="IDDD" field="id" {...props} {...formState} />
        <InformedInputField label="Count" field="count" type="number" {...props} {...formState} />
    </React.Fragment>
);

// Type '{
// const {
// values: IGenericUrlParamsFormValues;
//  touched: { id: boolean; count: boolean; };
//   errors: { id: string | undefined; count: string | undefined; };
//   asyncErrors: { id: string | undefined; count: string | undefined; };
//   field: string; }
//   ' is missing the following properties from type 'IAsFieldContext<any>': fieldState, fieldApi

// export const GenericUrlParamsFormEx: FunctionComponent<FormProps<IGenericUrlParamsFormValues>> = (
//     props: any,
// ) => {
// console.log("GenericUrlParamsForm props", props)
// const { isSubmitting, additionalProps } = props
// props.formikActions.bindSubmitForm
// props.values.name
// const DebugFormComponent =
//     additionalProps && additionalProps.DebugFormComponent
//         ? additionalProps.DebugFormComponent
//         : () => <React.Fragment />
// console.log("GenericUrlParamsFormContainer DebugFormComponent:", DebugFormComponent)
// formikConfig.formikActions.bindSubmitForm;

//     return (
//         <React.Fragment>
//             <Form>
//                 {({ formState }) => {
//                     return (
//                         <React.Fragment>
//                             <InformedInputField label="IDDD" field="id" {...props} {...formState} />
//                             <InformedInputField
//                                 label="Count"
//                                 field="count"
//                                 type="number"
//                                 {...props}
//                                 {...formState}
//                             />
//                         </React.Fragment>
//                     );
//                 }}
//             </Form>
//         </React.Fragment>
//     );
// };
