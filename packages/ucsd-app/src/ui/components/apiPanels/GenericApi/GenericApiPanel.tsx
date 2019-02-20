import * as React from 'react'
import { IFakeGetApiParams, FakeApiService, IFakeGetApiResult } from './FakeApiService';
import { GenericApiParamsFormView, IGenericApiParamsFormProps } from './GenericApiParamsFormView';
import { ApiPanelLayoutContainer } from '../common/ApiPanelLayoutContainer';
import { HeaderContainer } from '../common/HeaderContainer';
import { FormContainer } from '../common/FormContainer';
import { ApiUrlParametersView } from '../common/ApiUrlParametersView';
import { ResultsContainer } from '../common/ResultsContainer';

import { withFormik, FormikConsumer } from "formik";
import { DebugFormix } from '../../common/input/DebugFormix';
import { truncateSync } from 'fs';

export interface IGenericApiPanelState {
    apiRequestParams: IFakeGetApiParams;
    apiResponse?: IFakeGetApiResult | any | undefined;
    showDebugForm: boolean;
}

export interface IGenericApiPanelProps {
    apiCallback: (query: any) => Promise<any>;
}

// (
//     ({ handleSubmit, handleChange, values, ...props }) => {
//         return (
//             <Question
//                 handleResponseSubmission={handleSubmit}
//                 handleResponseChange={handleChange}
//                 response={values.response}
//                 {...props}
//             />
//         );
//     }
// )



// export declare const
//     FormikProvider: React.ComponentClass<import("create-react-context").ProviderProps<FormikContext<any>>, any>,
//     FormikConsumer: React.ComponentClass<import("create-react-context").ConsumerProps<FormikContext<any>>, any>;

// export declare function connect<OuterProps, Values = {}>
//     (Comp: React.ComponentType<OuterProps & { formik: FormikContext<Values>; }>)
//     : React.ComponentType<OuterProps>;


const GenericApiParamsForm = withFormik<IGenericApiParamsFormProps, IFakeGetApiParams>({
    mapPropsToValues: (props: IGenericApiParamsFormProps) => {
        FormikConsumer
        console.log('GenericApiParamsForm================================');
        console.log('GenericApiParamsForm.this', this);
        console.log('GenericApiParamsForm.props', props);
        console.log('GenericApiParamsForm.props.formData', props.formData);
        console.log('GenericApiParamsForm.props.formData', { ...props.formData });
        return { ...props.formData };
    },
    handleSubmit: (values: IFakeGetApiParams, other) => {
        console.log('GenericApiParamsForm.SUBMIT: values:', values);
        console.log('GenericApiParamsForm.SUBMIT: other:', other);
        other.props.onSubmit(values);
        // cons
        // this.setState({
        //     apiRequestParams: values,
        // });
    }
})(GenericApiParamsFormView)

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
            showDebugForm: true,
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
        const debugForm = this.state.showDebugForm ? <DebugFormix /> : null;
        const x = <GenericApiParamsForm {...formProps}/>
        console.log('formProps.formData:',GenericApiParamsForm.displayName)
        console.log('formProps.formData:',GenericApiParamsForm.contextTypes)
        console.log('formProps.formData:',GenericApiParamsForm.defaultProps)
        console.log('formProps.formData:',GenericApiParamsForm.propTypes)
        console.log('formProps.formData:',GenericApiParamsForm)
        console.log('formProps.x:',x.props)
        // console.log('formProps.formData:',formProps.formData)
        // const debugForm = this.state.showDebugForm ? <pre>OH</pre> : null;

        return (
            <ApiPanelLayoutContainer>
                <HeaderContainer {...apiHeaderView} />
                <FormContainer>
                    <GenericApiParamsForm {...formProps}>
                        {debugForm}
                    </GenericApiParamsForm>
                </FormContainer>
                <ApiUrlParametersView {...apiUrlParamsView}>
                </ApiUrlParametersView>
                <ResultsContainer>
                    {this.state.apiResponse}
                </ResultsContainer>
            </ApiPanelLayoutContainer>);
    }
}

