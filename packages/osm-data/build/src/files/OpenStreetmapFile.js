"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const utils_1 = require("@ball-maps/utils");
const OpenStreetmapQuery_1 = require("../api/OpenStreetmapQuery");
const OpenStreetMapElements_1 = require("../data/OpenStreetMapElements");
class OpenStreetmapFileMetaData {
    constructor(osmServer, osmQuery, queryDate = new Date().toISOString()) {
        this.osmServer = osmServer;
        // this.osmQuery = new OpenStreetmapQuery(osmQuery.latLngBounds, osmQuery.features, osmQuery.outFormat, osmQuery.timeoutInSec);
        this.osmQuery = new OpenStreetmapQuery_1.OpenStreetmapQuery(osmQuery);
        this.queryDate = queryDate;
    }
}
exports.OpenStreetmapFileMetaData = OpenStreetmapFileMetaData;
class OpenStreetmapFile {
    constructor(osmMetaData, osmQueryResp) {
        this.osmMetaData = new OpenStreetmapFileMetaData(osmMetaData.osmServer, osmMetaData.osmQuery, osmMetaData.queryDate);
        this.osmQueryResp = osmQueryResp;
    }
    getElements() {
        return new OpenStreetMapElements_1.OpenStreetMapElements(this.osmQueryResp.elements);
    }
    static HasCorrectExtension(filePath) {
        return path_1.basename(filePath).endsWith(OpenStreetmapFile.Extension);
    }
    // osmd.QUERYNAME[.TS?].json
    static Load(path) {
        const resolvedPath = path_1.resolve(path);
        const fileData = fs_1.readFileSync(resolvedPath, 'utf8');
        return OpenStreetmapFile.GetFileType(fileData);
    }
    static GetFileType(fileData) {
        const osmData = JSON.parse(fileData);
        if (osmData.osmMetaData
            && osmData.osmMetaData.osmServer
            && osmData.osmMetaData.osmQuery
            && osmData.osmMetaData.queryDate
            && osmData.osmQueryResp) {
            return new OpenStreetmapFile(osmData.osmMetaData, osmData.osmQueryResp);
        }
        throw new Error('Not an OSM File');
    }
    static Save(path, osmFile) {
        const resolvedPath = path_1.resolve(path);
        fs_1.writeFileSync(resolvedPath, JSON.stringify(osmFile, undefined, 4));
        return resolvedPath;
    }
    static CreateDescriptiveFileName(fileQueryName, date) {
        const ts = date ? '.' + utils_1.CreateFilenameTimestamp(date) : '';
        return `${utils_1.fileNamify(fileQueryName, { replacement: '_' })}${ts}.${OpenStreetmapFile.Extension}`;
    }
    static ParseOpenStreetmapFileName(filePath) {
        return utils_1.FindParseFilenameTimestamp(filePath);
    }
}
OpenStreetmapFile.Extension = 'osm-data.json';
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=OpenStreetmapFile.js.map