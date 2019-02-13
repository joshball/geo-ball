import * as React from 'react'
import { css, target } from 'glamor'
import { NominatimApi, NominatimParams, INominatimResult, INominatimParams, NominatimFormat } from '@geo-ball/osm-data'
import { Formik, FormikActions, Form, Field, ErrorMessage } from "formik";
import { Button, ButtonGroup, AnchorButton, RadioGroup, Radio } from '@blueprintjs/core';
import { RadioButtonGroupContainerProps as IRadioButtonGroupContainerProps, RadioButtonGroupContainer } from '../common/input/RadioButtonGroupContainer';
import { DebugFormix } from './DebugFormix';
import { RadioButton, IRadioButtonData } from '../common/input/RadioButton';



// export interface IFormValues {
//     friends: Array<IFriend>;
// }
// export interface IFriend {
//     name: string;
//     email: string;
// }
// const initialValues = {
//     friends: [
//         { name: '', email: '' }
//     ]
// };

// type OnSubmitCb<Values> = (values: Values, formikActions: FormikActions<Values>) => void;

// const OS: OnSubmitCb<IFormValues> = (values, { setSubmitting }) => {
//     setTimeout(() => {
//         console.log(JSON.stringify(values, null, 4));
//         setSubmitting(false);
//     }, 400);
// }

// const BasicFormLessVerbose = () => (
//     <div>
//         <h1>Any place in your app!</h1>
//         <Formik initialValues={initialValues} validate={emailValidation} onSubmit={OSX}>
//             {({ isSubmitting }) => (
//                 <Form>
//                     <Field type="email" name="email" />
//                     <ErrorMessage name="email" component="div" />
//                     <Field type="password" name="password" />
//                     <ErrorMessage name="password" component="div" />
//                     <button type="submit" disabled={isSubmitting}>
//                         Submit
//             </button>
//                 </Form>
//             )}
//         </Formik>
//     </div>
// );


// type OnSubmitCb<Values> = (values: Values, formikActions: FormikActions<Values>) => void;
// type OnClickCb = (event: React.MouseEvent<HTMLElement, MouseEvent>, item: IRadioButtonGroupItem) => void;





// const ReverseGeocodingApiForm = (initialValues: INominatimParams, onSubmit: OnSubmitCb<INominatimParams>) => (
//     <div>
//         <Formik initialValues={initialValues} onSubmit={onSubmit}>
//             {({ isSubmitting }) => {
//                 return (
//                     <Form>
//                         <div className="row">
//                             <div className="col">
//                                 <Field name="name" type="text" />
//                             </div>
//                             <div className="col">
//                                 <Field name="email" type="email" />
//                             </div>
//                             <div className="col">
//                                 <Button type="button">X</Button>
//                             </div>
//                         </div>
//                         <Button type="button" disabled={isSubmitting}>Add Friend</Button>
//                         <Button type="submit" disabled={isSubmitting}>Invite</Button>
//                     </Form>
//                 )
//             }}
//         </Formik>
//     </div>
// );

// const OS: OnSubmitCb<INominatimParams> = (values, { setSubmitting }) => {
//     setTimeout(() => {
//         console.log(JSON.stringify(values, null, 4));
//         setSubmitting(false);
//     }, 400);
// }

class TempNominatimParams {
    format?: NominatimFormat | undefined;

}

export interface ReverseGeocodingApiPanelProps {
}
export interface ReverseGeocodingApiPanelState {
    searchParams: INominatimParams;
    searchResults: INominatimResult[];
}

export class ReverseGeocodingApiPanel extends React.Component<ReverseGeocodingApiPanelProps, ReverseGeocodingApiPanelState> {

    state: ReverseGeocodingApiPanelState;

    constructor(props: ReverseGeocodingApiPanelProps) {
        super(props);
        const initialState = new NominatimParams();
        initialState.format = 'json';
        initialState.q = 'the query';
        initialState.addressdetails = 1;
        this.state = {
            searchParams: initialState,
            searchResults: [],
        }
        this.fetchIt = this.fetchIt.bind(this);
        this.doSearch = this.doSearch.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
        // this.handleRadioButtonGroupChange = this.handleRadioButtonGroupChange.bind(this);
        this.onBlur = this.onBlur.bind(this);

    }


    fetchIt(event: any): void {
        // const params = this.state.searchParams
        console.log(event);
        // const params = new NominatimParams('2516 Chadwick St, Salt Lake City, UT 84106');

    }
    doSearch(params: NominatimParams) {
        // const params = this.state.searchParams
        return NominatimApi.search(params)
            .then((searchResults: INominatimResult[]) => {
                this.setState({ searchResults });
            })
    }

