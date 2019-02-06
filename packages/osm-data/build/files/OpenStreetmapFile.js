"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const utils_1 = require("@geo-ball/utils");
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
    static Load(filePath) {
        console.log('OpenStreetmapFile.Load', filePath);
        return OpenStreetmapFile.CreateFromFileJson(fs_1.readFileSync(filePath, 'utf8'));
    }
    static CreateFromFileJson(fileJson) {
        const file = JSON.parse(fileJson);
        if (OpenStreetmapFile.IsOsmData(file)) {
            console.log('OpenStreetmapFile.Load.osmMetaData', file.osmMetaData);
            return new OpenStreetmapFile(file.osmMetaData, file.osmQueryResp);
        }
        throw new Error('Invalid file structure');
    }
    static IsOsmData(osmData) {
        return !!osmData.osmMetaData
            && !!osmData.osmMetaData.osmServer
            && !!osmData.osmMetaData.osmQuery
            && !!osmData.osmMetaData.queryDate
            && !!osmData.osmQueryResp;
    }
    static Save(path, osmFile) {
        const resolvedPath = path_1.resolve(path);
        fs_1.writeFileSync(resolvedPath, JSON.stringify(osmFile, undefined, 4));
        return resolvedPath;
    }
    static CreateDescriptiveFileName(fileQueryName, date) {
        const ts = date ? '.' + utils_1.createFilenameTimestamp(date) : '';
        return `${utils_1.fileNamify(fileQueryName, { replacement: '_' })}${ts}.${OpenStreetmapFile.Extension}`;
    }
    static ParseOpenStreetmapFileName(filePath) {
        return utils_1.findParseFilenameTimestamp(filePath);
    }
}
OpenStreetmapFile.Extension = 'osm-data.json';
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=OpenStreetmapFile.js.map