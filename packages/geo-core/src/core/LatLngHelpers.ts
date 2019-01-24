// import { fieldsHashCode, areEqual } from "prelude.ts";
import { LatLng } from './LatLng';
// export const deg2rad = (degrees: number): number => degrees * Math.PI / 180.0;
export const degreesToRadians = (degrees: number): number => degrees / 180.0 * Math.PI;

export const RADIUS_OF_EARTH = 6373; // radius of the earth in kilometres

/**
 * Calculates the geographic distance in km between this point and
 * the other point.
 * @param other
 * @return The distance between this lat, lon point and the other point
 */
export const distance = (lhs: LatLng, rhs: LatLng): number => {
    return getDist(lhs.lat, lhs.lng, rhs.lat, rhs.lng);
}


export const getDist = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const lat1rad: number = degreesToRadians(lat1);
    const lat2rad: number = degreesToRadians(lat2);
    const deltaLat: number = degreesToRadians(lat2 - lat1);
    const deltaLon: number = degreesToRadians(lon2 - lon1);

    const a: number = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1rad) * Math.cos(lat2rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d: number = RADIUS_OF_EARTH * c;
    return d;
}


// /* FROM LEAFLET node_modules\leaflet\src\geo\crs\CRS.Earth.js
//  * @namespace CRS
//  * @crs L.CRS.Earth
//  *
//  * Serves as the base for CRS that are global such that they cover the earth.
//  * Can only be used as the base for other CRS and cannot be used directly,
//  * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
//  * meters.
//  */

// export var Earth = Util.extend({}, CRS, {
// 	wrapLng: [-180, 180],

// 	// Mean Earth Radius, as recommended for use by
// 	// the International Union of Geodesy and Geophysics,
// 	// see http://rosettacode.org/wiki/Haversine_formula
// 	R: 6371000,

// 	// distance between two geographical points using spherical law of cosines approximation
// 	distance: function (latlng1, latlng2) {
// 		var rad = Math.PI / 180,
// 		    lat1 = latlng1.lat * rad,
// 		    lat2 = latlng2.lat * rad,
// 		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
// 		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
// 		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
// 		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// 		return this.R * c;
// 	}
// });


// Calculates the distance between two [points](https://tools.ietf.org/html/rfc7946#section-3.1.2) in degrees, radians,
// miles, or kilometers. This uses the
// [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
// to account for global curvature.
// http://en.wikipedia.org/wiki/Haversine_formula
// http://www.movable-type.co.uk/scripts/latlong.html

// /**
//  * Calculates the distance between two {@link Point|points} in degrees, radians,
//  * miles, or kilometers. This uses the
//  * [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula)
//  * to account for global curvature.
//  *
//  * @name distance
//  * @param {Coord} from origin point
//  * @param {Coord} to destination point
//  * @param {Object} [options={}] Optional parameters
//  * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
//  * @returns {number} distance between the two points
//  * @example
//  * var from = turf.point([-75.343, 39.984]);
//  * var to = turf.point([-75.534, 39.123]);
//  * var options = {units: 'miles'};
//  *
//  * var distance = turf.distance(from, to, options);
//  *
//  * //addToMap
//  * var addToMap = [from, to];
//  * from.properties.distance = distance;
//  * to.properties.distance = distance;
//  */
// function distance(from, to, options) {
//     // Optional parameters
//     options = options || {};
//     if (!isObject(options)) throw new Error('options is invalid');
//     var units = options.units;

//     var coordinates1 = getCoord(from);
//     var coordinates2 = getCoord(to);
//     var dLat = degreesToRadians((coordinates2[1] - coordinates1[1]));
//     var dLon = degreesToRadians((coordinates2[0] - coordinates1[0]));
//     var lat1 = degreesToRadians(coordinates1[1]);
//     var lat2 = degreesToRadians(coordinates2[1]);

//     var a = Math.pow(Math.sin(dLat / 2), 2) +
//           Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);

//     return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), units);
// }
// /**
//  * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
//  */
// export var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
// export var factors = {
//     meters: earthRadius,
//     metres: earthRadius,
//     millimeters: earthRadius * 1000,
//     millimetres: earthRadius * 1000,
//     centimeters: earthRadius * 100,
//     centimetres: earthRadius * 100,
//     kilometers: earthRadius / 1000,
//     kilometres: earthRadius / 1000,
//     miles: earthRadius / 1609.344,
//     nauticalmiles: earthRadius / 1852,
//     inches: earthRadius * 39.370,
//     yards: earthRadius / 1.0936,
//     feet: earthRadius * 3.28084,
//     radians: 1,
//     degrees: earthRadius / 111325,
// };

// /**
//  * Units of measurement factors based on 1 meter.
//  */
// export var unitsFactors = {
//     meters: 1,
//     metres: 1,
//     millimeters: 1000,
//     millimetres: 1000,
//     centimeters: 100,
//     centimetres: 100,
//     kilometers: 1 / 1000,
//     kilometres: 1 / 1000,
//     miles: 1 / 1609.344,
//     nauticalmiles: 1 / 1852,
//     inches: 39.370,
//     yards: 1 / 1.0936,
//     feet: 3.28084,
//     radians: 1 / earthRadius,
//     degrees: 1 / 111325,
// };

// /**
//  * Area of measurement factors based on 1 square meter.
//  */
// export var areaFactors = {
//     meters: 1,
//     metres: 1,
//     millimeters: 1000000,
//     millimetres: 1000000,
//     centimeters: 10000,
//     centimetres: 10000,
//     kilometers: 0.000001,
//     kilometres: 0.000001,
//     acres: 0.000247105,
//     miles: 3.86e-7,
//     yards: 1.195990046,
//     feet: 10.763910417,
//     inches: 1550.003100006
// };
// /**
//  * Converts an angle in degrees to radians
//  *
//  * @name degreesToRadians
//  * @param {number} degrees angle between 0 and 360 degrees
//  * @returns {number} angle in radians
//  */
// export function degreesToRadians(degrees) {
//     if (degrees === null || degrees === undefined) throw new Error('degrees is required');

//     var radians = degrees % 360;
//     return radians * Math.PI / 180;
// }
// /**
//  * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
//  * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
//  *
//  * @name radiansToLength
//  * @param {number} radians in radians across the sphere
//  * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
//  * @returns {number} distance
//  */
// export function radiansToLength(radians, units) {
//     if (radians === undefined || radians === null) throw new Error('radians is required');

//     if (units && typeof units !== 'string') throw new Error('units must be a string');
//     var factor = factors[units || 'kilometers'];
//     if (!factor) throw new Error(units + ' units is invalid');
//     return radians * factor;
// }

// /**
//  * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
//  * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
//  *
//  * @name lengthToRadians
//  * @param {number} distance in real units
//  * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
//  * @returns {number} radians
//  */
// export function lengthToRadians(distance, units) {
//     if (distance === undefined || distance === null) throw new Error('distance is required');

//     if (units && typeof units !== 'string') throw new Error('units must be a string');
//     var factor = factors[units || 'kilometers'];
//     if (!factor) throw new Error(units + ' units is invalid');
//     return distance / factor;
// }

// /**
//  * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
//  * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
//  *
//  * @name lengthToDegrees
//  * @param {number} distance in real units
//  * @param {string} [units='kilometers'] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
//  * @returns {number} degrees
//  */
// export function lengthToDegrees(distance, units) {
//     return radiansToDegrees(lengthToRadians(distance, units));
// }







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

