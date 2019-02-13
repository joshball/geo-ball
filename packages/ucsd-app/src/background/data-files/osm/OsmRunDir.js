"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fsp_1 = require("../utils/fsp");
const OsmRunError_1 = require("./OsmRunError");
const parse_1 = __importDefault(require("date-fns/parse"));
const OsmRunFile_1 = require("./OsmRunFile");
exports.createOsmRun = (osmRunDirPath, dirName) => __awaiter(this, void 0, void 0, function* () {
    const fullPath = path_1.resolve(path_1.join(osmRunDirPath, dirName));
    const rds = {
        name: dirName,
        path: fullPath,
        state: 'Valid',
        date: parseRunDir(dirName),
        dirValid: true,
        filesValid: true,
        error: undefined,
        runFiles: undefined,
    };
    const stats = yield fsp_1.lstat(fullPath);
    if (!stats.isDirectory()) {
        rds.state = 'Invalid';
        rds.dirValid = false;
        rds.error = 'PathWasFileNotDir';
        return rds;
    }
    rds.runFiles = yield OsmRunFile_1.OsmRunFiles.GetOsmRunFiles(fullPath);
    return rds;
});
const parseRunDir = (dirName) => {
    // YYYY-MM-DD_HHMMSS
    if (dirName.length !== 17) {
        throw new OsmRunError_1.OsmRunError('dirName.length != 17', 'DirImproperlyNamed');
    }
    const date = parse_1.default(dirName, 'YYY-MM-DD_HHmmss', new Date());
    if (!date) {
        throw new OsmRunError_1.OsmRunError('dirName is not properly formatted date', 'DirImproperlyNamed');
    }
    return date;
};
//# sourceMappingURL=OsmRunDir.js.map