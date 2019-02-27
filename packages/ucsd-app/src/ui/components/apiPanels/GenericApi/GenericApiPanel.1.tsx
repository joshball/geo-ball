// import * as React from 'react'
// import { Heading } from '@geo-ball/component-lib';
// import { IGenericUrlApiParams, GenericApiService, IGenericGetApiResult } from './GenericApiService';
// import { GenericApiParamsFormView, IGenericApiParamsFormProps } from './GenericApiParamsFormView';



// export interface IGenericApiPanelProps { }

// export interface IGenericApiPanelState {
//     apiRequestParams: IGenericUrlApiParams;
//     apiResponse?: IGenericGetApiResult | any | undefined;
//     showDebugForm: boolean;
// }

// export class GenericApiPanel extends React.Component<IGenericApiPanelProps, IGenericApiPanelState> {

//     state: IGenericApiPanelState;

//     constructor(props: IGenericApiPanelProps) {

//         super(props);

//         this.state = {
//             apiRequestParams: {
//                 query: 'some query string',
//                 skip: 1,
//                 take: 2,
//                 debug: true
//             },
//             showDebugForm: true,
//             apiResponse: {},
//         };


//         this.fetchIt = this.fetchIt.bind(this);
//         this.updateFormData = this.updateFormData.bind(this);
//     }

//     fetchIt(): Promise<IGenericGetApiResult> {
//         if (this.state.apiRequestParams) {
//             return GenericApiService.FetchWithGet(this.state.apiRequestParams)
//                 .then((apiResponse: IGenericGetApiResult) => {
//                     this.setState({ apiResponse });
//                     return apiResponse;
//                 });
//         }
//         throw new Error('Should not call fetch with apiRequestParams set!')
//     }

//     render() {

//         return (
//             <Heading>hey</Heading>
//             //     <ApiPanelLayoutContainer>
//             //         <HeaderContainer {...apiHeaderView} />
//             //         <FormContainer>
//             //             <GenericApiParamsForm {...formProps}>
//             //                 {debugForm}
//             //             </GenericApiParamsForm>
//             //         </FormContainer>
//             //         <ApiUrlParametersView {...apiUrlParamsView}>
//             //         </ApiUrlParametersView>
//             //         <ResultsContainer>
//             //             {this.state.apiResponse}
//             //         </ResultsContainer>
//             //     </ApiPanelLayoutContainer>
//         );
//     }
// }

