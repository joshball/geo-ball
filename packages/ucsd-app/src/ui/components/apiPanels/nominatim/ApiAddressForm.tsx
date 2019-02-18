import * as React from 'react'
import { Field, FieldProps, FormikProps } from "formik";
import { FormGroup, InputGroup, IInputGroupProps, Switch, Label } from '@blueprintjs/core';
import { css } from 'glamor';
import { colors, styles } from '../../../config/theme';
import { FormikInputGroup, FormikTextArea, FormikSwitch } from '../../common/input/FormikWrapped';
import { SectionHeaderOne } from '../../common/layout/SectionHeader';
import { INominatimParams } from '@geo-ball/osm-data';

const JDR = styles.justifyRight;


const queryFormWidth = {
    width: '300px',
}
const inputWidth = {
    width: '240px',
}

const queryColStyle = css({
    display: 'inline-block',
    // margin: '10px',
    // padding: '10px',
    width: '100%',
    // backgroundColor: colors.pastels.litBlue,
});

// export const getFreeSearchForm = () => (
//     <div {...queryColStyle}>
//         <FormGroup style={JDR} labelFor="q" label="Query String" inline={false}>
//             <Field name="q" component={FormikTextArea} />
//         </FormGroup>
//     </div>
// )
export const getSpecificAddressSearchForm = () => (
    <div  {...queryColStyle}>
        <FormGroup style={JDR} labelFor="street" label="Street" inline={true}>
            <Field name="street" style={inputWidth} component={FormikInputGroup} />
        </FormGroup>
        <FormGroup style={JDR} labelFor="city" label="City" inline={true}>
            <Field name="city" style={inputWidth} component={FormikInputGroup} />
        </FormGroup>
        <FormGroup style={JDR} labelFor="state" label="State" inline={true}>
            <Field name="state" style={inputWidth} component={FormikInputGroup} />
        </FormGroup>
        <FormGroup style={JDR} labelFor="postalcode" label="Zip" inline={true}>
            <Field name="postalcode" style={inputWidth} component={FormikInputGroup} />
        </FormGroup>
        <FormGroup style={JDR} labelFor="county" label="County" inline={true}>
            <Field name="county" style={inputWidth} component={FormikInputGroup} />
        </FormGroup>
        <FormGroup style={JDR} labelFor="country" label="Country" inline={true}>
            <Field name="country" style={inputWidth} component={FormikInputGroup} />
        </FormGroup>
    </div>
)

export const getFreeSearchForm = () => (
    <div {...queryColStyle}>
        <FormGroup style={JDR} labelFor="q" label="Query String" inline={false}>
            <Field name="q" placeholder="Free form query" style={{ height: '232px' }} component={FormikTextArea} fill={true} />
        </FormGroup>
    </div>
)


export const searchChoiceDiv = <TFormValues extends {}>(formikProps: FormikProps<TFormValues>) => {
    console.log('formikProps:', formikProps.values)
    const values = formikProps.values as INominatimParams;
    const { _useStructuredQuery } = values;
    console.log('formikProps:', _useStructuredQuery)
    console.log('values:', values.q)
    const form = _useStructuredQuery
        ? getSpecificAddressSearchForm()
        : getFreeSearchForm();
    // const useStructuredQueryForm =
    return (
        <div style={queryFormWidth}>
            <Field style={{ float: 'right' }} name="_useStructuredQuery" label="Use Structured Address" component={FormikSwitch} />
            <SectionHeaderOne style={{ marginBottom: "20px" }}>Query</SectionHeaderOne>
            {form}
        </div>
    )
}
