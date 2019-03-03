import * as React from 'react';
import { ReactNode } from 'react';

import { ApiPanelLayoutContainer } from './Layout';
import { HeaderContainer, IHeaderContainerProps } from '../../organisms/Header';
import { FormContainer } from './Form';
import { ResultsContainer } from '../../organisms/Results';
import { IActionBarProps, ActionBar } from '../../organisms/ActionBar';
import { IActionBarDebugTogglesProps } from '../../organisms/ActionBar/DebugToggles';
import { ISubmitButtonProps } from '../../molecules/SubmitButton/SubmitButton';
import { SwitchProps } from '../../molecules/SwitchProps/SwitchProps';
import { ApiUrlParametersView } from '../../organisms/Parameters';
import { Formik, FormikProps } from 'formik';
import { Card, RkCard, Set, Pane, styled } from '../../atoms';
import { any } from 'glamor';
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
    queryFormData?: Optional<TUrlParams>;
    bodyFormData?: Optional<TBodyParams>;
    [key: string]: any;
}

export interface IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams> {
    header: IHeaderContainerProps;
    forms: {
        query?: {
            form: (props: FormikProps<TUrlParams>) => ReactNode,
            initialData: TUrlParams,
            getData: () => TUrlParams,
        }
    }
    queryForm?: (props: FormikProps<TUrlParams>) => ReactNode;
    // bodyForm?: (props: FormikProps<TBodyParams>) => ReactNode;
    formData: IApiBrowserPageState<TUrlParams, TBodyParams>;
    fetch: () => Promise<TApiResponse>;
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
        this.callApi = this.callApi.bind(this);
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
            execute: this.callApi,
            children: 'Submit request',
        };

        return {
            debugToggles,
            submitButtonProps,
        };
    }

    callApi(): Promise<any> {
        const { fetch } = this.props;
        console.log('ApiBrowser.callApi()');
        return fetch();
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

        debugToggles.mockApiCall.checked = local.mockApiCall;

        if (debugToggles.bodyParams) {
            debugToggles.bodyParams.debugForm.checked = local.bodyParamDebugForm;
            debugToggles.bodyParams.viewPanel.checked = local.bodyParamViewPanel;
        }
        if (debugToggles.queryParams) {
            debugToggles.queryParams.debugForm.checked = local.queryParamDebugForm;
            debugToggles.queryParams.viewPanel.checked = local.queryParamViewPanel;
        }
        const onSubmit = (_form: TUrlParams) => {};
        console.log('@@@@ this.props', this.props);
        const apiUrlParamsView = { formData: {} };
        // const QF = this.props.queryForm ? (
        //     <Formik initialState={{}} onSumbmit={onSubmit} render={props => {
        //         console.log('props:', props);
        //         // this.props.queryForm!(props)
        //         return <h1>Hey</h1>
        //     }} />
        // ) : null;
        const QF =
            this.props.queryForm && this.state.queryFormData ? (
                <Formik<TUrlParams>
                    initialValues={this.state.queryFormData}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 1000);
                    }}
                    render={props => this.props.queryForm!(props)}
                />
            ) : null;
        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...this.props.header} />
                <SectionCard elevation="400">{QF}</SectionCard>
                <ActionBar {...this.actionBarProps} />
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
