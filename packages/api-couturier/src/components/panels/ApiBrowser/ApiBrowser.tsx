import * as React from 'react';

import { FormikErrors } from 'formik';

import { Switch, Card, styled, Hidden } from '@geo-ball/component-lib';

import { ApiPanelLayoutContainer } from './Layout';
import {
    ApiUrlParametersView,
    IActionBarProps,
    ActionBar,
    ResultsContainer,
    HeaderContainer,
    IHeaderContainerProps,
} from '../../organisms';

import { ApiFullFormManager, ActionFormikConfig, IApiCallbackData } from '../../../utils';

const SectionCard = styled(Card)`
    margin: 30px 0px 20px 0px;
`;

export interface IApiBrowserPageState<TUrlParams, TBodyParams, THeaders> {
    local: {
        mockApiCall: boolean;
        queryParamDebugForm: boolean;
        queryParamViewPanel: boolean;
        bodyParamDebugForm: boolean;
        bodyParamViewPanel: boolean;
        [key: string]: any;
    };
    formData?: Optional<IApiCallbackData<TUrlParams, TBodyParams, THeaders>>;
    apiResults?: Optional<any>;
    [key: string]: any;
}

export interface IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams, THeaders> {
    header: IHeaderContainerProps;
    apiFFM: ApiFullFormManager<TUrlParams, TBodyParams, THeaders>;
    // forms: {
    //     query?: (props: ActionFormikConfig<TUrlParams>) => ReactNode;
    //     body?: (props: ActionFormikConfig<TBodyParams>) => ReactNode;
    //     headers?: (props: ActionFormikConfig<any>) => ReactNode;
    // };
    callTheApi: (
        data?: Optional<IApiCallbackData<TUrlParams, TBodyParams, THeaders>>,
    ) => Promise<TApiResponse | void>;
}

export class ApiBrowser<TApiResponse, TUrlParams, TBodyParams, THeaders> extends React.Component<
    IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams, THeaders>,
    IApiBrowserPageState<TUrlParams, TBodyParams, THeaders>
> {
    state: IApiBrowserPageState<TUrlParams, TBodyParams, THeaders>;
    actionBarProps: IActionBarProps;

    constructor(
        props: IApiBrowserPageStateFormProps<TApiResponse, TUrlParams, TBodyParams, THeaders>,
    ) {
        super(props);

        this.state = {
            local: {
                mockApiCall: false,
                queryParamDebugForm: false,
                queryParamViewPanel: false,
                bodyParamDebugForm: false,
                bodyParamViewPanel: false,
            },
            apiResults: {},
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

    // connectSwitch = (name: string, label: string): SwitchProps => {
    connectSwitch = (name: string, label: string): any => {
        return {
            name,
            checked: this.state.local[name],
            onChange: this.setLocalState,
            label: label,
        };
    };

    createActionBarProps(): IActionBarProps {
        return {
            mockApiCall: this.connectSwitch('mockApiCall', 'Fake API call'),
            submitButtonProps: {
                execute: this.submitTheRequest,
                children: 'Submit request',
            },
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
    }

    async collectAllFormData(): Promise<
        IApiCallbackData<TUrlParams, TBodyParams, THeaders> | undefined
    > {
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
                this.setState({ formData });
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

    render() {
        // console.log('RENDER', JSON.stringify(this.state, null, 4));
        const { local } = this.state;
        // const { debugToggles } = this.actionBarProps;

        console.log('@@@@ ApiBrowser RENDER(props,state)', this.props, this.state);
        // console.log('this.props', this.props);
        // console.log('this.state', this.state);
        // debugToggles.mockApiCall.checked = local.mockApiCall;

        // if (debugToggles.bodyParams) {
        //     debugToggles.bodyParams.debugForm.checked = local.bodyParamDebugForm;
        //     debugToggles.bodyParams.viewPanel.checked = local.bodyParamViewPanel;
        // }
        // if (debugToggles.queryParams) {
        //     debugToggles.queryParams.debugForm.checked = local.queryParamDebugForm;
        //     debugToggles.queryParams.viewPanel.checked = local.queryParamViewPanel;
        // }

        // const debugToggles: IActionBarDebugTogglesProps = {
        //     debugSwitches: {
        //         queryParams: connectSwitch('debugQueryParams', 'Debug Query Params'),
        //         bodyParams: connectSwitch('debugBodyParams', 'Debug Body Params'),
        //         headers: connectSwitch('debugHeaders', 'Debug Headers'),
        //     },
        // };

        const getFormSection = (
            form: any,
            config: ActionFormikConfig<any>,
            title: string,
            _viewPanel: string,
            _debugForm: string,
        ) => {
            // console.log('getFormSection form', form);
            // console.log('getFormSection config', config);
            // console.log('getFormSection title', title);
            // console.log('getFormSection debugForm', debugForm);
            // console.log('getFormSection local[debugForm]', local[debugForm]);
            // console.log('getFormSection viewPanel', viewPanel);
            // console.log('getFormSection local[viewPanel]', local[viewPanel]);
            const debugSwitch = this.connectSwitch('debugQueryParams', 'Debug Query Params');
            if (form) {
                const fd = this.state.formData ? this.state.formData.url : {};
                return (
                    <SectionCard elevation="400" title={title}>
                        {form(config)}
                        <Switch {...debugSwitch} />
                        <Hidden.Container>
                            {_hidden => (
                                <Hidden isVisible={false}>
                                    <ApiUrlParametersView formData={fd} />
                                </Hidden>
                            )}
                        </Hidden.Container>
                    </SectionCard>
                );
            }
            return null;
        };
        console.log('local.queryParamDebugForm:', local.queryParamDebugForm);
        console.log('local.urlParams.config:', this.props.apiFFM.urlParams.config);
        console.log(
            'local.urlParams.config.addProps:',
            this.props.apiFFM.urlParams.config.additionalProps,
        );
        if (this.props.apiFFM.urlParams.config.additionalProps) {
            this.props.apiFFM.urlParams.config.additionalProps.showDebugForm =
                local.queryParamDebugForm;
        }
        if (this.props.apiFFM.bodyParams.config.additionalProps) {
            this.props.apiFFM.bodyParams.config.additionalProps.showDebugForm =
                local.bodyParamDebugForm;
        }

        const QueryForm = getFormSection(
            // this.props.forms.query,
            this.props.apiFFM.urlParams.form,
            this.props.apiFFM.urlParams.config,
            'Query Params',
            'queryParamViewPanel',
            'queryParamDebugForm',
        );
        const BodyForm = getFormSection(
            this.props.apiFFM.bodyParams.form,
            this.props.apiFFM.bodyParams.config,
            'Body Params',
            'bodyParamViewPanel',
            'bodyParamDebugForm',
        );
        const HeadersForm = getFormSection(
            this.props.apiFFM.headers.form,
            this.props.apiFFM.headers.config,
            'Headers',
            'headersViewPanel',
            'headersDebugForm',
        );
        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...this.props.header} />
                {QueryForm}
                {BodyForm}
                {HeadersForm}
                {/* <SectionCard elevation="400">
                    <h2>FormVals:</h2>
                    <pre>{fvJson}</pre>
                </SectionCard> */}
                <ActionBar {...this.actionBarProps} />

                <ResultsContainer>{this.state.apiResults}</ResultsContainer>
            </ApiPanelLayoutContainer>
        );
    }
}
