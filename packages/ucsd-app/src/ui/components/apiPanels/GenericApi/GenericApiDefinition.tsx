import {
    IApiParameters,
    ApiParameters,
    HttpMethod,
    ApiCallback,
    ApiCallDefinition,
} from "@geo-ball/component-lib"
import {
    IGenericGetUrlParams,
    IGenericGetApiResponse,
    GenericApiService,
    IGenericGetBodyParams,
} from "./GenericApiService"

export type GenericGetApiParams = IApiParameters<IGenericGetUrlParams, IGenericGetBodyParams>
export type GenericGetApiCallback = ApiCallback<IGenericGetApiResponse, IGenericGetUrlParams>

/**
 * This is a wrapper of the GenericApiService.FetchWithGet(urlParams) call.
 * It looks complicated, but we are just being explicit and verbose.
 * Imagine we had no real control over the GenericApiService, and had to
 * put this wrapper in place.
 * It basically creates an ApiCallDefinition that we can pass to the ApiBrowser
 * If you had more control over the service, you could easily put this in the service
 * and even have your service use some of the typed parameter info.
 */
export class GenericGetApiCallDefinition extends ApiCallDefinition<
    IGenericGetApiResponse,
    IGenericGetUrlParams,
    IGenericGetBodyParams
> {

    /** This is just a name that the ApiBrowser will show */
    static Name: string = "Generic GET API"

    /** The URL and HTTP Method being used (again, handy for the browser) */
    static Method: HttpMethod = "get"
    static Url: string = "http://fake.com"

    /**
     * This type soup callback is simply taking ApiParameters that the
     * ApiBrowser uses (see constructor) and pulls out what is needed
     * to make the service call. If there were a POST, you could grab
     * the body as well. And headers are in there.
     */
    static ApiGetCallback: GenericGetApiCallback = (apiParams: GenericGetApiParams) => {
        console.log("ApiGetCallback.GenericGetApiCallback apiParams:", apiParams)
        const urlParams: Optional<IGenericGetUrlParams> = apiParams.urlParams.getParams()
        // If needed, these are available:
        // const bodyParams: Optional<IGenericGetBodyParams> = apiParams.bodyParams.getParams()
        // const headers:Array<IHttpHeader> = apiParams.headers;
        if (!urlParams) {
            throw new Error("no url params!")
        }
        return GenericApiService.FetchWithGet(urlParams)
    }

    static MockApiGetCallback: GenericGetApiCallback = (apiParams: GenericGetApiParams) => {
        const urlParams: Optional<IGenericGetUrlParams> = apiParams.urlParams.getParams()
        // If needed, these are available:
        // const bodyParams: Optional<IGenericGetBodyParams> = apiParams.bodyParams.getParams()
        // const headers:Array<IHttpHeader> = apiParams.headers;
        console.log(
            "GenericApiService.FetchWithGet() delay:",
            GenericApiService.DEFAULT_TIMEOUT_MS,
            urlParams,
        )
        return new Promise(resolve =>
            setTimeout(() => {
                const resp: IGenericGetApiResponse = {
                    date: new Date().toISOString(),
                    apiParams: urlParams!,
                }
                console.log("GenericApiService.FetchWithGet() RESP:", resp)
                resolve(resp)
            }, GenericApiService.DEFAULT_TIMEOUT_MS),
        )
    }

    constructor() {
        super(
            GenericGetApiCallDefinition.Name,
            GenericGetApiCallDefinition.Method,
            GenericGetApiCallDefinition.Url,
            new ApiParameters(),
            GenericGetApiCallDefinition.ApiGetCallback,
            GenericGetApiCallDefinition.MockApiGetCallback,
        )
    }

    // constructor(urlParamsData: IGenericGetUrlParams) {
    //     const urlParams = new HttpUrlParameters<IGenericGetUrlParams>(urlParamsData)
    //     const apiParams = new ApiParameters(urlParams)
    //     super(
    //         GenericGetApiCallDefinition.Name,
    //         GenericGetApiCallDefinition.Method,
    //         GenericGetApiCallDefinition.Url,
    //         apiParams,
    //         GenericGetApiCallDefinition.ApiGetCallback,
    //     )
    // }

}
