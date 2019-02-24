// import * as React from 'react';

// import { colors } from './ApiStyles';
// import { IHeaderContainerProps, HeaderContainer } from './HeaderContainer';
// import { FormContainer, IApiUrlParametersFormProps } from './FormContainer';
// import { ApiUrlParametersView, IApiUrlParametersViewProps } from './ApiUrlParametersView';
// import { ApiActionsView, IApiActionsViewProps } from './ApiActionsView';
// import { ApiJsonResultsView, IApiJsonResultsViewProps } from './ApiJsonResultsView';
// import { ApiPanelLayoutContainer } from './ApiPanelLayoutContainer';

// export interface IApiPanelContainerProps {
//     apiHeaderView: IHeaderContainerProps;
//     apiUrlParamsForm: IApiUrlParametersFormProps;
//     apiUrlParamsView: IApiUrlParametersViewProps;
//     apiActionView: IApiActionsViewProps;
//     apiJsonResultsView: IApiJsonResultsViewProps;
// }


// export class ApiPanelContainer extends React.Component<IApiPanelContainerProps> {
//     render() {
//         const {
//             apiHeaderView,
//             apiUrlParamsForm,
//             apiUrlParamsView,
//             apiActionView,
//             apiJsonResultsView,
//         } = this.props;
//         return (
//             <ApiPanelLayoutContainer>
//                 <HeaderContainer {...apiHeaderView} />
//                 <FormContainer {...apiUrlParamsForm}>
//                     <h1>ApiUrlParametersForm</h1>
//                 </FormContainer>
//                 <ApiUrlParametersView {...apiUrlParamsView}>
//                     <h1>ApiUrlParametersView</h1>
//                 </ApiUrlParametersView>
//                 <ApiActionsView {...apiActionView}>
//                     <h1>ApiActionsView</h1>
//                 </ApiActionsView>
//                 <ApiJsonResultsView {...apiJsonResultsView}>
//                     <h1>ApiJsonResultsView</h1>
//                 </ApiJsonResultsView>
//             </ApiPanelLayoutContainer>);
//     }
// }


import * as React from 'react'
import { withFormik, FormikConsumer } from "formik";
import { DebugFormix } from '../../organisms/DebugFormix';

import { ApiPanelLayoutContainer } from './Layout';
import { HeaderContainer, IHeaderContainerProps } from '../../organisms/Header';
import { FormContainer } from './Form';
import { ApiUrlParametersView } from '../../organisms/Parameters';
import { ResultsContainer } from '../../organisms/Results';
import { IApiCallDefinition } from './ApiTypes';
import { ActionToggle } from '../../organisms/ActionToggle';
import { ActionButton } from '../../organisms/ActionButton';
import { IActionBarProps, ActionBar } from '../../organisms/ActionBar';
import { IDebugParamTogglesGroupProps, IActionBarDebugTogglesProps } from '../../organisms/ActionBar/DebugToggles';
// import { callApi } from './HTTP';



// (
//     ({ handleSubmit, handleChange, values, ...props }) => {
//         return (
//             <Question
//                 handleResponseSubmission={handleSubmit}
//                 handleResponseChange={handleChange}
//                 response={values.response}
//                 {...props}
//             />
//         );
//     }
// )



// export declare const
//     FormikProvider: React.ComponentClass<import("create-react-context").ProviderProps<FormikContext<any>>, any>,
//     FormikConsumer: React.ComponentClass<import("create-react-context").ConsumerProps<FormikContext<any>>, any>;

// export declare function connect<OuterProps, Values = {}>
//     (Comp: React.ComponentType<OuterProps & { formik: FormikContext<Values>; }>)
//     : React.ComponentType<OuterProps>;


