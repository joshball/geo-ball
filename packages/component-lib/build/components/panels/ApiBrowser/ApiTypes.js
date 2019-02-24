"use strict";
// const ContentType = {
//     'multipart/form-data',
//     'text/plain',
//     'application/json',
//     'application/xml'
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssProps = (props) => props;
class BaseHttpParameters {
    constructor(paramData) {
        this.paramData = paramData;
    }
    getParams() {
        return this.paramData;
    }
    getInitialValues() {
        return this.paramData;
    }
}
exports.BaseHttpParameters = BaseHttpParameters;
class HttpBodyParameters extends BaseHttpParameters {
    constructor(paramData) {
        super(paramData);
    }
}
exports.HttpBodyParameters = HttpBodyParameters;
class HttpUrlParameters extends BaseHttpParameters {
    constructor(paramData) {
        super(paramData);
    }
}
exports.HttpUrlParameters = HttpUrlParameters;
class ApiParameters {
    constructor(urlParams, bodyParams, headers) {
        this.urlParams = urlParams || new HttpUrlParameters();
        this.bodyParams = bodyParams || new HttpBodyParameters();
        this.headers = headers || [];
    }
}
exports.ApiParameters = ApiParameters;
exports.ApiCallbackStub = (_p) => new Promise(resolve => setTimeout(() => {
    resolve({ apiParams: _p });
}, 1000));
// export const ApiCallbackStub = <TApiResponse>(_p: any) => Promise.resolve({} as TApiResponse);
class ApiCallDefinition {
    constructor(name, method, url, apiParams = new ApiParameters(), apiCallback = exports.ApiCallbackStub) {
        this.name = name;
        this.method = method;
        this.url = url;
        this.apiParams = apiParams;
        this.apiCallback = apiCallback;
    }
}
exports.ApiCallDefinition = ApiCallDefinition;
//# sourceMappingURL=ApiTypes.js.map