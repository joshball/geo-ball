export declare class LatLng {
    lat: number;
    lon: number;
    constructor(lat: number, lon: number);
    static FromArray(latLngArray: Array<number>): LatLng;
    toArray(): Array<number>;
    toString: () => string;
    valid: () => boolean;
}
