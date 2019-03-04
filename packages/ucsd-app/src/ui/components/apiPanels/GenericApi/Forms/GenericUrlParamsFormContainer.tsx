import * as React from "react"

import { Formik, FormikConfig } from "formik"
import { GenericUrlParamsForm, IGenericUrlParamsFormValues } from "./GenericUrlParamsForm"
import { ActionFormikConfig, ActionFormikProps } from "@geo-ball/component-lib"

export const GenericUrlParamsFormContainer = (
    formikConfig: ActionFormikConfig<IGenericUrlParamsFormValues>,
) => {
    console.log("GenericUrlParamsFormContainer formikConfig:", formikConfig)
    const { additionalProps } = formikConfig
    // formikConfig.formikActions.bindSubmitForm;
    return (
        <div>
            {/* <h1>GenericUrlParamsFormContainer</h1> */}
            <Formik {...formikConfig}>
                {(props: ActionFormikProps<IGenericUrlParamsFormValues>) => {
                    // props.additionalProps = additionalProps
                    console.log("GenericUrlParamsFormContainer ACTION PROPS:", props)
                    console.log("GenericUrlParamsFormContainer additionalProps:", additionalProps)
                    if (additionalProps && additionalProps.bindSubmitForm) {
                        additionalProps.bindSubmitForm(props.submitForm)
                    }
                    if (additionalProps && additionalProps.bindValidateForm) {
                        additionalProps.bindValidateForm(props.validateForm)
                    }
                    if (additionalProps && additionalProps.bindGetFormValues) {
                        additionalProps.bindGetFormValues(() => props.values)
                    }
                    return GenericUrlParamsForm({ ...props })
                }}
            </Formik>
        </div>
    )
}
