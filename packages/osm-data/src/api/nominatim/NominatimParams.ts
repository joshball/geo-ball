import { NominatimFormat, INominatimQueryParamObj } from './INominatimQueryParamObj';

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

export const createNominatimParams = (params?: INominatimParams): INominatimParams => {
    const paramsAny: any = params || {};
    const defParams = {
        query: {
            useStructured: false,
            stringQuery: {
                q: '',
            },
            structuredQuery: {
                street: '',
                city: '',
                county: '',
                state: '',
                country: '',
                postalcode: '',
            },
        },
        settings: {
            format: 'json',
            json_callback: '',
            accept_language: '',
            countrycodes: '',
            viewbox: '',
            email: '',
            exclude_place_ids: '',
            limit: 10,
        },
        toggles: {
            addressdetails: false,
            bounded: false,
            dedupe: true,
            debug: false,
            extratags: false,
            namedetails: false,
            polygon_geojson: false,
            polygon_kml: false,
            polygon_svg: false,
            polygon_text: false,
        },
    };
    return { ...defParams, ...paramsAny };
};

export const flattenNominatimParams = (params: INominatimParams): INominatimQueryParamObj => {
    const queryParamObj: any = {};

    if (params.query.useStructured) {
        Object.keys(params.query.structuredQuery).forEach(key => {
            const val: any = params.toggles[key];
            if (val) {
                queryParamObj[key] = val;
            }
        });
    } else {
        queryParamObj.q = params.query.stringQuery;
    }

    Object.keys(params.settings).forEach(key => {
        const val: any = params.settings[key];
        if (val) {
            if (key === 'polygon') {
                throw new Error('(deprecated, use one of the polygon_* parameters instead)');
            }
            if (key === 'accept_language') {
                queryParamObj['accept-language'] = val;
            } else {
                queryParamObj[key] = val;
            }
        }
    });

    Object.keys(params.toggles).forEach(key => {
        const val: any = params.toggles[key];
        if (val) {
            queryParamObj[key] = 1;
        }
    });

    return queryParamObj as INominatimQueryParamObj;
};

export const getQueryParamEncodedString = (qpObj: INominatimQueryParamObj): string => {
    return Object.keys(qpObj)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent((qpObj as any)[k]))
        .join('&');
};

// export class NominatimParams {

//     formParams: INominatimParams;

//     constructor(params?: INominatimParams) {
//         this.formParams = createEmptyParams(params);
//         // this.formParams.query.stringQuery.q = "2516 Chadwick St. Salt Lake City, UT 84106";
//     }

//     private handleQuery(queryParams: any) {
//         if (this.formParams.query.useStructured) {
//             Object.keys(this.formParams.query.structuredQuery).forEach(key => {
//                 const val: any = this.formParams.toggles[key];
//                 if (val) {
//                     queryParams[key] = val;
//                 }
//             })
//         }
//         else {
//             queryParams.q = this.formParams.query.stringQuery;
//         }
//     }

//     private handleSettings(queryParams: any) {
//         Object.keys(this.formParams.settings).forEach(key => {
//             const val: any = this.formParams.settings[key];
//             if (val) {
//                 if (key === 'polygon') {
//                     throw new Error('(deprecated, use one of the polygon_* parameters instead)');
//                 }
//                 if (key === 'accept_language') {
//                     queryParams['accept-language'] = val;
//                 }
//                 else {
//                     queryParams[key] = val;
//                 }
//             }
//         })
//     }

//     private handleToggles(queryParams: any) {
//         Object.keys(this.formParams.toggles).forEach(key => {
//             const val: any = this.formParams.toggles[key];
//             if (val) {
//                 queryParams[key] = 1;
//             }
//         })
//     }

//     buildQueryParamObject(): INominatimQueryParamObj {
//         const queryParams: any = {};

//         this.handleQuery(queryParams);
//         this.handleSettings(queryParams);
//         this.handleToggles(queryParams);

//         return queryParams as INominatimQueryParamObj;
//     }

//     getQueryParams() {
//         const newObj = this.buildQueryParamObject();
//         return Object.keys(newObj)
//             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent((newObj as any)[k]))
//             .join('&');
//     }
// }
