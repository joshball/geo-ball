import {
    INominatimParams,
    flattenNominatimParams,
    getQueryParamEncodedString,
} from './NominatimParams';

import { INominatimResult, fakeMultipleResults } from './INominatimResult';

/**
 * "Nominatim" - what a strangely difficult name to pronounce.
 * The NominatimApi is the OpenStreetMap Geocoder and ReverseGeocoder
 * API. Documentation is here: https://wiki.openstreetmap.org/wiki/Nominatim
 */
export class NominatimApi {
    public static GeocodingUrl = 'https://nominatim.openstreetmap.org/search';

    public static async Geocode(
        params: INominatimParams,
        fake: boolean = false,
    ): Promise<Array<INominatimResult>> {
        console.log('NominatimApi.Geocode() params:', params);

        const flattenedParams = flattenNominatimParams(params);

        const paramString = getQueryParamEncodedString(flattenedParams);

        const url = NominatimApi.GeocodingUrl + '?' + paramString;

        console.log('NominatimApi.search() queryParams:', paramString);
        console.log('NominatimApi.search() url', url);

        if (fake) {
            return Promise.resolve(fakeMultipleResults);
        }

        return fetch(url)
            .then(res => res.json())
            .then(json => json || []);
    }
}

export class NominatimGeocodeApiDef {
    ApiInfoMgr: any;
    BaseUrl: string;
    UrlParamsMgr: any;
    BodyParamsMgr: any;
    HeadersMgr: any;
    ResponseMgr: any;
    CallMgr: any;
}

export class ApiBrowserMgr {
    ApiInfoMgr: any;
    UrlParamsMgr: any;
    BodyParamsMgr: any;
    HeadersMgr: any;
    ResponseMgr: any;
    CallMgr: any;
}

export class ApiInfoMgr {
    Description: string;
    Notes: string;
    BaseUrl: string;
    Method: string;
    HelpInfo: string;
    HelpUrl: string;
}
