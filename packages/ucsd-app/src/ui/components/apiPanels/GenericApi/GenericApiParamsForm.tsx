import * as React from 'react'
import { Formik, Form, Field } from 'formik';
import { Card, Elevation, Button, Intent, FormGroup } from '@blueprintjs/core';
import { searchChoiceDiv } from '../nominatim/ApiAddressForm';
import { IFormData, ApiResults } from '../GeocodingApiPanel';
import { SectionHeaderTwo, SectionHeaderThree } from '../../common/layout/SectionHeader';
import { getOtherSettingsForm, getSwitchesFormBox } from '../nominatim/ApiSettingsForm';
import { styles } from '../../../config/theme';
import { css } from 'glamor';
import { FormikTextArea } from '../../common/input/FormikWrapped';

const JDR = styles.justifyRight;


export interface IGenericApiParamsFormState {
    formData: any;
}
export interface IGenericApiParamsFormProps {
    formData: any;
    onSubmit: (formData: any) => void;
}

export class GenericApiParamsForm extends React.Component<IGenericApiParamsFormProps, IGenericApiParamsFormState> {
    state: IGenericApiParamsFormState;

    constructor(props: IGenericApiParamsFormProps) {
        super(props);
        this.state = {
            formData: this.props.formData
        };
    }

    render() {
        const mainFormWrapDiv = {
            display: 'flex',
            height: '440px',
        };
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
        const queryColStyle = css({
            display: 'inline-block',
            // margin: '10px',
            // padding: '10px',
            width: '100%',
            // backgroundColor: colors.pastels.litBlue,
        });
        console.log('FORM DATA:', this.state.formData)
        return (<Formik initialValues={this.state.formData} onSubmit={this.props.onSubmit}>

            {() => ( // {formikStuff}
                <Form>
                    <div style={mainFormWrapDiv}>
                        <div {...mainQueryStyle}>
                            <Card interactive={false} elevation={Elevation.TWO}>
                                <div {...queryColStyle}>
                                    <FormGroup style={JDR}
                                        labelFor="query"
                                        label="Query String"
                                        inline={false}>
                                        <Field name="query"
                                            placeholder="Free form query"
                                            style={{ height: '232px' }}
                                            component={FormikTextArea}
                                            fill={true} />
                                    </FormGroup>
                                    <FormGroup style={JDR}
                                        labelFor="debug"
                                        label="Debug"
                                        inline={true}>
                                        <Field
                                            name="debug"
                                        />
                                    </FormGroup>
                                </div>
                                <div style={JDR}>
                                    <Button intent={Intent.PRIMARY} type="submit">Submit</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </Form>)}
        </Formik>);
    }
}
