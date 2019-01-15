import { OpenStreetmapQuery, OpenStreetmapFileMetaData } from "..";
import { LatLngBounds, LatLng } from '@ball-maps/geo-core';
import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";
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
export interface IOsmQuery {
    query: OpenStreetmapQuery;
    latLngBoundsTestData: ILatLngBoundsTestData;
}
export declare const createNewBounds: () => ILatLngBoundsTestData;
export declare const createNewOpenStreetmapFileMetaData: () => OpenStreetmapFileMetaData;
export declare const createNewOpenStreetmapQuery: (latLngBoundsTestData?: ILatLngBoundsTestData | undefined) => {
    query: OpenStreetmapQuery;
    latLngBoundsTestData: ILatLngBoundsTestData;
};
export declare const dataDir = ".";
export declare const osmJsonResp: IOpenStreetmapQueryResponse;
//# sourceMappingURL=TestData.d.ts.map