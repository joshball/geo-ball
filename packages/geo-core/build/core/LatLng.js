"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LatLng {
    constructor(lat, lon) {
        this.toString = () => `Lat:${this.lat}, Lon:${this.lon}`;
        this.valid = () => this.lat >= -90 && this.lat <= 90 && this.lon >= -180 && this.lon <= 180;
        // console.log('lat/lon', lat, lon)
        this.lat = lat;
        this.lon = lon;
    }
    static FromArray(latLngArray) {
        return new LatLng(latLngArray[0], latLngArray[1]);
    }
    toArray() {
        return [this.lat, this.lon];
    }
    equals(rhs) {
        if (!rhs) {
            return false;
        }
        // return areEqual(this.latitude, rhs.latitude) && areEqual(this.longitude, rhs.longitude);
        return this.lat === rhs.lat && this.lon === rhs.lon;
    }
    hashCode() {
        return Array.from(JSON.stringify(this))
            // tslint:disable-next-line:no-bitwise
            .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
        // return fieldsHashCode(this.latitude, this.longitude);
    }
    /** Convenience methods for mapping later */
    static Serialize(latLngObj) {
        return JSON.stringify(latLngObj);
    }
    /** Convenience methods for mapping later */
    static DeSerialize(serializedLatLng) {
        // const serObj: SerializedGeographicPoint = JSON.parse(serializedGeoPoint);
        const serObj = JSON.parse(serializedLatLng);
        return new LatLng(serObj.lat, serObj.lon);
    }
}
exports.LatLng = LatLng;
//# sourceMappingURL=LatLng.js.map