"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deg2rad = (degrees) => degrees * Math.PI / 180.0;
exports.degreesToRadians = (degrees) => degrees / 180.0 * Math.PI;
exports.RADIUS_OF_EARTH = 6373; // radius of the earth in kilometres
/**
 * Calculates the geographic distance in km between this point and
 * the other point.
 * @param other
 * @return The distance between this lat, lon point and the other point
 */
exports.distance = (lhs, rhs) => {
    return exports.getDist(lhs.lat, lhs.lon, rhs.lat, rhs.lon);
};
exports.getDist = (lat1, lon1, lat2, lon2) => {
    const lat1rad = exports.degreesToRadians(lat1);
    const lat2rad = exports.degreesToRadians(lat2);
    const deltaLat = exports.degreesToRadians(lat2 - lat1);
    const deltaLon = exports.degreesToRadians(lon2 - lon1);
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1rad) * Math.cos(lat2rad) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = exports.RADIUS_OF_EARTH * c;
    return d;
};
// /**
//  * lat1, lon1 Start point lat2, lon2 End point el1 Start altitude in meters
//  * el2 End altitude in meters
//  */
// private double distance(double lat1, double lat2, double lon1, double lon2,
//     double el1, double el2) {
//     final int R = 6371; // Radius of the earth
//     Double latDistance = deg2rad(lat2 - lat1);
//     Double lonDistance = deg2rad(lon2 - lon1);
//     Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
//         + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
//         * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
//     Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     double distance = R * c * 1000; // convert to meters
//     double height = el1 - el2;
//     distance = Math.pow(distance, 2) + Math.pow(height, 2);
//     return Math.sqrt(distance);
// }
//# sourceMappingURL=LatLngHelpers.js.map