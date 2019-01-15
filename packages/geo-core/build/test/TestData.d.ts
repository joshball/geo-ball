import { LatLngBounds, LatLng } from "..";
export interface ILatLng {
    lat: number;
    lon: number;
}
export interface ILatLngBound {
    sw: ILatLng;
    ne: ILatLng;
}
export interface ILatLngBoundsTestData {
    objBounds: ILatLngBound;
    sw: LatLng;
    ne: LatLng;
    latLngBounds: LatLngBounds;
}
export declare const createNewBounds: () => ILatLngBoundsTestData;
//# sourceMappingURL=TestData.d.ts.map