import * as React from 'react';

// import { FormikInputField } from '@geo-ball/component-lib';
import {
    Checkbox,
    InformedCheckbox,
    InformedCheckboxField,
    Label,
    Input,
    FieldWrapper,
    Divider,
    FieldSet,
    Button,
    IFieldProps,
    IFormApi,
    InformedInputField,
    IAsFieldContext,
    Pane,
    FormError,
} from '@geo-ball/component-lib';

import { Form, FormState, FieldApi, FieldState, FormValue, FormValues } from 'informed';
import { ITestFormData } from './TestFormData';

// const basicValidation = (value: string) => {
//     return !value || value.length < 5 ? 'Field must be longer than five characters' : undefined;
// };
// export const basicValidation = <TValueType extends {}>(
//     value: TValueType,
//     values: Array<TValueType>,
// ): Optional<FormError> => {
//     console.log('basicValidation.value', value);
//     console.log('basicValidation.typeof value', typeof value);
//     console.log('basicValidation.values', values);
//     return !value || value.length < 5 ? 'Field must be longer than five characters' : undefined;
// };
export const basicValidation = (
    // value: FormValue<string>,
    value: string,
    _values: FormValues,
): Optional<FormError> => {
    console.log('basicValidation.value', value);
    // console.log('basicValidation.typeof value', typeof value);
    console.log('basicValidation._values', _values);
    return !value || value.length < 2 ? 'Field must be longer than one character' : undefined;
};

export interface InformedProps<TFormData> {
    formState: FormState<TFormData>;
    formApi: IFormApi;
    // fieldState: FieldState<any>;
    // fieldApi: FieldApi<any>;
}

export const InformedFormComponent = ({
    formApi,
    formState,
    ...rest
}: InformedProps<ITestFormData>) => {
    // console.log('');
    console.log('===============> InformedFormComponent <=================');
    // console.log('InformedFormComponent props:', props);
    // const { formState, formApi, ...rest } = props;
    console.log('InformedFormComponent formApi:', formApi);
    console.log('InformedFormComponent formState:', formState);
    console.log('InformedFormComponent rest:', rest);
    console.log(
        'InformedFormComponent getInitVal(firstName):',
        formApi.getInitialValue('firstName'),
    );
    // console.log('InformedFormComponent getInitVal(email):', formApi.getInitialValue('email'));
    return (
        <Pane backgroundColor="white700" padding="major-16">
            <h4>InformedFormComponent</h4>
            <FieldSet>
                <InformedInputField
                    label="First Name"
                    field="firstName"
                    validateOnChange
                    validate={basicValidation}
                    {...rest}
                />
                <InformedInputField
                    label="Last Name"
                    field="lastName"
                    {...rest}
                    validateOnChange
                    validate={basicValidation}
                />
                <InformedInputField
                    label="Username"
                    field="username"
                    {...rest}
                    validateOnChange
                    validate={basicValidation}
                />
                {/* <InformedInputField type="number" label="Age" field="age" {...rest} /> */}
                <InformedCheckbox label="checkbox" field="checkbox" {...rest} />
                <InformedCheckboxField label="checkboxField" field="checkboxField" {...rest} />
                {/* <InformedCheckboxField label="checkboxField" field="checkboxField" {...rest} />
                <Checkbox label="Normal Checkbox" />
                <Checkbox label="Controlled Normal Checkbox" /> */}
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
                    <code>{JSON.stringify(rest, null, 4)}</code>
                </div>
            </FieldSet>
        </Pane>
    );
};
// export const InformedFormContainer = (formikProps: BasicFormProps<ISimpleFormDataRedux>) => (
export const InformedFormContainer = (informedProps: any) => (
    <div>
        <h1>InformedFormContainer</h1>
        {console.log('InformedFormContainer.informedProps:', informedProps)}
        {/* <Form {...informedProps} component={InformedFormComponent}> */}
        <Form {...informedProps} component={InformedFormComponent}>
            {/* <InformedFormComponent /> */}
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
