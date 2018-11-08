import { OpenStreetmapQuery, LatLngBounds, LatLng } from "..";
import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";
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
export interface IOsmQuery {
    query: OpenStreetmapQuery;
    latLngBoundsTestData: ILatLngBoundsTestData;
}
export declare const createNewBounds: () => ILatLngBoundsTestData;
export declare const createNewOpenStreetmapQuery: (latLngBoundsTestData?: ILatLngBoundsTestData | undefined) => {
    query: OpenStreetmapQuery;
    latLngBoundsTestData: ILatLngBoundsTestData;
};
export declare const dataDir = ".";
export declare const osmJsonResp: IOpenStreetmapQueryResponse;
