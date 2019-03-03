import * as React from "react"

import { Formik, FormikConfig } from "formik"
import { IGenericBodyParamsFormValues, GenericBodyParamsForm } from "./GenericBodyParamsForm"

export const GenericBodyParamsFormContainer = (
    formikProps: FormikConfig<IGenericBodyParamsFormValues>,
) => (
    <div>
        {/* <h1>GenericBodyParamsFormContainer</h1> */}
        <Formik {...formikProps} component={GenericBodyParamsForm} />
    </div>
)
