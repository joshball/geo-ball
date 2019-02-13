import { ParsedFilenameTimestamp } from '@geo-ball/utils';
import { IOpenStreetmapQueryResponse } from '../api/IOpenStreetmapQueryResponse';
import { OpenStreetMapElements } from '../data/OpenStreetMapElements';
import { IOpenStreetmapFileMetaData, OpenStreetmapFileMetaData } from './OpenStreetmapFileMetaData';
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
    static Load(filePath: string): Promise<OpenStreetmapFile>;
    static LoadSync(filePath: string): OpenStreetmapFile;
    static CreateFromFileJson(fileJson: string): OpenStreetmapFile;
    static IsOsmData(osmData: OpenStreetmapFile): boolean;
    static Save(path: string, osmFile: OpenStreetmapFile): string;
    static CreateDescriptiveFileName(fileQueryName: string, date: Date | undefined): string;
    static ParseOpenStreetmapFileName(filePath: string): ParsedFilenameTimestamp | undefined;
}
//# sourceMappingURL=OpenStreetmapFile.d.ts.map