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
const OsmFetchDir_1 = require("./OsmFetchDir");
class OsmFetchManager {
    constructor(fetchRootPath) {
        this.fetchRootPath = path_1.resolve(fetchRootPath);
        this.osmFetchDirs = [];
    }
    createFetchDir(ldt) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchDirPath = path_1.join(this.fetchRootPath, ldt.filename);
            if (yield !utils_1.exists(fetchDirPath)) {
                yield utils_1.mkdir(fetchDirPath, { recursive: true });
            }
            const fd = new OsmFetchDir_1.OsmFetchDir(fetchDirPath);
            yield fd.load();
            this.osmFetchDirs.push(fd);
            this.osmFetchDirs.sort();
        });
    }
    getOsmFetchDirs() {
        return __awaiter(this, void 0, void 0, function* () {
            return utils_1.readdir(this.fetchRootPath)
                .then(fetchDirs => fetchDirs.map(fetchDir => new OsmFetchDir_1.OsmFetchDir(path_1.join(this.fetchRootPath, fetchDir))));
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getOsmFetchDirs()
                .then(dirs => this.osmFetchDirs = dirs)
                .then(dirs => {
                return Promise.all(dirs.map(dir => dir.load()))
                    .then(() => this.dump())
                    .then(() => dirs);
            });
        });
    }
    dump() {
        const d = JSON.stringify(this, undefined, 4);
        console.log('DUMP:');
        console.log(d);
        return d;
    }
}
exports.OsmFetchManager = OsmFetchManager;
//# sourceMappingURL=OsmFetchManager.js.map