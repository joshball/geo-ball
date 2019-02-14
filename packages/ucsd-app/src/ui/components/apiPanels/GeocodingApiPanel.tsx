import * as React from 'react'
import { Formik, FormikActions, Form, Field, ErrorMessage, FieldProps, FormikProps } from "formik";
import { DebugFormix } from './DebugFormix';
import { RadioButtonGroup, RadioButton } from '../common/input/RadioButtonGroup';



export interface GeocodingApiPanelProps {
}
export interface GeocodingApiPanelState {
    isGoing: boolean;
    numberOfGuests: number;
    format: string;
    [key: string]: any;
}

export class GeocodingApiPanel extends React.Component<GeocodingApiPanelProps, GeocodingApiPanelState> {

    constructor(props: GeocodingApiPanelProps) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2,
            format: 'json',
        };
        this.handleRadioGroupChange = this.handleRadioGroupChange.bind(this);
        // this.handleRadioButtonGroupChange = this.handleRadioButtonGroupChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event: any) {
        console.log('handleChange.event.TARGET:', event.target);
        event.persist();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event: any) {
        console.log('handleSubmit.event', event);
        event.preventDefault();
    }
    handleRadioGroupChange(event: React.FormEvent<HTMLInputElement>): void {
        console.log('handleRadioGroupChange.event', event);
        console.log('handleRadioGroupChange.event.target', event.target);
    }

    onBlur(event: React.FocusEvent<HTMLElement>): void {
        console.log('onBlur.item', event.target);
    }

    onSubmit(event: any): void {
        // const params = this.state.searchParams
        console.log('onSubmit:', event);
        // const params = new NominatimParams('2516 Chadwick St, Salt Lake City, UT 84106');

    }

    render() {
        return (
            <div>
                <h1>Reverse Geocoding (NORMAL FORM)</h1>
                <form>
                    <label>
                        Is going:
                        <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Format:
                        <input name="format" type="text" value={this.state.format} onChange={this.handleChange} />
                    </label>
                    <br />
                    <label>
                        Number of guests:
                        <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleChange} />
                    </label>
                    <br />
                    <RadioButtonGroup name="format" selectedButtonId={this.state.format} onChange={this.handleChange}>
                        <RadioButton id="json">JSON</RadioButton>
                        <RadioButton id="jsonv2">JSONv2</RadioButton>
                        <RadioButton id="xml">XML</RadioButton>
                        <RadioButton id="html">HTML</RadioButton>
                    </RadioButtonGroup>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <pre>
                    STATE:
                    {JSON.stringify(this.state, undefined, 4)}
                </pre>
            </div>
        );
    }


}
