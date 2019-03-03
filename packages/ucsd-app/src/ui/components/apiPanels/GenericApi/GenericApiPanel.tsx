import * as React from "react"
import {
    Heading,
    ApiCallDefinition,
    HttpUrlParameters,
    ApiBrowser,
    IApiBrowserPageStateFormProps,
    ApiParameters,
    IHeaderContainerProps,
    IHttpHeader,
} from "@geo-ball/component-lib"
import {
    IGenericGetUrlParams,
    IGenericGetBodyParams,
    IGenericGetApiResponse,
    GenericApiService,
} from "./GenericApiService"
import { withFormik } from "formik"
import { GenericGetApiCallDefinition } from "./GenericApiDefinition"

import { GenericApiParamsFormView, IGenericApiParamsFormProps } from "./Forms/GenericApiParamsFormView"
import { GenericUrlParamsForm, getDefaultGenericFormValues, getFormikProps, IGenericUrlParamsFormValues } from "./Forms/index";
// import { ApiPanelLayoutContainer } from '../common/ApiPanelLayoutContainer';
// import { HeaderContainer } from '../common/HeaderContainer';
// import { FormContainer } from '../common/FormContainer';
// import { ApiUrlParametersView } from '../common/ApiUrlParametersView';
// import { ResultsContainer } from '../common/ResultsContainer';

// import { withFormik, FormikConsumer } from "formik";
// import { DebugFormix } from '../../common/input/DebugFormix';

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

        this.fetchIt = this.fetchIt.bind(this)
        this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this)
        this.updateBodyParamsForm = this.updateBodyParamsForm.bind(this)
    }

    fetchIt(): Promise<IGenericGetApiResponse> {
        console.log("GenericApiPanel.fetchIt()")

        const urlParams = new HttpUrlParameters<IGenericUrlParamsFormValues>(this.state.urlParamsForm)
        const apiParams = new ApiParameters(urlParams)
        // TODO handle submitting and disabling button - do it lower!
        return this.ApiDef.apiCallback(apiParams).then((apiResponse: IGenericGetApiResponse) => {
            this.setState({ apiResponse })
            return apiResponse
        })
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
        const formValues = getDefaultGenericFormValues()
        const formikProps = getFormikProps(formValues)

        const pageStateProps: IApiBrowserPageStateFormProps<
            IGenericGetApiResponse,
            IGenericUrlParamsFormValues,
            IGenericGetBodyParams
        > = {
            header,
            forms: {
                query: {
                    form: GenericUrlParamsForm,
                    initialData: formikProps.urlParams.initialValues,
                    getData: this.updateUrlParamsForm,
                }
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
            fetch: this.fetchIt,
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

        return (
            <div>
                <ApiBrowser<IGenericGetApiResponse, IGenericGetUrlParams, IGenericGetBodyParams>
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
