import { LocalDateTime } from '@geo-ball/utils';
import { OverpassQuery } from '../../api';
import { GeographicBoundsDescription } from '../../data';

export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OverpassQuery;
    queryDate: LocalDateTime;
    geoBounds: GeographicBoundsDescription;
    originalFilePath: string;
}

export class OpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OverpassQuery;
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
