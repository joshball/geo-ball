"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const utils_1 = require("@geo-ball/utils");
const util_1 = require("util");
const fs = __importStar(require("fs"));
exports.readdir = util_1.promisify(fs.readdir);
exports.lstat = util_1.promisify(fs.lstat);
exports.access = util_1.promisify(fs.access);
exports.mkdir = util_1.promisify(fs.mkdir);
class OsmFetchManager {
    constructor(fetchRootPath) {
        this.fetchRootPath = path_1.resolve(fetchRootPath);
        this.runs = this.getRuns();
    }
    createFetch(ldt) {
        console.log(ldt);
    }
}
exports.OsmFetchManager = OsmFetchManager;
class OsmFetchDir {
    constructor(fetchDirPath) {
        this.dirPath = path_1.resolve(fetchDirPath);
        this.dirName = path_1.basename(this.dirPath);
        this.rootPath = path_1.dirname(this.dirPath);
    }
    get localDateTime() {
        return utils_1.LocalDateTime.ParseFilenameFormat(this.dirName);
    }
    get ParsedFilenameTimestamp() {
        return utils_1.LocalDateTime.ParseFilenameFormat(this.dirName);
    }
    createFetch(path) {
        utils_1.LocalDateTime;
    }
    static CreateFetchDirPath(fetchRootPath, ldt) {
        fetchRootPath = path_1.resolve(fetchRootPath);
        return path_1.join(fetchRootPath, ldt.toFilenameTimestamp());
    }
}
exports.OsmFetchDir = OsmFetchDir;
//# sourceMappingURL=OsmFetchManager.js.map