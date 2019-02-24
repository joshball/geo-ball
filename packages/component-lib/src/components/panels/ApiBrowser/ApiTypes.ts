


// const ContentType = {
//     'multipart/form-data',
//     'text/plain',
//     'application/json',
//     'application/xml'
// }

export const cssProps = (props?: React.CSSProperties): React.CSSProperties => props as React.CSSProperties;


export type HttpMethod = 'get' | 'post';

export type ApiBodyType = 'none' | 'form-data' | 'x-www-form-urlencoded' | 'raw' | 'binary';



export interface IHttpHeader {
    key: string;
    val: string;
}

export interface IBaseHttpParameters<TParameterData = any> {
    paramData: Optional<TParameterData>;
    getParams: () => Optional<TParameterData>;
    getInitialValues: () => Optional<TParameterData>
}

export interface IHttpUrlParameters<TParameterData> extends IBaseHttpParameters<TParameterData> {
}

export interface IHttpBodyParameters<TParameterData> extends IBaseHttpParameters<TParameterData> {
}



export class BaseHttpParameters<TParameterData = any> implements IBaseHttpParameters<TParameterData> {

    paramData: Optional<TParameterData>;

    constructor(paramData?: Optional<TParameterData>) {
        this.paramData = paramData;
    }

    getParams() {
        return this.paramData;
    }
    getInitialValues() {
        return this.paramData;
    }

}

export class HttpBodyParameters<TParameterData = any> extends BaseHttpParameters<TParameterData>
    implements IHttpBodyParameters<TParameterData> {
    constructor(paramData?: Optional<TParameterData>) {
        super(paramData);
    }
}

export class HttpUrlParameters<TParameterData = any> extends BaseHttpParameters<TParameterData>
    implements IHttpUrlParameters<TParameterData>{
    constructor(paramData?: Optional<TParameterData>) {
        super(paramData);
    }
}


export interface IApiParameters<TUrlParameterData = any, TBodyParameterData = any> {
    urlParams: IHttpUrlParameters<TUrlParameterData>;
    bodyParams: IHttpBodyParameters<TBodyParameterData>;
    headers: Array<IHttpHeader>;
}

export class ApiParameters<TUrlParameterData=any, TBodyParameterData=any>
    implements IApiParameters<TUrlParameterData, TBodyParameterData>{

    urlParams: IHttpUrlParameters<TUrlParameterData>;
    bodyParams: IHttpBodyParameters<TBodyParameterData>;
    headers: Array<IHttpHeader>;

    constructor(
        urlParams?: Optional<IHttpUrlParameters<TUrlParameterData>>,
        bodyParams?: Optional<IHttpBodyParameters<TBodyParameterData>>,
        headers?: Optional<Array<IHttpHeader>>
    ) {
        this.urlParams = urlParams || new HttpUrlParameters();
        this.bodyParams = bodyParams || new HttpBodyParameters();
        this.headers = headers || [];
    }
}

export interface IApiCallDefinition<TApiResponse, TUrlParameterData=any, TBodyParameterData=any> {
    name: string;
    method: HttpMethod;
    url: string;
    apiParams: IApiParameters<TUrlParameterData, TBodyParameterData>;
    apiCallback: ApiCallback<TApiResponse, TUrlParameterData, TBodyParameterData>;
}

export type ApiCallback<TApiResponse, TUrlParameterData = any, TBodyParameterData = any> =
    (apiParams: IApiParameters<TUrlParameterData, TBodyParameterData>) => Promise<TApiResponse>;



export const ApiCallbackStub = <TApiResponse>(_p: any): Promise<TApiResponse> => new Promise(resolve =>
    setTimeout(() => {
        resolve({ apiParams: _p } as unknown as TApiResponse)
    }, 1000),
);
// export const ApiCallbackStub = <TApiResponse>(_p: any) => Promise.resolve({} as TApiResponse);

export class ApiCallDefinition<TApiResponse, TUrlParameterData = any, TBodyParameterData = any> implements
    IApiCallDefinition<TApiResponse, TUrlParameterData, TBodyParameterData> {

    name: string;
    method: HttpMethod;
    url: string;
    apiParams: IApiParameters<TUrlParameterData, TBodyParameterData>;
    apiCallback: ApiCallback<TApiResponse, TUrlParameterData, TBodyParameterData>;

    constructor(name: string, method: HttpMethod, url: string,
        apiParams: IApiParameters = new ApiParameters(),
        apiCallback: ApiCallback<TApiResponse> = ApiCallbackStub
    ) {
        this.name = name;
        this.method = method;
        this.url = url;
        this.apiParams = apiParams;
        this.apiCallback = apiCallback;
    }

}
