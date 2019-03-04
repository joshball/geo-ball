import {
    IGenericUrlParamsFormValues,
    IGenericHeadersFormValues,
    IGenericBodyParamsFormValues,
    GenericBodyParamsFormValues,
    GenericUrlParamsFormValues,
    GenericHeadersFormValues,
} from "."

import { getFormikConfig } from "@geo-ball/component-lib"

export interface IGenericFormValues {
    urlParams: IGenericUrlParamsFormValues
    bodyParams: IGenericBodyParamsFormValues
    headers: IGenericHeadersFormValues
}

export const getDefaultGenericFormValues = (): IGenericFormValues => {
    return {
        urlParams: new GenericUrlParamsFormValues(),
        bodyParams: new GenericBodyParamsFormValues(),
        headers: new GenericHeadersFormValues(),
    }
}

export const getFormikProps = (formValues: IGenericFormValues) => {
    return {
        urlParams: getFormikConfig(formValues.urlParams),
        bodyParams: getFormikConfig(formValues.bodyParams),
        headers: getFormikConfig(formValues.headers),
    }
}

// export createSomething =

// export const wrapTheForms = (formValues: IGenericFormValues) => {
//     const formikProps = getFormikProps(formValues)
//     return {
//         urlParams: getActionFormikConfig(formikProps.urlParams),
//         bodyParams: getActionFormikConfig(formikProps.bodyParams),
//         headers: getActionFormikConfig(formikProps.headers),
//     }
//     // return {
//     //     urlParams: getActionFormikConfig(getFormikConfig(formValues.urlParams)),
//     //     bodyParams: getActionFormikConfig(getFormikConfig(formValues.bodyParams)),
//     //     headers: getActionFormikConfig(getFormikConfig(formValues.headers)),
//     // }
// }

// export interface IApiFormProps<TFormValues> {
//     intitalValues: TFormValues
//     validate: (values: TFormValues) => void | object | Promise<any>
//     handleSubmit: (values: TFormValues) => void | object | Promise<any>
//     getValues: () => TFormValues
// }

// IApiFormProps<TFormValues>, TFormValues>
// const ApiFormWrapper = <TFormValues>() => {
//     const formikConfig: WithFormikConfig<IApiFormProps<TFormValues>, TFormValues> = {
//         mapPropsToValues: props => props.intitalValues,
//         validate: (_values: TFormValues, props: IApiFormProps<TFormValues>) => props.validate,
//         handleSubmit: (_values: TFormValues, bag: FormikBag<IApiFormProps<TFormValues>, TFormValues>) =>
//             bag.props.handleSubmit,
//     }

//     return withFormik<IApiFormProps<TFormValues>, TFormValues>(stuff => {
//         return {
//             // Transform outer props into form values
//             mapPropsToValues: props => props.intitalValues,
//             validate: (_values: TFormValues, props: IApiFormProps<TFormValues>) => props.validate,
//             handleSubmit: (_values: TFormValues, bag: FormikBag<IApiFormProps<TFormValues>, TFormValues>) =>
//                 bag.props.handleSubmit,
//         }
//     })
// }
