import * as React from 'react';
import { Formik } from 'formik';
import { ActionFormikConfig } from './FormikHelpers';
import { BindAdditionalPropsToForm } from './BindAdditionalPropsToForm';

// export function GenericFormEx(GenericForm: any) {
//     return (
//         <div>
//             <GenericForm />
//             <DebugFormixDiv />
//         </div>
//     );
// }
// export interface IGenericFormContainerProps<TFormValues> {
//     GenericForm: any;
//     formikConfig: ActionFormikConfig<TFormValues>;
// }
// export interface IGenericFormContainerState<TFormValues> {
//     formState: Optional<TFormValues>;
// }
// export class GenericFormContainer<TFormValues> extends React.Component<
//     IGenericFormContainerProps<TFormValues>,
//     IGenericFormContainerState<TFormValues>
// > {
//     constructor(props: IGenericFormContainerProps<TFormValues>) {
//         super(props);
//         this.state = {
//             formState: undefined,
//         };
//     }

//     componentDidMount() {
//         console.log('GenericFormContainer MOUNTED this.props', this.props);
//     }

//     render() {
//         return (formikConfig: ActionFormikConfig<TFormValues>): JSX.Element => {
//             const { GenericForm } = this.props;
//             return (
//                 <div>
//                     {/* <h1>GenericUrlParamsFormContainer</h1> */}
//                     <Formik {...formikConfig}>
//                         {/* {BindAdditionalPropsToForm(formikConfig, GenericFormEx(GenericForm))} */}
//                         {BindAdditionalPropsToForm(formikConfig, GenericForm)}
//                     </Formik>
//                 </div>
//             );
//         };
//     }
// }
// export function GenericFormContainerWrapper<TFormValues>(GenericForm: any) {
//     return (formikConfig: ActionFormikConfig<TFormValues>): any => {
//         return new GenericFormContainer(GenericForm);
//     };
// }

export function GenericFormContainer<TFormValues>(GenericForm: any) {
    return (formikConfig: ActionFormikConfig<TFormValues>): JSX.Element => {
        return (
            <div>
                {/* <h1>GenericUrlParamsFormContainer</h1> */}
                <Formik {...formikConfig}>
                    {/* {BindAdditionalPropsToForm(formikConfig, GenericFormEx(GenericForm))} */}
                    {BindAdditionalPropsToForm(formikConfig, GenericForm)}
                </Formik>
            </div>
        );
    };
}
// formik version
// export function GenericFormContainer<TFormValues>(GenericForm: any) {
//     return (formikConfig: ActionFormikConfig<TFormValues>): JSX.Element => {
//         return (
//             <div>
//                 {/* <h1>GenericUrlParamsFormContainer</h1> */}
//                 <Formik {...formikConfig}>
//                     {/* {BindAdditionalPropsToForm(formikConfig, GenericFormEx(GenericForm))} */}
//                     {BindAdditionalPropsToForm(formikConfig, GenericForm)}
//                 </Formik>
//             </div>
//         );
//     };
// }
