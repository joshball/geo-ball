/// <reference types="react" />
export declare const cssProps: (props?: import("react").CSSProperties | undefined) => import("react").CSSProperties;
export declare type HttpMethod = 'get' | 'post';
export declare type ApiBodyType = 'none' | 'form-data' | 'x-www-form-urlencoded' | 'raw' | 'binary';
export interface IHttpHeader {
    key: string;
    val: string;
}
export interface IBaseHttpParameters<TParameterData = any> {
    paramData: Optional<TParameterData>;
    getParams: () => Optional<TParameterData>;
    getInitialValues: () => Optional<TParameterData>;
}
export interface IHttpUrlParameters<TParameterData> extends IBaseHttpParameters<TParameterData> {
}
export interface IHttpBodyParameters<TParameterData> extends IBaseHttpParameters<TParameterData> {
}
export declare class BaseHttpParameters<TParameterData = any> implements IBaseHttpParameters<TParameterData> {
    paramData: Optional<TParameterData>;
    constructor(paramData?: Optional<TParameterData>);
    getParams(): Optional<TParameterData>;
    getInitialValues(): Optional<TParameterData>;
}
export declare class HttpBodyParameters<TParameterData = any> extends BaseHttpParameters<TParameterData> implements IHttpBodyParameters<TParameterData> {
    constructor(paramData?: Optional<TParameterData>);
}
export declare class HttpUrlParameters<TParameterData = any> extends BaseHttpParameters<TParameterData> implements IHttpUrlParameters<TParameterData> {
    constructor(paramData?: Optional<TParameterData>);
}
export interface IApiParameters<TUrlParameterData = any, TBodyParameterData = any> {
    urlParams: IHttpUrlParameters<TUrlParameterData>;
    bodyParams: IHttpBodyParameters<TBodyParameterData>;
    headers: Array<IHttpHeader>;
}
export declare class ApiParameters<TUrlParameterData = any, TBodyParameterData = any> implements IApiParameters<TUrlParameterData, TBodyParameterData> {
    urlParams: IHttpUrlParameters<TUrlParameterData>;
    bodyParams: IHttpBodyParameters<TBodyParameterData>;
    headers: Array<IHttpHeader>;
    constructor(urlParams?: Optional<IHttpUrlParameters<TUrlParameterData>>, bodyParams?: Optional<IHttpBodyParameters<TBodyParameterData>>, headers?: Optional<Array<IHttpHeader>>);
}
export interface IApiCallDefinition<TApiResponse, TUrlParameterData = any, TBodyParameterData = any> {
    name: string;
    method: HttpMethod;
    url: string;
    apiParams: IApiParameters<TUrlParameterData, TBodyParameterData>;
    apiCallback: ApiCallback<TApiResponse, TUrlParameterData, TBodyParameterData>;
}
export declare type ApiCallback<TApiResponse, TUrlParameterData = any, TBodyParameterData = any> = (apiParams: IApiParameters<TUrlParameterData, TBodyParameterData>) => Promise<TApiResponse>;
export declare const ApiCallbackStub: <TApiResponse>(_p: any) => Promise<TApiResponse>;
export declare class ApiCallDefinition<TApiResponse, TUrlParameterData = any, TBodyParameterData = any> implements IApiCallDefinition<TApiResponse, TUrlParameterData, TBodyParameterData> {
    name: string;
    method: HttpMethod;
    url: string;
    apiParams: IApiParameters<TUrlParameterData, TBodyParameterData>;
    apiCallback: ApiCallback<TApiResponse, TUrlParameterData, TBodyParameterData>;
    constructor(name: string, method: HttpMethod, url: string, apiParams?: IApiParameters, apiCallback?: ApiCallback<TApiResponse>);
}
//# sourceMappingURL=ApiTypes.d.ts.map