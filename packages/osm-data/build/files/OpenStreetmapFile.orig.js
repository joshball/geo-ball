"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const FileUtils_1 = require("../utils/FileUtils");
// OSM File will have
// - OSM Server
// - OSM Query
// - ?curl command
// - Date
// - OSM Query Response
// - OSM Query Response Type (JSON|GeoJSON)
class OpenStreetmapFile {
    constructor(path, type, data) {
        this.path = path;
        this.type = type;
        this.data = data;
    }
    static CreateFilenameTimestamp(date = new Date()) {
        return FileUtils_1.fileNamify(date.toISOString());
    }
    static Load(path) {
        const resolvedPath = path_1.resolve(path);
        const fileData = fs_1.readFileSync(resolvedPath, 'utf8');
        return OpenStreetmapFile.GetFileType(resolvedPath, fileData);
    }
    static GetFileType(path, fileData) {
        return OpenStreetmapFile.TryJsonType(path, fileData)
            || OpenStreetmapFile.TryTextType(path, fileData)
            || new OpenStreetmapFile(path, 'Unknown', fileData);
    }
    static TryJsonType(path, fileData) {
        try {
            const osmData = JSON.parse(fileData);
            return OpenStreetmapFile.TryDataJsonType(path, osmData)
                || OpenStreetmapFile.TryGeoJsonType(path, osmData)
                || new OpenStreetmapFile(path, 'UnknownJson', fileData);
        }
        catch (error) {
            return undefined;
        }
    }
    static TryDataJsonType(path, jsonData) {
        if (jsonData.version
            && jsonData.osm3s
            && jsonData.elements
            && jsonData.elements.length) {
            new OpenStreetmapFile(path, 'OsmDataJson', jsonData);
        }
    }
    static TryGeoJsonType(path, jsonData) {
        if (jsonData.type === 'FeatureCollection'
            && jsonData.features
            && jsonData.features.length) {
            new OpenStreetmapFile(path, 'OsmDataGeoJson', jsonData);
        }
    }
    static TryTextType(path, fileData) {
        // switch (extname(path)) {
        // 	case '.txt':
        // }
        const foundNode = fileData.indexOf('node[');
        const foundWay = fileData.indexOf('way[');
        const foundRelation = fileData.indexOf('relation[');
        if (foundNode || foundWay || foundRelation) {
            return new OpenStreetmapFile(path, 'OsmQueryTxt', fileData);
        }
    }
}
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=OpenStreetmapFile.orig.js.map