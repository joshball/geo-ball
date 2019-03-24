import {
    IApiParameters,
    ApiParameters,
    HttpMethod,
    ApiCallback,
    ApiCallDefinition,
} from '@geo-ball/api-couturier';

import {
    IGenericUrlParams,
    IGenericBodyParams,
    IGenericHeaders,
    IGenericApiResponse,
    GenericApiService,
} from './GenericApiService';

export type GenericGetApiParams = IApiParameters<
    IGenericUrlParams,
    IGenericBodyParams,
    IGenericHeaders
>;
export type GenericGetApiCallback = ApiCallback<IGenericApiResponse, IGenericUrlParams>;

/**
 * This is a wrapper of the GenericApiService.FetchWithGet(urlParams) call.
 * It looks complicated, but we are just being explicit and verbose.
 * Imagine we had no real control over the GenericApiService, and had to
 * put this wrapper in place.
 * It basically creates an ApiCallDefinition that we can pass to the ApiBrowser
 * If you had more control over the service, you could easily put this in the service
 * and even have your service use some of the typed parameter info.
 */
export class GenericApiDefinition extends ApiCallDefinition<
    IGenericApiResponse,
    IGenericUrlParams,
    IGenericBodyParams,
    IGenericHeaders
> {
    constructor() {
        super(
            GenericApiDefinition.Name,
            GenericApiDefinition.Method,
            GenericApiDefinition.Url,
            GenericApiDefinition.HelpUrl,
            new ApiParameters(),
            GenericApiDefinition.ApiGetCallback,
            GenericApiDefinition.MockApiGetCallback,
        );
    }

    /** This is just a name that the ApiBrowser will show */
    static Name: string = 'Generic GET API';
    static HelpUrl: string = 'https://wiki.openstreetmap.org/wiki/Nominatim';
    // const header: IHeaderContainerProps = {
    //     name: 'Generic API',
    //     helpUrl: ,
    //     openUrlCb: (_url: string) => undefined,
    // };

    /** The URL and HTTP Method being used (again, handy for the browser) */
    static Method: HttpMethod = 'get';
    static Url: string = 'http://fake.com';

    /**
     * This type soup callback is simply taking ApiParameters that the
     * ApiBrowser uses (see constructor) and pulls out what is needed
     * to make the service call. If there were a POST, you could grab
     * the body as well. And headers are in there.
     */
    static ApiGetCallback: GenericGetApiCallback = (apiParams: GenericGetApiParams) => {
        const { urlParams, bodyParams, headers } = GenericApiDefinition.GetDestructuredParams(
            apiParams,
        );
        return GenericApiService.FetchWithGet(urlParams, bodyParams, headers);
    };

    static MockApiGetCallback: GenericGetApiCallback = (apiParams: GenericGetApiParams) => {
        const { urlParams, bodyParams, headers } = GenericApiDefinition.GetDestructuredParams(
            apiParams,
        );

        return new Promise(resolve =>
            setTimeout(() => {
                const resp: IGenericApiResponse = {
                    date: new Date().toISOString(),
                    urlParams,
                    bodyParams,
                    headers,
                };
                resolve(resp);
            }, GenericApiService.DEFAULT_TIMEOUT_MS),
        );
    };

    static GetDestructuredParams = (apiParams: GenericGetApiParams) => {
        console.log('ApiGetCallback.GetDestructuredParams apiParams:', apiParams);
        const urlParams: Optional<IGenericUrlParams> = apiParams.urlParams.getParams();
        const bodyParams: Optional<IGenericBodyParams> = apiParams.bodyParams.getParams();
        const headers: Optional<IGenericHeaders> = apiParams.headers.getParams();
        if (!urlParams) {
            throw new Error('no urlParams!');
        }
        if (!bodyParams) {
            throw new Error('no bodyParams!');
        }
        if (!headers) {
            throw new Error('no headers!');
        }
        return { urlParams, bodyParams, headers };
    };
}
