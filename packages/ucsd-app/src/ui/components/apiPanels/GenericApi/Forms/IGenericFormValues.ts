import {
    IGenericUrlParamsFormValues,
    IGenericHeadersFormValues,
    IGenericBodyParamsFormValues,
    GenericBodyParamsFormValues,
    GenericUrlParamsFormValues,
    GenericHeadersFormValues,
} from "."
import { FormikConfig } from "formik"

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

export const getFormikProp = <TFormValues>(formValues: TFormValues): FormikConfig<TFormValues> => {
    return {
        initialValues: formValues,
        onSubmit: () => undefined,
    }
}
export const getFormikProps = (formValues: IGenericFormValues) => {
    return {
        urlParams: getFormikProp(formValues.urlParams),
        bodyParams: getFormikProp(formValues.bodyParams),
        headers: getFormikProp(formValues.headers),
    }
}

// export createSomething = 
