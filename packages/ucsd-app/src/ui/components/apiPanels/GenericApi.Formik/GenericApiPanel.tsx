import * as React from 'react';
import {
    HttpUrlParameters,
    ApiBrowser,
    IApiBrowserPageStateFormProps,
    ApiParameters,
    ApiFormManager,
    IApiCallbackData,
} from '@geo-ball/api-couturier';

import {
    IGenericUrlParamsFormValues,
    IGenericBodyParamsFormValues,
    IGenericHeadersFormValues,
} from './Forms';

import { IGenericApiResponse } from './GenericApiService';
import { GenericApiDefinition } from './GenericApiDefinition';
import { CreateApiFormManagerFormik } from './GenericApiFormManager';

export interface IGenericApiPanelState {
    apiResponse?: Optional<IGenericApiResponse>;
}

export interface IGenericApiPanelProps {}

export interface IParamFormProps<TParamObj> {
    formData: TParamObj;
    onSubmit: (formData: TParamObj) => void;
}

type IGenericApiBrowserProps = IApiBrowserPageStateFormProps<
    IGenericApiResponse,
    IGenericUrlParamsFormValues,
    IGenericBodyParamsFormValues,
    IGenericHeadersFormValues
>;

// type GenericApiBrowser = ApiBrowser<
//     IGenericGetApiResponse,
//     IGenericUrlParamsFormValues,
//     IGenericBodyParamsFormValues,
//     IGenericHeadersFormValues
// >

export class GenericApiPanel extends React.Component<IGenericApiPanelProps, IGenericApiPanelState> {
    state: IGenericApiPanelState;
    ApiDef: GenericApiDefinition;
    ApiFormMgr: ApiFormManager<
        IGenericUrlParamsFormValues,
        IGenericBodyParamsFormValues,
        IGenericHeadersFormValues
    >;

    constructor(props: IGenericApiPanelProps) {
        super(props);

        this.ApiDef = new GenericApiDefinition();
        this.ApiFormMgr = CreateApiFormManagerFormik();

        this.state = {
            apiResponse: undefined,
        };

        this.callTheApi = this.callTheApi.bind(this);
    }

    // callTheApi: (data?: Optional<IApiCallbackData<TUrlParams, TBodyParams, TBodyParams>>) => Promise<TApiResponse>;
    callTheApi(
        data?: Optional<
            IApiCallbackData<
                IGenericUrlParamsFormValues,
                IGenericBodyParamsFormValues,
                IGenericHeadersFormValues
            >
        >,
    ): Promise<IGenericApiResponse | void> {
        console.log('GenericApiPanel.callTheApi() data', data);
        if (data) {
            const urlParams = new HttpUrlParameters<IGenericUrlParamsFormValues>(
                data.url,
                // this.state.urlParamsForm,
            );
            const apiParams = new ApiParameters(urlParams);
            // TODO handle submitting and disabling button - do it lower!
            return this.ApiDef.apiCallback(apiParams).then((apiResponse: IGenericApiResponse) => {
                this.setState({ apiResponse });
                return apiResponse;
            });
        }
        return Promise.resolve();
    }

    render() {
        const pageStateProps: IGenericApiBrowserProps = {
            apiDef: this.ApiDef,
            apiFormMgr: this.ApiFormMgr,
            callTheApi: this.callTheApi,
        };

        console.log('GENERIC-API-PANEL');
        return (
            <div>
                <ApiBrowser {...pageStateProps} />
                {/* <ApiBrowser<
                    IGenericGetApiResponse,
                    IGenericUrlParamsFormValues,
                    IGenericBodyParamsFormValues,
                    IGenericHeadersFormValues
                >
                    {...pageStateProps}
                /> */}
            </div>
        );
    }
}
