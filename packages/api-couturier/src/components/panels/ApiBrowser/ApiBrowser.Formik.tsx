import * as React from 'react';

import { FormikErrors } from 'formik';

import { Switch, Card, styled, Hidden } from '@geo-ball/component-lib';

import { ApiPanelLayoutContainer } from './Layout';
import {
    IActionBarProps,
    ActionBar,
    ResultsContainer,
    HeaderContainer,
    IHeaderContainerProps,
} from '../../organisms';

import { ApiFormManager, ActionFormikConfig, ApiFormSectionMgr } from '../../../utils';

import { IApiCallbackData, IApiCallDefinition } from '../../../types';
import { UrlParamsSectionView } from '../../organisms/ApiFormSection';

const SectionCard = styled(Card)`
    margin: 30px 0px 20px 0px;
`;

export interface IApiBrowserPageState<TUrlParams = Optional<any>, TBodyParams = {}, THeaders = {}> {
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

export interface IApiBrowserPageStateFormProps<
    TApiResponse = Optional<any>,
    TUrlParams = Optional<any>,
    TBodyParams = Optional<any>,
    THeaders = Optional<any>
> {
    apiDef: IApiCallDefinition<TApiResponse, TUrlParams, TBodyParams, THeaders>;
    apiFormMgr: ApiFormManager<TUrlParams, TBodyParams, THeaders>;
    callTheApi: (
        data?: Optional<IApiCallbackData<TUrlParams, TBodyParams, THeaders>>,
    ) => Promise<TApiResponse | void>;
}

export class ApiBrowser<
    TApiResponse = Optional<any>,
    TUrlParams = Optional<any>,
    TBodyParams = Optional<any>,
    THeaders = Optional<any>
> extends React.Component<
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
            label,
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
            .then((d: any) => (d ? (formData.url = d) : null))
            .then(() => getBodyFormValues())
            .then((d: any) => (d ? (formData.body = d) : null))
            .then(() => getHeadersFormValues())
            .then((d: any) => (d ? (formData.headers = d) : null))
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
            .then((e: any) => (e ? (errors.url = e) : null))
            .then(() => validateBodyForm())
            .then((e: any) => (e ? (errors.body = e) : null))
            .then(() => validateHeadersForm())
            .then((e: any) => (e ? (errors.headers = e) : null))
            .then(() => {
                if (errors.url || errors.body || errors.headers) {
                    return errors;
                }
            });
    }

    private getFormCalls() {
        // const afm: ApiFormManager<TUrlParams, TBodyParams, THeaders> = this.props.apiFormMgr;
        const afm: any = this.props.apiFormMgr;
        const getIfNotNull = (prop: string, func: string) =>
            afm[prop] ? afm[prop][func] : undefined;
        return {
            validateUrlForm: getIfNotNull('urlParams', 'validateTheForm'),
            validateBodyForm: getIfNotNull('bodyParams', 'validateTheForm'),
            validateHeadersForm: getIfNotNull('headers', 'validateTheForm'),

            getUrlFormValues: getIfNotNull('urlParams', 'getFormValues'),
            getBodyFormValues: getIfNotNull('bodyParams', 'getFormValues'),
            getHeadersFormValues: getIfNotNull('headers', 'getFormValues'),
        };
        // return {
        //     validateUrlForm: this.props.apiFormMgr.urlParams.validateTheForm,
        //     validateBodyForm: this.props.apiFormMgr.bodyParams.validateTheForm,
        //     validateHeadersForm: this.props.apiFormMgr.headers.validateTheForm,
        //     getUrlFormValues: this.props.apiFormMgr.urlParams.getFormValues,
        //     getBodyFormValues: this.props.apiFormMgr.bodyParams.getFormValues,
        //     getHeadersFormValues: this.props.apiFormMgr.headers.getFormValues,
        // };
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

        const { urlParams, bodyParams, headers } = this.props.apiFormMgr;

        console.log('local.queryParamDebugForm:', local.queryParamDebugForm);
        console.log('BUG: UNCOMMENT BELOW');
        // if (urlParams) {
        //     console.log('local.urlParams.config:', urlParams.config);
        //     console.log('local.urlParams.config.addProps:', urlParams.config.additionalProps);
        // }
        // if (urlParams && urlParams.config.additionalProps) {
        //     urlParams.config.additionalProps.showDebugForm = local.queryParamDebugForm;
        // }
        // if (bodyParams && bodyParams.config.additionalProps) {
        //     bodyParams.config.additionalProps.showDebugForm = local.bodyParamDebugForm;
        // }

        const { formHeaderProps } = this.props.apiDef;
        const urlParamSection = urlParams ? <UrlParamsSectionView urlParams={urlParams} /> : null;
        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...formHeaderProps} />
                {urlParamSection}
                {/* <UrlParamsSectionView urlParams={urlParams} /> */}
                {/* <ApiFormSectionView title="Query Params" form={urlParams.form(urlParams.config)} /> */}
                {/* <ApiFormSectionView title="Body Params" form={bodyParams.form(bodyParams.config)} />
                <ApiFormSectionView title="Headers Params" form={headers.form(headers.config)} /> */}
                <ActionBar {...this.actionBarProps} />
                <ResultsContainer>{this.state.apiResults}</ResultsContainer>
            </ApiPanelLayoutContainer>
        );
    }
}
