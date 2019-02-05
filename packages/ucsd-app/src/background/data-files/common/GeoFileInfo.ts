import { PathLike, Stats } from "fs";
import parse = require("date-fns/parse");
import format = require("date-fns/format");
import { GeoFileType, IGeoFileName, GeoFileDataType, GeoFileName } from "./GeoFileName";
import { OsmRunError } from '../osm/OsmRunError';
import { lstat, readdir } from "../utils/fsp";
import { join } from "path";




export interface IGeoFileInfo {
    name: IGeoFileName;
    size: number;
    atime: Date;
    ctime: Date;
    mtime: Date;
}

export class GeoFileInfo implements IGeoFileInfo {
    name: IGeoFileName;
    size: number;
    atime: Date;
    ctime: Date;
    mtime: Date;

    constructor(geoFileName: GeoFileName, stats: Stats) {
        this.name = geoFileName;
        if (!stats.isFile()) {
            throw new OsmRunError('geoFileName is not a file!', "PathWasDirNotFile")
        }

        this.size = stats.size;
        this.atime = stats.atime;
        this.ctime = stats.ctime;
        this.mtime = stats.mtime;
    }

    static async GetGeoFileInfoFromPath(path: string) {
        const stats = await lstat(path);
        const gfn = new GeoFileName(path);
        return new GeoFileInfo(gfn, stats);
    }


    static async GetGeoFilesFromDir(dirPath: string): Promise<Array<GeoFileInfo>> {
        const files = await readdir(dirPath);
        return Promise.all(
            files.map((fileName: string) => join(dirPath, fileName))
                .map((filePath: string) => GeoFileInfo.GetGeoFileInfoFromPath(filePath))
        );
    }


}
