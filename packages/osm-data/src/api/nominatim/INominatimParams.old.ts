// import { INominatimQueryParamObj, NominatimFormat, ZeroOrOne } from "./INominatimQueryParamObj";


// export interface INominatimParams extends INominatimQueryParamObj {
//     /**
//      * Note, because JS can't have a dash/minus in property (without quotes)
//      * We use this to access while using the object:
//      * accept-language=<browser language string>
//      */
//     _accept_language?: string

//     /**
//      * Because it is easier to maintain an array, we use
//      *  countryCodes:string[]
//      * to store and then transform
//      *  countrycodes:string // as a comma separated string
//      */
//     _countryCodes?: string[]

//     _bounded?: boolean;

//     _useStructuredQuery?: boolean;

//     _addressdetails?: boolean
//     _dedupe?: boolean;
//     _debug?: boolean;

//     _polygon_geojson?: boolean;
//     _polygon_kml?: boolean;
//     _polygon_svg?: boolean;
//     _polygon_text?: boolean;

//     _extratags?: boolean;
//     _namedetails?: boolean;
//     [key: string]: any;
// }


// export class NominatimParams implements INominatimParams {
//     [key: string]: any;

//     format?: NominatimFormat | undefined = 'json';

//     json_callback?: string | undefined = undefined;
//     _accept_language?: string | undefined = undefined;


//     q?: string;

//     _useStructuredQuery?: boolean;

//     street?: string;
//     city?: string;
//     county?: string;
//     state?: string;
//     country?: string;
//     postalcode?: string;

//     _countryCodes: string[] = [];

//     viewbox?: string | undefined = undefined;

//     bounded?: ZeroOrOne | undefined = undefined;
//     _bounded: boolean = false;

//     addressdetails?: ZeroOrOne | undefined
//     _addressdetails: boolean = false;

//     email?: string | undefined;
//     exclude_place_ids?: string | undefined;
//     limit?: number | undefined;
//     dedupe?: ZeroOrOne | undefined;
//     _dedupe: boolean = false;

//     debug?: ZeroOrOne;
//     _debug: boolean = false;

//     polygon_geojson?: ZeroOrOne
//     polygon_kml?: ZeroOrOne
//     polygon_svg?: ZeroOrOne
//     polygon_text?: ZeroOrOne
//     _polygon_geojson: boolean = false;
//     _polygon_kml: boolean = false;
//     _polygon_svg: boolean = false;
//     _polygon_text: boolean = false;

//     extratags?: ZeroOrOne;
//     _extratags: boolean = false;

//     namedetails?: ZeroOrOne;
//     _namedetails: boolean = false;

//     get 'accept-language'() {
//         return this._accept_language
//     }
//     get countrycodes() {
//         return this._countryCodes ? this._countryCodes.join(',') : undefined;
//     }

//     // [key: string]: any;

//     constructor(params?: INominatimParams) {
//         this.initializeForForm();

//         if (params) {
//             const checkExperimentalQuery = (obj: any) =>
//                 !!obj.street || !!obj.city ||
//                 !!obj.county || !!obj.state ||
//                  !!obj.country || !!obj.postalcode;


//             const qQuery = (obj: any) => !!obj.q;
//             const eQuery = checkExperimentalQuery;


//             if (eQuery(params) && qQuery(params)) {
//                 throw new Error('you cannot have both q and experimental query params set');
//             }
//             if (qQuery(params)) {
//                 this.q = params.q;
//             }
//             else if (eQuery(params)) {
//                 this.street = params.street;
//                 this.city = params.city;
//                 this.county = params.county;
//                 this.state = params.state;
//                 this.country = params.country;
//                 this.postalcode = params.postalcode;
//             }
//             else {
//                 throw new Error('neither q nor experimental query is set.');
//             }
//         }
//     }

//     initializeForForm() {
//         this.format = 'json';

//         this.q = "2516 Chadwick St. Salt Lake City, UT 84106";

//         this._useStructuredQuery = false;
//         // this.street = '';
//         // this.city = '';
//         // this.county = '';
//         // // this.state = '';
//         // this.country = '';
//         // this.postalcode = '';
//     }

//     buildQueryParamObject(): INominatimQueryParamObj {
//         const qpObj: any = JSON.parse(JSON.stringify(this));
//         Object.keys(qpObj).forEach(key => {
//             if (
//                 (key === 'countryCodes') ||
//                 (key === 'accept_language') ||
//                 (key === 'polygon') ||
//                 (!qpObj[key])
//             ) {
//                 if (key === 'polygon') {
//                     throw new Error('(deprecated, use one of the polygon_* parameters instead)');
//                 }
//                 delete qpObj[key];
//             }
//         })
//         return qpObj as INominatimQueryParamObj;
//     }

//     getQueryParams() {
//         const newObj = this.buildQueryParamObject();
//         return Object.keys(newObj)
//             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent((newObj as any)[k]))
//             .join('&');
//     }
// }

