import { ILatLng } from './LatLng';
export declare const degreesToRadians: (degrees: number) => number;
export declare const RADIUS_OF_EARTH = 6373;
/**
 * Calculates the geographic distance in km between this point and
 * the other point.
 * @param other
 * @return The distance between this lat, lon point and the other point
 */
export declare const distance: (lhs: ILatLng, rhs: ILatLng) => number;
export declare const getDist: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 */
//# sourceMappingURL=LatLngHelpers.d.ts.map