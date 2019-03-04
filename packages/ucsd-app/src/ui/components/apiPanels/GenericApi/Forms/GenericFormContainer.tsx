import * as React from "react"

import { Formik, FormikConfig } from "formik"
import { GenericUrlParamsForm, IGenericUrlParamsFormValues } from "./GenericUrlParamsForm"
import {
    ActionFormikConfig,
    ActionFormikProps,
    DebugFormixDiv,
    BindAdditionalPropsToForm,
} from "@geo-ball/component-lib"

// export const GenericFormContainerInner = <TFormValues>(
//     formikConfig: ActionFormikConfig<TFormValues>,
//     GenericForm: any
// ) => {
//     // console.log("GenericFormContainer formikConfig:", formikConfig)
//     return (
//         <div>
//             {/* <h1>GenericUrlParamsFormContainer</h1> */}
//             <Formik {...formikConfig}>
//                 {BindAdditionalPropsToForm(formikConfig, GenericForm)}
//             </Formik>
//         </div>
//     )
// }

export function GenericFormEx(GenericForm: any) {
    return (
        <div>
            <GenericForm />
            <DebugFormixDiv />
        </div>
    )
}

export function GenericFormContainer<TFormValues>(GenericForm: any) {
    return (formikConfig: ActionFormikConfig<TFormValues>) => (
        <div>
            {/* <h1>GenericUrlParamsFormContainer</h1> */}
            <Formik {...formikConfig}>
                {/* {BindAdditionalPropsToForm(formikConfig, GenericFormEx(GenericForm))} */}
                {BindAdditionalPropsToForm(formikConfig, GenericForm)}
            </Formik>
        </div>
    )
}
