"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LatLng_1 = require("./LatLng");
const distance_1 = __importDefault(require("@turf/distance"));
class LatLngBounds {
    constructor(southwest, northeast) {
        this.toString = () => `[SW:${this.sw}],[NE:${this.ne}]`;
        this.center = () => {
            const latDelta = Math.abs(this.ne.lat - this.sw.lat) / 2;
            const centerLat = this.ne.lat - latDelta;
            const lonDelta = Math.abs(this.ne.lng - this.sw.lng) / 2;
            const centerLon = this.ne.lng - lonDelta;
            return new LatLng_1.LatLng(centerLat, centerLon);
        };
        this.valid = () => this.sw.valid() && this.ne.valid();
        if (!(southwest instanceof LatLng_1.LatLng)) {
            throw new Error(`southwest is not instance of LatLng`);
        }
        if (!(northeast instanceof LatLng_1.LatLng)) {
            throw new Error(`northeast is not instance of LatLng`);
        }
        // console.log(`LatLngBounds(): ${southwest} ${northeast}`)
        const getError = (error) => `LatLngBounds() ${error} (maybe mixed up your ne/sw?)`;
        if (northeast.lat < southwest.lat) {
            throw new Error(getError(`ne.lat[${northeast.lat}] < sw.lat[${southwest.lat}]`));
        }
        if (northeast.lng < southwest.lng) {
            throw new Error(getError(`ne.lng[${northeast.lng}] < sw.lng[${southwest.lng}]`));
        }
        this.ne = new LatLng_1.LatLng(northeast.lat, northeast.lng);
        this.sw = new LatLng_1.LatLng(southwest.lat, southwest.lng);
    }
    grow(by) {
        this.ne.lat += by;
        this.sw.lat -= by;
        this.ne.lng += by;
        this.sw.lng -= by;
    }
    getArea() {
        const northWest = new LatLng_1.LatLng(this.ne.lat, this.sw.lng);
        const latDistMeters = distance_1.default([northWest.lng, northWest.lat], [this.sw.lng, this.sw.lat], { units: 'meters' });
        const lngDistMeters = distance_1.default([northWest.lng, northWest.lat], [this.ne.lng, this.ne.lat], { units: 'meters' });
        const areaInMeters = latDistMeters * lngDistMeters;
        return {
            ne: this.ne,
            sw: this.sw,
            latDistMeters,
            lngDistMeters,
            areaInMeters,
        };
    }
    static FromBounds(bounds, growth = 0) {
        const sw = new LatLng_1.LatLng(bounds.sw.lat - growth, bounds.sw.lng - growth);
        const ne = new LatLng_1.LatLng(bounds.ne.lat + growth, bounds.ne.lng + growth);
        return new LatLngBounds(sw, ne);
    }
    static FromArray(bounds) {
        if (bounds.length !== 4) {
            throw new Error(`bounds array must be four elements (south[lat], west[lon], north[lat], east[lon])`);
        }
        const southLat = bounds[0];
        const westLon = bounds[1];
        const northLat = bounds[2];
        const eastLon = bounds[3];
        const sw = new LatLng_1.LatLng(southLat, westLon);
        const ne = new LatLng_1.LatLng(northLat, eastLon);
        return new LatLngBounds(sw, ne);
    }
    static FromNumbers(southLat, westLon, northLat, eastLon) {
        const sw = new LatLng_1.LatLng(southLat, westLon);
        const ne = new LatLng_1.LatLng(northLat, eastLon);
        return new LatLngBounds(sw, ne);
    }
    toArray() {
        return this.sw.toArray().concat(this.ne.toArray());
    }
    equals(rhs) {
        if (!rhs) {
            return false;
        }
        return this.sw === rhs.sw && this.ne === rhs.ne;
    }
    hashCode() {
        return Array.from(JSON.stringify(this))
            // tslint:disable-next-line:no-bitwise
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        // return fieldsHashCode(this.latitude, this.longitude);
    }
}
exports.LatLngBounds = LatLngBounds;
//# sourceMappingURL=LatLngBounds.js.map