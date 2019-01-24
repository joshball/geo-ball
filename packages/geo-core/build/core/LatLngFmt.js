"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Coord Fmt:
//  dd
//  c|C
// Label Format
// string that is replaces characters. empty, no label
//  "" -> 40.76
//  "n l" -> 40.76 Lat/Lng
//  "nl" -> 40.76Lat/Lng
//  "n o" -> 40.76 Lat/Lon
//  "n L" -> 40.76 Latitude/Longitude
//  "L: n" -> Latitude/Longitude: 40.76
// L - Latitude/Longitude
// l - Lat/Lng
// o - Lat/Lon
//
// quickFmt:
//  array - (lat, lng)  => (40.7160, -111.8505)
//  short - (lat Lat, lng Lng)  => (40.7160 Lat, -111.8505 Lng)
//  shortLon - (lat Lat, lng Lon)  => (40.7160 Lat, -111.8505 Lon)
//  long - (lat Latitude, lng Longitude)  => (40.7160 Latitude, -111.8505 Longitude)
// wrapFmt:
const defLatLngFmt = {
    quickFmt: undefined,
    coordFmt: 'dd',
    labelFmt: '$n $l',
    tupleFmt: 'lat, lng',
    precision: 5
};
exports.quickFormatToFullFormat = (fmt) => {
    switch (fmt.quickFmt) {
        case 'array':
            fmt.labelFmt = '';
            break;
        case 'shortLon':
            fmt.labelFmt = '$n $o';
            break;
        case 'long':
            fmt.labelFmt = '$n $L';
            break;
        case 'kvpShort':
            fmt.labelFmt = '$l: $n';
            break;
        case 'kvpLong':
            fmt.labelFmt = '$L: $n';
            break;
        case 'htmlShort':
            fmt.labelFmt = '<code>$n</code> $l';
            break;
        case 'htmlLong':
            fmt.labelFmt = '<b>$L:</b> <code>$n</code>';
            break;
        case 'short':
            break;
    }
};
// export const toPrecision = (coord: number, precision:number): number => coord.toString().toFixed()
exports.formatCoord = (coord, llFmt, lng) => {
    const neg = coord < 0;
    const o = {
        original: coord,
        precision: coord.toFixed(llFmt.precision),
        cardinalDir: lng ? (neg ? 'W' : 'E') : (neg ? 'S' : 'N')
    };
    let s = llFmt.coordFmt;
    s = s.replace(/dd/, o.precision.toString());
    s = s.replace(/C/, o.cardinalDir);
    s = s.replace(/c/, o.cardinalDir.toLowerCase());
    return s;
};
exports.formatLabel = (coord, llFmt, lng) => {
    let s = llFmt.labelFmt; // + ' ';
    if (!s) {
        return coord;
    }
    // console.log('');
    // console.log('formatLabel s:', s);
    s = s.replace(/\$n/, coord);
    // console.log(`formatLabel s.coord: [${s}]`);
    s = s.replace(/\$l(?![aon])/g, lng ? 'Lng' : 'Lat');
    // console.log(`formatLabel s.l: [${s}]`);
    s = s.replace(/\$o(?![aon])/g, lng ? 'Lon' : 'Lat');
    // console.log(`formatLabel s.o: [${s}]`);
    s = s.replace(/\$L(?![aon])/g, lng ? 'Longitude' : 'Latitude');
    // console.log(`formatLabel s.L: [${s}]`);
    return s;
};
exports.formatTuple = (lat, lng, llFmt) => {
    let s = llFmt.tupleFmt;
    // console.log('');
    // console.log('formatTuple s:', s);
    s = s.replace(/lat/, lat);
    // console.log('formatTuple s.lat:', s);
    s = s.replace(/lng/, lng);
    // console.log('formatTuple s.lng:', s);
    return s;
};
exports.formatLatLng = (lat, lng, llFmt) => {
    const fmt = Object.assign({}, defLatLngFmt, llFmt);
    if (fmt.quickFmt) {
        exports.quickFormatToFullFormat(fmt);
    }
    const latCoordStr = exports.formatCoord(lat, fmt, false);
    // console.log('latCoordStr:', latCoordStr);
    const lngCoordStr = exports.formatCoord(lng, fmt, true);
    // console.log('lngCoordStr:', lngCoordStr);
    // console.log('====================================================');
    const latLabelStr = exports.formatLabel(latCoordStr, fmt, false);
    // console.log('latLabelStr:', latLabelStr);
    // console.log('====================================================');
    const lngLabelStr = exports.formatLabel(lngCoordStr, fmt, true);
    // console.log('lngLabelStr:', lngLabelStr);
    const finalStr = exports.formatTuple(latLabelStr, lngLabelStr, fmt);
    // console.log('');
    // console.log('finalStr:', finalStr);
    return finalStr;
};
// export type LatLngLabelLength = 'Full' | 'Abbrev' | 'None';
// export type LatLngLabelPos = 'Before' | 'After' | 'None';
// export type LatLngLabelSep = 'Colon' | 'Dash' | 'None';
// export type LatLngSep = 'Comma' | 'Semicolon' | 'None';
// export type LongitudeAbbrev = 'Lng' | 'Lon';
// export type CoordinateForm = 'DMS' | 'MinDec' | 'DegDec';
// export type CardinalModifiers = 'None' | 'Short' | 'Long';
// export type CardinalModPos = 'None' | 'Prefix' | 'Suffix';
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
// export const LatLngArrayStrOptions: ILatLngStringFormatOptions = {
//     decPlaces: 4,
//     separator: "Comma",
//     labelSep: "None",
//     labelPos: "None",
//     labelLen: "None"
// }
// export const LatLngArrayStrOptions: ILatLngStringFormatOptions = {
//     separator: "Comma",
//     labelSep: "None",
//     labelPos: "None",
//     labelLen: "None"
// }
// export interface ICoordinate {
//     precision: number;
//     modPos: CardinalModPos;
// }
// export interface ILatLngFormatOptions {
//     coordinate: ICoordinate;
//     lngAbbrev: LongitudeAbbrev;
//     separator: LatLngSep;
//     labelSep: LatLngLabelSep;
//     labelPos: LatLngLabelPos;
//     labelLen: LatLngLabelLength;
// }
// export class LatLngFormatOptions implements ILatLngFormatOptions {
//     coordinate: ICoordinate;
//     lngAbbrev: LongitudeAbbrev;
//     separator: LatLngSep;
//     labelSep: LatLngLabelSep;
//     labelPos: LatLngLabelPos;
//     labelLen: LatLngLabelLength;
//     constructor(
//         coordinate: ICoordinate,
//         lngAbbrev: LongitudeAbbrev,
//         separator: LatLngSep,
//         labelSep: LatLngLabelSep,
//         labelPos: LatLngLabelPos,
//         labelLen: LatLngLabelLength) {
//         this.coordinate = coordinate;
//         this.lngAbbrev = lngAbbrev;
//         this.separator = separator;
//         this.labelSep = labelSep;
//         this.labelPos = labelPos;
//         this.labelLen = labelLen;
//     }
// }
//# sourceMappingURL=LatLngFmt.js.map