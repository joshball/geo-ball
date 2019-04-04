import * as React from 'react';
import {
    INominatimParams,
    createNominatimParams,
    INominatimResult,
    INominatimQueryParamObj,
} from '@geo-ball/osm-data';
// import { ApiPanelLayoutContainer } from '../../common/ApiPanelLayoutContainer';
// import { HeaderContainer } from '../common/HeaderContainer';
// import { FormContainer } from '../common/FormContainer';
// import { ApiActionsView, IApiActionsViewProps } from '../common/ApiActionsView';
// import { ResultsContainer } from '../common/ResultsContainer';
// import { geocodeAddress } from '../../../services/GeocodingService';
import { IGeocodingApiFormProps, GeocodingApiForm } from './GeocodingApiForm';
import { ApiPanelLayoutContainer, HeaderContainer } from '@geo-ball/api-couturier';
import { styled, Card, Switch, Box, Button } from '@geo-ball/component-lib';
// import { DebugFormix } from '../../common/input/DebugFormix';
// import { connect as formikConnect, Formik } from 'formik';

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
export const colors = {
    backGrey: '#414E60',
    lightGrey: '#F7F7F8',
    medGrey: '#455364',
    darkGrey: '#424242',
    lg1: '#596068',
    lg2: '#4A4F56',
    green: '#59BC79',
    drkBlue: '#1F4B99',
    medBlue: '#447C9F',
    lgtBlue: '#7CAAA2',
    lgtGreen: '#CCD3A1',
    cream: '#F6C880',
    drkCream: '#DE944D',
    lgtBrown: '#C06126',
    drkBrown: '#9E2B0E',
};

export const cardStyle = {
    margin: '10px 0px 10px 0px',
    backgroundColor: colors.lightGrey,
};

export class FormContainer extends React.Component {
    render() {
        return (
            <Card style={cardStyle} elevation="400">
                {this.props.children}
            </Card>
        );
    }
}
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

export interface IApiActionsViewProps {
    fakeTheApiCallValue: boolean;
    fakeTheApiCallToggle: (_event: React.SyntheticEvent) => void;

    showFormStatePaneValue: boolean;
    showFormStatePaneToggle: (_event: React.SyntheticEvent) => void;
    getFormState: () => Promise<any>;

    showParameterPaneValue: boolean;
    showParameterPaneToggle: (_event: React.SyntheticEvent) => void;
    getParameters: () => Promise<any>;

    makeRequest: () => Promise<any>;
}

export const ApiActionsView = (props: IApiActionsViewProps) => {
    const actionBarDivStyle = {
        overflow: 'hidden',
        height: '30px',
        // float: 'right',
        // display: 'flex',
    };
    return (
        <Card style={cardStyle} elevation="400">
            <div style={actionBarDivStyle}>
                <SubmitRequestButton {...props} />
                <DebugToggles {...props} />
            </div>
        </Card>
    );
};

const floatRight = {
    float: 'right',
    // display: 'flex',
};

const DebugDiv = styled(Box)`
    float: right;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

// const buttonDiv = {
//     float: 'right',
//     display: 'inline-flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//     marginRight: '75px',
//     marginLeft: '75px',
// };

const ButtonDiv = styled(Box)`
    float: right;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-right: 75px;
    margin-left: 75px;
