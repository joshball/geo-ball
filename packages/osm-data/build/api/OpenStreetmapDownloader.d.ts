import { OpenStreetmapQuery } from './OpenStreetmapQuery';
import { OpenStreetmapFile } from '../files/OpenStreetmapFile';
import { IOpenStreetmapQueryResponse } from './IOpenStreetmapQueryResponse';
export interface IFetchAndSaveResult {
    osmDataFile: OpenStreetmapFile;
    osmDataFilePath: string;
}
export declare class OpenStreetmapDownloader {
    endpoint: string;
    constructor(endpoint?: string);
    fetch(query: OpenStreetmapQuery): Promise<IOpenStreetmapQueryResponse>;
    fetchAndSave(osmQuery: OpenStreetmapQuery, osmDataFilePath: string, overwriteFile?: boolean): Promise<IFetchAndSaveResult>;
}
