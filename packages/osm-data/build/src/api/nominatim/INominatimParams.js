"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NominatimParams {
    constructor(query, obj) {
        this.q = query;
        this.format = 'json';
        Object.keys(obj).forEach(key => {
            if (key === 'countryCodesArray') {
                this.countrycodes = obj[key].join(',');
            }
            if (key === 'accept_language') {
                this['accept-language'] = obj[key];
            }
            this[key] = obj[key];
        });
    }
    getQueryParams() {
        return Object.keys(this)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this[k]))
            .join('&');
    }
}
exports.NominatimParams = NominatimParams;
//# sourceMappingURL=INominatimParams.js.map