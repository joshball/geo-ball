import * as React from 'react';
import { Field, FieldProps, FormikProps } from 'formik';
import { FormGroup, InputGroup, IInputGroupProps, Switch, Label } from '@blueprintjs/core';
import { css } from 'glamor';
import { colors, styles } from '../../../config/theme';
import { FormikInputGroup, FormikTextArea, FormikSwitch } from '../../common/input/FormikWrapped';
import { SectionHeaderOne } from '../../common/layout/SectionHeader';
import { INominatimParams } from '@geo-ball/osm-data';

const JDR = styles.justifyRight;

const queryFormWidth = {
    width: '300px',
};
const inputWidth = {
    width: '240px',
};

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
export const getStructuredAddressForm = () => (
    <div {...queryColStyle}>
        <FormGroup style={JDR} labelFor="street" label="Street" inline={true}>
            <Field
                name="query.structuredQuery.street"
                style={inputWidth}
                component={FormikInputGroup}
            />
        </FormGroup>
        <FormGroup style={JDR} labelFor="city" label="City" inline={true}>
            <Field
                name="query.structuredQuery.city"
                style={inputWidth}
                component={FormikInputGroup}
            />
        </FormGroup>
        <FormGroup style={JDR} labelFor="state" label="State" inline={true}>
            <Field
                name="query.structuredQuery.state"
                style={inputWidth}
                component={FormikInputGroup}
            />
        </FormGroup>
        <FormGroup style={JDR} labelFor="postalcode" label="Zip" inline={true}>
            <Field
                name="query.structuredQuery.postalcode"
                style={inputWidth}
                component={FormikInputGroup}
            />
        </FormGroup>
        <FormGroup style={JDR} labelFor="county" label="County" inline={true}>
            <Field
                name="query.structuredQuery.county"
                style={inputWidth}
                component={FormikInputGroup}
            />
        </FormGroup>
        <FormGroup style={JDR} labelFor="country" label="Country" inline={true}>
            <Field
                name="query.structuredQuery.country"
                style={inputWidth}
                component={FormikInputGroup}
            />
        </FormGroup>
    </div>
);

export const getStringAddressForm = () => (
    <div {...queryColStyle}>
        <FormGroup style={JDR} labelFor="q" label="Query String" inline={false}>
            <Field
                name="query.stringQuery.q"
                placeholder="Free form query"
                style={{ height: '232px' }}
                component={FormikTextArea}
                fill={true}
            />
        </FormGroup>
    </div>
);

export const GetNomantimSearchAddressSection = (formikProps: FormikProps<INominatimParams>) => {
    // console.log('formikProps:', formikProps.values)
    // console.log('formikProps.query:', formikProps.values.query)
    const { useStructured } = formikProps.values.query;

    // console.log('query.useStructured:', useStructured)

    const addressFormType = useStructured ? getStructuredAddressForm() : getStringAddressForm();
    // const useStructuredQueryForm =
    return (
        <div style={queryFormWidth}>
            <Field
                style={{ marginTop: '8px', float: 'right' }}
                name="query.useStructured"
                label="Use Structured Address"
                component={FormikSwitch}
            />
            <SectionHeaderOne style={{ marginBottom: '20px' }}>Query</SectionHeaderOne>
            {addressFormType}
        </div>
    );
};
