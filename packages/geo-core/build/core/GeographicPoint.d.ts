export declare const deg2rad: (degrees: number) => number;
export declare const degreesToRadians: (degrees: number) => number;
export declare class GeographicPoint {
    static Serialize(obj: GeographicPoint): string;
    static DeSerialize(serializedGeoPoint: string): GeographicPoint;
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number);
    equals(rhs: GeographicPoint): boolean;
    hashCode(): number;
    /**
     * Calculates the geographic distance in km between this point and
     * the other point.
     * @param other
     * @return The distance between this lat, lon point and the other point
     */
    distance(other: GeographicPoint): number;
    getDist(lat1: number, lon1: number, lat2: number, lon2: number): number;
    toString: () => string;
}
