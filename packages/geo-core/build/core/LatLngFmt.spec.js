"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LatLngFmt_1 = require("./LatLngFmt");
const ava_1 = __importDefault(require("ava"));
const LatLng_1 = require("./LatLng");
// test('LatLng(32.859375, -117.27233) is has correct lat/lon', t => {
//     const p = new LatLng(32.859375, -117.27233);
//     t.is(p.lat, 32.859375);
//     t.is(p.lng, -117.27233);
//     formatLatLng(p.lat, p.lng);
// });
ava_1.default('formatLatLng returns lat lng', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng), '40.71603 Lat, -111.85049 Lng');
});
ava_1.default('formatLatLng returns simple array strings', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { labelFmt: '' }), '40.71603, -111.85049');
});
ava_1.default('formatLatLng returns simple precision', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { labelFmt: '', precision: 2 }), '40.72, -111.85');
});
ava_1.default('formatLatLng handles quickFmt: array', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'array' }), '40.71603, -111.85049');
});
ava_1.default('formatLatLng handles quickFmt: array precision', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'array', precision: 2 }), '40.72, -111.85');
});
ava_1.default('formatLatLng handles quickFmt: short', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'short' }), '40.71603 Lat, -111.85049 Lng');
});
ava_1.default('formatLatLng handles quickFmt: shortlon', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'shortLon' }), '40.71603 Lat, -111.85049 Lon');
});
ava_1.default('formatLatLng handles quickFmt: long', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'long' }), '40.71603 Latitude, -111.85049 Longitude');
});
ava_1.default('formatLatLng handles quickFmt: kvpLong', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'kvpLong' }), 'Latitude: 40.71603, Longitude: -111.85049');
});
ava_1.default('formatLatLng handles quickFmt: wrap label in <b></b>', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { labelFmt: '<b>$L:</b> $n' }), '<b>Latitude:</b> 40.71603, <b>Longitude:</b> -111.85049');
});
ava_1.default('formatLatLng handles quickFmt: wrap label in <b></b>', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { labelFmt: '<b>$L:</b> <code>$n</code>' }), '<b>Latitude:</b> <code>40.71603</code>, <b>Longitude:</b> <code>-111.85049</code>');
});
ava_1.default('formatLatLng handles quickFmt: htmlShort', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'htmlShort' }), '<code>40.71603</code> Lat, <code>-111.85049</code> Lng');
});
ava_1.default('formatLatLng handles quickFmt: htmlLong', t => {
    const p = new LatLng_1.LatLng(40.7160335695977551, -111.8504939999999976);
    t.is(LatLngFmt_1.formatLatLng(p.lat, p.lng, { quickFmt: 'htmlLong' }), '<b>Latitude:</b> <code>40.71603</code>, <b>Longitude:</b> <code>-111.85049</code>');
});
//   Latitude: 40.7160335695977551
//  Longitude: -111.8504939999999976
//
// Following Commmon displays:
// LatLngArrayStr:      "40.7160, -111.8505"
// LngLatArrayStr:      "-111.8505, 40.7160"
// There are three basic forms of a coordinate
// DMS: Degrees, Minutes, Seconds => W079°58′56″
//  Coordinate containing degrees (integer), minutes (integer), and seconds (integer, or real number) (DMS).
//
// MinDec: Minutes Decimal  => 79°58.93172W
//  Coordinate containing degrees (integer) and minutes (real number) (MinDec).
//
// DegDec: Degrees Decimal =>  -79.982195
//  Coordinate containing only degrees (real number) (DegDec).
// DMS => W079°58′56″
// MD => 79°58.93172W
// DD => -79.98219500       // Degrees Decimal, 8 decimal places (1mm)
// DD6 => -79.982195        // Degrees Decimal, 6 decimal places (0.1m)
// DD5C => 79.98219W        // Degrees Decimal, 5 decimal places (1m), Use Cardinal Directions (N,S,E,W)
// DD2_C => 79.98 W         // Degrees Decimal, 2 decimal places (1km), SPACE, Use Cardinal Directions (N,S,E,W)
// Given
//   Latitude: 40.7160335695977551
//  Longitude: -111.8504939999999976
//
// Following Commmon displays:
// LatLngArrayStr:      "40.7160, -111.8505"
// LngLatArrayStr:      "-111.8505, 40.7160"
// LatLngCardArrayStr:      "40.7160 N, 111.8505 W"
// LngLatCardArrayStr:      "111.8505 W, 40.7160 N"
// LatLngCardArrayStr:      "40° 42' 57.7224" N, 111° 51' 1.7784" W"
// LngLatCardArrayStr:      "111.8505 W, 40.7160 N"
// LatLngStr:           "40.7160 Lat, -111.8505 Lng"
// LngLatStr:           "-111.8505 Lng, 40.7160 Lat"
// LatLonStr:           "40.7160 Lat, -111.8505 Lon"
// LonLatStr:           "-111.8505 Lon, 40.7160 Lat"
// LatitudeLongitudeStr:           "40.7160 Latitude, -111.8505 Longitude"
// LongitudeLatitudeStr:           "-111.8505 Longitude, 40.7160 Latitude"
// LatitudeLongitudePrefacedStr:           "Latitude: 40.7160, Longitude: -111.8505"
//# sourceMappingURL=LatLngFmt.spec.js.map