import { OpenStreetmapQuery, IOpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { ILatLngBounds } from '@geo-ball/geo-core';
import { GeographicBoundsDescription } from './GeographicBoundsDescription';
import { LocalDateTime } from '../../../utils/src/time/LocalDateTime';

export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: LocalDateTime;
    geoBounds: GeographicBoundsDescription;
    originalFilePath: string;
}

export class OpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: LocalDateTime;
    geoBounds: GeographicBoundsDescription;
    originalFilePath: string;

    constructor(osmFileMetaData: IOpenStreetmapFileMetaData) {
        this.osmServer = osmFileMetaData.osmServer;
        this.osmQuery = osmFileMetaData.osmQuery;
        this.queryDate = osmFileMetaData.queryDate;
        this.geoBounds = osmFileMetaData.geoBounds;
        this.originalFilePath = osmFileMetaData.originalFilePath;
    }
}
