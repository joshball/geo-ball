import * as React from 'react';
import { Form, FormikConsumer } from 'formik';
import { Card, Elevation, Button, Intent } from '@blueprintjs/core';
import { GetNomantimSearchAddressSection as GetNomantimSearchAddressForm } from '../nominatim/ApiAddressForm';
import { SectionHeaderTwo, SectionHeaderThree } from '../../common/layout/SectionHeader';
import { getOtherSettingsForm as GetNomantimSettingsForm } from '../nominatim/ApiSettingsForm';
import { getSwitchesFormBox as GetNomantimTogglesForm } from '../nominatim/ApiTogglesForm';
import { styles } from '../../../config/theme';
import { css } from 'glamor';

const JDR = styles.justifyRight;

// Some examples of wrapping here with Office stuff
// https://github.com/vadistic/vats/blob/b7c9e08eb45d7fd94af477575adea04df5e06aca/packages/client/src/components/editable/formik.tsx

// export const xxx = (props: any) => {
//     console.log('feo props:', props);

//     return <Formik initialValues={this.state.formData} onSubmit={this.props.onSubmit} />;
// };

// export const GeocodingApiFormParent = (props: any) => {

//     console.log('feo props:', props);

//     return (
//         <Formik initialValues={this.state.formData} onSubmit={this.props.onSubmit}>
//         </Formik>);
// }

// FormikBag<INominatimParams>
export const GeocodingApiFormEx = (formikProps: any) => {
    const mainQueryStyle = css({
        display: 'flex',
        padding: '10px',
        width: 'fit-content',
    });
    const mainSettingsStyle = css({
        display: 'flex',
        padding: '10px',
        width: '100%',
    });

    const mainFormWrapDiv = {
        display: 'flex',
        height: '440px',
    };

    console.log('feo formikProps:', formikProps);

    const x = (
        <FormikConsumer {...formikProps}>
            {p => {
                console.log('p', p);
                console.log('p', p.values.query.stringQuery.q);
                return null;
            }}
        </FormikConsumer>
    );
    // console.log('formiksProps', formikProps)
    // console.log('formiksProps', JSON.stringify(formikProps, null, 4))

    return (
        <Form>
            {x}
            <Card interactive={false} elevation={Elevation.FOUR}>
                <div style={mainFormWrapDiv}>
                    <div {...mainQueryStyle}>
                        <Card interactive={false} elevation={Elevation.TWO}>
                            {GetNomantimSearchAddressForm(formikProps)}
                            <div style={JDR}>
                                <Button intent={Intent.PRIMARY} type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Card>
                    </div>
                    <div {...mainSettingsStyle}>
                        <Card
                            style={{ width: '100%' }}
                            interactive={false}
                            elevation={Elevation.TWO}
                        >
                            <SectionHeaderTwo style={{ marginBottom: '15px' }}>
                                Settings
                            </SectionHeaderTwo>
                            {GetNomantimSettingsForm()}

                            <SectionHeaderThree>Toggles</SectionHeaderThree>
                            {GetNomantimTogglesForm()}
                        </Card>
                    </div>
                </div>
            </Card>
        </Form>
    );
};

// const GeocodingApiFormParent = withFormik({
//     mapPropsToValues: () => ({ name: '' }),

//     handleSubmit: (values, { setSubmitting }) => {
//       setTimeout(() => {
//         alert(JSON.stringify(values, null, 2));
//         setSubmitting(false);
//       }, 1000);
//     },

//     displayName: 'BasicForm',
//   })(GeocodingApiFormEx);
