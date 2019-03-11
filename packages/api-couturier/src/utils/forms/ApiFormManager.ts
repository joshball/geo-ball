import { FormikActions, FormikErrors, FormikConfig } from 'formik';
import {
    SubmitFormFunctionType,
    ValidateFormFunctionType,
    ActionFormikConfig,
    GetFormValuesFunctionType,
} from './FormikHelpers';

import { GenericFormContainer } from './GenericFormContainer';

export interface IApiFormValuesTuple<TFormValues> {
    values: TFormValues;
    form: JSX.Element;
}
export class ApiFormValuesTuple<TFormValues> implements IApiFormValuesTuple<TFormValues> {
    values: TFormValues;
    form: JSX.Element;
    constructor(values: TFormValues, form: JSX.Element) {
        this.values = values;
        this.form = form;
    }
}

export class ApiFormManager<TFormValues> {
    initialValues: TFormValues;
    form: JSX.Element;
    _submitTheForm: Optional<SubmitFormFunctionType>;
    _validateTheForm: Optional<ValidateFormFunctionType<TFormValues>>;
    config: ActionFormikConfig<TFormValues>;
    _getFormValues: Optional<GetFormValuesFunctionType<TFormValues>>;

    constructor(fvTuple: ApiFormValuesTuple<TFormValues>) {
        this.initialValues = fvTuple.values;
        this.form = (GenericFormContainer(fvTuple.form) as never) as JSX.Element;

        this.config = this.getActionFormikConfig();

        this.bindSubmitForm = this.bindSubmitForm.bind(this);
        this.bindValidateForm = this.bindValidateForm.bind(this);
        this.bindGetFormValues = this.bindGetFormValues.bind(this);
        this.submitTheForm = this.submitTheForm.bind(this);
        this.validateTheForm = this.validateTheForm.bind(this);
        this.getFormValues = this.getFormValues.bind(this);
        this.getValidFormData = this.getValidFormData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        return this._getFormValues
            ? Promise.resolve(this._getFormValues())
            : Promise.resolve(undefined);
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
        urlTuple: ApiFormValuesTuple<TUrlParamsFormValues>,
        bodyTuple: ApiFormValuesTuple<TBodyParamsFormValues>,
        headersTuple: ApiFormValuesTuple<THeadersFormValues>,
    ) {
        this.urlParams = new ApiFormManager<TUrlParamsFormValues>(urlTuple);
        this.bodyParams = new ApiFormManager<TBodyParamsFormValues>(bodyTuple);
        this.headers = new ApiFormManager<THeadersFormValues>(headersTuple);
    }
}

// export class ApiFullFormManagerOld<TUrlParamsFormValues, TBodyParamsFormValues, THeadersFormValues> {
//     urlParams: ApiFormManager<TUrlParamsFormValues>;
//     bodyParams: ApiFormManager<TBodyParamsFormValues>;
//     headers: ApiFormManager<THeadersFormValues>;

//     constructor(
//         initUrlValues: TUrlParamsFormValues,
//         initBodyValues: TBodyParamsFormValues,
//         initHeaderValues: THeadersFormValues
//     ) {
//         this.urlParams = new ApiFormManager<TUrlParamsFormValues>(initUrlValues, GenericUrlParamsForm);
//         this.bodyParams = new ApiFormManager<TBodyParamsFormValues>(initBodyValues, GenericBodyParamsForm);
//         this.headers = new ApiFormManager<THeadersFormValues>(initHeaderValues, GenericHeadersForm);
//     }
// }
