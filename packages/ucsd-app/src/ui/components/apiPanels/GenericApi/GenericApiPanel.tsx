import * as React from 'react'
import {
    Heading,
    ApiCallDefinition,
    HttpUrlParameters,
    ApiBrowser,
    IApiBrowserPageStateFormProps,
    ApiParameters,
    IHeaderContainerProps
} from '@geo-ball/component-lib';
import {
    IGenericGetUrlParams,
    IGenericGetBodyParams,
    IGenericGetApiResponse,
    GenericApiService,
} from './GenericApiService';

// import { GenericApiParamsFormView, IGenericApiParamsFormProps } from './GenericApiParamsFormView';
// import { ApiPanelLayoutContainer } from '../common/ApiPanelLayoutContainer';
// import { HeaderContainer } from '../common/HeaderContainer';
// import { FormContainer } from '../common/FormContainer';
// import { ApiUrlParametersView } from '../common/ApiUrlParametersView';
// import { ResultsContainer } from '../common/ResultsContainer';

// import { withFormik, FormikConsumer } from "formik";
// import { DebugFormix } from '../../common/input/DebugFormix';
import { withFormik } from 'formik';
import { GenericGetApiCallDefinition } from './GenericApiDefinition';
import { IHttpHeader } from '../../../../../../component-lib/build/components/panels/ApiBrowser/ApiTypes';

export interface IGenericApiPanelState {
    urlParamsForm: Optional<IGenericGetUrlParams>;
    bodyParamsForm: Optional<IGenericGetBodyParams>;
    headersForm: Optional<Array<IHttpHeader>>;
    apiResponse?: Optional<IGenericGetApiResponse>;
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
    // ApiDef: ApiCallDefinition<IGenericGetApiResponse, IGenericGetUrlParams, IGenericGetBodyParams>;
    ApiDef: GenericGetApiCallDefinition;
    constructor(props: IGenericApiPanelProps) {
        super(props);

        this.ApiDef = new GenericGetApiCallDefinition();

        this.state = {
            urlParamsForm: this.ApiDef.apiParams.urlParams.getInitialValues(),
            bodyParamsForm: this.ApiDef.apiParams.bodyParams.getInitialValues(),
            headersForm: this.ApiDef.apiParams.headers,
            apiResponse: undefined,
        };


        this.fetchIt = this.fetchIt.bind(this);
        this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this);
        this.updateBodyParamsForm = this.updateBodyParamsForm.bind(this);
    }



    fetchIt(): Promise<IGenericGetApiResponse> {
        console.log('GenericApiPanel.fetchIt()')

        const urlParams = new HttpUrlParameters<IGenericGetUrlParams>(this.state.urlParamsForm);
        const apiParams = new ApiParameters(urlParams);
        // TODO handle submitting and disabling button - do it lower!
        return this.ApiDef.apiCallback(apiParams)
            .then((apiResponse: IGenericGetApiResponse) => {
                this.setState({ apiResponse });
                return apiResponse;
            });
    }



    updateUrlParamsForm(urlParamsForm: IGenericGetUrlParams): void {
        console.log('GenericApiPanel.updateUrlParamsForm:', urlParamsForm);
        this.setState({ urlParamsForm, });
    }


    updateBodyParamsForm(bodyParamsForm: IGenericGetBodyParams): void {
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

        const pageStateProps: IApiBrowserPageStateFormProps<IGenericGetApiResponse> = {
            header,
            formData: {
                showPanels: {
                    queryParamFormDebug: false,
                    bodyParamFormDebug: false,
                },
            },
            fetch: this.fetchIt
        };

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
                <ApiBrowser<IGenericGetApiResponse> {...pageStateProps}>
                    <Heading>hey hey7</Heading>
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