// const GenericApiParamsForm = withFormik<IGenericApiParamsFormProps, IFakeGetApiParams>({
//     mapPropsToValues: (props: IGenericApiParamsFormProps) => {
//         FormikConsumer
//         console.log('GenericApiParamsForm================================');
//         console.log('GenericApiParamsForm.this', this);
//         console.log('GenericApiParamsForm.props', props);
//         console.log('GenericApiParamsForm.props.formData', props.formData);
//         console.log('GenericApiParamsForm.props.formData', { ...props.formData });
//         return { ...props.formData };
//     },
//     handleSubmit: (values: IFakeGetApiParams, other) => {
//         console.log('GenericApiParamsForm.SUBMIT: values:', values);
//         console.log('GenericApiParamsForm.SUBMIT: other:', other);
//         other.props.onSubmit(values);
//         // cons
//         // this.setState({
//         //     apiRequestParams: values,
//         // });
//     }
// })(GenericApiParamsFormView)





// export interface IApiFormData {
//     showUrlParamsDbg: boolean;
//     showBodyParamsDbg: boolean;
//     showUrlParamsFormDbg: boolean;
//     showBodyParamsFormDbg: boolean;
// }

// export interface IApiBrowserState {
//     urlParams: any;
//     bodyParams?: any;
//     formData: IApiFormData;
//     callingApi: boolean;
//     apiResponse?: any | undefined;
// }

// export interface IApiBrowserProps<TApiResponse> {
//     apiDef: IApiCallDefinition<TApiResponse>;
// }



export interface IApiBrowserPageState {
    showPanels: {
        queryParamFormDebug: boolean;
        bodyParamFormDebug: boolean;
    },
}

export interface IApiBrowserPageStateFormProps<TApiResponse> {
    header: IHeaderContainerProps;
    formData: IApiBrowserPageState;
    fetch: () => Promise<TApiResponse>;
}


export class ApiBrowser<TApiResponse> extends React.Component<IApiBrowserPageStateFormProps<TApiResponse>, IApiBrowserPageState> {

    state: IApiBrowserPageState;
    actionBarProps: IActionBarProps;

    constructor(props: IApiBrowserPageStateFormProps<TApiResponse>) {
        super(props);

        this.state = {
            showPanels: {
                queryParamFormDebug: false,
                bodyParamFormDebug: false,
            },
            // callingApi: false,
        };
        // this.callApi = this.callApi.bind(this);
        // this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this);

        this.actionBarProps = this.createActionBarProps();

    }

    createActionBarProps(): IActionBarProps {
        const fakeApiCall = new ActionToggle({
            toggle: () => undefined,
            label: "Fake the API call"
        });
        const queryParams: IDebugParamTogglesGroupProps = {
            groupLabel: 'Query Parameters',
            debugForm: new ActionToggle({
                toggle: () => undefined,
                label: "View Query Parameter Form"
            }),
            viewPanel: new ActionToggle({
                toggle: () => undefined,
                label: "View Query Parameters"
            }),
        }
        const bodyParams: IDebugParamTogglesGroupProps = {
            groupLabel: 'Body Parameters',
            debugForm: new ActionToggle({
                toggle: () => undefined,
                label: "View Body Parameter Form"
            }),
            viewPanel: new ActionToggle({
                toggle: () => undefined,
                label: "View Body Parameters"
            }),
        }
        const debugToggles: IActionBarDebugTogglesProps = {
            fakeApiCall,
            queryParams,
            bodyParams,
        };

        const requestButton = new ActionButton({
            execute: () => Promise.resolve(),
            label: "Send the request",
        })

        return {
            debugToggles,
            requestButton
        };
    }


    // callApi(): Promise<any> {
    //     const { api } = this.props;
    //     return api.apiCallback(this.state.urlParams, this.state.bodyParams);
    // }


    // updateUrlParamsForm(urlParams: any): void {
    //     console.log('Got form data:', urlParams);
    //     this.setState({
    //         urlParams: urlParams,
    //     });
    // }


    render() {

        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...this.props.header} />
                <FormContainer>
                    {this.props.children}
                    {/* <GenericApiParamsForm {...formProps}>
                        {debugForm}
                    </GenericApiParamsForm> */}
                </FormContainer>
                {/* <ApiUrlParametersView {...apiUrlParamsView}>
                </ApiUrlParametersView> */}
                <ActionBar {...this.actionBarProps} />
                <ResultsContainer>
                    <h1>RESPONSE GOES HERE</h1>
                </ResultsContainer>
            </ApiPanelLayoutContainer>);
    }
}

