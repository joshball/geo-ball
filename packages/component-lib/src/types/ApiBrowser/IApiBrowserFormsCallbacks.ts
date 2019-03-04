import { DebugFormixDiv, GenericFormWithDebug } from '../../components/organisms/DebugFormixDiv';
import {
    FormikConfig,
    withFormik,
    FormikErrors,
    FormikBag,
    WithFormikConfig,
    FormikActions,
    FormikProps,
} from 'formik';

export interface IApiCallbackData<TUrlParams, TBodyParams, THeaderParams> {
    url: TUrlParams;
    body: TBodyParams;
    headers: THeaderParams;
}

export type OnSubmitCallback<TFormValues> = (values: TFormValues, formikActions: FormikActions<TFormValues>) => void;

export type BindSubmitForm = (submitForm: SubmitFormFunctionType) => void;
export type BindValidateForm<TFormValues> = (validateForm: ValidateFormFunctionType<TFormValues>) => void;
export type BindGetFormValues<TFormValues> = (getFormValues: GetFormValuesFunctionType<TFormValues>) => void;

export type SubmitFormFunctionType = () => void;
export type ValidateFormFunctionType<TFormValues> = () => Promise<FormikErrors<TFormValues>>;
export type GetFormValuesFunctionType<TFormValues> = () => TFormValues;

export interface AdditionalProps<TFormValues> {
    bindSubmitForm?: Optional<BindSubmitForm>;
    bindValidateForm?: Optional<BindValidateForm<TFormValues>>;
    bindGetFormValues?: Optional<BindGetFormValues<TFormValues>>;
    showDebugForm: boolean;
}

export interface ActionFormikConfig<TFormValues> extends FormikConfig<TFormValues> {
    additionalProps?: AdditionalProps<TFormValues>;
}
export interface ActionFormikProps<TFormValues> extends FormikProps<TFormValues> {
    additionalProps?: AdditionalProps<TFormValues>;
}

export const getFormikConfig = <TFormValues>(formValues: TFormValues): FormikConfig<TFormValues> => {
    return {
        initialValues: formValues,
        onSubmit: () => undefined,
    };
};

export const getActionFormikConfig = <TFormValues>(
    formikConfig: FormikConfig<TFormValues>,
    bindSubmitForm: BindSubmitForm,
    bindValidateForm: BindValidateForm<TFormValues>,
    bindGetFormValues: BindGetFormValues<TFormValues>
): ActionFormikConfig<TFormValues> => {
    return {
        ...formikConfig,
        additionalProps: {
            bindSubmitForm,
            bindValidateForm,
            bindGetFormValues,
            showDebugForm: false,
        },
    };
};

/**
 * All forms must implement this to validate the forms data
 */

interface IFormData {
    data: any;
    isValid: boolean;
    canBeSubmitted: boolean;
}

interface IKeyValues {
    [key: string]: any;
}
type QueryFormDataToKeyValuesCallback = (data: IFormData) => IKeyValues;
type QueryFormDataToEncodedQueryStringCallback = (data: IFormData) => string;

interface IBaseFormCallbacks {
    /**
     * Self-contained form component to render
     */
    component: any;

    /**
     * Callback that will reset the data in the form
     */
    resetDataCallback: () => void;

    /**
     * Callback to retrieve the latest state of the form data
     */
    getFormData: () => IFormData;

    /**
     * Optional: QueryFormDataToKeyValuesCallback
     * If the data is simple, and no conversions or deep deconstruction is
     * not required, then you can leave this undefined. We will simply iterate
     * over the keys of the form data, and return each value. If you need to
     * convert items (for instance, array of strings to single comma separated
     * string), then provide your own conversion function. Same if you have
     * deeply nested values that need flattening.
     */
    formDataToKeyValues?: QueryFormDataToKeyValuesCallback;
}
class BaseFormCallbacks implements IBaseFormCallbacks {

    component: any;
    resetDataCallback = () => undefined;
    getFormData = () => this.formData;
    formDataToKeyValues = () => {
        return { ...this.formData };
        // const obj = Object.assign({}, this.formData.data);
        // return obj;
    };

    // formDataToKeyValues?: QueryFormDataToKeyValuesCallback | undefined;

    formData: IFormData;
    constructor(component: any) {
        this.component = component;
        this.formData = {
            data: undefined,
            isValid: true,
            canBeSubmitted: true,
        };
    }

}

