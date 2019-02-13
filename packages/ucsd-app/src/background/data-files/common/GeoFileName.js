"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const OsmRunError_1 = require("../osm/OsmRunError");
const parseDate = require("date-fns/parse");
const formatDate = require("date-fns/format");
class GeoFileName {
    constructor(path) {
        const igf = GeoFileName.GetGeoFileNameInterfaceFromPath(path);
        this.path = igf.path;
        this.fileName = igf.fileName;
        this.split = igf.split;
        this.segments = igf.segments;
    }
}
GeoFileName.SplitGeoFileName = (fileName) => {
    const split = fileName.split('.');
    if (split.length !== 4) {
        throw new OsmRunError_1.OsmRunError('filename split is not 4', 'DirHasInconsistentFileNames');
    }
    return split;
};
GeoFileName.ParseGeoFileName = (split) => {
    return {
        name: split[0],
        date: exports.fileDateStrToDate(split[1]),
        type: exports.geoFileTypeStrToGeoType(split[2]),
        data: exports.dataTypeStrToDataType(split[3])
    };
};
GeoFileName.GetGeoFileNameInterfaceFromPath = (path) => {
    const rp = path_1.resolve(path);
    const pp = path_1.parse(rp);
    const gfn = {
        path: rp,
        fileName: pp.base,
        split: [],
        segments: {
            name: '',
            date: new Date(),
            type: "UNKNOWN",
            data: "UNKNOWN"
        },
        error: undefined,
    };
    try {
        const split = GeoFileName.SplitGeoFileName(pp.base);
        const segments = GeoFileName.ParseGeoFileName(split);
        gfn.split = split;
        gfn.segments = segments;
    }
    catch (error) {
        gfn.error = error;
    }
    return gfn;
};
exports.GeoFileName = GeoFileName;
exports.FILE_DATE_STR = 'YYY-MM-DD_HHmmss';
exports.fileDateStrToDate = (dateString) => {
    return parseDate(dateString, exports.FILE_DATE_STR, new Date());
};
exports.dataTypeStrToDataType = (dataStr) => {
    switch (dataStr) {
        case 'json':
            return 'JSON';
        case 'txt':
        case 'text':
            return 'TEXT';
        default:
            throw new OsmRunError_1.OsmRunError(`Unknown data file type: [${dataStr}]`, 'DirHasInconsistentFileNames');
    }
};
exports.geoFileTypeStrToGeoType = (typeString) => {
    switch (typeString) {
        case 'osm-query':
            return 'OSM_QUERY';
        case 'osm-data':
            return 'OSM_DOWNLOAD';
        case 'int':
            return 'INTERSECTIONS';
        case 'points':
            return 'POINT_MAP';
        case 'rsd':
            return 'ROAD_SEGMENTS';
        default:
            throw new OsmRunError_1.OsmRunError(`Unknown geo file type: [${typeString}]`, 'DirHasInconsistentFileNames');
    }
};
exports.geoFileTypeToStr = (type) => {
    switch (type) {
        case 'OSM_QUERY':
            return 'osm-query';
        case 'OSM_DOWNLOAD':
            return 'osm-data';
        case 'INTERSECTIONS':
            return 'int';
        case 'POINT_MAP':
            return 'points';
        case 'ROAD_SEGMENTS':
            return 'rsd';
        default:
            throw new OsmRunError_1.OsmRunError(`Unknown geo file type: [${type}]`, 'DirHasInconsistentFileNames');
    }
};
exports.dateToFileDateStr = (date) => {
    return formatDate(date, exports.FILE_DATE_STR);
};
//# sourceMappingURL=GeoFileName.js.map