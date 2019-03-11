/// <reference types="node" />
import { Stats } from 'fs';
import { IGeoFileName, GeoFileName } from './GeoFileName';
export interface IGeoFileInfo {
    name: IGeoFileName;
    size: number;
    atime: Date;
    ctime: Date;
    mtime: Date;
}
export declare class GeoFileInfo implements IGeoFileInfo {
    name: IGeoFileName;
    size: number;
    atime: Date;
    ctime: Date;
    mtime: Date;
    constructor(geoFileName: GeoFileName, stats: Stats);
    static GetGeoFileInfoFromPath(path: string): Promise<GeoFileInfo>;
    static GetGeoFilesFromDir(dirPath: string): Promise<Array<GeoFileInfo>>;
}
//# sourceMappingURL=GeoFileInfo.d.ts.map
