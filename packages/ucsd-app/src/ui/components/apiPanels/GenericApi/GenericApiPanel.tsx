import * as React from "react"
import {
    HttpUrlParameters,
    ApiBrowser,
    IApiBrowserPageStateFormProps,
    ApiParameters,
    IHeaderContainerProps,
    ApiFullFormManager,
    IApiCallbackData,
} from "@geo-ball/component-lib"

import { IGenericGetApiResponse } from "./GenericApiService"
import { GenericGetApiCallDefinition } from "./GenericApiDefinition"

import {
    GenericUrlParamsForm,
    GenericBodyParamsForm,
    IGenericUrlParamsFormValues,
    GenericBodyParamsFormValues,
    GenericHeadersFormValues,
    IGenericBodyParamsFormValues,
    IGenericHeadersFormValues,
    GenericHeadersForm,
} from "./Forms"
import { GenericUrlParamsFormValues } from "./Forms/GenericUrlParamsForm"
import { GenericFormContainer } from "./Forms/GenericFormContainer"

export interface IGenericApiPanelState {
    urlParamsForm: Optional<IGenericUrlParamsFormValues>
    bodyParamsForm: Optional<IGenericBodyParamsFormValues>
    headersForm: Optional<IGenericHeadersFormValues>
    apiResponse?: Optional<IGenericGetApiResponse>
}

export interface IGenericApiPanelProps {}

export interface IParamFormProps<TParamObj> {
    formData: TParamObj
    onSubmit: (formData: TParamObj) => void
}

export class GenericApiPanel extends React.Component<IGenericApiPanelProps, IGenericApiPanelState> {
    state: IGenericApiPanelState
    ApiDef: GenericGetApiCallDefinition
    constructor(props: IGenericApiPanelProps) {
        super(props)

        this.ApiDef = new GenericGetApiCallDefinition()

        this.state = {
            urlParamsForm: this.ApiDef.apiParams.urlParams.getInitialValues(),
            bodyParamsForm: this.ApiDef.apiParams.bodyParams.getInitialValues(),
            headersForm: this.ApiDef.apiParams.headers.getInitialValues(),
            apiResponse: undefined,
        }

        this.callTheApi = this.callTheApi.bind(this)
        this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this)
        this.updateBodyParamsForm = this.updateBodyParamsForm.bind(this)
        this.updateHeadersForm = this.updateHeadersForm.bind(this)
    }

    // callTheApi: (data?: Optional<IApiCallbackData<TUrlParams, TBodyParams, TBodyParams>>) => Promise<TApiResponse>;
    callTheApi(
        data?: Optional<
            IApiCallbackData<
                IGenericUrlParamsFormValues,
                IGenericBodyParamsFormValues,
                IGenericHeadersFormValues
            >
        >,
    ): Promise<IGenericGetApiResponse | void> {
        console.log("GenericApiPanel.callTheApi() data", data)
        if (data) {
            const urlParams = new HttpUrlParameters<IGenericUrlParamsFormValues>(
                data.url,
                // this.state.urlParamsForm,
            )
            const apiParams = new ApiParameters(urlParams)
            // TODO handle submitting and disabling button - do it lower!
            return this.ApiDef.apiCallback(apiParams).then(
                (apiResponse: IGenericGetApiResponse) => {
                    this.setState({ apiResponse })
                    return apiResponse
                },
            )
        }
        return Promise.resolve()
    }

    updateUrlParamsForm(urlParamsForm: IGenericUrlParamsFormValues): void {
        console.log("GenericApiPanel.updateUrlParamsForm:", urlParamsForm)
        this.setState({ urlParamsForm })
    }

    updateBodyParamsForm(bodyParamsForm: IGenericBodyParamsFormValues): void {
        console.log("GenericApiPanel.updateBodyParamsForm:", bodyParamsForm)
        this.setState({ bodyParamsForm })
    }
    updateHeadersForm(headersForm: IGenericHeadersFormValues): void {
        console.log("GenericApiPanel.updateHeadersForm:", headersForm)
        this.setState({ headersForm })
    }

    // updateHeadersForm(_headersForm: any): void {
    //     console.log('GenericApiPanel.updateHeadersForm:', _headersForm);
    //     this.setState({
    //         _headersForm,
    //     });
    // }

    render() {
        const header: IHeaderContainerProps = {
            name: "Generic API",
            helpUrl: "https://wiki.openstreetmap.org/wiki/Nominatim",
            openUrlCb: (_url: string) => undefined,
        }

        const apiFFM = new ApiFullFormManager<
            IGenericUrlParamsFormValues,
            IGenericBodyParamsFormValues,
            IGenericHeadersFormValues
        >(
            new GenericUrlParamsFormValues(),
            new GenericBodyParamsFormValues(),
            new GenericHeadersFormValues(),
            // new GenericHeadersFormValues(),
        )

        const pageStateProps: IApiBrowserPageStateFormProps<
            IGenericGetApiResponse,
            IGenericUrlParamsFormValues,
            IGenericBodyParamsFormValues,
            IGenericHeadersFormValues
        > = {
            header,
            apiFFM,
            forms: {
                query: GenericFormContainer(GenericUrlParamsForm),
                body: GenericFormContainer(GenericBodyParamsForm),
                headers: GenericFormContainer(GenericHeadersForm),
            },
            formData: {
                local: {
                    mockApiCall: false,
                    queryParamDebugForm: false,
                    queryParamViewPanel: false,
                    bodyParamDebugForm: false,
                    bodyParamViewPanel: false,
                },
                queryFormData: this.state.urlParamsForm,
                bodyFormData: this.state.bodyParamsForm,
            },
            callTheApi: this.callTheApi,
        }


        console.log("GENERIC-API-PANEL")
        return (
            <div>
                <ApiBrowser<
                    IGenericGetApiResponse,
                    IGenericUrlParamsFormValues,
                    IGenericBodyParamsFormValues,
                    IGenericHeadersFormValues
                >
                    {...pageStateProps}
                />
            </div>
        )
    }
}