`;
export const DebugToggles = (props: IApiActionsViewProps) => {
    // const switchDivStyle = {
    //     float: 'right',
    //     display: 'inline-flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100%',
    // };
    const switchStyle = {
        margin: '0px 10px 0px 10px',
    };
    return (
        // <div style={switchDivStyle}>
        <DebugDiv>
            <Switch
                style={switchStyle}
                checked={props.fakeTheApiCallValue}
                label="Fake the API call"
                onChange={props.fakeTheApiCallToggle}
            />
            <Switch
                style={switchStyle}
                checked={props.showFormStatePaneValue}
                label="Show Form State"
                onChange={props.showFormStatePaneToggle}
            />
            <Switch
                style={switchStyle}
                checked={props.showParameterPaneValue}
                label="Show Parameter Pane"
                onChange={props.showParameterPaneToggle}
            />
        </DebugDiv>
    );
};

export interface ISubmitRequestButtonState {
    submitting: boolean;
}

export class SubmitRequestButton extends React.Component<
    IApiActionsViewProps,
    ISubmitRequestButtonState
> {
    state: ISubmitRequestButtonState;

    constructor(props: IApiActionsViewProps) {
        super(props);
        this.state = { submitting: false };
        this.onClick = this.onClick.bind(this);
    }

    async onClick() {
        console.log('onClick!');
        this.setState({ submitting: true });

        try {
            await this.props.makeRequest();
        } finally {
            this.setState({ submitting: false });
        }
    }

    render() {
        return (
            <ButtonDiv>
                <Button disabled={this.state.submitting} onClick={this.onClick}>
                    Make the request
                </Button>
            </ButtonDiv>
        );
    }
}

export class GeocodingApiPanel extends React.Component<
    IReverseGeocodingApiPanelProps,
    IReverseGeocodingApiPanelState
> {
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
        return Promise.resolve([]);
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
    };

    toggleFormStatePanel = (_event: React.SyntheticEvent) => {
        this.setState(prevState => ({ showFormStatePanel: !prevState.showFormStatePanel }));
    };

    toggleParamStatePanel = (_event: React.SyntheticEvent) => {
        this.setState(prevState => ({ showParamStatePanel: !prevState.showParamStatePanel }));
    };

    getFormikProps = (formikProps: any) => {
        // console.log('XXXformikPropsthis.formikProps', this.formikProps)
        // console.log('XXXformikProps', formikProps.values.query.stringQuery.q)
        // this.setState({ formikProps })
        // this.formikProps = formikProps;
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
        // return <div>oo</div>;
        const formProps: IGeocodingApiFormProps = {
            formData: this.state.apiRequestParams,
            onSubmit: this.updateFormData,

            showFormStatePanel: this.state.showFormStatePanel,
            getFormikProps: this.getFormikProps,
        };

        const apiHeaderView = {
            name: 'Geocoding API',
            helpUrl: 'https://wiki.openstreetmap.org/wiki/Nominatim',
            openUrlCb: (_url: string) => undefined,
        };

        const apiUrlParamsView = {
            formData: this.state.apiRequestParams,
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
        // // const debugForm = this.state.showDebugForm ? <DebugFormix /> : null;
        // // console.log('FORM DATA:', this.state.formData)

        // // const debugFormContainer = this.state.showFormStatePanel ? <DebugFormix /> : null;
        // console.log('RENDER.state.showFormStatePanel', this.state.showFormStatePanel);
        // console.log('RENDER.state.debugFormix', this.state.debugFormix);
        // console.log('RENDER.state.formikProps', this.state.formikProps);
        // // const debugFormContainer = this.state.showFormStatePanel ? <DebugFormix {...this.state.formikProps} /> : null;
        // const debugFormContainer = this.state.showFormStatePanel ? JSON.stringify(, null, 4) : null;
        // const debugParamsContainer = null;
        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...apiHeaderView} />

                <FormContainer>
                    <GeocodingApiForm {...formProps} />
                    {/* <ApiUrlParametersView {...apiUrlParamsView}/> */}
                    <ApiActionsView {...apiActionView} />
                </FormContainer>
            </ApiPanelLayoutContainer>
        );
    }
}

// const DisplayFormikState = (props) => (
//     <div style={{ margin: "1rem 0" }}>
//         <h3 style={{ fontFamily: "monospace" }} />
//         <pre
//             style={{
//                 background: "#f6f8fa",
//                 fontSize: ".65rem",
//                 padding: ".5rem",
//             }}
//         >
//             <strong>props</strong> ={" "}
//             console.log('props', props)
//       {JSON.stringify(props, undefined, 4)}
//             {/* {JSON.stringify(
//         R.dissocPath(["formik", "validationSchema"], props),
//         null,
//         2,
//       )} */}
//         </pre>
//     </div>
// );

// const ConnectedDisplayFormikState = formikConnect(DisplayFormikState);
