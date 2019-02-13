import { INominatimParams, NominatimParams } from "./INominatimParams";
import { INominatimResult } from "./INominatimResult";
import { URLSearchParams } from 'url';
// https://wiki.openstreetmap.org/wiki/Nominatim

export class NominatimApi {

    public static async search(params: NominatimParams): Promise<INominatimResult[]> {
        const searchUrl = 'https://nominatim.openstreetmap.org/search';
        const url = searchUrl + params.getQueryParams();
        return fetch(url)
            .then(res => res.json())
            .then(json => json || []);
    }

}
