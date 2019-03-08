import * as React from "react"
import { Form, Field, FormikProps } from "formik"
import { Card, Elevation, Button, Intent, FormGroup } from "@blueprintjs/core"
import { styles } from "../../../../config/theme/index"
import { css } from "glamor"
import { FormikTextArea } from "../../../common/input/FormikWrapped"
import { IGenericGetUrlParams } from "../GenericApiService"

const JDR = styles.justifyRight

// export interface IGenericApiParamsFormState {
//     formData: any;
// }

export interface IGenericApiParamsFormProps {
    formData: IGenericGetUrlParams
    onSubmit: (formData: IGenericGetUrlParams) => void
    children?: React.ReactNode
}

const mainFormWrapDiv = {
    display: "flex",
    height: "440px",
}
const mainQueryStyle = css({
    display: "flex",
    padding: "10px",
    width: "fit-content",
})
const queryColStyle = css({
    display: "inline-block",
    width: "100%",
})

//
// The caller gets to control the forms for parameters completely.
// They can use whatever library they want. We do require that the form
// have a 'reset' callback (we provide a button to reset it, but you can as well)
// Also,
// the user is done, they will hit submit to lock in their parameters
// There are a couple of things we need to wire it to the panel:
//  - callback to reset the form
//  - callback to get the latest form data
//  - callback to make sure the data is valid
//  - optional callback to process the data into key/value pairs
//  - optional callback to get final query string or body data
// For Each form we need:
// onSubmit
//

class IApiBrowserFormsCallbacks implements IApiBrowserFormsCallbacks {}

const wrapIt = (component: any) => {}
const foo = () => {
    // const x = new ApiFormData(wrapIt(GenericApiParamsFormView));
}

export const GenericApiParamsFormView = (
    props: IGenericApiParamsFormProps & FormikProps<IGenericGetUrlParams>,
) => {
    return (
        <Form>
            <div style={mainFormWrapDiv}>
                <div {...mainQueryStyle}>
                    <Card interactive={false} elevation={Elevation.TWO}>
                        <div {...queryColStyle}>
                            <FormGroup
                                style={JDR}
                                labelFor="query"
                                label="Query String"
                                inline={false}
                            >
                                <Field
                                    name="query"
                                    placeholder="Free form query"
                                    style={{ height: "232px" }}
                                    component={FormikTextArea}
                                    fill={true}
                                />
                            </FormGroup>
                            <FormGroup style={JDR} labelFor="debug" label="Debug" inline={true}>
                                <Field name="debug" />
                            </FormGroup>
                        </div>
                        <div style={JDR}>
                            <Button intent={Intent.PRIMARY} type="submit">
                                Submit
                            </Button>
                        </div>
                    </Card>
                </div>
                {props.children}
            </div>
        </Form>
    )
}
