import * as React from "react"
import { FormikInputField } from "@geo-ball/component-lib"

import { Form, FormikProps, Field } from "formik"

export interface IGenericHeadersFormValues {
    secret: string
}

export class GenericHeadersFormValues implements IGenericHeadersFormValues {
    secret: string
    constructor(secret: string = "") {
        this.secret = secret
    }
}

export const GenericHeadersForm = (props: FormikProps<IGenericHeadersFormValues>) => {
    console.log("GenericHeadersForm props", props)
    const { isSubmitting } = props
    // props.values.name
    return (
        <Form>
            <Field component={FormikInputField} name="secret" label="Secret" />
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    )
}
