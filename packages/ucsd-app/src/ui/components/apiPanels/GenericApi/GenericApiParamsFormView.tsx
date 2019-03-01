import * as React from 'react'
import { Formik, Form, Field, FormikProps } from 'formik';
import { Card, Elevation, Button, Intent, FormGroup } from '@blueprintjs/core';
import { styles } from '../../../config/theme/index';
import { css } from 'glamor';
import { FormikTextArea } from '../../common/input/FormikWrapped';
import { IGenericGetUrlParams } from './GenericApiService';

const JDR = styles.justifyRight;


// export interface IGenericApiParamsFormState {
//     formData: any;
// }

export interface IGenericApiParamsFormProps {
    formData: IGenericGetUrlParams;
    onSubmit: (formData: IGenericGetUrlParams) => void;
    children?: React.ReactNode;
}

const mainFormWrapDiv = {
    display: 'flex',
    height: '440px',
};
const mainQueryStyle = css({
    display: 'flex',
    padding: '10px',
    width: 'fit-content',
});
const queryColStyle = css({
    display: 'inline-block',
    width: '100%',
});


export const GenericApiParamsFormView = (props: IGenericApiParamsFormProps & FormikProps<IGenericGetUrlParams>) => {

    console.log('GenericApiParamsFormView BEFORE')
    console.log('GenericApiParamsFormView.props:', props)
    console.log('GenericApiParamsFormView AFTER')

    return (
        (
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
                    {props.children}
                </div>
            </Form>
        )
    );


}
