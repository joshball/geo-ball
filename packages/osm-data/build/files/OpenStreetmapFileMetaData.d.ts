import { OpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { GeographicBoundsDescription } from './GeographicBoundsDescription';
import { LocalDateTime } from '../../../utils/src/time/LocalDateTime';
export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: LocalDateTime;
    geoBounds: GeographicBoundsDescription;
    originalFilePath: string;
}
export declare class OpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: LocalDateTime;
    geoBounds: GeographicBoundsDescription;
    originalFilePath: string;
    constructor(osmFileMetaData: IOpenStreetmapFileMetaData);
}
//# sourceMappingURL=OpenStreetmapFileMetaData.d.ts.map