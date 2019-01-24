import { LatLng, ILatLng } from './LatLng';
export interface ILatLngBounds {
    sw: ILatLng;
    ne: ILatLng;
}
export interface ILatLngBoundsArea extends ILatLngBounds {
    latDistMeters: number;
    lngDistMeters: number;
    areaInMeters: number;
}
export declare class LatLngBounds {
    sw: LatLng;
    ne: LatLng;
    constructor(southwest: LatLng, northeast: LatLng);
    toString: () => string;
    center: () => LatLng;
    grow(by: number): any;
    getArea(): ILatLngBoundsArea;
    static FromBounds(bounds: ILatLngBounds, growth?: number): LatLngBounds;
    static FromArray(bounds: Array<number>): LatLngBounds;
    static FromNumbers(southLat: number, westLon: number, northLat: number, eastLon: number): LatLngBounds;
    toArray(): Array<number>;
    valid: () => boolean;
    equals(rhs: ILatLngBounds): boolean;
    hashCode(): number;
}
//# sourceMappingURL=LatLngBounds.d.ts.map