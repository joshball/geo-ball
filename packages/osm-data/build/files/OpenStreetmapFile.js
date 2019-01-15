"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const FileUtils_1 = require("../utils/FileUtils");
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
    static CreateFileName(fileQueryName, date) {
        const ts = date ? '.' + OpenStreetmapFile.CreateFilenameTimestamp(date) : '';
        return `${FileUtils_1.fileNamify(fileQueryName, { replacement: '_' })}${ts}.osm-data.json`;
    }
    static CreateFilenameTimestamp(date = new Date()) {
        // "2018-11-07T21:30:05.974Z" to:
        // "2018-11-07_2130.05"
        date = new Date();
        const dateString = date.toISOString();
        const split = dateString.split('T');
        if (split.length !== 2) {
            return FileUtils_1.fileNamify(dateString, { replacement: '_' });
        }
        // 21:30:05.974Z
        let time = split[1].replace(/:/g, '');
        // 213005.974Z
        time = time.substr(0, time.indexOf('.'));
        // 2153.44
        time = time.substr(0, time.length - 2) + '.' + time.substr(time.length - 2);
        return `${split[0]}_${time}`; // ​​​​​2018-11-07_2153.44
    }
}
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=OpenStreetmapFile.js.map