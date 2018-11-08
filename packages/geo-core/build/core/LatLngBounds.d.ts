import { LatLng } from './LatLng';
export declare class LatLngBounds {
    sw: LatLng;
    ne: LatLng;
    constructor(southwest: LatLng, northeast: LatLng);
    toString: () => string;
    grow(by: number): any;
    static FromBounds(bounds: LatLngBounds, growth?: number): LatLngBounds;
    static FromArray(bounds: Array<number>): LatLngBounds;
    static FromNumbers(southLat: number, westLon: number, northLat: number, eastLon: number): LatLngBounds;
    toArray(): Array<number>;
    valid: () => boolean;
}
