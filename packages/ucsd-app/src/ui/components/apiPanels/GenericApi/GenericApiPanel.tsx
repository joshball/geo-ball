import * as React from 'react'
import { NominatimParams, INominatimResult } from '@geo-ball/osm-data';
import { ApiPanelContainer, IApiPanelContainerProps } from '../common/ApiPanelContainer';
import { IFakeGetApiParams, FakeApiService, IFakeGetApiResult } from './FakeApiService';
import { GenericApiParamsForm, IGenericApiParamsFormProps } from './GenericApiParamsForm';
import { ApiPanelLayoutContainer } from '../common/ApiPanelLayoutContainer';
import { ApiHeaderView } from '../common/ApiHeaderView';
import { ApiUrlParametersForm } from '../common/ApiUrlParametersForm';
import { ApiUrlParametersView } from '../common/ApiUrlParametersView';
import { ApiActionsView } from '../common/ApiActionsView';
import { ApiJsonResultsView } from '../common/ApiJsonResultsView';



export interface IGenericApiPanelState {
    apiRequestParams?: IFakeGetApiParams | undefined;
    apiResponse?: IFakeGetApiResult | any | undefined;
}

export interface IGenericApiPanelProps {
    apiCallback: (query: any) => Promise<any>;
}



export class GenericApiPanel extends React.Component<IGenericApiPanelProps, IGenericApiPanelState> {
    state: IGenericApiPanelState;
    constructor(props: IGenericApiPanelProps) {
        super(props);
        this.state = {
            apiRequestParams: {
                query: 'some query string',
                skip: 1,
                take: 2,
                debug: true
            },
            apiResponse: {},
        };
        this.fetchIt = this.fetchIt.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
    }

    fetchIt(): Promise<IFakeGetApiResult> {
        if (this.state.apiRequestParams) {
            return FakeApiService.FetchWithGet(this.state.apiRequestParams)
                .then((apiResponse: IFakeGetApiResult) => {
                    this.setState({ apiResponse });
                    return apiResponse;
                });
        }
        throw new Error('Should not call fetch with apiRequestParams set!')
    }
    updateFormData(formData: IFakeGetApiParams): void {
        console.log('Got form data:', formData);
        this.setState({
            apiRequestParams: formData,
        });
    }

    render() {

        const formProps: IGenericApiParamsFormProps = {
            formData: this.state.apiRequestParams,
            onSubmit: this.updateFormData,
        }

        const apiHeaderView = {
            name: "Generic API",
            helpUrl: "https://wiki.openstreetmap.org/wiki/Nominatim",
        };

        const apiUrlParamsView = {
            formData: this.state.apiRequestParams
        };
        const apiActionView = {
            fullUrl: "https://wiki.openstreetmap.org/wiki/Nominatim",
            makeRequest: this.fetchIt
        };


        return (
            <ApiPanelLayoutContainer>
                <ApiHeaderView {...apiHeaderView} />
                <ApiUrlParametersForm>
                    <GenericApiParamsForm {...formProps} />
                </ApiUrlParametersForm>
                <ApiUrlParametersView {...apiUrlParamsView}>
                </ApiUrlParametersView>
                <ApiActionsView {...apiActionView}>
                </ApiActionsView>
                <ApiJsonResultsView>
                    {this.state.apiResponse}
                </ApiJsonResultsView>
            </ApiPanelLayoutContainer>);
    }
}

