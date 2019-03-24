import * as React from 'react';
import { useLayoutEffect } from 'react';

// import { FormikInputField } from '@geo-ball/component-lib';
import {
    FormikInputField,
    Label,
    Input,
    FieldWrapper,
    Divider,
    FieldSet,
    Button,
    IFieldProps,
    InformedInputField,
    IAsFieldContext,
    Pane,
} from '@geo-ball/component-lib';

import {
    asField,
    Form,
    Text,
    BasicFormProps,
    Checkbox,
    Option,
    Scope,
    RadioGroup,
    TextArea,
    Select,
    Radio,
    FormState,
} from 'informed';

export interface ISimpleFormDataRedux {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    email2: string;
    age: number;
}
const basicValidation = (value: string) => {
    return !value || value.length < 5 ? 'Field must be longer than five characters' : undefined;
};

export const InformedFormComponent = (
    formState: FormState<ISimpleFormDataRedux>,
    ...props: any
) => {
    // console.log('');
    // console.log('===============> InformedFormComponent <=================');
    // console.log('InformedFormComponent formState:', formState);
    // console.log('InformedFormComponent props:', props);
    return (
        <Pane backgroundColor="white700" padding="major-16">
            <h4>InformedFormComponent</h4>
            <FieldSet>
                <InformedInputField
                    label="First Name"
                    field="firstName"
                    {...formState}
                    {...props}
                    validate={basicValidation}
                />
                <InformedInputField
                    type="number"
                    label="Age"
                    field="age"
                    {...formState}
                    {...props}
                />
                {/* <Label htmlFor="lastName">Last Name</Label>
                <InformedInputFieldRedux field="lastName" />
                <Label htmlFor="username">Username</Label>
                <InformedInputFieldEx field="username" /> */}
                {/* <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastName}
                    name="lastName"
                /> */}
                {/* <Field
                    name="firstName"
                    render={({ field, form }: FieldProps<ISimpleFormData>) => (
                        <FieldWrapper
                            a11yId="firstName"
                            label="First Name"
                            description="Required for your fannypack"
                        >
                            <Input
                                name="firstName"
                                type="text"
                                {...field}
                                placeholder="First Name"
                            />
                        </FieldWrapper>
                    )}
                />
                <Field component={FormikInputField} name="username" label="Username" />
                <Field component={FormikInputField} name="email" label="Email" type="email" />
                <Label htmlFor="email">Email Two</Label>
                <Field type="email" name="email2" />
                {props.errors.email && <div id="feedback">{props.errors.email}</div>} */}
                <Divider />
                <Button type="submit">Submit</Button>
                <div>
                    <label>formState:</label>
                    <code>{JSON.stringify(formState, null, 4)}</code>
                </div>
                <div>
                    <label>props:</label>
                    <code>{JSON.stringify(props, null, 4)}</code>
                </div>
            </FieldSet>
        </Pane>
    );
};
// export const InformedFormContainer = (formikProps: BasicFormProps<ISimpleFormDataRedux>) => (
export const InformedFormContainer = (informedProps: any) => (
    <div>
        <h1>InformedFormContainer</h1>
        <Form {...informedProps} component={InformedFormComponent}>
            {/* {({ formState }) => (
                <div>
                    <label>
                        First name:
                        <Text field="name" />
                    </label>

                    <button type="submit">Submit</button>
                    <label>Values:</label>
                    <code>{JSON.stringify(formState.values)}</code>
                    <label>Touched:</label>
                    <code>{JSON.stringify(formState.touched)}</code>
                    <label>Errors:</label>
                    <code>{JSON.stringify(formState.errors)}</code>
                    <label>Invalid:</label>
                    <code>{JSON.stringify(formState.invalid)}</code>
                    <label>Pristine:</label>
                    <code>{JSON.stringify(formState.pristine)}</code>
                    <label>Dirty:</label>
                    <code>{JSON.stringify(formState.dirty)}</code>
                    <label>Submits:</label>
                    <code>{JSON.stringify(formState.submits)}</code>
                    <label>Error:</label>
                    <code>{JSON.stringify(formState.error)}</code>
                </div>
            )} */}
        </Form>
        <h1>InformedFormContainer</h1>
    </div>
);
