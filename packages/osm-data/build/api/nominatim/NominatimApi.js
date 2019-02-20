"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const NominatimParams_1 = require("./NominatimParams");
const INominatimResult_1 = require("./INominatimResult");
// https://wiki.openstreetmap.org/wiki/Nominatim
class NominatimApi {
    static search(params, fake = false) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('NominatimApi.search() params');
            console.log(params);
            const searchUrl = 'https://nominatim.openstreetmap.org/search';
            const flattenedParams = NominatimParams_1.flattenNominatimParams(params);
            const paramString = NominatimParams_1.getQueryParamEncodedString(flattenedParams);
            const url = NominatimApi.searchUrl + '?' + paramString;
            console.log('NominatimApi.search() queryParams');
            console.log(paramString);
            console.log('NominatimApi.search() url', url);
            if (fake) {
                return Promise.resolve(INominatimResult_1.fakeMultipleResults);
            }
            return fetch(url)
                .then(res => res.json())
                .then(json => json || []);
        });
    }
}
NominatimApi.searchUrl = 'https://nominatim.openstreetmap.org/search';
exports.NominatimApi = NominatimApi;
//# sourceMappingURL=NominatimApi.js.map