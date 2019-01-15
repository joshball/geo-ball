import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fileNamify } from '../utils/FileUtils';
import { OpenStreetmapQuery, IOpenStreetmapQuery } from '../api/OpenStreetmapQuery';
import { IOpenStreetmapQueryResponse } from '../api/IOpenStreetmapQueryResponse';
import { OpenStreetMapElements } from '../data/OpenStreetMapElements';
import { IOpenStreetMapElementsStats } from '../data/IOpenStreetMapElementsStats';


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

    static CreateFileName(fileQueryName: string, date: Date | undefined): string {
        const ts = date ? '.' + OpenStreetmapFile.CreateFilenameTimestamp(date) : '';
        return `${fileNamify(fileQueryName, { replacement: '_' })}${ts}.osm-data.json`;
    }

    static CreateFilenameTimestamp(date: Date = new Date()): string {
        // "2018-11-07T21:30:05.974Z" to:
        // "2018-11-07_2130.05"
        date = new Date();
        const dateString = date.toISOString();
        const split = dateString.split('T');
        if (split.length !== 2) {
            return fileNamify(dateString, { replacement: '_' });
        }
        // 21:30:05.974Z
        let time = split[1].replace(/:/g, '');
        // 213005.974Z
        time = time.substr(0, time.indexOf('.'));
        // 2153.44
        time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);

        return `${split[0]}_${time}`; // ​​​​​2018-11-07_2153.44
    }


}
