import {
    IApiParameters,
    ApiParameters,
    HttpMethod,
    ApiCallback,
    ApiCallDefinition,
} from '@geo-ball/api-couturier';

// import {
//     IGeocodingUrlParams,
//     IGeocodingBodyParams,
//     IGeocodingHeaders,
//     IGeocodingApiResponse,
//     GeocodingApiService,
// } from './GeocodingApiService';
import { INominatimParams, INominatimResult } from '@geo-ball/osm-data';
// import { geocodeAddress } from 'ui/services/GeocodingService';

export interface IGeocodingUrlParams extends INominatimParams {}

export interface IGeocodingApiResponse {
    data: Array<INominatimResult>;
}

export type GeocodingApiParams = IApiParameters<IGeocodingUrlParams>;
// IGeocodingBodyParams,
// IGeocodingHeaders
export type GeocodingGetApiCallback = ApiCallback<IGeocodingApiResponse, IGeocodingUrlParams>;

/**
 * This is a wrapper of the GeocodingApiService.FetchWithGet(urlParams) call.
 * It looks complicated, but we are just being explicit and verbose.
 * Imagine we had no real control over the GeocodingApiService, and had to
 * put this wrapper in place.
 * It basically creates an ApiCallDefinition that we can pass to the ApiBrowser
 * If you had more control over the service, you could easily put this in the service
 * and even have your service use some of the typed parameter info.
 */
// // IApiCallDefinition<IGeocodingApiResponse, IGeocodingUrlParamsFormValues>

export const ParametersToFormObject = () => {};
export const FormObjectToParameters = () => {};

export class GeocodingApiDefinition extends ApiCallDefinition<
    IGeocodingApiResponse,
    IGeocodingUrlParams
> {
    constructor() {
        super(
            GeocodingApiDefinition.Name,
            GeocodingApiDefinition.Method,
            GeocodingApiDefinition.Url,
            GeocodingApiDefinition.HelpUrl,
            new ApiParameters(),
            GeocodingApiDefinition.ApiGetCallback,
            // GeocodingApiDefinition.MockApiGetCallback,
        );
    }

    /** This is just a name that the ApiBrowser will show */
    static Name: string = 'Geocoding GET API';
    static HelpUrl: string = 'https://wiki.openstreetmap.org/wiki/Nominatim';
    // const header: IHeaderContainerProps = {
    //     name: 'Geocoding API',
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
    static ApiGetCallback: GeocodingGetApiCallback = (_apiParams: GeocodingApiParams) => {
        // const geocodeParams = apiParams.urlParams;
        return Promise.resolve({ data: [] });
        // return geocodeAddress(geocodeParams);
    };

    // static MockApiGetCallback: GeocodingGetApiCallback = (apiParams: GeocodingApiParams) => {
    //     const { urlParams, bodyParams, headers } = GeocodingApiDefinition.GetDestructuredParams(
    //         apiParams,
    //     );

    //     return new Promise(resolve =>
    //         setTimeout(() => {
    //             const resp: IGeocodingApiResponse = {
    //                 date: new Date().toISOString(),
    //                 urlParams,
    //                 bodyParams,
    //                 headers,
    //             };
    //             resolve(resp);
    //         }, GeocodingApiService.DEFAULT_TIMEOUT_MS),
    //     );
    // };

    // static GetDestructuredParams = (apiParams: GeocodingApiParams) => {
    //     console.log('ApiGetCallback.GetDestructuredParams apiParams:', apiParams);
    //     const urlParams: Optional<IGeocodingUrlParams> = apiParams.urlParams.getParams();
    //     const bodyParams: Optional<IGeocodingBodyParams> = apiParams.bodyParams.getParams();
    //     const headers: Optional<IGeocodingHeaders> = apiParams.headers.getParams();
    //     if (!urlParams) {
    //         throw new Error('no urlParams!');
    //     }
    //     if (!bodyParams) {
    //         throw new Error('no bodyParams!');
    //     }
    //     if (!headers) {
    //         throw new Error('no headers!');
    //     }
    //     return { urlParams, bodyParams, headers };
    // };
}
