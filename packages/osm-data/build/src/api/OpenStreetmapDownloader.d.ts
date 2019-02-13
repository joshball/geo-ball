import { OpenStreetmapQuery } from './OpenStreetmapQuery';
import { OpenStreetmapFile } from '../files/OpenStreetmapFile';
import { OpenStreetmapFileMetaData } from "../files/OpenStreetmapFileMetaData";
import { IOpenStreetmapQueryResponse } from './IOpenStreetmapQueryResponse';
import { LocalDateTime } from '@geo-ball/utils';
import { IGeographicBoundsDescription } from '../files/GeographicBoundsDescription';
export interface IFetchAndSaveResult {
    osmDataFile: OpenStreetmapFile;
    osmDataFilePath: string;
}
export declare class OpenStreetmapDownloader {
    static DEFAULT_ENDPOINT: string;
    static Fetch(query: OpenStreetmapQuery, endpoint?: string, fakeTheDownload?: boolean): Promise<IOpenStreetmapQueryResponse>;
    static FetchAndSave(osmQueryMeta: OpenStreetmapFileMetaData, osmDataFilePath: string, overwriteFile?: boolean, fakeTheDownload?: boolean): Promise<IFetchAndSaveResult>;
}
export interface IOsmFetchAndSaveParams {
    osmServer: string;
    queryDate: LocalDateTime;
    geoBounds: IGeographicBoundsDescription;
    fetchDir: string;
    overwrite: boolean;
    fake: boolean;
}
//# sourceMappingURL=OpenStreetmapDownloader.d.ts.map