import * as React from "react"
import { FormikInputField, ActionFormikProps } from "@geo-ball/component-lib"

import { Form, FormikProps, Field } from "formik"

export interface IGenericUrlParamsFormValues {
    id: string
    count: string
}

export class GenericUrlParamsFormValues implements IGenericUrlParamsFormValues {
    id: string
    count: string
    constructor(id: string = "", count: string = "10") {
        this.id = id
        this.count = count
    }
}

export const GenericUrlParamsForm = (props: ActionFormikProps<IGenericUrlParamsFormValues>) => {
    // console.log("GenericUrlParamsForm props", props)
    const { isSubmitting, additionalProps } = props
    // props.formikActions.bindSubmitForm
    // props.values.name
    // const DebugFormComponent =
    //     additionalProps && additionalProps.DebugFormComponent
    //         ? additionalProps.DebugFormComponent
    //         : () => <React.Fragment />
    // console.log("GenericUrlParamsFormContainer DebugFormComponent:", DebugFormComponent)
    // formikConfig.formikActions.bindSubmitForm;

    return (
        <React.Fragment>
            <Form>
                <Field component={FormikInputField} name="id" label="ID" />
                <Field component={FormikInputField} name="count" label="Count" type="number" />
                {/* <button type="submit" disabled={isSubmitting}>
                Submit
            </button> */}
            </Form>
        </React.Fragment>
    )
}