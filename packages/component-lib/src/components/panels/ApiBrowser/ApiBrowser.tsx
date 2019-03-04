import * as React from 'react';
import { ReactNode } from 'react';
import { Formik, FormikProps, Form, Field, FormikErrors } from 'formik';

import { ApiPanelLayoutContainer } from './Layout';
import { HeaderContainer, IHeaderContainerProps } from '../../organisms/Header';
import { ResultsContainer } from '../../organisms/Results';
import { IActionBarProps, ActionBar } from '../../organisms/ActionBar';
import { IActionBarDebugTogglesProps } from '../../organisms/ActionBar/DebugToggles';
import { ISubmitButtonProps } from '../../molecules/SubmitButton/SubmitButton';
import { SwitchProps } from '../../molecules/SwitchProps/SwitchProps';
import {
    ApiFullFormManager,
    ActionFormikProps,
    ActionFormikConfig,
    IApiCallbackData,
} from '../../../types/ApiBrowser/IApiBrowserFormsCallbacks';
import { Card, styled, FormikInputField } from '../../atoms';

const SectionCard = styled(Card)`
    margin: 50px 0px 30px 0px;
`;
export interface IApiBrowserPageState<TUrlParams, TBodyParams> {
    local: {
        mockApiCall: boolean;
        queryParamDebugForm: boolean;
        queryParamViewPanel: boolean;
        bodyParamDebugForm: boolean;
        bodyParamViewPanel: boolean;
        [key: string]: any;
    };
    formData?: Optional<IApiCallbackData<TUrlParams, TBodyParams, TBodyParams>>;
    queryFormData?: Optional<TUrlParams>;
    bodyFormData?: Optional<TBodyParams>;
    [key: string]: any;
}

export interface IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams> {
    header: IHeaderContainerProps;
    apiFFM: ApiFullFormManager<TUrlParams, TBodyParams, TBodyParams>;
    forms: {
        query?: (props: ActionFormikConfig<TUrlParams>) => ReactNode;
        body?: (props: ActionFormikConfig<TBodyParams>) => ReactNode;
        headers?: (props: ActionFormikConfig<any>) => ReactNode;
    };
    queryForm?: (props: FormikProps<TUrlParams>) => ReactNode;
    // bodyForm?: (props: FormikProps<TBodyParams>) => ReactNode;
    formData: IApiBrowserPageState<TUrlParams, TBodyParams>;
    callTheApi: (data?: Optional<IApiCallbackData<TUrlParams, TBodyParams, TBodyParams>>) => Promise<TApiResponse>;
}
// import posed from 'react-pose';

// const Content = posed.div({
//     closed: { height: 0 },
//     open: { height: 'auto' },
// });

export class ApiBrowser<TApiResponse, TUrlParams, TBodyParams> extends React.Component<
    IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams>,
    IApiBrowserPageState<TUrlParams, TBodyParams>
