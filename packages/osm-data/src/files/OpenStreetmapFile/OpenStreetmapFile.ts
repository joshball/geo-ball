import { resolve, basename } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import {
    fileNamify,
    LocalDateTime,
    ParsedFilenameTimestamp,
    readFile,
} from '@geo-ball/utils';
import { IOverpassQueryResponse } from '../../api';
import { OpenStreetMapElements } from '../../data';

import { IOpenStreetmapFileMetaData, OpenStreetmapFileMetaData } from '..';

export class OpenStreetmapFile {
    osmMetaData: OpenStreetmapFileMetaData;
    osmQueryResp: IOverpassQueryResponse;

    constructor(
        osmMetaData: IOpenStreetmapFileMetaData,
        osmQueryResp: IOverpassQueryResponse
    ) {
        this.osmMetaData = new OpenStreetmapFileMetaData(osmMetaData);
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
    static async Load(filePath: string): Promise<OpenStreetmapFile> {
        console.log('OpenStreetmapFile.Load', filePath);
        return readFile(filePath, 'utf8').then(file =>
            OpenStreetmapFile.CreateFromFileJson(file)
        );
    }

    static LoadSync(filePath: string): OpenStreetmapFile {
        console.log('OpenStreetmapFile.LoadSync', filePath);
        return OpenStreetmapFile.CreateFromFileJson(
            readFileSync(filePath, 'utf8')
        );
    }

    static CreateFromFileJson(fileJson: string): OpenStreetmapFile {
        const file = JSON.parse(fileJson);
        if (OpenStreetmapFile.IsOsmData(file)) {
            console.log('OpenStreetmapFile.Load.osmMetaData', file.osmMetaData);
            return new OpenStreetmapFile(file.osmMetaData, file.osmQueryResp);
        }
        throw new Error('Invalid file structure');
    }

    static IsOsmData(osmData: OpenStreetmapFile): boolean {
        return (
            !!osmData.osmMetaData &&
            !!osmData.osmMetaData.osmServer &&
            !!osmData.osmMetaData.osmQuery &&
            !!osmData.osmMetaData.queryDate &&
            !!osmData.osmQueryResp
        );
    }

    static Save(path: string, osmFile: OpenStreetmapFile): string {
        const resolvedPath = resolve(path);
        writeFileSync(resolvedPath, JSON.stringify(osmFile, undefined, 4));
        return resolvedPath;
    }

    static CreateDescriptiveFileName(
        fileQueryName: string,
        date: Date | undefined
    ): string {
        const ts = date ? '.' + LocalDateTime.FromDate(date).filename : '';
        return `${fileNamify(fileQueryName, { replacement: '_' })}${ts}.${
            OpenStreetmapFile.Extension
        }`;
    }

    static ParseOpenStreetmapFileName(
        filePath: string
    ): ParsedFilenameTimestamp | undefined {
        return LocalDateTime.ParseFilenameFormatWithRegex(filePath);
    }
}
