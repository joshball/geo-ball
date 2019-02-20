import * as React from 'react'
import { Field } from "formik";
import { FormGroup } from '@blueprintjs/core';
import { css } from 'glamor';
import { styles } from '../../../config/theme';
import { FormikInputGroup, FormikRadioButtonGroup, FormikNumericInput } from '../../common/input/FormikWrapped';
import { RadioButton } from '../../common/input/RadioButtonGroup';

const JDR = styles.justifyRight;

const queryColStyle = css({
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    height: '220px',
    // width: '100%'
});

const fieldWrap = css({
    ...JDR,
    marginLeft: '10px',
    marginRight: '10px',
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
            {OWF(<FormGroup labelFor="settings.exclude_place_ids" label="Exclude PID's" inline={true}>
                <Field name="settings.exclude_place_ids" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="settings.viewbox" label="Viewbox" inline={true}>
                <Field name="settings.viewbox" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="settings.email" label="Email" inline={true}>
                <Field name="settings.email" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="settings.accept_language" label="accept-language" inline={true}>
                <Field name="settings.accept_language" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="settings.json_callback" label="JSON cb" inline={true}>
                <Field name="settings.json_callback" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="settings.limit" label="Limit" inline={true}>
                <Field type="number" name="settings.limit" min={0} max={100} component={FormikNumericInput} />
            </FormGroup>)}
            {OWF(<FormGroup labelFor="settings.countrycodes" label="Countries" inline={true}>
                <Field name="settings.countrycodes" component={FormikInputGroup} />
            </FormGroup>)}
            {OWF(<div {...formatStuff}>
                <FormGroup labelFor="Response" label="Response Format" inline={false}>
                    <Field name="settings.format" component={FormikRadioButtonGroup}>
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
