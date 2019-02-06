import { ParsedFilenameTimestamp } from '@geo-ball/utils';
import { OpenStreetmapQuery, IOpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { IOpenStreetmapQueryResponse } from '../api/IOpenStreetmapQueryResponse';
import { OpenStreetMapElements } from '../data/OpenStreetMapElements';
export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
}
export declare class OpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;
    constructor(osmServer: string, osmQuery: IOpenStreetmapQuery, queryDate?: string);
}
export interface IFileCreator {
    Load(path: string): any;
}
export declare class OpenStreetmapFile {
    osmMetaData: OpenStreetmapFileMetaData;
    osmQueryResp: IOpenStreetmapQueryResponse;
    constructor(osmMetaData: IOpenStreetmapFileMetaData, osmQueryResp: IOpenStreetmapQueryResponse);
    getElements(): OpenStreetMapElements;
    static Extension: string;
    static HasCorrectExtension(filePath: string): boolean;
    static Load(filePath: string): OpenStreetmapFile;
    static CreateFromFileJson(fileJson: string): OpenStreetmapFile;
    static IsOsmData(osmData: OpenStreetmapFile): boolean;
    static Save(path: string, osmFile: OpenStreetmapFile): string;
    static CreateDescriptiveFileName(fileQueryName: string, date: Date | undefined): string;
    static ParseOpenStreetmapFileName(filePath: string): ParsedFilenameTimestamp | undefined;
}
//# sourceMappingURL=OpenStreetmapFile.d.ts.map