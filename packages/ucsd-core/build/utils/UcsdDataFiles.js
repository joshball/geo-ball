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
        console.log(`UcsdDataFiles.mapDataRoot ${this.mapDataRoot}`);
        UcsdDataFiles.EnsurePathSync(this.osmPath);
    }
    get osmPath() {
        return path_1.join(this.mapDataRoot, this.osmDir);
    }
    static EnsurePathSync(path) {
        if (!fs_1.existsSync(path)) {
            // throw new Error(`Path ${path} does not exist`);
            try {
                console.log(`UcsdDataFiles.EnsurePathSync() about to mkdirSync ${path}`);
                fs_1.mkdirSync(path, { recursive: true });
            }
            catch (e) {
                console.error(`UcsdDataFiles.EnsurePathSync() about to mkdirSync ${path}`, e);
            }
        }
    }
    static EnsurePath(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return fs_1.promises.access(path, fs_1.constants.F_OK | fs_1.constants.W_OK)
                .then(() => path)
                .catch(() => fs_1.promises.mkdir(path, { recursive: true }))
                .then(() => path);
        });
    }
    getOpenStreetMapDataFiles() {
        return fs_1.readdirSync(this.osmPath)
            .filter(f => f.endsWith(`.${this.osmJsonExt}`))
            .map(f => path_1.join(this.osmPath, f));
    }
    getRoadSegmentDataJsonFiles() {
        return fs_1.readdirSync(this.osmPath)
            .filter(f => f.endsWith(`.${this.rsdJsonExt}`))
            .map(f => path_1.join(this.osmPath, f));
    }
    getRsdPathFromOsmPath(osmPath, text = false) {
        const ext = text ? this.rsdTextExt : this.rsdJsonExt;
        return path_1.join(this.osmPath, path_1.basename(osmPath).replace(this.osmJsonExt, ext));
    }
    getOsmPathFromRsdJsonPath(rsdPath) {
        return path_1.join(this.osmPath, path_1.basename(rsdPath).replace(this.rsdJsonExt, this.osmJsonExt));
    }
    getIntPathFromOsmPath(osmPath, text = false) {
        const ext = text ? this.intTextExt : this.intJsonExt;
        return path_1.join(this.osmPath, path_1.basename(osmPath).replace(this.osmJsonExt, ext));
    }
    getPointsPathFromOsmPath(osmPath) {
        return path_1.join(this.osmPath, path_1.basename(osmPath).replace(this.osmJsonExt, this.pointsJsonExt));
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
// export class UcsdDataFiles {
//     mapDataRoot: string;
//     osmDir: string = 'osm';
//     osmDataDir: string = 'data';
//     osmQueryDir: string = 'query';
//     rsdDir: string = 'rsd';
//     intDir: string = 'int';
//     osmJsonExt: string = 'osm-data.json';
//     rsdJsonExt: string = 'rsd.json';
//     rsdTextExt: string = 'rsd.txt';
//     pointsJsonExt: string = 'points.json';
//     intJsonExt: string = 'int.json';
//     intTextExt: string = 'int.txt';
//     get osmPath(): string {
//         return join(this.mapDataRoot, this.osmDir);
//     }
//     get rsdPath(): string {
//         return join(this.mapDataRoot, this.rsdDir);
//     }
//     get intPath(): string {
//         return join(this.mapDataRoot, this.intDir);
//     }
//     constructor(mapDataRoot?: string | undefined) {
//         if (!mapDataRoot) {
//             const defaultRelDataDir = '../../map-data';
//             console.log(`No dataDir passed in. USING CWD ${defaultRelDataDir}`);
//             mapDataRoot = resolve(join(process.cwd(), defaultRelDataDir));
//             console.log(`No dataDir passed in. Resolving to ${mapDataRoot}`);
//         }
//         this.mapDataRoot = resolve(mapDataRoot);
//         this.ensurePathSync(this.osmPath);
//         this.ensurePathSync(this.rsdPath);
//         this.ensurePathSync(this.intPath);
//     }
//     ensurePathSync(path: string) {
//         if (!existsSync(path)) {
//             // throw new Error(`Path ${path} does not exist`);
//             mkdirSync(path, { recursive: true });
//         }
//     }
//     getOpenStreetMapDataFiles() {
//         return readdirSync(this.osmPath)
//             .filter(f => f.endsWith(`.${this.osmJsonExt}`))
//             .map(f => join(this.osmPath, f));
//     }
//     getRoadSegmentDataJsonFiles() {
//         return readdirSync(this.rsdPath)
//             .filter(f => f.endsWith(`.${this.rsdJsonExt}`))
//             .map(f => join(this.rsdPath, f));
//     }
//     getRsdPathFromOsmPath(osmPath: string, text: boolean = false): string {
//         const ext = text ? this.rsdTextExt : this.rsdJsonExt;
//         return join(this.rsdPath, basename(osmPath).replace(this.osmJsonExt, ext));
//     }
//     getOsmPathFromRsdJsonPath(rsdPath: string): string {
//         return join(this.osmPath, basename(rsdPath).replace(this.rsdJsonExt, this.osmJsonExt));
//     }
//     getIntPathFromOsmPath(osmPath: string, text: boolean = false): string {
//         const ext = text ? this.intTextExt : this.intJsonExt;
//         return join(this.intPath, basename(osmPath).replace(this.osmJsonExt, ext));
//     }
//     getPointsPathFromOsmPath(osmPath: string): string {
//         return join(this.intPath, basename(osmPath).replace(this.osmJsonExt, this.pointsJsonExt));
//     }
//     getOsmAndRsdMapping(osmFilePath: string): IOsmBasedFilePaths {
//         return {
//             osmFilePath: new PathExistence(osmFilePath),
//             rsdJsonFilePath: new PathExistence(this.getRsdPathFromOsmPath(osmFilePath, false)),
//             rsdTextFilePath: new PathExistence(this.getRsdPathFromOsmPath(osmFilePath, true)),
//             intJsonFilePath: new PathExistence(this.getIntPathFromOsmPath(osmFilePath, false)),
//             intTextFilePath: new PathExistence(this.getIntPathFromOsmPath(osmFilePath, true)),
//             pointsJsonFilePath: new PathExistence(this.getPointsPathFromOsmPath(osmFilePath)),
//         };
//     }
//     getOsmBasedFilePaths(osmFile?: string | undefined): Array<IOsmBasedFilePaths> {
//         const files = this.getOpenStreetMapDataFiles()
//             .map(f => this.getOsmAndRsdMapping(f));
//         if (osmFile) {
//             return files.filter(f => f.osmFilePath.name === osmFile);
//         }
//         return files;
//     }
// }
//# sourceMappingURL=UcsdDataFiles.js.map