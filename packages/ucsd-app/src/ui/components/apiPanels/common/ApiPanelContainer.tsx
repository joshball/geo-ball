import * as React from 'react';

import { colors } from './ApiStyles';
import { IApiHeaderViewProps, ApiHeaderView } from './ApiHeaderView';
import { ApiUrlParametersForm, IApiUrlParametersFormProps } from './ApiUrlParametersForm';
import { ApiUrlParametersView, IApiUrlParametersViewProps } from './ApiUrlParametersView';
import { ApiActionsView, IApiActionsViewProps } from './ApiActionsView';
import { ApiJsonResultsView, IApiJsonResultsViewProps } from './ApiJsonResultsView';
import { ApiPanelLayoutContainer } from './ApiPanelLayoutContainer';

export interface IApiPanelContainerProps {
    apiHeaderView: IApiHeaderViewProps;
    apiUrlParamsForm: IApiUrlParametersFormProps;
    apiUrlParamsView: IApiUrlParametersViewProps;
    apiActionView: IApiActionsViewProps;
    apiJsonResultsView: IApiJsonResultsViewProps;
}


export class ApiPanelContainer extends React.Component<IApiPanelContainerProps> {
    render() {
        const {
            apiHeaderView,
            apiUrlParamsForm,
            apiUrlParamsView,
            apiActionView,
            apiJsonResultsView,
        } = this.props;
        return (
            <ApiPanelLayoutContainer>
                <ApiHeaderView {...apiHeaderView} />
                <ApiUrlParametersForm {...apiUrlParamsForm}>
                    <h1>ApiUrlParametersForm</h1>
                </ApiUrlParametersForm>
                <ApiUrlParametersView {...apiUrlParamsView}>
                    <h1>ApiUrlParametersView</h1>
                </ApiUrlParametersView>
                <ApiActionsView {...apiActionView}>
                    <h1>ApiActionsView</h1>
                </ApiActionsView>
                <ApiJsonResultsView {...apiJsonResultsView}>
                    <h1>ApiJsonResultsView</h1>
                </ApiJsonResultsView>
            </ApiPanelLayoutContainer>);
    }
}


