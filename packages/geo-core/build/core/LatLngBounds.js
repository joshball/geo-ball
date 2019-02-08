"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LatLng_1 = require("./LatLng");
const LatLngHelpers_1 = require("./LatLngHelpers");
class LatLngBounds {
    constructor(southwest, northeast) {
        this.toString = () => `[SW:${this.southWest}],[NE:${this.northEast}]`;
        this.valid = () => this.southWest.valid() && this.northEast.valid();
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
        this.northEast = new LatLng_1.LatLng(northeast.lat, northeast.lng);
        this.southWest = new LatLng_1.LatLng(southwest.lat, southwest.lng);
    }
    get northWest() {
        return new LatLng_1.LatLng(this.northEast.lat, this.southWest.lng);
    }
    get southEast() {
        return new LatLng_1.LatLng(this.southEast.lat, this.northEast.lng);
    }
    get center() {
        return new LatLng_1.LatLng(this.centerLat, this.centerLng);
    }
    get centerLat() {
        return this.northEast.lat - this.latDelta;
    }
    get centerLng() {
        return this.northEast.lng - this.lngDelta;
    }
    get latDelta() {
        return Math.abs(this.northEast.lat - this.southWest.lat) / 2;
    }
    get lngDelta() {
        return Math.abs(this.northEast.lng - this.southWest.lng) / 2;
    }
    get areaInMeters() {
        return this.latDistInMeters * this.lngDistInMeters;
    }
    get latDistInMeters() {
        return LatLngHelpers_1.distance(this.northWest, this.southWest);
    }
    get lngDistInMeters() {
        return LatLngHelpers_1.distance(this.northWest, this.southWest);
    }
    grow(by) {
        this.northEast.lat += by;
        this.southWest.lat -= by;
        this.northEast.lng += by;
        this.southWest.lng -= by;
    }
    toArray() {
        return this.southWest.toArray().concat(this.northEast.toArray());
    }
    equals(rhs) {
        if (!rhs) {
            return false;
        }
        return this.southWest === rhs.southWest && this.northEast === rhs.northEast;
    }
    hashCode() {
        return Array.from(JSON.stringify(this))
            // tslint:disable-next-line:no-bitwise
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        // return fieldsHashCode(this.latitude, this.longitude);
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
    static FromBounds(bounds, growth = 0) {
        const sw = new LatLng_1.LatLng(bounds.southWest.lat - growth, bounds.southWest.lng - growth);
        const ne = new LatLng_1.LatLng(bounds.northEast.lat + growth, bounds.northEast.lng + growth);
        return new LatLngBounds(sw, ne);
    }
    static FromLeafletBounds(leafletBounds) {
        return LatLngBounds.FromBounds({
            southWest: leafletBounds.getSouthWest(),
            northEast: leafletBounds.getNorthEast(),
        });
    }
}
exports.LatLngBounds = LatLngBounds;
//# sourceMappingURL=LatLngBounds.js.map