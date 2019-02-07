import { OpenStreetmapQuery } from './OpenStreetmapQuery';
import { OpenStreetmapFile } from '../files/OpenStreetmapFile';
import { OpenStreetmapFileMetaData } from "../files/OpenStreetmapFileMetaData";
import { IOpenStreetmapQueryResponse } from './IOpenStreetmapQueryResponse';
export interface IFetchAndSaveResult {
    osmDataFile: OpenStreetmapFile;
    osmDataFilePath: string;
}
export declare const osmJsonResp: IOpenStreetmapQueryResponse;
export declare class OpenStreetmapDownloader {
    static DEFAULT_ENDPOINT: string;
    static Fetch(query: OpenStreetmapQuery, endpoint?: string, fakeTheDownload?: boolean): Promise<IOpenStreetmapQueryResponse>;
    static FetchAndSave(osmQueryMeta: OpenStreetmapFileMetaData, osmDataFilePath: string, overwriteFile?: boolean, fakeTheDownload?: boolean): Promise<IFetchAndSaveResult>;
}
//# sourceMappingURL=OpenStreetmapDownloader.d.ts.map