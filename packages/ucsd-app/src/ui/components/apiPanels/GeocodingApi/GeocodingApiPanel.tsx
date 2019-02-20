import * as React from 'react'
import { INominatimParams, createNominatimParams, INominatimResult, INominatimQueryParamObj } from '@geo-ball/osm-data';
import { ApiPanelLayoutContainer } from '../common/ApiPanelLayoutContainer';
import { HeaderContainer } from '../common/HeaderContainer';
import { FormContainer } from '../common/FormContainer';
import { ApiActionsView, IApiActionsViewProps } from '../common/ApiActionsView';
import { ResultsContainer } from '../common/ResultsContainer';
import { geocodeAddress } from '../../../services/GeocodingService';
import { IGeocodingApiFormProps, GeocodingApiForm } from './GeocodingApiForm';
import { DebugFormix } from '../../common/input/DebugFormix';
import { connect as formikConnect, Formik } from 'formik';

// TWO WAYS to deep destructure setstate
// this.setState(({ formData }) => ({
//     formData: {
//         ...formData,
//         [name]: value
//     }
// }));
// this.setState({
//     formData:{
//         ...this.state.formData,
//         [name]: value
//     }
// });



export interface IReverseGeocodingApiPanelProps {
    formData: INominatimParams;
}

export interface IReverseGeocodingApiPanelState {
    apiRequestParams: INominatimParams;
    apiResponse?: INominatimResult | any | undefined;
    fakeTheApiCall: boolean;
    showFormStatePanel: boolean;
    showParamStatePanel: boolean;
    formikProps: any;
    debugFormix: any;
}

export class GeocodingApiPanel extends React.Component<IReverseGeocodingApiPanelProps, IReverseGeocodingApiPanelState> {

    constructor(props: IReverseGeocodingApiPanelProps) {
        super(props);

        const apiRequestParams = createNominatimParams(this.props.formData);

        // nomParams.formParams.query.stringQuery.q = "2516 Chadwick St. Salt Lake City, UT 84106"
        this.state = {
            apiRequestParams,
            apiResponse: undefined,
            fakeTheApiCall: true,
            showFormStatePanel: false,
            showParamStatePanel: false,
            formikProps: undefined,
            debugFormix: undefined,
        };
        this.fetchIt = this.fetchIt.bind(this);
        this.updateFormData = this.updateFormData.bind(this);

        this.toggleFakeApiCall = this.toggleFakeApiCall.bind(this);
        this.toggleFormStatePanel = this.toggleFormStatePanel.bind(this);
        this.toggleParamStatePanel = this.toggleParamStatePanel.bind(this);

        this.getFormState = this.getFormState.bind(this);
        this.getParameters = this.getParameters.bind(this);
        this.getFormikProps = this.getFormikProps.bind(this);
    }

    updateFormData(apiRequestParams: INominatimParams): void {
        console.log('Got form data (INominatimParams):', apiRequestParams);
        this.setState({
            apiRequestParams,
        });
    }


    fetchIt(): Promise<Array<INominatimResult>> {
        console.log('MAKE REQUEST');
        return;
        // if (this.state.apiRequestParams) {
        //     console.log('onSubmit (this.state.apiRequestParams):', this.state.apiRequestParams);
        //     return geocodeAddress(this.state.apiRequestParams)
        //         .then((apiResponse: Array<INominatimResult>) => {
        //             console.log('geocodeAddress Array<INominatimResult> result:', apiResponse);
        //             const r = JSON.stringify(apiResponse, undefined, 4);
        //             console.log(r)
        //             this.setState({
        //                 apiResponse
        //             });
        //             return apiResponse;
        //         })
        // }
        // throw new Error('Should not call fetch with apiRequestParams set!')
    }

    toggleFakeApiCall = (_event: React.SyntheticEvent) => {
        this.setState(prevState => ({ fakeTheApiCall: !prevState.fakeTheApiCall }));
    }

