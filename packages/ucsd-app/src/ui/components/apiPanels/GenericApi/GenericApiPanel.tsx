import * as React from "react"
import {
    HttpUrlParameters,
    ApiBrowser,
    IApiBrowserPageStateFormProps,
    ApiParameters,
    IHeaderContainerProps,
    IHttpHeader,
    ApiFullFormManager,
    IApiCallbackData,
} from "@geo-ball/component-lib"

import {
    IGenericGetUrlParams,
    IGenericGetBodyParams,
    IGenericGetApiResponse,
} from "./GenericApiService"
import { GenericGetApiCallDefinition } from "./GenericApiDefinition"

import {
    GenericUrlParamsForm,
    GenericBodyParamsForm,
    IGenericUrlParamsFormValues,
    GenericBodyParamsFormValues,
    GenericHeadersFormValues,
    IGenericBodyParamsFormValues,
    GenericUrlParamsFormContainer,
    GenericBodyParamsFormContainer,
} from "./Forms"
import { GenericUrlParamsFormValues } from "./Forms/GenericUrlParamsForm"
import { GenericFormContainer } from "./Forms/GenericFormContainer";

export interface IGenericApiPanelState {
    urlParamsForm: Optional<IGenericUrlParamsFormValues>
    bodyParamsForm: Optional<IGenericGetBodyParams>
    headersForm: Optional<Array<IHttpHeader>>
    apiResponse?: Optional<IGenericGetApiResponse>
}

export interface IGenericApiPanelProps {}

export interface IParamFormProps<TParamObj> {
    formData: TParamObj
    onSubmit: (formData: TParamObj) => void
}

export class GenericApiPanel extends React.Component<IGenericApiPanelProps, IGenericApiPanelState> {
    state: IGenericApiPanelState
    // ApiDef: ApiCallDefinition<IGenericGetApiResponse, IGenericGetUrlParams, IGenericGetBodyParams>;
    ApiDef: GenericGetApiCallDefinition
    constructor(props: IGenericApiPanelProps) {
        super(props)

        this.ApiDef = new GenericGetApiCallDefinition()

        this.state = {
            urlParamsForm: this.ApiDef.apiParams.urlParams.getInitialValues(),
            bodyParamsForm: this.ApiDef.apiParams.bodyParams.getInitialValues(),
            headersForm: this.ApiDef.apiParams.headers,
            apiResponse: undefined,
        }

        this.callTheApi = this.callTheApi.bind(this)
        this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this)
        this.updateBodyParamsForm = this.updateBodyParamsForm.bind(this)
    }

    //     callTheApi: (data: IApiCallbackData<TUrlParams, TBodyParams, TBodyParams>) => Promise<TApiResponse>;

    callTheApi(
        data?: Optional<
            IApiCallbackData<
                IGenericUrlParamsFormValues,
                GenericBodyParamsFormValues,
                GenericBodyParamsFormValues
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

    updateBodyParamsForm(bodyParamsForm: IGenericGetBodyParams): void {
        console.log("GenericApiPanel.updateBodyParamsForm:", bodyParamsForm)
        this.setState({ bodyParamsForm })
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
            IGenericBodyParamsFormValues
        >(
            new GenericUrlParamsFormValues(),
            new GenericBodyParamsFormValues(),
            new GenericBodyParamsFormValues(),
            // new GenericHeadersFormValues(),
        )

        const pageStateProps: IApiBrowserPageStateFormProps<
            IGenericGetApiResponse,
            IGenericUrlParamsFormValues,
            IGenericBodyParamsFormValues
        > = {
            header,
            apiFFM,
            forms: {
                query: GenericFormContainer(GenericUrlParamsForm),
                body: GenericFormContainer(GenericBodyParamsForm),
                // query: GenericUrlParamsFormContainer,
                // body: GenericBodyParamsFormContainer,
                // headers: GenericHeadersForm,
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

        // const queryFormProps: IParamFormProps<IGenericGetUrlParams> = {
        //     formData: this.state.urlParamsForm!,
        //     onSubmit: this.updateUrlParamsForm,
        // }

        // const bodyFormProps: IParamFormProps<IGenericGetBodyParams> = {
        //     formData: this.state.bodyParamsForm!,
        //     onSubmit: this.updateBodyParamsForm,
        // }

        // const x = <GenericApiParamsForm {...formProps} />
        console.log("GENERIC-API-PANEL")
        return (
            <div>
                <ApiBrowser<
                    IGenericGetApiResponse,
                    IGenericUrlParamsFormValues,
                    IGenericBodyParamsFormValues
                >
                    {...pageStateProps}
                />
            </div>
            //     <ApiPanelLayoutContainer>
            //         <HeaderContainer {...apiHeaderView} />
            //         <FormContainer>
            //             <GenericApiParamsForm {...formProps}>
            //                 {debugForm}
            //             </GenericApiParamsForm>
            //         </FormContainer>
            //         <ApiUrlParametersView {...apiUrlParamsView}>
            //         </ApiUrlParametersView>
            //         <ResultsContainer>
            //             {this.state.apiResponse}
            //         </ResultsContainer>
            //     </ApiPanelLayoutContainer>
        )
    }
}

// const GenericApiParamsForm = withFormik<IGenericApiParamsFormProps, IParamFormProps<IGenericGetUrlParams>>({
//     mapPropsToValues: (props: IGenericApiParamsFormProps) => {
//         // console.log('GenericApiParamsForm================================');
//         // // console.log('GenericApiParamsForm.this', this);
//         // console.log('GenericApiParamsForm.props', props);
//         // console.log('GenericApiParamsForm.props.formData', props.formData);
//         // console.log('GenericApiParamsForm.props.formData', { ...props.formData });
//         return { ...props.formData };
//     },
//     handleSubmit: (values: IGenericGetUrlParams, other) => {
//         console.log('GenericApiParamsForm.SUBMIT: values:', values);
//         console.log('GenericApiParamsForm.SUBMIT: other:', other);
//         other.props.onSubmit(values);
//     }
// })(GenericApiParamsFormView)
