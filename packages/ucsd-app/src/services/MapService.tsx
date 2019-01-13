import { MapLocation } from "./MapLocation";

export const getIntersections = (): Promise<Array<MapLocation>> => {
    const intersections = [
        new MapLocation('San Diego (UCSD)', [32.8741164, -117.2382689], 'sd.map'),
        new MapLocation('Salt Lake City', [40.7563038, -111.8781928], 'slc.map'),
        new MapLocation('Santa Barbara', [32.8741164, -117.2382689], 'sb.map'),
        new MapLocation('Seattle', [32.8741164, -117.2382689], 'seattle.map'),
    ];
    return Promise.resolve(intersections);
}
