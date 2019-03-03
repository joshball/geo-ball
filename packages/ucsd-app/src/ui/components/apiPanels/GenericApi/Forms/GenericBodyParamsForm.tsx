import * as React from "react"
import { FormikInputField } from "@geo-ball/component-lib"

import { Form, FormikProps, Field } from "formik"

export interface IGenericBodyParamsFormValues {
    query: string
}

export class GenericBodyParamsFormValues implements IGenericBodyParamsFormValues {
    query: string
    constructor(query: string = "") {
        this.query = query
    }
}

export const GenericBodyParamsForm = (props: FormikProps<IGenericBodyParamsFormValues>) => {
    console.log("GenericBodyParamsForm props", props)
    const { isSubmitting } = props
    // props.values.name
    return (
        <Form>
            <Field component={FormikInputField} name="query" label="Query" />
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </Form>
    )
}
