import { LocalDateTime } from '@geo-ball/utils';
import { IGeographicBoundsDescription } from '../files/GeographicBoundsDescription';
import * as fs from 'fs';
export declare const readdir: typeof fs.readdir.__promisify__;
export declare const lstat: typeof fs.lstat.__promisify__;
export declare const access: typeof fs.access.__promisify__;
export declare const mkdir: typeof fs.mkdir.__promisify__;
export declare class OsmFetchManager {
    fetchRootPath: string;
    fetchRootPath: string;
    constructor(fetchRootPath: string);
    createFetch(ldt: LocalDateTime): void;
}
export declare class OsmFetchDir {
    dirPath: string;
    dirName: string;
    rootPath: string;
    constructor(fetchDirPath: string);
    readonly localDateTime: LocalDateTime;
    readonly ParsedFilenameTimestamp: LocalDateTime;
    createFetch(path: string): void;
    static CreateFetchDirPath(fetchRootPath: string, ldt: LocalDateTime): string;
}
export interface IOsmFetchAndSaveParams {
    osmServer: string;
    queryDate: LocalDateTime;
    geoBounds: IGeographicBoundsDescription;
    fetchDir: string;
    overwrite: boolean;
    fake: boolean;
}
//# sourceMappingURL=OsmFetchManager.d.ts.map