"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NominatimParams {
    // [key: string]: any;
    constructor(params) {
        this.format = 'json';
        this.json_callback = undefined;
        this._accept_language = undefined;
        this._countryCodes = [];
        this.viewbox = undefined;
        this.bounded = undefined;
        this._bounded = false;
        this._addressdetails = false;
        this._dedupe = false;
        this._debug = false;
        this._polygon_geojson = false;
        this._polygon_kml = false;
        this._polygon_svg = false;
        this._polygon_text = false;
        this._extratags = false;
        this._namedetails = false;
        this.initializeForForm();
        if (params) {
            const checkExperimentalQuery = (obj) => !!obj.street || !!obj.city ||
                !!obj.county || !!obj.state ||
                !!obj.country || !!obj.postalcode;
            const qQuery = (obj) => !!obj.q;
            const eQuery = checkExperimentalQuery;
            if (eQuery(params) && qQuery(params)) {
                throw new Error('you cannot have both q and experimental query params set');
            }
            if (qQuery(params)) {
                this.q = params.q;
            }
            else if (eQuery(params)) {
                this.street = params.street;
                this.city = params.city;
                this.county = params.county;
                this.state = params.state;
                this.country = params.country;
                this.postalcode = params.postalcode;
            }
            else {
                throw new Error('neither q nor experimental query is set.');
            }
        }
    }
    get 'accept-language'() {
        return this._accept_language;
    }
    get countrycodes() {
        return this._countryCodes ? this._countryCodes.join(',') : undefined;
    }
    initializeForForm() {
        this.format = 'json';
        this.q = "2516 Chadwick St. Salt Lake City, UT 84106";
        this._useStructuredQuery = false;
        // this.street = '';
        // this.city = '';
        // this.county = '';
        // // this.state = '';
        // this.country = '';
        // this.postalcode = '';
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
//# sourceMappingURL=INominatimParams.js.map