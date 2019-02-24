import * as React from 'react'
import {
    Heading,
    ApiCallDefinition,
    HttpUrlParameters,
    IApiParameters,
    ApiBrowser,
    IApiBrowserPageStateFormProps,
    ApiParameters,
    IHeaderContainerProps
} from '@geo-ball/component-lib';
import {
    IFakeGetUrlParams,
    IFakeGetBodyParams,
    IFakeGetApiResponse,
    FakeApiService,
} from './FakeApiService';

// import { GenericApiParamsFormView, IGenericApiParamsFormProps } from './GenericApiParamsFormView';
// import { ApiPanelLayoutContainer } from '../common/ApiPanelLayoutContainer';
// import { HeaderContainer } from '../common/HeaderContainer';
// import { FormContainer } from '../common/FormContainer';
// import { ApiUrlParametersView } from '../common/ApiUrlParametersView';
// import { ResultsContainer } from '../common/ResultsContainer';

// import { withFormik, FormikConsumer } from "formik";
// import { DebugFormix } from '../../common/input/DebugFormix';
import { withFormik } from 'formik';

export interface IGenericApiPanelState {
    urlParamsForm: Optional<IFakeGetUrlParams>;
    bodyParamsForm: Optional<IFakeGetBodyParams>;
    apiResponse?: Optional<IFakeGetApiResponse>;
}

export interface IGenericApiPanelProps {
}

export interface IParamFormProps<TParamObj> {
    formData: TParamObj;
    onSubmit: (formData: TParamObj) => void;
}



export class GenericApiPanel
    extends React.Component<IGenericApiPanelProps, IGenericApiPanelState> {

    state: IGenericApiPanelState;
    ApiDef: ApiCallDefinition<IFakeGetApiResponse, IFakeGetUrlParams, IFakeGetBodyParams>;
    constructor(props: IGenericApiPanelProps) {
        super(props);

        this.ApiDef = FakeApiService.GetApiCallDefinition()
        this.state = {
            urlParamsForm: this.ApiDef.apiParams.urlParams.getInitialValues(),
            bodyParamsForm: this.ApiDef.apiParams.bodyParams.getInitialValues(),
            apiResponse: undefined,
        };


        this.fetchIt = this.fetchIt.bind(this);
        this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this);
        this.updateBodyParamsForm = this.updateBodyParamsForm.bind(this);
    }



    fetchIt(): Promise<IFakeGetApiResponse> {
        const urlParams = new HttpUrlParameters<IFakeGetUrlParams>(this.state.urlParamsForm);
        const apiParams = new ApiParameters(urlParams);
        // TODO handle submitting and disabling button - do it lower!
        return this.ApiDef.apiCallback(apiParams)
            .then((apiResponse: IFakeGetApiResponse) => {
                this.setState({ apiResponse });
                return apiResponse;
            });
    }



    updateUrlParamsForm(urlParamsForm: IFakeGetUrlParams): void {
        console.log('GenericApiPanel.updateUrlParamsForm:', urlParamsForm);
        this.setState({ urlParamsForm, });
    }


    updateBodyParamsForm(bodyParamsForm: IFakeGetBodyParams): void {
        console.log('GenericApiPanel.updateBodyParamsForm:', bodyParamsForm);
        this.setState({ bodyParamsForm, });
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
            openUrlCb: (_url: string) => undefined
        };

        const pageStateProps: IApiBrowserPageStateFormProps<IFakeGetApiResponse> = {
            header,
            formData: {
                showPanels: {
                    queryParamFormDebug: false,
                    bodyParamFormDebug: false,
                },
            },
            fetch: this.fetchIt
        };

        // const queryFormProps: IParamFormProps<IFakeGetUrlParams> = {
        //     formData: this.state.urlParamsForm!,
        //     onSubmit: this.updateUrlParamsForm,
        // }

        // const bodyFormProps: IParamFormProps<IFakeGetBodyParams> = {
        //     formData: this.state.bodyParamsForm!,
        //     onSubmit: this.updateBodyParamsForm,
        // }


        // const x = <GenericApiParamsForm {...formProps} />

        return (
            <div>
                <ApiBrowser<IFakeGetApiResponse> {...pageStateProps}>
                    <Heading>hey</Heading>
                </ApiBrowser>
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
        );
    }
}

// const GenericApiParamsForm = withFormik<IGenericApiParamsFormProps, IParamFormProps<IFakeGetUrlParams>>({
//     mapPropsToValues: (props: IGenericApiParamsFormProps) => {
//         // console.log('GenericApiParamsForm================================');
//         // // console.log('GenericApiParamsForm.this', this);
//         // console.log('GenericApiParamsForm.props', props);
//         // console.log('GenericApiParamsForm.props.formData', props.formData);
//         // console.log('GenericApiParamsForm.props.formData', { ...props.formData });
//         return { ...props.formData };
//     },
//     handleSubmit: (values: IFakeGetUrlParams, other) => {
//         console.log('GenericApiParamsForm.SUBMIT: values:', values);
//         console.log('GenericApiParamsForm.SUBMIT: other:', other);
//         other.props.onSubmit(values);
//     }
// })(GenericApiParamsFormView)
