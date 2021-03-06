import { OpenStreetmapQuery, IOpenStreetmapFileMetaData } from "..";
import { LatLngBounds, LatLng, ILatLngBounds } from '@geo-ball/geo-core';
import { IOpenStreetmapQueryResponse } from "../api/IOpenStreetmapQueryResponse";
export interface ILatLngBoundsTestData {
    objBounds: ILatLngBounds;
    sw: LatLng;
    ne: LatLng;
    latLngBounds: LatLngBounds;
}
export interface IOsmQuery {
    query: OpenStreetmapQuery;
    latLngBoundsTestData: ILatLngBoundsTestData;
}
export declare const createNewBounds: () => ILatLngBoundsTestData;
export declare const createOsmFileMetaData: (latLngBoundsTestData?: ILatLngBoundsTestData | undefined) => IOpenStreetmapFileMetaData;
export declare const dataDir = ".";
export declare const osmJsonResp: IOpenStreetmapQueryResponse;
//# sourceMappingURL=TestData.d.ts.map