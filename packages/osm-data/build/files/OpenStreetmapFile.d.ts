import { OpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { IOpenStreetmapQueryResponse } from '../api/IOpenStreetmapQueryResponse';
import { OpenStreetMapElements } from '../data/OpenStreetMapElements';
export declare class OpenStreetmapFile {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    osmQueryResp: IOpenStreetmapQueryResponse;
    constructor(osmServer: string, osmQuery: OpenStreetmapQuery, queryDate: string, osmQueryResp: IOpenStreetmapQueryResponse);
    getElements(): OpenStreetMapElements;
    static Load(path: string): OpenStreetmapFile;
    static GetFileType(fileData: string): OpenStreetmapFile;
    static Save(path: string, osmFile: OpenStreetmapFile): string;
    static CreateFileName(fileQueryName: string, date: Date | undefined): string;
    static CreateFilenameTimestamp(date?: Date): string;
}
