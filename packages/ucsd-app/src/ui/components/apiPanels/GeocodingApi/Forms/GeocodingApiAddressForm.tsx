import * as React from 'react';
import { INominatimParams } from '@geo-ball/osm-data';
// import { SectionHeaderOne } from 'ui/components/common/layout/SectionHeader';
import {
    Heading,
    Switch,
    InformedSwitchField,
    InformedSwitch,
    IAsFieldContext,
    Card,
    FieldSet,
    TextareaField,
    Textarea,
    Label,
    InformedTextareaField,
} from '@geo-ball/component-lib';

// const JDR = styles.justifyRight;

const queryFormWidth = {
    width: '300px',
};
const inputWidth = {
    width: '240px',
};

// const queryColStyle = css({
//     display: 'inline-block',
//     // margin: '10px',
//     // padding: '10px',
//     width: '100%',
//     // backgroundColor: colors.pastels.litBlue,
// });

// export const getFreeSearchForm = () => (
//     <div {...queryColStyle}>
//         <FormGroup style={JDR} labelFor="q" label="Query String" inline={false}>
//             <Field name="q" component={FormikTextArea} />
//         </FormGroup>
//     </div>
// )
// export const getStructuredAddressForm = () => (
//     <div {...queryColStyle}>
//         <FormGroup style={JDR} labelFor="street" label="Street" inline={true}>
//             <Field
//                 name="query.structuredQuery.street"
//                 style={inputWidth}
//                 component={FormikInputGroup}
//             />
//         </FormGroup>
//         <FormGroup style={JDR} labelFor="city" label="City" inline={true}>
//             <Field
//                 name="query.structuredQuery.city"
//                 style={inputWidth}
//                 component={FormikInputGroup}
//             />
//         </FormGroup>
//         <FormGroup style={JDR} labelFor="state" label="State" inline={true}>
//             <Field
//                 name="query.structuredQuery.state"
//                 style={inputWidth}
//                 component={FormikInputGroup}
//             />
//         </FormGroup>
//         <FormGroup style={JDR} labelFor="postalcode" label="Zip" inline={true}>
//             <Field
//                 name="query.structuredQuery.postalcode"
//                 style={inputWidth}
//                 component={FormikInputGroup}
//             />
//         </FormGroup>
//         <FormGroup style={JDR} labelFor="county" label="County" inline={true}>
//             <Field
//                 name="query.structuredQuery.county"
//                 style={inputWidth}
//                 component={FormikInputGroup}
//             />
//         </FormGroup>
//         <FormGroup style={JDR} labelFor="country" label="Country" inline={true}>
//             <Field
//                 name="query.structuredQuery.country"
//                 style={inputWidth}
//                 component={FormikInputGroup}
//             />
//         </FormGroup>
//     </div>
// );

// export const getStringAddressForm = () => (
//     <div {...queryColStyle}>
//         <FormGroup style={JDR} labelFor="q" label="Query String" inline={false}>
//             <Field
//                 name="query.stringQuery.q"
//                 placeholder="Free form query"
//                 style={{ height: '232px' }}
//                 component={FormikTextArea}
//                 fill={true}
//             />
//         </FormGroup>
//     </div>
// );

// export const GetNomantimSearchAddressSection = (
//     informedProps: IAsFieldContext<INominatimParams>,
// ) => {
// console.log('formikProps:', formikProps.values)
export const GetNomantimSearchAddressSection: React.FunctionComponent<any> = ({ ...props }) => {
    console.log('GetNomantimSearchAddressSection props:', props);
    // console.log('formikProps.query:', formikProps.values.query)
    // const { useStructured } = formikProps.values.query;
    // const { useStructured } = informedProps.values.query;

    // console.trace('props.values:', props.values);
    // console.log('query.useStructured:', props.values.query.useStructured);

    // const addressFormType = useStructured ? getStructuredAddressForm() : getStringAddressForm();
    // const useStructuredQueryForm =
    return (
        <Card.Card
            a11yDescriptionId="description"
            a11yTitleId="title"
            elevation="200"
            width="500px"
        >
            <Card.Header>
                <Card.Title id="title">Query</Card.Title>
                <InformedSwitch
                    label="Use Structured Address"
                    field="query.useStructured"
                    {...props}
                />
            </Card.Header>
            <Card.Content id="description">
                <FieldSet>
                    <InformedTextareaField
                        a11yId="queryStringId"
                        // a11yLabel="Query String"
                        label="Query String"
                        field="query.stringQuery.q"
                        placeholder="Free form query"
                        {...props}
                    />
                    {/* <TextareaField
                        a11yId="queryStringId"
                        a11yLabel="Query String"
                        label="Query String"
                        // field="query.stringQuery.q"
                        placeholder="Free form query"
                    /> */}
                    {/* <Label htmlFor="queryStringId">Query String</Label>
                    <Textarea
                        a11yId="queryStringId"
                        a11yLabel="Query String"
                        // label="Query String"
                        // field="query.stringQuery.q"
                        placeholder="Free form query"
                    /> */}
                </FieldSet>
            </Card.Content>
        </Card.Card>
    );
};
// style={{ height: '232px' }}

{
    /* <InformedSwitchField
label="Use Structured Address"
field="query.useStructured"
{...props}
/> */
}
