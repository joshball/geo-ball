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
const utils_1 = require("@geo-ball/utils");
const osm_data_1 = require("@geo-ball/osm-data");
const OsmFetchFile_1 = require("./OsmFetchFile");
const RoadSegmentsFile_1 = require("../RoadSegmentsFile");
const PointMapsFile_1 = require("../PointMapsFile");
const IntersectionsFile_1 = require("../IntersectionsFile");
/**
 * Just a simple abstraction around the OSM Fetch Directory
 */
class OsmFetchDir {
    constructor(fetchDirPath) {
        this.fetchDirPath = path_1.resolve(fetchDirPath);
        const ldt = utils_1.LocalDateTime.ParseFilenameFormat(fetchDirPath);
        this.fetchLocalDateTime = ldt;
        this.dirName = path_1.basename(this.fetchDirPath);
        this.rootPath = path_1.dirname(this.fetchDirPath);
        this.subFiles = [];
        this.unknownPaths = [];
    }
    get localDateTime() {
        return utils_1.LocalDateTime.ParseFilenameFormat(this.dirName);
    }
    get ParsedFilenameTimestamp() {
        return utils_1.LocalDateTime.ParseFilenameFormat(this.dirName);
    }
    getOsmFetchFilePaths() {
        return __awaiter(this, void 0, void 0, function* () {
            return utils_1.readdir(this.fetchDirPath)
                .then(data => { console.log('fetchDirs:', data); return data; })
                .then(fetchDirs => fetchDirs.map(fetchDir => path_1.join(this.fetchDirPath, fetchDir)));
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('');
            console.log('======================================================================');
            console.log('OsmFetchDir.load this.fetchDirPath', this.fetchDirPath);
            return this.getOsmFetchFilePaths()
                .then(data => { console.log('files:', data); return data; })
                .then(files => this.subFiles = files)
                .then(files => this.setPaths(files));
        });
    }
    setPath(osmSingleRunFilePath) {
        if (osm_data_1.OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.osm = new OsmFetchFile_1.OsmFetchFile(osm_data_1.OpenStreetmapFile.Load, osmSingleRunFilePath);
        }
        else if (RoadSegmentsFile_1.RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.rsd = new OsmFetchFile_1.OsmFetchFile(RoadSegmentsFile_1.RoadSegmentsFile.Load, osmSingleRunFilePath);
        }
        else if (PointMapsFile_1.PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.pmf = new OsmFetchFile_1.OsmFetchFile(PointMapsFile_1.PointMapsFile.Load, osmSingleRunFilePath);
        }
        else if (IntersectionsFile_1.IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.int = new OsmFetchFile_1.OsmFetchFile(IntersectionsFile_1.IntersectionsFile.Load, osmSingleRunFilePath);
        }
        else {
            this.unknownPaths.push(osmSingleRunFilePath);
        }
    }
    setPaths(osmRunFilePaths) {
        osmRunFilePaths.forEach(osmSingleRunFilePath => this.setPath(osmSingleRunFilePath));
        return osmRunFilePaths;
    }
}
exports.OsmFetchDir = OsmFetchDir;
//# sourceMappingURL=OsmFetchDir.js.map