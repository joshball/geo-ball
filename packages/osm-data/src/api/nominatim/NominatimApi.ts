import { INominatimParams, flattenNominatimParams, getQueryParamEncodedString } from "./NominatimParams";
import { INominatimResult, fakeMultipleResults, fakeSingleResult } from "./INominatimResult";
// https://wiki.openstreetmap.org/wiki/Nominatim

export class NominatimApi {

    public static searchUrl = 'https://nominatim.openstreetmap.org/search';

    public static async search(params: INominatimParams, fake: boolean = false): Promise<INominatimResult[]> {
        console.log('NominatimApi.search() params')
        console.log(params);
        const searchUrl = 'https://nominatim.openstreetmap.org/search';
        const flattenedParams = flattenNominatimParams(params)
        const paramString = getQueryParamEncodedString(flattenedParams);
        const url = NominatimApi.searchUrl + '?' + paramString;
        console.log('NominatimApi.search() queryParams')
        console.log(paramString);
        console.log('NominatimApi.search() url', url)
        if (fake) {
            return Promise.resolve(fakeMultipleResults)
        }
        return fetch(url)
            .then(res => res.json())
            .then(json => json || []);
    }

}

