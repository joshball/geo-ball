"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fsp_1 = require("../utils/fsp");
const OsmRunDir_1 = require("./OsmRunDir");
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
class OsmRuns {
    constructor(osmRunDirPath) {
        this.osmRunDirPath = path_1.resolve(osmRunDirPath);
    }
    fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const runDirs = yield fsp_1.readdir(this.osmRunDirPath);
            return Promise.all(runDirs.map(fileName => OsmRunDir_1.createOsmRun(this.osmRunDirPath, fileName)));
        });
    }
    createRun() {
        return __awaiter(this, void 0, void 0, function* () {
            // const runDirs = await readdir(this.osmRunDirPath);
            // return Promise.all(runDirs.map(fileName => createOsmRun(this.osmRunDirPath, fileName)));
        });
    }
    fetchRun(_date) {
        throw new Error();
    }
    deleteRun(_run) {
        throw new Error();
    }
}
exports.OsmRuns = OsmRuns;
//# sourceMappingURL=OsmRuns.js.map