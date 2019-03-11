import * as React from 'react';
import { Formik } from 'formik';
import { ActionFormikConfig } from './FormikHelpers';
import { BindAdditionalPropsToForm } from './BindAdditionalPropsToForm';

// export function GenericFormEx(GenericForm: any) {
//     return (
//         <div>
//             <GenericForm />
//             <DebugFormixDiv />
//         </div>
//     );
// }

export function GenericFormContainer<TFormValues>(GenericForm: any) {
    return (formikConfig: ActionFormikConfig<TFormValues>): JSX.Element => (
        <div>
            {/* <h1>GenericUrlParamsFormContainer</h1> */}
            <Formik {...formikConfig}>
                {/* {BindAdditionalPropsToForm(formikConfig, GenericFormEx(GenericForm))} */}
                {BindAdditionalPropsToForm(formikConfig, GenericForm)}
            </Formik>
        </div>
    );
}
