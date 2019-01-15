"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
class PathExistence {
    constructor(path) {
        this.name = path_1.basename(path);
        this.path = path;
        this.exists = fs_1.existsSync(path);
    }
}
exports.PathExistence = PathExistence;
// export interface IOsmRsFiles {
//     osmFilePath: string;
//     rsdJsonFilePath: string;
//     rsdTextFilePath: string;
// }
class UcsdDataFiles {
    constructor(mapDataRoot) {
        this.osmDir = 'osm';
        this.osmDataDir = 'data';
        this.osmQueryDir = 'query';
        this.rsdDir = 'rsd';
        this.intDir = 'int';
        this.osmJsonExt = 'osm-data.json';
        this.rsdJsonExt = 'rsd.json';
        this.rsdTextExt = 'rsd.txt';
        this.pointsJsonExt = 'points.json';
        this.intJsonExt = 'int.json';
        this.intTextExt = 'int.txt';
        if (!mapDataRoot) {
            const defaultRelDataDir = '../../map-data';
            console.log(`No dataDir passed in. USING CWD ${defaultRelDataDir}`);
            mapDataRoot = path_1.resolve(path_1.join(process.cwd(), defaultRelDataDir));
            console.log(`No dataDir passed in. Resolving to ${mapDataRoot}`);
        }
        this.mapDataRoot = path_1.resolve(mapDataRoot);
        this.ensurePathSync(this.osmPath);
        this.ensurePathSync(this.rsdPath);
        this.ensurePathSync(this.intPath);
    }
    get osmPath() {
        return path_1.join(this.mapDataRoot, this.osmDir);
    }
    get rsdPath() {
        return path_1.join(this.mapDataRoot, this.rsdDir);
    }
    get intPath() {
        return path_1.join(this.mapDataRoot, this.intDir);
    }
    ensurePathSync(path) {
        if (!fs_1.existsSync(path)) {
            // throw new Error(`Path ${path} does not exist`);
            fs_1.mkdirSync(path, { recursive: true });
        }
    }
    getOpenStreetMapDataFiles() {
        return fs_1.readdirSync(this.osmPath)
            .filter(f => f.endsWith(`.${this.osmJsonExt}`))
            .map(f => path_1.join(this.osmPath, f));
    }
    getRoadSegmentDataJsonFiles() {
        return fs_1.readdirSync(this.rsdPath)
            .filter(f => f.endsWith(`.${this.rsdJsonExt}`))
            .map(f => path_1.join(this.rsdPath, f));
    }
    getRsdPathFromOsmPath(osmPath, text = false) {
        const ext = text ? this.rsdTextExt : this.rsdJsonExt;
        return path_1.join(this.rsdPath, path_1.basename(osmPath).replace(this.osmJsonExt, ext));
    }
    getOsmPathFromRsdJsonPath(rsdPath) {
        return path_1.join(this.osmPath, path_1.basename(rsdPath).replace(this.rsdJsonExt, this.osmJsonExt));
    }
    getIntPathFromOsmPath(osmPath, text = false) {
        const ext = text ? this.intTextExt : this.intJsonExt;
        return path_1.join(this.intPath, path_1.basename(osmPath).replace(this.osmJsonExt, ext));
    }
    getPointsPathFromOsmPath(osmPath) {
        return path_1.join(this.intPath, path_1.basename(osmPath).replace(this.osmJsonExt, this.pointsJsonExt));
    }
    getOsmAndRsdMapping(osmFilePath) {
        return {
            osmFilePath: new PathExistence(osmFilePath),
            rsdJsonFilePath: new PathExistence(this.getRsdPathFromOsmPath(osmFilePath, false)),
            rsdTextFilePath: new PathExistence(this.getRsdPathFromOsmPath(osmFilePath, true)),
            intJsonFilePath: new PathExistence(this.getIntPathFromOsmPath(osmFilePath, false)),
            intTextFilePath: new PathExistence(this.getIntPathFromOsmPath(osmFilePath, true)),
            pointsJsonFilePath: new PathExistence(this.getPointsPathFromOsmPath(osmFilePath)),
        };
    }
    getOsmBasedFilePaths(osmFile) {
        const files = this.getOpenStreetMapDataFiles()
            .map(f => this.getOsmAndRsdMapping(f));
        if (osmFile) {
            return files.filter(f => f.osmFilePath.name === osmFile);
        }
        return files;
    }
}
exports.UcsdDataFiles = UcsdDataFiles;
//# sourceMappingURL=UcsdDataFiles.js.map