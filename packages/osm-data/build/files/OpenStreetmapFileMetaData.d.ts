import { OpenStreetmapQuery, IOpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { ILatLngBounds } from '@geo-ball/geo-core';
export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    queryName: string;
    queryDesc: string;
    queryBoundsArea: ILatLngBounds;
}
export declare class OpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    queryName: string;
    queryDesc: string;
    queryBoundsArea: ILatLngBounds;
    constructor(osmServer: string, osmQuery: IOpenStreetmapQuery, queryName: string, queryDesc: string, queryBoundsArea: ILatLngBounds, queryDate?: string);
}
//# sourceMappingURL=OpenStreetmapFileMetaData.d.ts.map