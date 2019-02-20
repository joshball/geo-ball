import { NominatimFormat, INominatimQueryParamObj } from "./INominatimQueryParamObj";
export interface INominatimStringQuery {
    q: string;
}
export interface INominatimStructuredQuery {
    street: string;
    city: string;
    county: string;
    state: string;
    country: string;
    postalcode: string;
}
export interface INominatimQuery {
    useStructured: boolean;
    stringQuery: INominatimStringQuery;
    structuredQuery: INominatimStructuredQuery;
}
export interface INominatimSettings {
    format: NominatimFormat;
    json_callback: string;
    accept_language: string;
    countrycodes: string;
    viewbox: string;
    email: string;
    exclude_place_ids: string;
    limit: number;
}
export interface INominatimToggles {
    addressdetails: boolean;
    bounded: boolean;
    dedupe: boolean;
    debug: boolean;
    extratags: boolean;
    namedetails: boolean;
    polygon_geojson: boolean;
    polygon_kml: boolean;
    polygon_svg: boolean;
    polygon_text: boolean;
}
export interface INominatimParams {
    query: INominatimQuery;
    settings: INominatimSettings;
    toggles: INominatimToggles;
}
export declare class NominatimParams {
    formParams: INominatimParams;
    constructor(params?: INominatimParams);
    buildQueryParamObject(): INominatimQueryParamObj;
    getQueryParams(): string;
}
//# sourceMappingURL=INominatimParams.d.ts.map