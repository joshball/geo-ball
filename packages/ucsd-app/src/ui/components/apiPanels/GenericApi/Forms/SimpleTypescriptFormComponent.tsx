import * as React from "react"
import {
    FormikInputField
} from "@geo-ball/component-lib"

import { Formik, FormikProps, FormikConfig, Field, FieldProps } from "formik"


export interface ISimpleFormData {
    firstName: string
    lastName: string
    username: string
    email: string
    age: number
}

export const SimpleTypescriptFormContainer = (formikProps: FormikConfig<ISimpleFormData>) => (
    <div>
        <h1>SimpleTypescriptFormContainer</h1>
        <Formik {...formikProps} component={SimpleTypescriptFormComponent} />
    </div>
)

export const SimpleTypescriptFormComponent = (props: FormikProps<ISimpleFormData>) => {
    console.log("SimpleTypescriptFormComponent props", props)
    // props.values.name
    return (
        <form onSubmit={props.handleSubmit}>
            <h4>SimpleTypescriptFormComponent</h4>
            <input
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastName}
                name="lastName"
            />
            <Field
              name="firstName"
              render={({ field, form }: FieldProps<ISimpleFormData>) => (
                <div>
                  <input type="text" {...field} placeholder="First Name" />
                  {form.touched.firstName &&
                    form.errors.firstName &&
                    form.errors.firstName}
                </div>
              )}
            />
            <Field component={FormikInputField} name="username" label="Username" />
            <Field type="email" name="email"  />
            {props.errors.email && <div id="feedback">{props.errors.email}</div>}
            <button type="submit">Submit</button>
        </form>
    )
}

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
