import * as React from 'react';
import {
    FormikInputField,
    Label,
    Input,
    FieldWrapper,
    Divider,
    FieldSet,
    Button,
    FormikCheckboxField,
    FormikCheckbox,
    Checkbox,
} from '@geo-ball/component-lib';

import { Formik, FormikProps, FormikConfig, Field, FieldProps } from 'formik';
import { ITestFormData } from '../InformedTests/TestFormData';

export const FormikFormComponent = (props: FormikProps<ITestFormData>) => {
    console.log('FormikFormComponent props', props);
    // props.values.name
    return (
        <form onSubmit={props.handleSubmit}>
            <h4>FormikFormComponent</h4>
            <FieldSet>
                <Field
                    name="firstName"
                    render={({ field, form }: FieldProps<ITestFormData>) => (
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
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.lastName}
                    name="lastName"
                />
                <Field component={FormikInputField} name="username" label="Username" />
                {/* <Field component={FormikInputField} type="number" name="age" label="Age" /> */}
                {/* <Field component={FormikInputField} type="number" name="age" label="Age" /> */}
                <Field component={FormikInputField} name="email" label="Email" type="email" />
                <Label htmlFor="email">Email Two</Label>
                <Field type="email" name="email2" />
                {props.errors.email && <div id="feedback">{props.errors.email}</div>}
                <Field component={FormikCheckbox} name="checkbox" label="checkbox" />
                <Field component={FormikCheckboxField} name="checkboxField" label="checkboxField" />
                {/* <Checkbox
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    checked={props.values.checkbox}
                    name="checkbox"
                /> */}

                <Divider />
                <Button type="submit">Submit</Button>
            </FieldSet>
        </form>
    );
};
export const SimpleTypescriptFormContainer = (formikProps: FormikConfig<ITestFormData>) => (
    <div>
        <h1>SimpleTypescriptFormContainer</h1>
        <Formik {...formikProps} component={FormikFormComponent} />
    </div>
);

// const BasicExampleAsComponent = (formikProps: any) => (
//     <div>
//         <h1>BasicExampleAsComponent Form</h1>
//         <Formik {...formikProps} component={StandaloneBasicExampleForm} />
//     </div>
// )
// const BasicExampleWithRender = (formikProps: any) => (
//     <div>
//         <h1>BasicExampleWithRender Form</h1>
//         <Formik {...formikProps} render={StandaloneBasicExampleForm} />
//     </div>
// )
// const BasicExampleWithChildren = (formikProps: any) => (
//     <div>
//         <h1>BasicExampleWithChildren Form</h1>
//         {/* <Formik {...formikProps} children={StandaloneBasicExampleForm}> */}
//         <Formik {...formikProps}>{StandaloneBasicExampleForm}</Formik>
//     </div>
// )
// const StandaloneBasicExampleForm = (props: any, other: any) => {
//     console.log("StandaloneBasicExampleForm props", props, other)
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <h4>StandaloneBasicExampleForm</h4>
//             <input
//                 type="text"
//                 onChange={props.handleChange}
//                 onBlur={props.handleBlur}
//                 value={props.values.name}
//                 name="name"
//             />
//             {props.errors.name && <div id="feedback">{props.errors.name}</div>}
//             <button type="submit">Submit</button>
//         </form>
//     )
// }

// const BasicExample = (formikProps: any) => (
//     <div>
//         <h1>BasicExample Form</h1>
//         <Formik
//             {...formikProps}
//             render={props => (
//                 <form onSubmit={props.handleSubmit}>
//                     <h4>BasicExample</h4>
//                     <input
//                         type="text"
//                         onChange={props.handleChange}
//                         onBlur={props.handleBlur}
//                         value={props.values.name}
//                         name="name"
//                     />
//                     {props.errors.name && <div id="feedback">{props.errors.name}</div>}
//                     <button type="submit">Submit</button>
//                 </form>
//             )}
//         />
//     </div>
// )
// const BasicExampleOrig = () => (
//     <div>
//         <h1>BasicExampleOrig Form</h1>
//         <Formik
//             initialValues={{ name: "jared" }}
//             onSubmit={(values, actions) => {
//                 setTimeout(() => {
//                     console.log("BasicExampleOrig.onSubmit()", values, actions)
//                     actions.setSubmitting(false)
//                 }, 1000)
//             }}
//             render={props => (
//                 <form onSubmit={props.handleSubmit}>
//                     <h4>BasicExampleOrig</h4>
//                     <input
//                         type="text"
//                         onChange={props.handleChange}
//                         onBlur={props.handleBlur}
//                         value={props.values.name}
//                         name="name"
//                     />
//                     {props.errors.name && <div id="feedback">{props.errors.name}</div>}
//                     <button type="submit">Submit</button>
//                 </form>
//             )}
//         />
//     </div>
// )
