import * as React from 'react';
import { Formik, Form, Field, FormikConsumer } from 'formik';
import { Card, Elevation, Button, Intent, Switch } from '@blueprintjs/core';
import { GetNomantimSearchAddressSection as GetNomantimSearchAddressForm } from '../nominatim/ApiAddressForm';
import { SectionHeaderTwo, SectionHeaderThree } from '../../common/layout/SectionHeader';
import { getOtherSettingsForm as GetNomantimSettingsForm } from '../nominatim/ApiSettingsForm';
import { getSwitchesFormBox as GetNomantimTogglesForm } from '../nominatim/ApiTogglesForm';
import { styles } from '../../../config/theme';
import { css } from 'glamor';
import { DebugFormix } from '../../common/input/DebugFormix';
import { INominatimParams } from '@geo-ball/osm-data';

const JDR = styles.justifyRight;

// Some examples of wrapping here with Office stuff
// https://github.com/vadistic/vats/blob/b7c9e08eb45d7fd94af477575adea04df5e06aca/packages/client/src/components/editable/formik.tsx

export interface IGeocodingApiFormState {
    formData: INominatimParams;
    formikProps: any;
    debugFormix: any;
}
export interface IGeocodingApiFormProps {
    formData: INominatimParams;
    onSubmit: (formData: INominatimParams) => void;
    getFormikProps: (formikProps: any) => void;
    showFormStatePanel: boolean;
}

export class GeocodingApiForm extends React.Component<
    IGeocodingApiFormProps,
    IGeocodingApiFormState
> {
    state: IGeocodingApiFormState;

    constructor(props: IGeocodingApiFormProps) {
        super(props);
        this.state = {
            formData: this.props.formData,
            formikProps: undefined,
            debugFormix: undefined,
        };
    }

    componentWillUpdate() {}
    cb = (formikProps: any) => {
        console.log('cb.formikProps', formikProps);
        console.log('cb.formikProps', formikProps.values.query.stringQuery.q);
        this.props.getFormikProps(formikProps);
    };
    render() {
        const mainQueryStyle = css({
            display: 'flex',
            // margin: '10px',
            padding: '10px',
            // justifyContent: 'flex-end',
            // alignContent: 'flex-end',
            width: 'fit-content',
            // align:'right',
            // backgroundColor: colors.pastels.litBlue,
        });
        const mainSettingsStyle = css({
            display: 'flex',
            // margin: '10px',
            padding: '10px',
            // justifyContent: 'flex-end',
            // alignContent: 'flex-end',
            width: '100%',
            // align:'right',
            // backgroundColor: colors.pastels.litBlue,
        });

        const pageStyle = {
            margin: '20px',
            // padding: '10px',
        };

        const mainFormWrapDiv = {
            display: 'flex',
            height: '440px',
        };
        const debugForm = this.props.showFormStatePanel ? <DebugFormix /> : null;
        // const debugForm =  null;
        // console.log('FORM DATA:', this.state.formData)

        return (
            <Formik initialValues={this.state.formData} onSubmit={this.props.onSubmit}>
                {/* {({ values, isSubmitting, setFieldValue, handleBlur }) => ( */}
                {formikProps => {
                    this.cb(formikProps);
                    const x = (
                        <FormikConsumer>
                            {p => {
                                console.log('p', p);
                                console.log('p', p.values.query.stringQuery.q);
                                return null;
                            }}
                        </FormikConsumer>
                    );
                    // console.log('formiksProps', formikProps)
                    // console.log('formiksProps', JSON.stringify(formikProps, null, 4))
                    // this.props.getFormikProps(formikProps, <DebugFormix/>)
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
                            {debugForm}
                        </Form>
                    );
                }}
            </Formik>
        );
    }
}
