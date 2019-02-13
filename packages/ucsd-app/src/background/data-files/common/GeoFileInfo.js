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
const GeoFileName_1 = require("./GeoFileName");
const OsmRunError_1 = require("../osm/OsmRunError");
const fsp_1 = require("../utils/fsp");
const path_1 = require("path");
class GeoFileInfo {
    constructor(geoFileName, stats) {
        this.name = geoFileName;
        if (!stats.isFile()) {
            throw new OsmRunError_1.OsmRunError('geoFileName is not a file!', "PathWasDirNotFile");
        }
        this.size = stats.size;
        this.atime = stats.atime;
        this.ctime = stats.ctime;
        this.mtime = stats.mtime;
    }
    static GetGeoFileInfoFromPath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const stats = yield fsp_1.lstat(path);
            const gfn = new GeoFileName_1.GeoFileName(path);
            return new GeoFileInfo(gfn, stats);
        });
    }
    static GetGeoFilesFromDir(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fsp_1.readdir(dirPath);
            return Promise.all(files.map((fileName) => path_1.join(dirPath, fileName))
                .map((filePath) => GeoFileInfo.GetGeoFileInfoFromPath(filePath)));
        });
    }
}
exports.GeoFileInfo = GeoFileInfo;
//# sourceMappingURL=GeoFileInfo.js.map