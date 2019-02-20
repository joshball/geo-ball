import * as React from 'react'
import { connect, FormikContext } from 'formik';

interface IFormikFormProps<T> {
  render: (props: FormikContext<T>) => React.ReactElement<any>;
}

interface IFormikFormImplProps<T> extends IFormikFormProps<T> {
  formik: FormikContext<T>;
}

/**
 * This component provides access to the current Formik `form` props.
 *
 * This can be useful to access current form data outside of a FormField or Input.
 *
 * This component adapts the formik `connect()` api as a render prop.
 *
 * Example:
 * ```js
 * <FormikForm render={formik => {
 *   const username = formik.values.username;
 *   return (
 *     <h1>Hello {username}</h1>
 *   )
 * }} />
 * ```
 */

 const FormikFormImpl = <T extends any>({ render, formik }: IFormikFormImplProps<T>) => render(formik);

export const FormikForm: React.ComponentType<IFormikFormImplProps<any>> = connect(FormikFormImpl);


// Some examples of wrapping here with Office stuff
// https://github.com/vadistic/vats/blob/b7c9e08eb45d7fd94af477575adea04df5e06aca/packages/client/src/components/editable/formik.tsx


// export interface IFormikFormState {
//     formData: any;
// }
// export interface IFormikFormProps {
//     formData: any;
//     // onSubmit: (formData: INominatimParams) => void;
//     // getFormikProps: (formikProps: any) => void;
//     // showFormStatePanel: boolean;
// }

// export class FormikForm extends React.Component<IFormikFormProps, IFormikFormState> {
//     state: IFormikFormState;

//     constructor(props: IFormikFormProps) {
//         super(props);
//         this.state = {
//             formData: this.props.formData
//         };
//     }


//     render() {
//         const debugForm = this.props.showFormStatePanel ? <DebugFormix /> : null;
//         // const debugForm =  null;
//         // console.log('FORM DATA:', this.state.formData)

//         return (
//             <Formik initialValues={this.state.formData} onSubmit={this.props.onSubmit}>
//                 {(formikProps) => {
//                     const x = <FormikConsumer>{(p) => {
//                         console.log('p', p);
//                         console.log('p', p.values.query.stringQuery.q);
//                         return null;
//                     }}</FormikConsumer>
//                     return (
//                         <Form>
//                             {this.props.children}
//                         </Form>

//                     )
//                 }}
//             </Formik>);
//     }
// }
