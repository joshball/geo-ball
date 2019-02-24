import {
    IApiCallDefinition,
    HttpMethod,
    IApiParameters,
    ApiCallback,
    ApiCallDefinition,
    HttpUrlParameters,
    ApiParameters,
} from "@geo-ball/component-lib";

// export interface IDefaultApiResponse<IApiParameters = any> {
//     date: string,
//     apiParams: Optional<IApiParameters>,
// }

// export const DefaultApiCallback: ApiCallback<IDefaultApiResponse>
//     = () => {
//         const foo = 'bar';
//         return (apiParams: IApiParameters) => FakeApiCallback({ foo });
//     }

// export const FOOO = <IDefaultApiResponse>(_apiParams: IApiParameters) => {
//     return Promise.resolve({ foo: 'bar' } as unknown as IDefaultApiResponse)
// };
// export const FOOO = <TApiResponse>(_apiParams: IApiParameters) => {
//     return Promise.resolve({ foo: 'bar' } as unknown as TApiResponse)
// };
// const apiCallback = (p: any): Promise<IFakeGetApiResponse> => new Promise(resolve =>
//     setTimeout(() => {
//         resolve({ date: new Date().toISOString(), apiParams: p })
//     }, FakeApiService.DEFAULT_TIMEOUT_MS),
// );


export interface IFakeGetUrlParams {
    query: {
        q: string;
        n: number;
    };
    skip: number;
    take: number;
    debug: boolean;
}


export type IFakeGetBodyParams = undefined;

export interface IFakeGetApiResponse {
    date: string;
    apiParams: AllFakeApiParams;
}
export class FakeGetApiResponse implements IFakeGetApiResponse {
    date: string;
    apiParams: AllFakeApiParams;
    constructor(apiParams: AllFakeApiParams) {
        this.apiParams = apiParams;
        this.date = new Date().toISOString();
    }
}

export type AllFakeApiParams = IApiParameters<IFakeGetUrlParams, IFakeGetBodyParams>;



export interface IDefaultApiResponse {
    foo: string,
}

export class FakeApiService {

    static DEFAULT_TIMEOUT_MS = 100;
    static GetDefaultFakeUrlParams = (): IFakeGetUrlParams => ({
        query: {
            q: 'some query string',
            n: 3
        },
        skip: 1,
        take: 2,
        debug: true
    });

    static GetApiCallDefinition(): ApiCallDefinition<IFakeGetApiResponse, IFakeGetUrlParams, any> {
        const urlParams = new HttpUrlParameters<IFakeGetUrlParams>(
            FakeApiService.GetDefaultFakeUrlParams()
        );
        const apiParams = new ApiParameters(urlParams);

        const apiCallDef = new ApiCallDefinition<IFakeGetApiResponse, IFakeGetUrlParams>(
            'FakeApi', 'get', 'http://fake.com', apiParams, FakeApiService.FetchWithGet);
        return apiCallDef;
    }

    static FetchWithGet(apiParams: IApiParameters): Promise<IFakeGetApiResponse> {
        return new Promise(resolve =>
            setTimeout(() => {
                resolve(new FakeGetApiResponse(apiParams))
            }, FakeApiService.DEFAULT_TIMEOUT_MS),
        )
    }

}