> {
    state: IApiBrowserPageState<TUrlParams, TBodyParams>;
    actionBarProps: IActionBarProps;

    constructor(props: IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams>) {
        super(props);

        this.state = {
            local: {
                mockApiCall: false,
                queryParamDebugForm: false,
                queryParamViewPanel: false,
                bodyParamDebugForm: false,
                bodyParamViewPanel: false,
            },
            queryFormData: this.props.formData.queryFormData,
            bodyFormData: this.props.formData.bodyFormData,
        };
        this.submitTheRequest = this.submitTheRequest.bind(this);
        this.setLocalState = this.setLocalState.bind(this);
        // this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this);

        this.actionBarProps = this.createActionBarProps();
    }

    setLocalState(event: any) {
        // event.persist();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(`setLocalState(${name}=>${value})`);
        console.log('setLocalState() state.local', this.state.local);

        this.setState({
            local: {
                ...this.state.local,
                [name]: value,
            },
        });
        // this.setState(({ local }) => ({
        //     local: {
        //         ...local,
        //         [name]: value,
        //     },
        // }));
    }

    createActionBarProps(): IActionBarProps {
        const connectSwitch = (name: string, label: string): SwitchProps => {
            return {
                name,
                checked: this.state.local[name],
                onChange: this.setLocalState,
                label: label,
            };
        };

        const debugToggles: IActionBarDebugTogglesProps = {
            mockApiCall: connectSwitch('mockApiCall', 'Fake API call'),
            queryParams: {
                groupLabel: 'Query Parameters',
                debugForm: connectSwitch('queryParamDebugForm', 'Debug Form'),
                viewPanel: connectSwitch('queryParamViewPanel', 'Show Params'),
            },
            bodyParams: {
                groupLabel: 'Body Parameters',
                debugForm: connectSwitch('bodyParamDebugForm', 'Debug Form'),
                viewPanel: connectSwitch('bodyParamViewPanel', 'Show Params'),
            },
        };

        const submitButtonProps: ISubmitButtonProps = {
            execute: this.submitTheRequest,
            children: 'Submit request',
        };

        return {
            debugToggles,
            submitButtonProps,
        };
    }

    submitTheRequest() {
        console.log('submitTheRequest() calling submit the form!!!!!');

        return this.validateAllFormData()
            .then(e => (e ? this.collectAllFormData() : undefined))
            .then(data => {
                console.log('data', data);
                return data;
            })
            .then(data => {
                console.log('this.props.callTheApi', this.props.callTheApi);
                this.props.callTheApi(data);
                return undefined;
            });
        // return (
        //     this.validateAllFormData()
        //         .then(e => (e ? this.collectAllFormData() : undefined))
        //         // .then((data: IApiCallbackData<TUrlParams, TBodyParams, TBodyParams> | undefined) => {
        //         .then(data => {
        //             console.log('data', data);
        //         })
        //         .then(() => {
        //             console.log('DONE we need to turn off submitting');
        //         })
        // );
    }

    // src/components/panels/ApiBrowser/ApiBrowser.tsx:151:19 -
    // error TS2345:
    // Argument of type
    // '(data: IApiCallbackData<TUrlParams, TBodyParams, TBodyParams> | undefined) => Promise<TApiResponse> | undefined'
    // is not assignable to parameter of type
    // '(value: IApiCallbackData<TUrlParams, TBodyParams, TBodyParams> | undefined) => TApiResponse | PromiseLike<TApiResponse>'.
    // Type 'Promise<TApiResponse> | undefined' is not assignable to type 'TApiResponse | PromiseLike<TApiResponse>'.
    //   Type 'undefined' is not assignable to type 'TApiResponse | PromiseLike<TApiResponse>'.



    async collectAllFormData(): Promise<IApiCallbackData<TUrlParams, TBodyParams, TBodyParams> | undefined> {
        console.log('collectAllFormData() calling submit the form!!!!!');
        const { getUrlFormValues, getBodyFormValues, getHeadersFormValues } = this.getFormCalls();
        const formData: any = {};
        return getUrlFormValues()
            .then(d => (d ? (formData.url = d) : null))
            .then(() => getBodyFormValues())
            .then(d => (d ? (formData.body = d) : null))
            .then(() => getHeadersFormValues())
            .then(d => (d ? (formData.headers = d) : null))
            .then(() => {
                this.setState({formData})
                if (formData.url || formData.body || formData.headers) {
                    return formData;
                }
            });
    }

    async validateAllFormData(): Promise<FormikErrors<any> | void> {
        console.log('validateAllFormData() calling submit the form!!!!!');
        const { validateUrlForm, validateBodyForm, validateHeadersForm } = this.getFormCalls();
        const errors: any = {};
        return validateUrlForm()
            .then(e => (e ? (errors.url = e) : null))
            .then(() => validateBodyForm())
            .then(e => (e ? (errors.body = e) : null))
            .then(() => validateHeadersForm())
            .then(e => (e ? (errors.headers = e) : null))
            .then(() => {
                if (errors.url || errors.body || errors.headers) {
                    return errors;
                }
            });
        // return this.props.apiFFM.urlParams
        //     .validateTheForm()
        //     .then(e => (e ? (errors.url = e) : null))
        //     .then(() => this.props.apiFFM.bodyParams.validateTheForm())
        //     .then(e => (e ? (errors.body = e) : null))
        //     .then(() => this.props.apiFFM.headers.validateTheForm())
        //     .then(e => (e ? (errors.headers = e) : null))
        //     .then(() => {
        //         if (errors.url || errors.body || errors.headers) {
        //             return errors;
        //         }
        //     });
    }

    private getFormCalls() {
        return {
            validateUrlForm: this.props.apiFFM.urlParams.validateTheForm,
            validateBodyForm: this.props.apiFFM.bodyParams.validateTheForm,
            validateHeadersForm: this.props.apiFFM.headers.validateTheForm,
            getUrlFormValues: this.props.apiFFM.urlParams.getFormValues,
            getBodyFormValues: this.props.apiFFM.bodyParams.getFormValues,
            getHeadersFormValues: this.props.apiFFM.headers.getFormValues,
        };
    }

    // updateUrlParamsForm(urlParams: any): void {
    //     console.log('Got form data:', urlParams);
    //     this.setState({
    //         urlParams: urlParams,
    //     });
    // }

    render() {
        // console.log('RENDER', JSON.stringify(this.state, null, 4));
        const { local } = this.state;
        const { debugToggles } = this.actionBarProps;

        console.log('@@@@ ApiBrowser RENDER');
        console.log('this.props', this.props);
        console.log('this.state', this.state);
        debugToggles.mockApiCall.checked = local.mockApiCall;

        if (debugToggles.bodyParams) {
            debugToggles.bodyParams.debugForm.checked = local.bodyParamDebugForm;
            debugToggles.bodyParams.viewPanel.checked = local.bodyParamViewPanel;
        }
        if (debugToggles.queryParams) {
            debugToggles.queryParams.debugForm.checked = local.queryParamDebugForm;
            debugToggles.queryParams.viewPanel.checked = local.queryParamViewPanel;
        }

        // const formValues = this.props.apiFFM.urlParams.getFormValues();
        const fvJson = JSON.stringify(this.state.formData, undefined, 4);
        console.log('*** this.state.formData:', this.state.formData);
        console.log('*** this.state.formData:', fvJson);
        const QueryForm = this.props.forms.query ? this.props.forms.query!(this.props.apiFFM.urlParams.config) : null;
        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...this.props.header} />
                <SectionCard elevation="400">{QueryForm}</SectionCard>
                <ActionBar {...this.actionBarProps} />
                <SectionCard elevation="400">
                    <h2>FormVals:</h2>
                    <pre>{fvJson}</pre>
                </SectionCard>

                {/* <Hidden.Container>
                    {_hidden => (
                        <Hidden isVisible={local.bodyParamDebugForm}>
                            <ApiUrlParametersView {...apiUrlParamsView} />
                        </Hidden>
                    )}
                </Hidden.Container> */}
                <React.Fragment>
                    <h1>Accordian demo</h1>
                    <React.Fragment>
                        {/* <Content className="content" pose={local.bodyParamViewPanel ? 'open' : 'closed'}>
                            <div className="content-wrapper">
                                <ResultsContainer>{this.actionBarProps}</ResultsContainer>
                            </div>
                        </Content> */}
                    </React.Fragment>
                </React.Fragment>
                <ResultsContainer>{this.actionBarProps}</ResultsContainer>
            </ApiPanelLayoutContainer>
        );
    }
}

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

// const GenericApiParamsForm = withFormik<IGenericApiParamsFormProps, IGenericGetApiParams>({
//     mapPropsToValues: (props: IGenericApiParamsFormProps) => {
//         FormikConsumer
//         console.log('GenericApiParamsForm================================');
//         console.log('GenericApiParamsForm.this', this);
//         console.log('GenericApiParamsForm.props', props);
//         console.log('GenericApiParamsForm.props.formData', props.formData);
//         console.log('GenericApiParamsForm.props.formData', { ...props.formData });
//         return { ...props.formData };
//     },
//     handleSubmit: (values: IGenericGetApiParams, other) => {
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