    onSubmit(event: any): void {
        // const params = this.state.searchParams
        console.log('onSubmit:', event);
        // const params = new NominatimParams('2516 Chadwick St, Salt Lake City, UT 84106');

    }


    onButtonClick(event: React.MouseEvent<HTMLElement>, item: IRadioButtonData): void {
        event.preventDefault();
        console.log('onButtonClick.item', item);
    }

    handleRadioGroupChange(event: React.FormEvent<HTMLInputElement>): void {
        console.log('handleRadioGroupChange.event', event);
        console.log('handleRadioGroupChange.event.target', event.target);
    }

    // handleRadioButtonGroupChange(button: IRadioButtonData, event: React.FormEvent<HTMLDivElement>): void {
    //     console.log('### handleRadioButtonGroupChange.button', button);
    //     console.log('### handleRadioButtonGroupChange.setState', button);
    //     this.setState((prevState) => ({
    //         searchParams: {
    //             ...prevState.searchParams,
    //             format: button.id as NominatimFormat
    //         }
    //     }));
    // }

    onBlur(event: React.FocusEvent<HTMLElement>): void {
        console.log('onBlur.item', event.target);
    }



    render() {

        console.log('@@@ REVERSE PAGE render() state.searchParams.format:', this.state.searchParams.format)
        const rbg: Array<IRadioButtonData> = [
            { id: 'json', label: 'json', active: true },
            { id: 'html', label: 'html' },
            { id: 'xml', label: 'xml' },
            { id: 'jsonv2', label: 'jsonv2' },
        ]
        // console.log('JSON.stringify(el, undefined, 4)', JSON.stringify(el, undefined, 4))
        // const rbgProps: IRadioButtonGroupContainerProps = {
        //     buttons: rbg,
        //     onChange: setFieldValue,
        //     onRichChange: this.handleRadioButtonGroupChange
        // }
        const query = '2516 Chadwick St, Salt Lake City, UT 84106';
        const { q, addressdetails } = this.state.searchParams;
        // this.state.searchParams
        console.log('RENDER:')
        console.log(JSON.stringify(this.state.searchParams, undefined, 4))

        const handleChange = (event: any) => {
            console.log('handleChange event', event);
            console.log('handleChange value', event.target.value);
        }

        return (
            <div>
                <h1>Reverse Geocoding</h1>
                <Formik initialValues={this.state.searchParams} onSubmit={this.onSubmit}>
                    {/* {({ values, isSubmitting, setFieldValue, handleBlur }) => ( */}
                    {({ values, setFieldValue, handleBlur }) => (
                        <Form>

                            <Field name="format" />
                            <Field name="q" />
                            <Field name="addressdetails" />
                            <RadioButtonGroupContainer
                                buttons={rbg}
                                formFieldName='format'
                                // onChange={this.handleRadioButtonGroupChange}
                                onFormixChange={setFieldValue}
                                value={values.format}
                                onBlur={handleBlur}
                            />
                            {/* <RadioButton label="JSON" value="json" />
                                <RadioButton label="HTML" value="html" />
                                <RadioButton label="XML" value="xml" /> */}
                            <button type="submit">Submit</button>
                            {/* <RadioGroup
                                label="Meal Choice"
                                onChange={this.handleRadioGroupChange}
                                selectedValue={this.state.searchParams.format}
                            >
                                <Radio label="JSON" value="json" />
                                <Radio label="HTML" value="html" />
                                <Radio label="XML" value="xml" />
                            </RadioGroup> */}
                            <DebugFormix />
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

// <Formik initialValues={this.state.searchParams} onSubmit={this.onSubmit}>
// {({ isSubmitting }) => {
//     console.log('form', this);
//     return (
//         <Form>
//             <div className="row">
//                 <div className="col">
//                     <Field name="q" type="text" />
//                 </div>
//                 {/* <div className="col">
//                     <RadioButtonGroupContainer {...rbgProps} />
//                 </div> */}
//                 <div className="col">
//                     <Button type="button">X</Button>
//                 </div>
//             </div>
//             <Button type="button" disabled={isSubmitting}>Add Friend</Button>
//             <Button type="submit" disabled={isSubmitting}>Invite</Button>
//         </Form>
//     )
// }}
// </Formik>
//
{/* <div>
<code>https://wiki.openstreetmap.org/wiki/Nominatim</code>
</div>
<div>
<code>https://nominatim.openstreetmap.org/search?params</code>
</div>
<div>
<code>https://nominatim.openstreetmap.org/search/query?params</code>
</div> */}


