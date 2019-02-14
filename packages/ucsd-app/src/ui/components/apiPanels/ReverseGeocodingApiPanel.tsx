import * as React from 'react'
import { Formik, Form, Field, FieldProps } from "formik";
import { DebugFormix } from './DebugFormix';
import { RadioButtonGroup, RadioButton } from '../common/input/RadioButtonGroup';



export interface ReverseGeocodingApiPanelProps {
}
export interface FormData {
    isGoing: boolean;
    numberOfGuests: number;
    format: string;
    [key: string]: any;
}
export interface ReverseGeocodingApiPanelState {
    formData: FormData;
}

export class ReverseGeocodingApiPanel extends React.Component<ReverseGeocodingApiPanelProps, ReverseGeocodingApiPanelState> {

    constructor(props: ReverseGeocodingApiPanelProps) {
        super(props);
        this.state = {
            formData: {
                isGoing: true,
                numberOfGuests: 3,
                format: 'xml',
            }
        };
        this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
        // this.handleRadioButtonGroupChange = this.handleRadioButtonGroupChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event: any) {
        console.log('handleChange.event.TARGET:', event.target);
        event.persist();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(({ formData }) => ({
            formData: {
                ...formData,
                [name]: value
            }
        }));
        // this.setState({
        //     formData:{
        //         ...this.state.formData,
        //         [name]: value
        //     }
        // });
    }

    handleRadioGroupChange(event: React.FormEvent<HTMLInputElement>): void {
        console.log('handleRadioGroupChange.event', event);
        console.log('handleRadioGroupChange.event.target', event.target);
    }

    onBlur(event: React.FocusEvent<HTMLElement>): void {
        console.log('onBlur.item', event.target);
    }

    onSubmit(formData: any): void {
        // const params = this.state.searchParams
        console.log('onSubmit:', formData);
        // const params = new NominatimParams('2516 Chadwick St, Salt Lake City, UT 84106');
        this.setState({
            formData
        })

    }


    render() {

        const FormikRadioButtonGroup = ({
            field, // { name, value, onChange, onBlur }
            // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            ...props
        }: FieldProps<ReverseGeocodingApiPanelState>) => (
                <RadioButtonGroup {...props} name={field.name} selectedButtonId={field.value} onChange={field.onChange}>
                    <RadioButton id="json">JSON</RadioButton>
                    <RadioButton id="jsonv2">JSONv2</RadioButton>
                    <RadioButton id="xml">XML</RadioButton>
                    <RadioButton id="html">HTML</RadioButton>
                </RadioButtonGroup>
            );

        return (
            <div>
                <h1>Reverse Geocoding</h1>
                <Formik initialValues={this.state.formData} onSubmit={this.onSubmit}>
                    {/* {({ values, isSubmitting, setFieldValue, handleBlur }) => ( */}
                    {({ values }) => (
                        <Form>
                            <label>
                                Format:<Field name="format" />
                            </label>
                            <br />
                            <label>
                                Number of guests:<Field type="number" name="numberOfGuests" />
                            </label>
                            <br />
                            <label>
                                Is Going?:<Field type="checkbox" checked={values.isGoing} name="isGoing" />
                            </label>
                            <br />
                            <Field name="format" component={FormikRadioButtonGroup} />
                            <br />
                            <button type="submit">Submit</button>
                            <DebugFormix />
                        </Form>
                    )}
                </Formik>
                <pre>
                    STATE:
                    {JSON.stringify(this.state, undefined, 4)}
                </pre>
            </div>
        );
    }
}
