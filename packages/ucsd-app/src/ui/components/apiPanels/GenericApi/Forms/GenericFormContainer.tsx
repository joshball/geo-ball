import * as React from "react"
import { Formik } from "formik"
import {
    ActionFormikConfig,
    DebugFormixDiv,
    BindAdditionalPropsToForm,
} from "@geo-ball/component-lib"

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
