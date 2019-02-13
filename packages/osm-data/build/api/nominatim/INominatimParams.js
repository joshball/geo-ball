"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NominatimParams {
    get 'accept-language'() {
        return this.accept_language;
    }
    get countrycodes() {
        return this.countryCodes ? this.countryCodes.join(',') : undefined;
    }
    // [key: string]: any;
    constructor(params = {}) {
        const checkExperimentalQuery = (obj) => !!obj.street || !!obj.city || !!obj.county || !!obj.state || !!obj.country || !!obj.postalcode;
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
        // else {
        //     throw new Error('neither q nor experimental query is set.');
        // }
        this.format = 'json';
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