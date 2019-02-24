"use strict";
// import * as React from 'react';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const React = __importStar(require("react"));
const Layout_1 = require("./Layout");
const Header_1 = require("../../organisms/Header");
const Form_1 = require("./Form");
const Results_1 = require("../../organisms/Results");
const ActionToggle_1 = require("../../organisms/ActionToggle");
const ActionButton_1 = require("../../organisms/ActionButton");
const ActionBar_1 = require("../../organisms/ActionBar");
class ApiBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPanels: {
                queryParamFormDebug: false,
                bodyParamFormDebug: false,
            },
        };
        // this.callApi = this.callApi.bind(this);
        // this.updateUrlParamsForm = this.updateUrlParamsForm.bind(this);
        this.actionBarProps = this.createActionBarProps();
    }
    createActionBarProps() {
        const fakeApiCall = new ActionToggle_1.ActionToggle({
            toggle: () => undefined,
            label: "Fake the API call"
        });
        const queryParams = {
            groupLabel: 'Query Parameters',
            debugForm: new ActionToggle_1.ActionToggle({
                toggle: () => undefined,
                label: "View Query Parameter Form"
            }),
            viewPanel: new ActionToggle_1.ActionToggle({
                toggle: () => undefined,
                label: "View Query Parameters"
            }),
        };
        const bodyParams = {
            groupLabel: 'Body Parameters',
            debugForm: new ActionToggle_1.ActionToggle({
                toggle: () => undefined,
                label: "View Body Parameter Form"
            }),
            viewPanel: new ActionToggle_1.ActionToggle({
                toggle: () => undefined,
                label: "View Body Parameters"
            }),
        };
        const debugToggles = {
            fakeApiCall,
            queryParams,
            bodyParams,
        };
        const requestButton = new ActionButton_1.ActionButton({
            execute: () => Promise.resolve(),
            label: "Send the request",
        });
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
        return (React.createElement(Layout_1.ApiPanelLayoutContainer, null,
            React.createElement(Header_1.HeaderContainer, Object.assign({}, this.props.header)),
            React.createElement(Form_1.FormContainer, null, this.props.children),
            React.createElement(ActionBar_1.ActionBar, Object.assign({}, this.actionBarProps)),
            React.createElement(Results_1.ResultsContainer, null,
                React.createElement("h1", null, "RESPONSE GOES HERE"))));
    }
}
exports.ApiBrowser = ApiBrowser;
//# sourceMappingURL=ApiBrowser.js.map