interface IQueryParamsFormCallbacks extends IBaseFormCallbacks {
    /**
     * Optional: QueryFormDataToEncodedQueryStringCallback
     * The default method will simply take the KV pairs, URI encode them,
     * join them with and =, and return a string. You really should not
     * override this for debugging purposes.
     */
    formDataQueryString?: QueryFormDataToEncodedQueryStringCallback;
}
interface IBodyParamsFormCallbacks extends IBaseFormCallbacks {
    /**
     * Optional: QueryFormDataToEncodedQueryStringCallback
     * The default method will simply take the KV pairs, URI encode them,
     * join them with and =, and return a string. You really should not
     * override this for debugging purposes.
     */
    formDataQueryString?: QueryFormDataToEncodedQueryStringCallback;
}

interface IHeadersFormCallbacks extends IBaseFormCallbacks {
    /**
     * Optional: QueryFormDataToEncodedQueryStringCallback
     * The default method will simply take the KV pairs, URI encode them,
     * join them with and =, and return a string. You really should not
     * override this for debugging purposes.
     */
    formDataQueryString?: QueryFormDataToEncodedQueryStringCallback;
}

interface IApiFormData {
    queryParams?: Optional<IFormData>;
    bodyParams?: Optional<IFormData>;
    headers?: Optional<IFormData>;
    isValid: () => boolean;
    canBeSubmitted: () => boolean;
}

// interface IApiBrowserFormsCallbacks {
//     queryParamsFormCb?: IQueryParamsFormCallbacks;
//     bodyParamsFormCb?: IBodyParamsFormCallbacks;
//     headersFormCb?: IHeadersFormCallbacks;
//     allForms?: IFormData;
// }

export class ApiFormData implements IApiFormData {

    get queryParams() {
        return this.queryParamsFormCb ? this.queryParamsFormCb.getFormData() : undefined;
    }
    get bodyParams() {
        return this.bodyParamsFormCb ? this.bodyParamsFormCb.getFormData() : undefined;
    }
    get headers() {
        return this.headersFormCb ? this.headersFormCb.getFormData() : undefined;
    }

    isValid() {
        return (
            (this.queryParams ? this.queryParams.isValid : true) &&
            (this.bodyParams ? this.bodyParams.isValid : true) &&
            (this.headers ? this.headers.isValid : true)
        );
    }

    canBeSubmitted() {
        return (
            this.isValid() &&
            (this.queryParams ? this.queryParams.canBeSubmitted : true) &&
            (this.bodyParams ? this.bodyParams.canBeSubmitted : true) &&
            (this.headers ? this.headers.canBeSubmitted : true)
        );
    }

    queryParamsFormCb?: Optional<IQueryParamsFormCallbacks>;
    bodyParamsFormCb?: Optional<IBodyParamsFormCallbacks>;
    headersFormCb?: Optional<IHeadersFormCallbacks>;

    constructor(
        queryParamsFormCb?: Optional<IQueryParamsFormCallbacks>,
        bodyParamsFormCb?: Optional<IBodyParamsFormCallbacks>,
        headersFormCb?: Optional<IHeadersFormCallbacks>
    ) {
        this.queryParamsFormCb = queryParamsFormCb;
        this.bodyParamsFormCb = bodyParamsFormCb;
        this.headersFormCb = headersFormCb;
    }

}

// class ApiBrowserFormsCallbacks implements IApiBrowserFormsCallbacks {

//     queryParamsFormCb?: IQueryParamsFormCallbacks | undefined;
//     bodyParamsFormCb?: IBodyParamsFormCallbacks | undefined;
//     headersFormCb?: IHeadersFormCallbacks | undefined;
//     allForms?: IFormData | undefined;
//     interface IFormData {
//         data: any;
//         isValid: boolean;
//         canBeSubmitted: boolean;
//     }
//     constructor()

// }

export class ApiFormManager<TFormValues> {

    initialValues: TFormValues;
    _submitTheForm: Optional<SubmitFormFunctionType>;
    _validateTheForm: Optional<ValidateFormFunctionType<TFormValues>>;
    config: ActionFormikConfig<TFormValues>;
    _getFormValues: Optional<GetFormValuesFunctionType<TFormValues>>;

    constructor(values: TFormValues) {
        this.initialValues = values;
        this.bindSubmitForm = this.bindSubmitForm.bind(this);
        this.bindValidateForm = this.bindValidateForm.bind(this);
        this.bindGetFormValues = this.bindGetFormValues.bind(this);

        this.submitTheForm = this.submitTheForm.bind(this);
        this.validateTheForm = this.validateTheForm.bind(this);
        this.getFormValues = this.getFormValues.bind(this);
        this.getValidFormData = this.getValidFormData.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.config = this.getActionFormikConfig();
    }

