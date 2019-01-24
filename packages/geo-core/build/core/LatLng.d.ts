import { ILatLngFmt } from "./LatLngFmt";
export interface ILatLng {
    lat: number;
    lng: number;
}
export declare class LatLng {
    lat: number;
    lng: number;
    constructor(lat: number, lon: number);
    static FromArray(latLngArray: Array<number>): LatLng;
    toArray(): Array<number>;
    toArrayLatLon(): Array<number>;
    toArrayLonLat(): Array<number>;
    toString: () => string;
    format: (llFmt: ILatLngFmt) => string;
    valid: () => boolean;
    precision: () => any;
    equals(rhs: ILatLng): boolean;
    hashCode(): number;
    /** Convenience methods for mapping later */
    static Serialize(latLngObj: ILatLng): string;
    /** Convenience methods for mapping later */
    static DeSerialize(serializedLatLng: string): LatLng;
}
//# sourceMappingURL=LatLng.d.ts.map