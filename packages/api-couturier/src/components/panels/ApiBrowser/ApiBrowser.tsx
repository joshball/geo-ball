import * as React from 'react';

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
import { ApiFormSectionView } from '../../organisms/ApiFormSection/ApiFormSectionView';
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
        headersDebugForm: boolean;
        headersViewPanel: boolean;
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
                headersDebugForm: false,
                headersViewPanel: false,
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
        return Promise.resolve();
        // return this.validateAllFormData()
        //     .then(e => (e ? this.collectAllFormData() : undefined))
        //     .then(data => {
        //         console.log('data', data);
        //         return data;
        //     })
        //     .then(data => {
        //         console.log('this.props.callTheApi', this.props.callTheApi);
        //         this.props.callTheApi(data);
        //         return undefined;
        //     });
    }

    render() {
        // console.log('RENDER', JSON.stringify(this.state, null, 4));
        console.log('@@@@ ApiBrowser RENDER(props,state)', this.props, this.state);
        // const { local } = this.state;
        const { formHeaderProps } = this.props.apiDef;

        const { urlParams, bodyParams, headers } = this.props.apiFormMgr;

        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...formHeaderProps} />
                <UrlParamsSectionView urlParams={urlParams} />
                <ActionBar {...this.actionBarProps} />
                <ResultsContainer>{this.state.apiResults}</ResultsContainer>
            </ApiPanelLayoutContainer>
        );
    }
}
