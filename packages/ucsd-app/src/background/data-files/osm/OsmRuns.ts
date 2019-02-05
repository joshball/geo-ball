import { resolve } from "path";
import { readdir } from "../utils/fsp";
import { createOsmRun, IOsmRunDir } from "./OsmRunDir";

// export interface IOsmFiles {
//     query: IFileInfo;
//     download: IFileInfo;
// }

// export interface IIntFiles {
//     intersections: IFileInfo;
//     points: IFileInfo;
// }

// export interface IGeoFilesTuple {
//     osm: IOsmFiles;
//     rsd: IFileInfo;
//     int: IIntFiles;
// }


// export interface IOpenStreetMapDataRun {
//     name: string;
//     description: string;
//     date: Date;
//     bounds: string;
//     query: string;
//     files: IOsmFiles;
// }

// export class OpenStreetMapDataRun {
//     // states:
//     //  - it was a file, not a dir
//     //  - dir not named correctly
//     //  - dir does not exist
//     //  - dir has no files
//     //  - dir files not named consistent
//     //  - dir files two many or few
//     //  - dir files don't have correct data
//     // constructor(osmRunDirPath: string, fileName: any){

//     // }
// }

export class OsmRuns {
    osmRunDirPath: string;

    constructor(osmRunDirPath: string) {
        this.osmRunDirPath = resolve(osmRunDirPath);
    }

    async fetchAll(): Promise<Array<IOsmRunDir>> {
        const runDirs = await readdir(this.osmRunDirPath);
        return Promise.all(runDirs.map(fileName => createOsmRun(this.osmRunDirPath, fileName)));
    }
    async createRun(): Promise<void> {
        // const runDirs = await readdir(this.osmRunDirPath);
        // return Promise.all(runDirs.map(fileName => createOsmRun(this.osmRunDirPath, fileName)));
    }


    fetchRun(_date: Date): IOsmRunDir {
        throw new Error();
    }

    deleteRun(_run: IOsmRunDir) {
        throw new Error();
    }
}
