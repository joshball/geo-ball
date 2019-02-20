import { NominatimFormat, INominatimQueryParamObj } from "./INominatimQueryParamObj";
export interface INominatimStringQuery {
    q: string;
    [key: string]: string;
}
export interface INominatimStructuredQuery {
    street: string;
    city: string;
    county: string;
    state: string;
    country: string;
    postalcode: string;
    [key: string]: string;
}
export interface INominatimQuery {
    useStructured: boolean;
    stringQuery: INominatimStringQuery;
    structuredQuery: INominatimStructuredQuery;
    [key: string]: any;
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
    [key: string]: any;
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
    [key: string]: boolean;
}
export interface INominatimParams {
    query: INominatimQuery;
    settings: INominatimSettings;
    toggles: INominatimToggles;
}
export declare const createNominatimParams: (params?: INominatimParams | undefined) => INominatimParams;
export declare const flattenNominatimParams: (params: INominatimParams) => INominatimQueryParamObj;
export declare const getQueryParamEncodedString: (qpObj: INominatimQueryParamObj) => string;
//# sourceMappingURL=NominatimParams.d.ts.map