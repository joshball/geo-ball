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
const GeoFileInfo_1 = require("../common/GeoFileInfo");
class OsmRunFiles {
    constructor(query, download) {
        if (query.name.error) {
            throw query.name.error;
        }
        if (download.name.error) {
            throw download.name.error;
        }
        this.query = query;
        this.download = download;
    }
    static GetOsmRunFiles(runDirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield GeoFileInfo_1.GeoFileInfo.GetGeoFilesFromDir(runDirPath);
            const both = yield OsmRunFiles.GetOsmQueryAndDownloadFiles(files);
            return new OsmRunFiles(both.query, both.download);
        });
    }
    static GetOsmQueryAndDownloadFiles(files) {
        return __awaiter(this, void 0, void 0, function* () {
            const both = {};
            files.forEach(f => {
                if (f.name.segments.type === 'OSM_QUERY') {
                    both.query = f;
                }
                if (f.name.segments.type === 'OSM_DOWNLOAD') {
                    both.download = f;
                }
            });
            return both;
        });
    }
}
exports.OsmRunFiles = OsmRunFiles;
//# sourceMappingURL=OsmRunFile.js.map