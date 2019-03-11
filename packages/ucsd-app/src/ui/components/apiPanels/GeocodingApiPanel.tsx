// import * as React from 'react'
// import { Formik, Form } from "formik";
// import { INominatimParams,  INominatimResult } from '@geo-ball/osm-data';
// import { Card, Elevation, Button, Intent } from '@blueprintjs/core';
// import { css } from 'glamor';
// import { styles } from '../../config/theme';
// import { searchChoiceDiv } from './nominatim/ApiAddressForm';
// import { getOtherSettingsForm, getSwitchesFormBox } from './nominatim/ApiSettingsForm';
// import { SectionHeaderTwo, SectionHeaderThree } from "../common/layout/SectionHeader";
// import { geocodeAddress } from '../../services/GeocodingService';

// const JDR = styles.justifyRight;

// // TWO WAYS to deep destructure setstate
// // this.setState(({ formData }) => ({
// //     formData: {
// //         ...formData,
// //         [name]: value
// //     }
// // }));
// // this.setState({
// //     formData:{
// //         ...this.state.formData,
// //         [name]: value
// //     }
// // });

// export interface IFormData extends INominatimParams {
// }

// export interface IReverseGeocodingApiPanelProps {
//     formData: IFormData;
// }

// export interface IReverseGeocodingApiPanelState {
//     formData: IFormData;
//     searchResults: Array<INominatimResult>;
// }

// export class GeocodingApiPanel extends React.Component<IReverseGeocodingApiPanelProps, IReverseGeocodingApiPanelState> {

//     constructor(props: IReverseGeocodingApiPanelProps) {
//         super(props);
//         const formData = this.props.formData || new NominatimParams();
//         formData.q = "2516 Chadwick St. Salt Lake City, UT 84106"
//         this.state = {
//             formData,
//             searchResults: []
//         };
//         this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
//         // this.handleRadioButtonGroupChange = this.handleRadioButtonGroupChange.bind(this);
//         this.onBlur = this.onBlur.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }

//     handleChange(event: any) {
//         console.log('handleChange.event.TARGET:', event.target);
//         event.persist();
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;
//         this.setState(({ formData }) => ({
//             formData: {
//                 ...formData,
//                 [name]: value
//             }
//         }));
//     }

//     handleRadioGroupChange(event: React.FormEvent<HTMLInputElement>): void {
//         console.log('handleRadioGroupChange.event', event);
//         console.log('handleRadioGroupChange.event.target', event.target);
//     }

//     onBlur(event: React.FocusEvent<HTMLElement>): void {
//         console.log('onBlur.item', event.target);
//     }

//     onSubmit(formData: any): void {
//         console.log('onSubmit:', formData);
//         this.setState({
//             formData
//         });
//         const nominatimParams = new NominatimParams(formData);
//         console.log('onSubmit:', nominatimParams);
//         geocodeAddress(nominatimParams)
//             .then((searchResults: Array<INominatimResult>) => {
//                 console.log('geocodeAddress Array<INominatimResult> result:', searchResults);
//                 const r = JSON.stringify(searchResults, undefined, 4);
//                 console.log(r)
//                 this.setState({
//                     searchResults
//                 });
//             })
//     }

//     // https://github.com/vadistic/vats/blob/b7c9e08eb45d7fd94af477575adea04df5e06aca/packages/client/src/components/editable/formik.tsx

//     // NEXT: Design the form to be on one line and pretty
//     // Show the URL/Querystring
//     // Show the results
//     // Add copy for results and string
//     // use formik debug as example

//     render() {
//         const mainQueryStyle = css({
//             display: 'flex',
//             // margin: '10px',
//             padding: '10px',
//             // justifyContent: 'flex-end',
//             // alignContent: 'flex-end',
//             width: 'fit-content',
//             // align:'right',
//             // backgroundColor: colors.pastels.litBlue,
//         });
//         const mainSettingsStyle = css({
//             display: 'flex',
//             // margin: '10px',
//             padding: '10px',
//             // justifyContent: 'flex-end',
//             // alignContent: 'flex-end',
//             width: '100%',
//             // align:'right',
//             // backgroundColor: colors.pastels.litBlue,
//         });

//         const pageStyle = {
//             margin: '20px',
//             // padding: '10px',
//         };

//         const mainFormWrapDiv = {
//             display: 'flex',
//             height: '440px',
//         };

//         return (
//             <div style={pageStyle}>
//                 <h1>Geocoding</h1>
//                 <Formik initialValues={this.state.formData} onSubmit={this.onSubmit}>
//                     {/* {({ values, isSubmitting, setFieldValue, handleBlur }) => ( */}
//                     {(formikStuff) => (
//                         <Form>
//                             <Card interactive={false} elevation={Elevation.FOUR}>
//                                 <div style={mainFormWrapDiv}>
//                                     <div {...mainQueryStyle}>
//                                         <Card interactive={false} elevation={Elevation.TWO}>
//                                             {searchChoiceDiv<IFormData>(formikStuff)}
//                                             <div style={JDR}>
//                                                 <Button intent={Intent.PRIMARY} type="submit">Submit</Button>
//                                             </div>
//                                         </Card>
//                                     </div>
//                                     <div {...mainSettingsStyle}>
//                                         <Card style={{ width: '100%' }} interactive={false} elevation={Elevation.TWO}>
//                                             <SectionHeaderTwo style={{ marginBottom: "15px" }}>Settings</SectionHeaderTwo>
//                                             {getOtherSettingsForm()}
//                                             <SectionHeaderThree>Toggles</SectionHeaderThree>
//                                             {getSwitchesFormBox()}
//                                         </Card>
//                                     </div>
//                                 </div>
//                             </Card>
//                             {ApiResults(this.state.searchResults)}
//                             {/* <DebugFormix /> */}
//                         </Form>
//                     )}
//                 </Formik>
//                 {/* <pre>
//                     STATE:
//                     {JSON.stringify(this.state, undefined, 4)}
//                 </pre> */}
//             </div>
//         );
//     }
// }

// export const ApiResults = (json: any) => (
//     <div
//         style={{
//             margin: '3rem 0',
//             borderRadius: 4,
//             background: '#f6f8fa',
//             boxShadow: '0 0 1px  #eee inset',
//         }}
//     >
//         <div
//             style={{
//                 textTransform: 'uppercase',
//                 fontSize: 11,
//                 borderTopLeftRadius: 4,
//                 borderTopRightRadius: 4,
//                 fontWeight: 500,
//                 padding: '.5rem',
//                 background: '#555',
//                 color: '#fff',
//                 letterSpacing: '1px',
//             }}
//         >
//             API RESULT
//         </div>
//         <pre
//             style={{
//                 fontSize: '.65rem',
//                 padding: '.25rem .5rem',
//                 overflowX: 'scroll',
//             }}
//         >
//             {JSON.stringify(json, null, 4)}
//         </pre>

//     </div>
// );
