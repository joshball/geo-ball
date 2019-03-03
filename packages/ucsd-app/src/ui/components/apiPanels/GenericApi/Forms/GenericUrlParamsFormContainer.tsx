import * as React from "react"

import { Formik, FormikConfig } from "formik"
import { GenericUrlParamsForm, IGenericUrlParamsFormValues } from "./GenericUrlParamsForm"

export const GenericUrlParamsFormContainer = (
    formikProps: FormikConfig<IGenericUrlParamsFormValues>,
) => (
    <div>
        {/* <h1>GenericUrlParamsFormContainer</h1> */}
        <Formik {...formikProps} component={GenericUrlParamsForm} />
    </div>
)
