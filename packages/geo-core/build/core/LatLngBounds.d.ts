import { LatLng, ILatLng } from './LatLng';
export interface ILatLngBounds {
    southWest: ILatLng;
    northEast: ILatLng;
}
export declare class LatLngBounds {
    southWest: LatLng;
    northEast: LatLng;
    readonly northWest: LatLng;
    readonly southEast: LatLng;
    readonly latDelta: number;
    readonly lngDelta: number;
    readonly centerLat: number;
    readonly centerLng: number;
    readonly center: LatLng;
    readonly areaInMeters: number;
    readonly latDistInMeters: number;
    readonly lngDistInMeters: number;
    constructor(southwest: LatLng, northeast: LatLng);
    toString: () => string;
    grow(by: number): any;
    static FromBounds(bounds: ILatLngBounds, growth?: number): LatLngBounds;
    static FromArray(bounds: Array<number>): LatLngBounds;
    static FromNumbers(southLat: number, westLon: number, northLat: number, eastLon: number): LatLngBounds;
    toArray(): Array<number>;
    valid: () => boolean;
    equals(rhs: ILatLngBounds): boolean;
    hashCode(): number;
}
//# sourceMappingURL=LatLngBounds.d.ts.map