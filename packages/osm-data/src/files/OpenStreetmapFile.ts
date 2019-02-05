import { resolve, basename } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fileNamify, CreateFilenameTimestamp, FindParseFilenameTimestamp, ParsedFilenameTimestamp } from '@ball-maps/utils';
import { OpenStreetmapQuery, IOpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { IOpenStreetmapQueryResponse } from '../api/IOpenStreetmapQueryResponse';
import { OpenStreetMapElements } from '../data/OpenStreetMapElements';


// OSM File will have
// - OSM Server
// - OSM Query
// - OSM Query Response
// - Date

export interface IOpenStreetmapFileMetaData {
    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;

}
export class OpenStreetmapFileMetaData {

    osmServer: string;
    osmQuery: OpenStreetmapQuery;
    queryDate: string;

    constructor(osmServer: string, osmQuery: IOpenStreetmapQuery, queryDate: string = new Date().toISOString()) {
        this.osmServer = osmServer;
        // this.osmQuery = new OpenStreetmapQuery(osmQuery.latLngBounds, osmQuery.features, osmQuery.outFormat, osmQuery.timeoutInSec);
        this.osmQuery = new OpenStreetmapQuery(osmQuery);
        this.queryDate = queryDate;
    }
}

export class OpenStreetmapFile {

    osmMetaData: OpenStreetmapFileMetaData;
    osmQueryResp: IOpenStreetmapQueryResponse;

    constructor(osmMetaData: IOpenStreetmapFileMetaData, osmQueryResp: IOpenStreetmapQueryResponse) {
        this.osmMetaData = new OpenStreetmapFileMetaData(osmMetaData.osmServer, osmMetaData.osmQuery, osmMetaData.queryDate);
        this.osmQueryResp = osmQueryResp;
    }

    getElements(): OpenStreetMapElements {
        return new OpenStreetMapElements(this.osmQueryResp.elements);
    }

    static Extension = 'osm-data.json';
    static HasCorrectExtension(filePath: string): boolean {
        return basename(filePath).endsWith(OpenStreetmapFile.Extension);
    }

    // osmd.QUERYNAME[.TS?].json
    static Load(path: string): OpenStreetmapFile {
        const resolvedPath = resolve(path);
        const fileData = readFileSync(resolvedPath, 'utf8');
        return OpenStreetmapFile.GetFileType(fileData);
    }


    static GetFileType(fileData: string): OpenStreetmapFile {
        const osmData = JSON.parse(fileData) as OpenStreetmapFile;
        if (osmData.osmMetaData
            && osmData.osmMetaData.osmServer
            && osmData.osmMetaData.osmQuery
            && osmData.osmMetaData.queryDate
            && osmData.osmQueryResp) {
            return new OpenStreetmapFile(osmData.osmMetaData, osmData.osmQueryResp);
        }
        throw new Error('Not an OSM File')
    }

    static Save(path: string, osmFile: OpenStreetmapFile): string {
        const resolvedPath = resolve(path);
        writeFileSync(resolvedPath, JSON.stringify(osmFile, undefined, 4));
        return resolvedPath;
    }

    static CreateDescriptiveFileName(fileQueryName: string, date: Date | undefined): string {
        const ts = date ? '.' + CreateFilenameTimestamp(date) : '';
        return `${fileNamify(fileQueryName, { replacement: '_' })}${ts}.${OpenStreetmapFile.Extension}`;
    }

    static ParseOpenStreetmapFileName(filePath: string): ParsedFilenameTimestamp | undefined {
        return FindParseFilenameTimestamp(filePath);
    }
}
