import * as React from "react"

import { Formik, FormikConfig } from "formik"
import { IGenericHeadersFormValues, GenericHeadersForm } from "./GenericHeadersForm"

export const GenericHeadersFormContainer = (
    formikProps: FormikConfig<IGenericHeadersFormValues>,
) => (
    <div>
        <Formik {...formikProps} component={GenericHeadersForm} />
    </div>
)
