export declare type NominatimFormat = 'html' | 'json' | 'xml' | 'jsonv2';
export interface INominatimParams {
    /**
     * format=[html|xml|json|jsonv2]
     * Output format
     */
    format?: NominatimFormat;
    json_callback?: string;
    accept_language?: string;
    'accept-language'?: string;
    q: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    viewbox?: string;
    postalcode?: string;
    countryCodesArray?: string[];
    countrycodes?: string;
    bounded?: 0 | 1;
    polygon?: 0 | 1;
    addressdetails?: 0 | 1;
    email?: string;
    exclude_place_ids?: string;
    limit?: number;
    dedupe?: 0 | 1;
}
export declare class NominatimParams implements INominatimParams {
    format?: "html" | "json" | "xml" | "jsonv2" | undefined;
    json_callback?: string | undefined;
    accept_language?: string | undefined;
    q: string;
    street?: string | undefined;
    city?: string | undefined;
    state?: string | undefined;
    country?: string | undefined;
    viewbox?: string | undefined;
    postalcode?: string | undefined;
    countryCodesArray?: string[] | undefined;
    countrycodes?: string | undefined;
    bounded?: 0 | 1 | undefined;
    polygon?: 0 | 1 | undefined;
    addressdetails?: 0 | 1 | undefined;
    email?: string | undefined;
    exclude_place_ids?: string | undefined;
    limit?: number | undefined;
    dedupe?: 0 | 1 | undefined;
    [key: string]: any;
    constructor(query: string, obj: any);
    getQueryParams(): string;
}
//# sourceMappingURL=INominatimParams.d.ts.map