import * as React from "react"

import { FormikConfig, FormikActions } from "formik"
import { getDefaultGenericFormValues, getFormikProps } from "./Forms/IGenericFormValues"
import { Pane, InlineFlex, Card } from "@geo-ball/component-lib"
import {
    GenericUrlParamsFormContainer,
    IGenericUrlParamsFormValues,
    IGenericHeadersFormValues,
    GenericHeadersFormContainer,
    IGenericBodyParamsFormValues,
    GenericBodyParamsFormContainer,
    IGenericFormValues,
} from "./Forms"

export interface IGenericApiFormsPanelState {}

export interface IGenericApiFormsPanelProps {}

export class GenericApiFormsPanel extends React.Component<
    IGenericApiFormsPanelProps,
    IGenericApiFormsPanelState
> {
    state: IGenericApiFormsPanelState
    constructor(props: IGenericApiFormsPanelProps) {
        super(props)

        this.state = {}

        this.fetchIt = this.fetchIt.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    fetchIt(): Promise<void> {
        console.log("GenericApiFormsPanel.fetchIt()")
        return Promise.resolve()
    }
    onSubmit(values: IGenericFormValues, actions: FormikActions<IGenericFormValues>) {
        console.log("GenericApiFormsPanel.onSubmit()", values, actions)
        // console.log("GTFP.onSubmit().values", values)
        // console.log(JSON.stringify(values, null, 4))
        // console.log("GTFP.onSubmit().actions", actions)
        setTimeout(() => {
            console.log("GTFP.onSubmit().delay. Returning.")
            actions.setSubmitting(false)
        }, 1)
    }

    render() {
        const formValues = getDefaultGenericFormValues()
        const formikProps = getFormikProps(formValues)
        console.log('GENERIC-API-FORMS-PANEL')

        return (
            <Pane backgroundColor="white700" padding="major-5">
                <InlineFlex justifyContent="space-evenly" width="100%">
                    <Card border="shadow" padding="major-2" title="URL Params">
                        <GenericUrlParamsFormContainer {...formikProps.urlParams} />
                    </Card>
                    <Card border="shadow" padding="major-2" title="Body Params">
                        <GenericBodyParamsFormContainer {...formikProps.bodyParams} />
                    </Card>
                    <Card border="shadow" padding="major-2" title="Headers">
                        <GenericHeadersFormContainer {...formikProps.headers} />
                    </Card>
                </InlineFlex>
            </Pane>
        )
    }
}
