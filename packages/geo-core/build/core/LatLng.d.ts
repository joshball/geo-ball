export interface ILatLng {
    lat: number;
    lon: number;
}
export declare class LatLng {
    lat: number;
    lon: number;
    constructor(lat: number, lon: number);
    static FromArray(latLngArray: Array<number>): LatLng;
    toArray(): Array<number>;
    toString: () => string;
    valid: () => boolean;
    equals(rhs: ILatLng): boolean;
    hashCode(): number;
    /** Convenience methods for mapping later */
    static Serialize(latLngObj: ILatLng): string;
    /** Convenience methods for mapping later */
    static DeSerialize(serializedLatLng: string): LatLng;
}
//# sourceMappingURL=LatLng.d.ts.map