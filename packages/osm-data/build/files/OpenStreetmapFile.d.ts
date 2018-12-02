import { OpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { IOpenStreetmapQueryResponse } from '../api/IOpenStreetmapQueryResponse';
import { OpenStreetMapElements } from '../data/OpenStreetMapElements';
export declare class OpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    constructor(osmServer: string, osmQuery: OpenStreetmapQuery, queryDate?: string);
}
export declare class OpenStreetmapFile {
    osmMetaData: OpenStreetmapFileMetaData;
    osmQueryResp: IOpenStreetmapQueryResponse;
    constructor(osmMetaData: OpenStreetmapFileMetaData, osmQueryResp: IOpenStreetmapQueryResponse);
    getElements(): OpenStreetMapElements;
    static Load(path: string): OpenStreetmapFile;
    static GetFileType(fileData: string): OpenStreetmapFile;
    static Save(path: string, osmFile: OpenStreetmapFile): string;
    static CreateFileName(fileQueryName: string, date: Date | undefined): string;
    static CreateFilenameTimestamp(date?: Date): string;
}
