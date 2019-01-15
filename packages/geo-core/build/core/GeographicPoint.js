"use strict";
// // import { fieldsHashCode, areEqual } from "prelude.ts";
// export const deg2rad = (degrees: number): number => degrees * Math.PI / 180.0;
// export const degreesToRadians = (degrees: number): number => degrees / 180.0 * Math.PI;
// // export interface SerializedGeographicPoint {
// //     lat: number;
// //     lon: number;
// // }
// export class GeographicPoint {
//     // static Serialize(latitude: number, longitude: number): string {
//     static Serialize(obj: GeographicPoint): string {
//         // const sgp: SerializedGeographicPoint = { lat: obj.latitude, lon: obj.longitude };
//         return JSON.stringify(obj);
//     }
//     static DeSerialize(serializedGeoPoint: string): GeographicPoint {
//         // const serObj: SerializedGeographicPoint = JSON.parse(serializedGeoPoint);
//         const serObj: GeographicPoint = JSON.parse(serializedGeoPoint);
//         return new GeographicPoint(serObj.latitude, serObj.longitude);
//     }
//     latitude: number
//     longitude: number
//     constructor(latitude: number, longitude: number) {
//         this.latitude = latitude;
//         this.longitude = longitude;
//     }
//     equals(rhs: GeographicPoint): boolean {
//         if (!rhs) {
//             return false;
//         }
//         // return areEqual(this.latitude, rhs.latitude) && areEqual(this.longitude, rhs.longitude);
//         return this.latitude === rhs.latitude && this.longitude === rhs.longitude;
//     }
//     hashCode(): number {
//         return Array.from(JSON.stringify(this))
//             // tslint:disable-next-line:no-bitwise
//             .reduce((s, c) => Math.imul(31, s) + c.charCodeAt(0) | 0, 0);
//         // return fieldsHashCode(this.latitude, this.longitude);
//     }
//     /**
//      * Calculates the geographic distance in km between this point and
//      * the other point.
//      * @param other
//      * @return The distance between this lat, lon point and the other point
//      */
//     distance(other: GeographicPoint): number {
//         return this.getDist(this.latitude, this.longitude,
//             other.latitude, other.longitude);
//     }
//     getDist(lat1: number, lon1: number, lat2: number, lon2: number): number {
//         const R = 6373; // radius of the earth in kilometres
//         const lat1rad: number = degreesToRadians(lat1);
//         const lat2rad: number = degreesToRadians(lat2);
//         const deltaLat: number = degreesToRadians(lat2 - lat1);
//         const deltaLon: number = degreesToRadians(lon2 - lon1);
//         const a: number = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
//             Math.cos(lat1rad) * Math.cos(lat2rad) *
//             Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
//         const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const d: number = R * c;
//         return d;
//     }
//     toString = (): string => `Lat: ${this.latitude}, Lon: ${this.longitude}`;
//     // /**
//     //  * lat1, lon1 Start point lat2, lon2 End point el1 Start altitude in meters
//     //  * el2 End altitude in meters
//     //  */
//     // private double distance(double lat1, double lat2, double lon1, double lon2,
//     //     double el1, double el2) {
//     //     final int R = 6371; // Radius of the earth
//     //     Double latDistance = deg2rad(lat2 - lat1);
//     //     Double lonDistance = deg2rad(lon2 - lon1);
//     //     Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
//     //         + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
//     //         * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
//     //     Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     //     double distance = R * c * 1000; // convert to meters
//     //     double height = el1 - el2;
//     //     distance = Math.pow(distance, 2) + Math.pow(height, 2);
//     //     return Math.sqrt(distance);
//     // }
// }
//# sourceMappingURL=GeographicPoint.js.map