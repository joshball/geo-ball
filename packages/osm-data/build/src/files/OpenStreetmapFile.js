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
const fs_1 = require("fs");
const utils_1 = require("@geo-ball/utils");
const OpenStreetMapElements_1 = require("../data/OpenStreetMapElements");
const OpenStreetmapFileMetaData_1 = require("./OpenStreetmapFileMetaData");
class OpenStreetmapFile {
    constructor(osmMetaData, osmQueryResp) {
        this.osmMetaData = new OpenStreetmapFileMetaData_1.OpenStreetmapFileMetaData(osmMetaData);
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
        return __awaiter(this, void 0, void 0, function* () {
            console.log('OpenStreetmapFile.Load', filePath);
            return utils_1.readFile(filePath, 'utf8')
                .then(file => OpenStreetmapFile.CreateFromFileJson(file));
        });
    }
    static LoadSync(filePath) {
        console.log('OpenStreetmapFile.LoadSync', filePath);
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
        const ts = date ? '.' + utils_1.LocalDateTime.FromDate(date).filename : '';
        return `${utils_1.fileNamify(fileQueryName, { replacement: '_' })}${ts}.${OpenStreetmapFile.Extension}`;
    }
    static ParseOpenStreetmapFileName(filePath) {
        return utils_1.LocalDateTime.ParseFilenameFormatWithRegex(filePath);
    }
}
OpenStreetmapFile.Extension = 'osm-data.json';
exports.OpenStreetmapFile = OpenStreetmapFile;
//# sourceMappingURL=OpenStreetmapFile.js.map