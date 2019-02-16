import * as React from 'react'
import { Formik, Form, Field, FieldProps } from "formik";
import { DebugFormix } from './DebugFormix';
import { RadioButtonGroup, RadioButton } from '../common/input/RadioButtonGroup';
import { INominatimParams, INominatimResult, NominatimParams } from '@geo-ball/osm-data';
import { Switch, ISwitchProps, FormGroup, Label, InputGroup, TextArea } from '@blueprintjs/core';
import { css, style } from 'glamor';
import { colors } from '../../config/theme';




export interface FormData extends INominatimParams {
}

export interface ReverseGeocodingApiPanelProps {
    formData: FormData;
}

export interface ReverseGeocodingApiPanelState {
    formData: FormData;
}

export class ReverseGeocodingApiPanel extends React.Component<ReverseGeocodingApiPanelProps, ReverseGeocodingApiPanelState> {

    constructor(props: ReverseGeocodingApiPanelProps) {
        super(props);
        this.state = {
            formData: this.props.formData || new NominatimParams()
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

        interface FormFieldProps extends FieldProps<ReverseGeocodingApiPanelState> { }

        // const getSingleCheckBox = () ={}
        const FormikRadioButtonGroup = ({
            field, // { name, value, onChange, onBlur }
            // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            ...props
        }: FormFieldProps) => (
                <RadioButtonGroup {...props} name={field.name} selectedButtonId={field.value} onChange={field.onChange}>
                    <RadioButton id="json">JSON</RadioButton>
                    <RadioButton id="jsonv2">JSONv2</RadioButton>
                    <RadioButton id="xml">XML</RadioButton>
                    <RadioButton id="html">HTML</RadioButton>
                </RadioButtonGroup>
            );

        interface LabelFieldProps extends FieldProps<ReverseGeocodingApiPanelState> {
            label: string
        }

        const toggleItem = css({
            boxSizing: 'border-box',
            // display: 'inline-block',
            // marginLeft: '5px',
            // height: 'auto',
            // margin: '0 20px 0px 20px',
            padding: '5px 20px 5px 20px',
            // border: 'thick double black',
            backgroundColor: colors.white,
            writingMode: 'horizontal-tb',
        });

        const FormikSwitch = ({
            field, // { name, value, onChange, onBlur }
            label,
            // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            ...props
        }: LabelFieldProps) => (
                <div {...toggleItem}>
                    <Switch name={field.name} checked={field.value} label={label} onChange={field.onChange} />
                </div>
            );

        const FormikInputGroup = ({
            field, // { name, value, onChange, onBlur }
            // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            ...props
        }: FormFieldProps) => (
                <InputGroup name={field.name} onChange={field.onChange} />
            );

        const FormikTextArea = ({
            field, // { name, value, onChange, onBlur }
        }: FormFieldProps) => (
                <TextArea style={{ height: '150px' }} name={field.name} onChange={field.onChange} large={true} />
            );

        const toggleBox = css({
            // display: 'flex',
            // height: '300px',
            // margin: '10px',
            // padding: '10px',
            // border: 'thick double black',
            // backgroundColor: '#ebf1f5',
            display: 'inline-flex',
            // flex: '1',
            // // flex:'0 0 100%',
            // flexDirection: 'row',
            alignContent: 'flex-start',
            // alignItems: 'flex-start',
            // justifyContent: 'flex-start',
            flexWrap: 'wrap',
            writingMode: 'vertical-lr',
            // margin: '20px',
            margin: '10px',
            padding: '10px',
            // border: 'thick double black',
            // height: '210px',
            height: '210px',
            // width: '500px',
            // width: 'min-content',
            // width: 'fit-content',
            // width: 'max-content',
            // width: 'auto',
            // flexBasis: 'auto', /* default value */
            // flexGrow: 1,
            backgroundColor: colors.primaryScale[3]
        });

        const labelBoxStyle = css({
            display: 'block',
            margin: '10px',
            padding: '10px',
            backgroundColor: colors.pastels.litGreen,
        });
        const toggleBoxLabel = css({
            display: 'block',
            //  width: 'fit-content',
            // align:'right',
            backgroundColor: colors.pastels.litBlue,
        });

        const toggleBoxDiv = (
            <div {...labelBoxStyle}>
                <div  {...toggleBoxLabel}>
                    <label>Switches WITH div</label>
                </div>
                <div {...toggleBox}>
                    <Field name="_addressdetails" label="Address Details" component={FormikSwitch} />
                    <Field name="_bounded" label="Bounded" component={FormikSwitch} />
                    <Field name="_dedupe" label="DeDupe" component={FormikSwitch} />
                    <Field name="_debug" label="Debug" component={FormikSwitch} />
                    <Field name="_extratags" label="Extra Tags" component={FormikSwitch} />
                    <Field name="_namedetails" label="Name Details" component={FormikSwitch} />
                    <Field name="_polygon_geojson" label="Polygon GeoJSON" component={FormikSwitch} />
                    <Field name="_polygon_kml" label="Polygon KML" component={FormikSwitch} />
                    <Field name="_polygon_svg" label="Polygon SVG" component={FormikSwitch} />
                    <Field name="_polygon_text" label="Polygon Text" component={FormikSwitch} />
                </div>
            </div>
        );

        const mainQueryStyle = css({
            display: 'flex',
            margin: '10px',
            padding: '10px',
            // justifyContent: 'flex-end',
            // alignContent: 'flex-end',
            width: 'fit-content',
            // align:'right',
            backgroundColor: colors.pastels.litBlue,
        });
        const queryColStyle = css({
            display: 'inline-block',
            margin: '10px',
            padding: '10px',
            backgroundColor: colors.pastels.litBlue,
        });
        const otherSettingsStyle = css({
            display: 'block',
            margin: '10px',
            padding: '10px',
            backgroundColor: colors.pastels.litBlue,
        });
        const justifyDivRight = {
            display: 'flex',
            justifyContent: 'flex-end'
        };
        const queryDiv = (
            <div>
                <h1>Main Query</h1>
                <div {...mainQueryStyle}>
                    <div {...queryColStyle}>
                        <FormGroup style={justifyDivRight} labelFor="q" label="Query String" inline={false}>
                            <Field name="q" component={FormikTextArea} />
                        </FormGroup>
                    </div>
                    <div  {...queryColStyle}>
                        <FormGroup style={justifyDivRight} labelFor="street" label="Street" inline={true}>
                            <Field name="street" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="city" label="City" inline={true}>
                            <Field name="city" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="state" label="State" inline={true}>
                            <Field name="state" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="postalcode" label="Zip" inline={true}>
                            <Field name="postalcode" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="county" label="County" inline={true}>
                            <Field name="county" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="country" label="Country" inline={true}>
                            <Field name="country" component={FormikInputGroup} />
                        </FormGroup>
                    </div>
                </div>
            </div>
        )
        const otherDiv = (
            <div>
                <h1>OtherSettings</h1>
                <div {...mainQueryStyle}>
                    <div {...queryColStyle}>
                        <FormGroup style={justifyDivRight} labelFor="exclude_place_ids" label="Exclude Place ID's" inline={true}>
                            <Field name="exclude_place_ids" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="Viewbox" label="Viewbox" inline={true}>
                            <Field name="viewbox" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="Email" label="Email" inline={true}>
                            <Field name="email" component={FormikInputGroup} />
                        </FormGroup>
                        <FormGroup style={justifyDivRight} labelFor="Response" label="Response Format" inline={false}>
                            <Field name="format" component={FormikRadioButtonGroup} />
                        </FormGroup>
                    </div>
                </div>
            </div>
        )
        return (
            <div>
                <h1>Reverse Geocoding</h1>
                <Formik initialValues={this.state.formData} onSubmit={this.onSubmit}>
                    {/* {({ values, isSubmitting, setFieldValue, handleBlur }) => ( */}
                    {() => (
                        <Form>

                            {queryDiv}
                            {otherDiv}
                            {toggleBoxDiv}
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