    // getCurrentValues(): TFormValues {
    //     console.log("ApiFormProps.getCurrentValues")
    // }

    onSubmit(values: TFormValues, formikActions: FormikActions<TFormValues>) {
        console.log('ApiFormProps.onSubmit', values, formikActions);
    }

    bindSubmitForm(submitFormCallback: SubmitFormFunctionType) {
        this._submitTheForm = submitFormCallback;
    }

    bindValidateForm(validateFormCallback: ValidateFormFunctionType<TFormValues>) {
        this._validateTheForm = validateFormCallback;
    }

    bindGetFormValues(getFormValuesCallback: GetFormValuesFunctionType<TFormValues>) {
        this._getFormValues = getFormValuesCallback;
    }

    submitTheForm() {
        console.log('ApiFormProps.submitTheForm');
        return this._submitTheForm ? this._submitTheForm() : undefined;
    }

    getFormValues(): Promise<TFormValues | void> {
        console.log('ApiFormProps.getFormValues');
        return this._getFormValues ? Promise.resolve(this._getFormValues()) : Promise.resolve(undefined);
    }

    validateTheForm(): Promise<FormikErrors<TFormValues> | void> {
        console.log('ApiFormProps.validateTheForm');
        return this._validateTheForm ? this._validateTheForm() : Promise.resolve();
    }

    getValidFormData(): Promise<TFormValues | void> {
        console.log('ApiFormProps.getValidFormData');
        const u = undefined;
        return this.validateTheForm().then(errors => {
            return errors ? undefined : this.getFormValues();
        });
    }

    getFormikConfig(): FormikConfig<TFormValues> {
        return {
            initialValues: this.initialValues,
            onSubmit: this.onSubmit,
        };
    }

    getActionFormikConfig(): ActionFormikConfig<TFormValues> {
        const formikConfig = this.getFormikConfig();
        return {
            ...formikConfig,
            additionalProps: {
                bindSubmitForm: this.bindSubmitForm,
                bindValidateForm: this.bindValidateForm,
                bindGetFormValues: this.bindGetFormValues,
                showDebugForm: false,
            },
        };
    }

}

export class ApiFullFormManager<TUrlParamsFormValues, TBodyParamsFormValues, THeadersFormValues> {

    urlParams: ApiFormManager<TUrlParamsFormValues>;
    bodyParams: ApiFormManager<TBodyParamsFormValues>;
    headers: ApiFormManager<THeadersFormValues>;

    constructor(
        initUrlValues: TUrlParamsFormValues,
        initBodyValues: TBodyParamsFormValues,
        initHeaderValues: THeadersFormValues
    ) {
        this.urlParams = new ApiFormManager<TUrlParamsFormValues>(initUrlValues);
        this.bodyParams = new ApiFormManager<TBodyParamsFormValues>(initBodyValues);
        this.headers = new ApiFormManager<THeadersFormValues>(initHeaderValues);
    }

}

export const BindAdditionalPropsToForm = <TFormValues>(
    formikConfig: ActionFormikConfig<TFormValues>,
    GenericForm: any
) => (props: ActionFormikProps<TFormValues>) => {
    const additionalProps = formikConfig.additionalProps || {
        bindSubmitForm: undefined,
        bindValidateForm: undefined,
        bindGetFormValues: undefined,
        showDebugForm: false,
    };
    // props.additionalProps = additionalProps
    // console.log("GenericUrlParamsFormContainer ACTION PROPS:", props)
    // console.log("GenericUrlParamsFormContainer additionalProps:", additionalProps)
    if (additionalProps) {
        if (additionalProps.bindSubmitForm) {
            additionalProps.bindSubmitForm(props.submitForm);
        }
        if (additionalProps.bindValidateForm) {
            additionalProps.bindValidateForm(props.validateForm);
        }
        if (additionalProps.bindGetFormValues) {
            additionalProps.bindGetFormValues(() => props.values);
        }
        // additionalProps.showDebugForm;
    }
    props.additionalProps = additionalProps;
    // const gf = GenericForm({ ...props });
    // console.log('GF', gf);
    // return gf;
    return GenericFormWithDebug(GenericForm({ ...props }), props);
};
