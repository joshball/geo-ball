import * as React from 'react'
import { Field, FieldProps } from "formik";
import { FormGroup, InputGroup, IInputGroupProps } from '@blueprintjs/core';
import { css } from 'glamor';
import { colors, styles } from '../../../config/theme';
import { FormikInputGroup, FormikTextArea, FormikRadioButtonGroup, FormikSwitch } from '../../common/input/FormikWrapped';
import { RadioButton } from '../../common/input/RadioButtonGroup';

const JDR = styles.justifyRight;

const queryColStyle = css({
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    height: '220px'
});

const fieldWrap = css({
    ...JDR,
    marginLeft: '10px',
    marginRight: '10px',
    // display: 'inline-flex',
    // justifyContent: 'flex-start',
    // flexDirection: 'column',
    // alignContent: 'flex-start',
    // flexWrap: 'wrap',
});

const formatStuff = css({
    // display: 'flex',
    // justifyContent: 'flex-end',
    // alignContent: 'flex-start',
    // flexWrap: 'wrap',
    // margin: '10px',
    // padding: '10px',
    // height: '210px',
    // backgroundColor: colors.primaryScale[3]
});
const OWF = (elem: any) => <div {...fieldWrap}>{elem}</div>;

export const getOtherSettingsForm = () => {
    return (
        <div {...queryColStyle}>
            {OWF(<FormGroup labelFor="exclude_place_ids" label="Exclude PID's" inline={true}>
                <Field name="exclude_place_ids" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="Viewbox" label="Viewbox" inline={true}>
                <Field name="viewbox" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="Email" label="Email" inline={true}>
                <Field name="email" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="_accept_language" label="accept-language" inline={true}>
                <Field name="_accept_language" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="json_callback" label="JSON cb" inline={true}>
                <Field name="json_callback" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="limit" label="Limit" inline={true}>
                <Field name="limit" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="_countryCodes" label="Countries" inline={true}>
                <Field name="_countryCodes" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<div {...formatStuff}>
                <FormGroup labelFor="Response" label="Response Format" inline={false}>
                    <Field name="format" component={FormikRadioButtonGroup}>
                        <RadioButton id="json">JSON</RadioButton>
                        <RadioButton id="jsonv2">JSONv2</RadioButton>
                        <RadioButton id="xml">XML</RadioButton>
                        <RadioButton id="html">HTML</RadioButton>
                    </Field>
                </FormGroup>
            </div>)}
        </div>
    )
}


const toggleItem = css({
    boxSizing: 'border-box',
    padding: '0px 10px 0px 10px',
    // backgroundColor: colors.white,
    writingMode: 'horizontal-tb',
});

const toggleBox = css({
    writingMode: 'vertical-lr',
    display: 'inline-flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: '10px',
    // margin: '10px',
    // padding: '10px',
    height: '110px',
    // border: '1px solid black',
    // backgroundColor: colors.primaryScale[3]
});
const WrappedField = (elem: any) => <div {...toggleItem}>{elem}</div>;

export const getSwitchesFormBox = () => (
    <div {...toggleBox}>
        {WrappedField(<Field name="_addressdetails" label="Address Details" component={FormikSwitch} />)}
        {WrappedField(<Field name="_bounded" label="Bounded" component={FormikSwitch} />)}
        {WrappedField(<Field name="_dedupe" label="DeDupe" component={FormikSwitch} />)}
        {WrappedField(<Field name="_debug" label="Debug" component={FormikSwitch} />)}
        {WrappedField(<Field name="_extratags" label="Extra Tags" component={FormikSwitch} />)}
        {WrappedField(<Field name="_namedetails" label="Name Details" component={FormikSwitch} />)}
        {WrappedField(<Field name="_polygon_geojson" label="Polygon GeoJSON" component={FormikSwitch} />)}
        {WrappedField(<Field name="_polygon_kml" label="Polygon KML" component={FormikSwitch} />)}
        {WrappedField(<Field name="_polygon_svg" label="Polygon SVG" component={FormikSwitch} />)}
        {WrappedField(<Field name="_polygon_text" label="Polygon Text" component={FormikSwitch} />)}
    </div>
);
