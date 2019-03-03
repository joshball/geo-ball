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
        return {...this.formData};
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
