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
const leaflet_geosearch_1 = require("leaflet-geosearch");
const provider = new leaflet_geosearch_1.OpenStreetMapProvider();
exports.geocodeAddress = (address) => __awaiter(this, void 0, void 0, function* () {
    console.log('geocodeAddress');
    return provider.search({ query: address })
        .then((json) => {
        console.log('Array<IGeocodeResponse>:', json);
        return json;
    });
});
exports.reverseGeocodeLocation = (p) => __awaiter(this, void 0, void 0, function* () {
    console.log('reverseGeocodeLocation');
    const paramString = getParamString({
        format: 'json',
        lat: p.lat,
        lon: p.lng,
        addressDetails: 1
    });
    const url = `https://nominatim.openstreetmap.org/reverse?${paramString}`;
    console.log('url:', url);
    return fetch(url)
        .then((response) => {
        console.log('resp:', response);
        return response.json();
    })
        .then((json) => {
        console.log('json:', json);
        return json;
    });
});
const getParamString = (params) => {
    return Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
};
//# sourceMappingURL=GeocodingService.js.map