    toggleFormStatePanel = (_event: React.SyntheticEvent) => {
        this.setState(prevState => ({ showFormStatePanel: !prevState.showFormStatePanel }));
    }

    toggleParamStatePanel = (_event: React.SyntheticEvent) => {
        this.setState(prevState => ({ showParamStatePanel: !prevState.showParamStatePanel }));
    }

    getFormikProps = (formikProps: any) => {
        console.log('XXXformikPropsthis.formikProps', this.formikProps)
        console.log('XXXformikProps', formikProps.values.query.stringQuery.q)
        // this.setState({ formikProps })
        this.formikProps = formikProps;
        // if (!this.state.formikProps) {
        //     this.setState({ formikProps })
        // }
    };
    getFormState(): Promise<any> {
        return Promise.resolve(this.state.apiRequestParams);
    }
    getParameters(): Promise<any> {
        return Promise.resolve(this.state.apiRequestParams);
    }

    render() {

        const formProps: IGeocodingApiFormProps = {
            formData: this.state.apiRequestParams,
            onSubmit: this.updateFormData,

            showFormStatePanel: this.state.showFormStatePanel,
            getFormikProps: this.getFormikProps,
        }

        const apiHeaderView = {
            name: "Geocoding API",
            helpUrl: "https://wiki.openstreetmap.org/wiki/Nominatim",
        };

        const apiUrlParamsView = {
            formData: this.state.apiRequestParams
        };

        const apiActionView: IApiActionsViewProps = {
            fakeTheApiCallValue: this.state.fakeTheApiCall,
            fakeTheApiCallToggle: this.toggleFakeApiCall,

            showFormStatePaneValue: this.state.showFormStatePanel,
            showFormStatePaneToggle: this.toggleFormStatePanel,
            getFormState: this.getFormState,

            showParameterPaneValue: this.state.showParamStatePanel,
            showParameterPaneToggle: this.toggleParamStatePanel,
            getParameters: this.getParameters,

            makeRequest: this.fetchIt,
        };
        // const debugForm = this.state.showDebugForm ? <DebugFormix /> : null;
        // console.log('FORM DATA:', this.state.formData)



        // const debugFormContainer = this.state.showFormStatePanel ? <DebugFormix /> : null;
        console.log('RENDER.state.showFormStatePanel', this.state.showFormStatePanel);
        console.log('RENDER.state.debugFormix', this.state.debugFormix);
        console.log('RENDER.state.formikProps', this.state.formikProps);
        // const debugFormContainer = this.state.showFormStatePanel ? <DebugFormix {...this.state.formikProps} /> : null;
        const debugFormContainer = this.state.showFormStatePanel ? JSON.stringify(, null, 4) : null;
        const debugParamsContainer = null;
        return (
            <ApiPanelLayoutContainer>

                <HeaderContainer {...apiHeaderView} />

                <FormContainer>
                    <GeocodingApiForm {...formProps} />
                    {/* <ApiUrlParametersView {...apiUrlParamsView}/> */}
                    <ApiActionsView {...apiActionView} />
                </FormContainer>




                <ResultsContainer>
                    {this.state.formikProps}
                    {this.state.formikProps}
                    {/* {debugFormContainer}
                    {debugParamsContainer} */}
                    {this.state.apiResponse}
                </ResultsContainer>

            </ApiPanelLayoutContainer>);
    }
}

const DisplayFormikState = (props) => (
    <div style={{ margin: "1rem 0" }}>
        <h3 style={{ fontFamily: "monospace" }} />
        <pre
            style={{
                background: "#f6f8fa",
                fontSize: ".65rem",
                padding: ".5rem",
            }}
        >
            <strong>props</strong> ={" "}
            console.log('props', props)
      {JSON.stringify(props, undefined, 4)}
            {/* {JSON.stringify(
        R.dissocPath(["formik", "validationSchema"], props),
        null,
        2,
      )} */}
        </pre>
    </div>
);

const ConnectedDisplayFormikState = formikConnect(DisplayFormikState);

