import { resolve, join, dirname, basename } from 'path';
import { LocalDateTime } from '@geo-ball/utils';
import { IGeographicBoundsDescription } from '../files/GeographicBoundsDescription';

import { promisify } from 'util';
import * as fs from 'fs';
import { ParsedFilenameTimestamp } from '../../../utils/src/files/Timestamps';

export const readdir = promisify(fs.readdir);
export const lstat = promisify(fs.lstat);
export const access = promisify(fs.access);
export const mkdir = promisify(fs.mkdir);


export class OsmFetchManager {
    fetchRootPath: string;
    fetchRootPath: string;

    constructor(fetchRootPath: string) {
        this.fetchRootPath = resolve(fetchRootPath);
        this.runs = this.getRuns();
    }

    createFetch(ldt: LocalDateTime) {
        console.log(ldt);
    }
}

export class OsmFetchDir {
    dirPath: string;
    dirName: string;
    rootPath: string;

    constructor(fetchDirPath: string) {
        this.dirPath = resolve(fetchDirPath);
        this.dirName = basename(this.dirPath);
        this.rootPath = dirname(this.dirPath);
    }

    get localDateTime(): LocalDateTime {
        return LocalDateTime.ParseFilenameFormat(this.dirName);
    }

    get ParsedFilenameTimestamp(): LocalDateTime {
        return LocalDateTime.ParseFilenameFormat(this.dirName);
    }
    createFetch(path: string) {
        LocalDateTime
    }

    public static CreateFetchDirPath(fetchRootPath: string, ldt: LocalDateTime): string {
        fetchRootPath = resolve(fetchRootPath);
        return join(fetchRootPath, ldt.toFilenameTimestamp())
    }

}

export interface IOsmFetchAndSaveParams {
    osmServer: string;
    queryDate: LocalDateTime;
    geoBounds: IGeographicBoundsDescription;
    fetchDir: string;
    overwrite: boolean;
    fake: boolean;
}
