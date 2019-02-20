"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createEmptyParams = (params) => {
    const paramsAny = params || {};
    const defParams = {
        query: {
            useStructured: false,
            stringQuery: {
                q: ''
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
        }
    };
    return Object.assign({}, defParams, paramsAny);
};
class NominatimParams {
    constructor(params) {
        this.formParams = createEmptyParams(params);
        // this.formParams.query.stringQuery.q = "2516 Chadwick St. Salt Lake City, UT 84106";
    }
    buildQueryParamObject() {
        const qpObj = JSON.parse(JSON.stringify(this));
        Object.keys(qpObj).forEach(key => {
            if ((key === 'countryCodes') ||
                (key === 'accept_language') ||
                (key === 'polygon') ||
                (!qpObj[key])) {
                if (key === 'polygon') {
                    throw new Error('(deprecated, use one of the polygon_* parameters instead)');
                }
                delete qpObj[key];
            }
        });
        return qpObj;
    }
    getQueryParams() {
        const newObj = this.buildQueryParamObject();
        return Object.keys(newObj)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(newObj[k]))
            .join('&');
    }
}
exports.NominatimParams = NominatimParams;
//# sourceMappingURL=INominatimParams.1.js.map