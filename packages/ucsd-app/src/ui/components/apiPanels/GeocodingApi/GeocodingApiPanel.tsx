import * as React from 'react';
import {
    INominatimParams,
    createNominatimParams,
    INominatimResult,
    INominatimQueryParamObj,
} from '@geo-ball/osm-data';

import {
    IGeocodingUrlParamsFormValues,
    GeocodingUrlParamsForm,
} from './Forms/GeocodingUrlParamsForm';
import { GeocodingApiDefinition, IGeocodingUrlParams } from './GeocodingApiDefinition';

import {
    ApiBrowser,
    IApiCallbackData,
    HttpUrlParameters,
    ApiParameters,
    IApiBrowserPageStateFormProps,
    ApiFormManager,
    ApiFormValuesTuple,
} from '@geo-ball/api-couturier';

export interface IGeocodingApiResponse {
    data: any;
}

export interface IGeocodingApiPanelProps {
    formData: INominatimParams;
}
export interface IGeocodingApiPanelState {
    // apiRequestParams: INominatimParams;
    apiResponse?: INominatimResult | any | undefined;
}

// IApiCallDefinition<TApiResponse, TUrlParams, TBodyParams, THeaders>
// IApiCallDefinition<IGeocodingApiResponse, IGeocodingUrlParamsFormValues>
type IGeocodingApiBrowserProps = IApiBrowserPageStateFormProps<
    IGeocodingApiResponse,
    IGeocodingUrlParamsFormValues
>;

const CreateApiFormManager = () => {
    const formVals = createNominatimParams();
    formVals.query.stringQuery.q = 'HEY QUERY';
    formVals.query.useStructured = true;
    const urlTuple = new ApiFormValuesTuple<IGeocodingUrlParamsFormValues>(
        formVals,
        (GeocodingUrlParamsForm as never) as JSX.Element,
    );
    return new ApiFormManager<IGeocodingUrlParamsFormValues>({ urlTuple });
};

export class GeocodingApiPanel extends React.Component<
    IGeocodingApiPanelProps,
    IGeocodingApiPanelState
> {
    state: IGeocodingApiPanelState;
    // // apiDef => IApiCallDefinition<IGeocodingApiResponse, IGeocodingUrlParamsFormValues>
    ApiDef: GeocodingApiDefinition;
    ApiFormMgr: ApiFormManager<IGeocodingUrlParamsFormValues>;

    constructor(props: IGeocodingApiPanelProps) {
        super(props);

        // const apiRequestParams = createNominatimParams(this.props.formData);
        // apiRequestParams.query.stringQuery.q = 'HEY QUERY';
        // apiRequestParams.query.useStructured = true;
        this.ApiDef = new GeocodingApiDefinition();
        this.ApiFormMgr = CreateApiFormManager();

        this.state = {
            // apiRequestParams,
            apiResponse: undefined,
        };
    }

    callTheApi(
        data?: Optional<IApiCallbackData<IGeocodingUrlParamsFormValues>>,
    ): Promise<IGeocodingApiResponse | void> {
        console.log('GenericApiPanel.callTheApi() data', data);
        if (data) {
            const urlParams = new HttpUrlParameters<IGeocodingUrlParamsFormValues>(
                data.url,
                // this.state.urlParamsForm,
            );
            const apiParams = new ApiParameters(urlParams);
            console.log('apiParams', apiParams);
            // TODO handle submitting and disabling button - do it lower!
            // return this.ApiDef.apiCallback(apiParams).then((apiResponse: IGeocodingApiResponse) => {
            //     this.setState({ apiResponse });
            //     return apiResponse;
            // });
        }
        return Promise.resolve();
    }

    render() {
        // apiDef => IApiCallDefinition<IGeocodingApiResponse, IGeocodingUrlParamsFormValues>
        const pageStateProps: IGeocodingApiBrowserProps = {
            apiDef: this.ApiDef,
            apiFormMgr: this.ApiFormMgr,
            callTheApi: this.callTheApi,
        };
        return <ApiBrowser {...pageStateProps} />;
    }
}
