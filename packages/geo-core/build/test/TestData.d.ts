import { LatLngBounds, LatLng } from "..";
export interface ILatLngObj {
    lat: number;
    lon: number;
}
export interface ILatLngBoundsObj {
    sw: ILatLngObj;
    ne: ILatLngObj;
}
export interface ILatLngBoundsTestData {
    objBounds: ILatLngBoundsObj;
    sw: LatLng;
    ne: LatLng;
    latLngBounds: LatLngBounds;
}
export declare const createNewBounds: () => ILatLngBoundsTestData;
