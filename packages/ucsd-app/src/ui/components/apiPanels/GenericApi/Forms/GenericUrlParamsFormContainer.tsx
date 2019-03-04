import * as React from "react"

import { Formik, FormikConfig } from "formik"
import { GenericUrlParamsForm, IGenericUrlParamsFormValues } from "./GenericUrlParamsForm"
import {
    ActionFormikConfig,
    ActionFormikProps,
    BindAdditionalPropsToForm,
} from "@geo-ball/component-lib"

export const GenericUrlParamsFormContainer = (
    formikConfig: ActionFormikConfig<IGenericUrlParamsFormValues>,
) => {
    // console.log("GenericUrlParamsFormContainer formikConfig:", formikConfig)
    console.log("GenericUrlParamsFormContainer GenericUrlParamsForm:", GenericUrlParamsForm)

    return (
        <div>
            {/* <h1>GenericUrlParamsFormContainer</h1> */}
            <Formik {...formikConfig}>
                {BindAdditionalPropsToForm(formikConfig, GenericUrlParamsForm)}
            </Formik>
        </div>
    )
}
