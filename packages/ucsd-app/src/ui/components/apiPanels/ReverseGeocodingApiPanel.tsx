import * as React from 'react'
import { createContext } from 'react'
import { Formik, FormikActions, Form, Field, ErrorMessage, FieldProps, FormikProps } from "formik";
import { Button, ButtonGroup, RadioGroup, Radio, IButtonProps } from '@blueprintjs/core';
import { DebugFormix } from './DebugFormix';



export interface ReverseGeocodingApiPanelProps {
}
export interface ReverseGeocodingApiPanelState {
    isGoing: boolean;
    numberOfGuests: number;
    format: string;
    [key: string]: any;
}

export class ReverseGeocodingApiPanel extends React.Component<ReverseGeocodingApiPanelProps, ReverseGeocodingApiPanelState> {

    constructor(props: ReverseGeocodingApiPanelProps) {
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

    renderEx() {
        return (
            <div>
                <h1>Reverse Geocoding</h1>
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
                    <RadioButtonGroup name="format" value={this.state.value} onChange={this.handleChange}>
                        <RadioButton icon='help' className='.bp3-intent-primary' value="json">JSON</RadioButton>
                        <RadioButton value="jsonv2" active={true}>JSONv2</RadioButton>
                        <RadioButton value="xml">XML</RadioButton>
                        <RadioButton value="html">HTML</RadioButton>
                    </RadioButtonGroup>
                    <br />
                    <button type="submit">Submit</button>
                </form>
                <pre>
                    {JSON.stringify(this.state, undefined, 4)}
                </pre>
            </div>
        );
    }

    render() {
        const FormikRadioButtonGroup = ({
            field, // { name, value, onChange, onBlur }
            // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            ...props
        }: FieldProps<ReverseGeocodingApiPanelState>) => (
                <RadioButtonGroup {...props} name={field.name} value={field.value} onChange={field.onChange}>
                    <RadioButton icon='help' className='.bp3-intent-primary' value="json">JSON</RadioButton>
                    <RadioButton value="jsonv2" active={true}>JSONv2</RadioButton>
                    <RadioButton value="xml">XML</RadioButton>
                    <RadioButton value="html">HTML</RadioButton>
                </RadioButtonGroup>
            );

        return (
            <div>
                <h1>Reverse Geocoding</h1>
                <Formik initialValues={this.state} onSubmit={this.onSubmit}>
                    {/* {({ values, isSubmitting, setFieldValue, handleBlur }) => ( */}
                    {({ }) => (
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
                                Is Going?:<Field type="checkbox" name="isGoing" />
                            </label>
                            <br />
                            <Field name="format" component={FormikRadioButtonGroup}/>
                            <br />
                            <button type="submit">Submit</button>
                            <DebugFormix />
                        </Form>
                    )}
                </Formik>
                <pre>
                    {JSON.stringify(this.state, undefined, 4)}
                </pre>
            </div>
        );
    }
}

type clickedButtonCallback = (event: any, clickedButton: IRadioButton) => void;

export const RadioButtonGroupContext = createContext<IRadioButtonGroupState>({
    value: {
        value: '',
        active: false,
    },
    onButtonClicked: () => { console.log() }
});

export const RadioButtonGroupConsumer = RadioButtonGroupContext.Consumer


export interface IRadioButtonGroupProps {
    disabled?: boolean;
    name?: string;
    value?: any;
    onChange?: clickedButtonCallback
}

export interface IRadioButtonGroupState {
    value: IRadioButton;
    onButtonClicked: clickedButtonCallback
}
export class RadioButtonGroup extends React.Component<IRadioButtonGroupProps, IRadioButtonGroupState> {

    state: IRadioButtonGroupState;

    constructor(props: IRadioButtonGroupProps) {
        super(props);
        console.log('RadioButtonGroup() this', this);
        console.log('RadioButtonGroup() this.props', this.props);
        console.log('RadioButtonGroup() props.name', props.name);
        console.log('RadioButtonGroup() props.value', props.value);
        console.log('RadioButtonGroup() props.onChange', props.onChange);
        if ((props as any).field) {
            // const newProps = props as FormikProps<>)
            const newProps = props as any;
            console.log('GOT PROPS.....FIELD!', newProps);
            console.log('GOT PROPS.....FIELD!', newProps.field);
        }
        this.state = {
            value: props.value,
            onButtonClicked: this.onButtonClicked.bind(this)
        }
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }
    get type(): string { return 'RadioButtonGroup' }

    get value(): IRadioButton {
        return this.state.value;
    }

    onButtonClicked(event: any, clickedButton: IRadioButton) {
        if (this.props.onChange) {
            event.target.value = clickedButton.value;
            event.target.name = this.props.name;
            this.props.onChange(event, clickedButton.value);
        }
    }

    render() {
        const { children } = this.props;
        return (
            <ButtonGroup>
                <RadioButtonGroupContext.Provider value={this.state}>
                    {children}
                </RadioButtonGroupContext.Provider>
            </ButtonGroup>
        )
    }
}


export interface IRadioButton {
    value: any;
    active?: boolean;
}
export interface IRadioButtonProps extends IButtonProps, IRadioButton {
    children: any;
}

export const RadioButton = (props: IRadioButtonProps) => {
    const { value, active } = props;
    return <RadioButtonGroupConsumer>
        {({ onButtonClicked }) => {
            return <Button onClick={(e: any) => {
                console.log('Button.onClick', value, active)
                console.log('Button.onButtonClicked', onButtonClicked)
                onButtonClicked(e, { value, active });
            }} value={value}>
                {props.children}
            </Button>;
        }
        }
    </RadioButtonGroupConsumer>
}
