import { FormikActions, FormikErrors, FormikConfig } from 'formik';
import {
    SubmitFormFunctionType,
    ValidateFormFunctionType,
    ActionFormikConfig,
    GetFormValuesFunctionType,
} from './FormikHelpers';

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

export interface IApiCallbackData<TUrlParams, TBodyParams, THeaders> {
    url: TUrlParams;
    body: TBodyParams;
    headers: THeaders;
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
