import { LatLng, ILatLng } from './LatLng';
import { LatLngBounds as LefletLatLngBounds } from 'leaflet';
export interface ILatLngBounds {
    southWest: ILatLng;
    northEast: ILatLng;
}
export interface ILatLngBoundsArea extends ILatLngBounds {
    southWest: ILatLng;
    northEast: ILatLng;
    northWest: ILatLng;
    southEast: ILatLng;
    center: ILatLng;
    centerLat: number;
    centerLng: number;
    latDelta: number;
    lngDelta: number;
    latDistInMeters: number;
    lngDistInMeters: number;
    areaInMeters: number;
}
export declare class LatLngBounds implements ILatLngBoundsArea {
    southWest: LatLng;
    northEast: LatLng;
    readonly northWest: LatLng;
    readonly southEast: LatLng;
    readonly center: LatLng;
    readonly centerLat: number;
    readonly centerLng: number;
    readonly latDelta: number;
    readonly lngDelta: number;
    readonly areaInMeters: number;
    readonly latDistInMeters: number;
    readonly lngDistInMeters: number;
    constructor(southwest: LatLng, northeast: LatLng);
    toString: () => string;
    grow(by: number): any;
    toArray(): Array<number>;
    valid: () => boolean;
    equals(rhs: ILatLngBounds): boolean;
    hashCode(): number;
    static FromArray(bounds: Array<number>): LatLngBounds;
    static FromNumbers(southLat: number, westLon: number, northLat: number, eastLon: number): LatLngBounds;
    static FromBounds(bounds: ILatLngBounds, growth?: number): LatLngBounds;
    static FromLeafletBounds(leafletBounds: LefletLatLngBounds): LatLngBounds;
}
//# sourceMappingURL=LatLngBounds.d.ts.map