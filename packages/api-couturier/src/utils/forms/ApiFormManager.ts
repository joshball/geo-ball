// import {
//     SubmitFormFunctionType,
//     ValidateFormFunctionType,
//     ActionFormikConfig,
//     GetFormValuesFunctionType,
// } from './InformedHelpers';

// import { GenericFormContainer } from './GenericFormContainer';

export interface IApiFormValuesTuple<TFormValues> {
    values: TFormValues;
    form: any;
}
export class ApiFormValuesTuple<TFormValues> implements IApiFormValuesTuple<TFormValues> {
    values: TFormValues;
    form: any;
    constructor(values: TFormValues, form: any) {
        this.values = values;
        this.form = form;
    }
}

export class ApiFormSectionMgr<TFormValues> {
    initialValues: TFormValues;
    form: any;
    // config: ActionFormikConfig<TFormValues>;

    constructor(fvTuple: ApiFormValuesTuple<TFormValues>) {
        this.initialValues = fvTuple.values;
        this.form = fvTuple.form;
        // this.form = GenericFormContainer(fvTuple.form);
        // this.config = this.getActionFormikConfig();
    }

    // getFormikConfig(): FormikConfig<TFormValues> {
    //     return {
    //         initialValues: this.initialValues,
    //         onSubmit: this.onSubmit,
    //     };
    // }

    // getActionFormikConfig(): ActionFormikConfig<TFormValues> {
    //     const formikConfig = this.getFormikConfig();
    //     return {
    //         ...formikConfig,
    //         additionalProps: {
    //             bindSubmitForm: this.bindSubmitForm,
    //             bindValidateForm: this.bindValidateForm,
    //             bindGetFormValues: this.bindGetFormValues,
    //             showDebugForm: false,
    //         },
    //     };
    // }
}

export interface IApiFormManager<
    TUrlParamsFormValues = Optional<any>,
    TBodyParamsFormValues = Optional<any>,
    THeadersFormValues = Optional<any>
> {
    urlParams?: Optional<ApiFormSectionMgr<TUrlParamsFormValues>>;
    bodyParams?: Optional<ApiFormSectionMgr<TBodyParamsFormValues>>;
    headers?: Optional<ApiFormSectionMgr<THeadersFormValues>>;
}
export interface IApiFormManagerTuples<
    TUrlParamsFormValues = Optional<any>,
    TBodyParamsFormValues = Optional<any>,
    THeadersFormValues = Optional<any>
> {
    urlTuple?: Optional<ApiFormValuesTuple<TUrlParamsFormValues>>;
    bodyTuple?: Optional<ApiFormValuesTuple<TBodyParamsFormValues>>;
    headersTuple?: Optional<ApiFormValuesTuple<THeadersFormValues>>;
}

export class ApiFormManager<
    TUrlParamsFormValues = Optional<any>,
    TBodyParamsFormValues = Optional<any>,
    THeadersFormValues = Optional<any>
> {
    urlParams?: Optional<ApiFormSectionMgr<TUrlParamsFormValues>>;
    bodyParams?: Optional<ApiFormSectionMgr<TBodyParamsFormValues>>;
    headers?: Optional<ApiFormSectionMgr<THeadersFormValues>>;

    constructor(apiFormMgr: IApiFormManagerTuples) {
        if (apiFormMgr.urlTuple) {
            this.urlParams = new ApiFormSectionMgr<TUrlParamsFormValues>(apiFormMgr.urlTuple);
        }
        if (apiFormMgr.bodyTuple) {
            this.bodyParams = new ApiFormSectionMgr<TBodyParamsFormValues>(apiFormMgr.bodyTuple);
        }
        if (apiFormMgr.headersTuple) {
            this.headers = new ApiFormSectionMgr<THeadersFormValues>(apiFormMgr.headersTuple);
        }
    }
}
