"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { fieldsHashCode, areEqual } from "prelude.ts";
exports.deg2rad = (degrees) => degrees * Math.PI / 180.0;
exports.degreesToRadians = (degrees) => degrees / 180.0 * Math.PI;
// export interface SerializedGeographicPoint {
//     lat: number;
//     lon: number;
// }
class GeographicPoint {
    constructor(latitude, longitude) {
        this.toString = () => `Lat: ${this.latitude}, Lon: ${this.longitude}`;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    // static Serialize(latitude: number, longitude: number): string {
    static Serialize(obj) {
        // const sgp: SerializedGeographicPoint = { lat: obj.latitude, lon: obj.longitude };
        return JSON.stringify(obj);
    }
    static DeSerialize(serializedGeoPoint) {
        // const serObj: SerializedGeographicPoint = JSON.parse(serializedGeoPoint);
        const serObj = JSON.parse(serializedGeoPoint);
        return new GeographicPoint(serObj.latitude, serObj.longitude);
    }
    equals(rhs) {
        if (!rhs) {
            return false;
        }
        // return areEqual(this.latitude, rhs.latitude) && areEqual(this.longitude, rhs.longitude);
        return this.latitude === rhs.latitude && this.longitude === rhs.longitude;
    }
    hashCode() {
        return Array.from(JSON.stringify(this))
            // tslint:disable-next-line:no-bitwise
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        // return fieldsHashCode(this.latitude, this.longitude);
    }
    /**
     * Calculates the geographic distance in km between this point and
     * the other point.
     * @param other
     * @return The distance between this lat, lon point and the other point
     */
    distance(other) {
        return this.getDist(this.latitude, this.longitude, other.latitude, other.longitude);
    }
    getDist(lat1, lon1, lat2, lon2) {
        const R = 6373; // radius of the earth in kilometres
        const lat1rad = exports.degreesToRadians(lat1);
        const lat2rad = exports.degreesToRadians(lat2);
        const deltaLat = exports.degreesToRadians(lat2 - lat1);
        const deltaLon = exports.degreesToRadians(lon2 - lon1);
        const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1rad) * Math.cos(lat2rad) *
                Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }
}
exports.GeographicPoint = GeographicPoint;
//# sourceMappingURL=GeographicPoint.1.js.map