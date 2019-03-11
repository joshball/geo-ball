import { join, resolve, basename } from 'path';
import { mkdirSync, readdirSync, existsSync, promises, constants } from 'fs';

export interface IPathExistence {
    name: string;
    path: string;
    exists: boolean;
}
export class PathExistence implements IPathExistence {
    name: string;
    path: string;
    exists: boolean;
    constructor(path: string) {
        this.name = basename(path);
        this.path = path;
        this.exists = existsSync(path);
    }
}
export interface IOsmBasedFilePaths {
    osmFilePath: IPathExistence;
    rsdJsonFilePath: IPathExistence;
    rsdTextFilePath: IPathExistence;
    intJsonFilePath: IPathExistence;
    intTextFilePath: IPathExistence;
    pointsJsonFilePath: IPathExistence;
}

// export interface IOsmRsFiles {
//     osmFilePath: string;
//     rsdJsonFilePath: string;
//     rsdTextFilePath: string;
// }

export class UcsdDataFiles {
    mapDataRoot: string;
    osmDir: string = 'osm';

    osmJsonExt: string = 'osm-data.json';

    rsdJsonExt: string = 'rsd.json';
    rsdTextExt: string = 'rsd.txt';

    pointsJsonExt: string = 'points.json';

    intJsonExt: string = 'int.json';
    intTextExt: string = 'int.txt';

    get osmPath(): string {
        return join(this.mapDataRoot, this.osmDir);
    }

    constructor(mapDataRoot?: string | undefined) {
        if (!mapDataRoot) {
            const defaultRelDataDir = '../../map-data';
            console.log(`No dataDir passed in. USING CWD ${defaultRelDataDir}`);
            mapDataRoot = resolve(join(process.cwd(), defaultRelDataDir));
            console.log(`No dataDir passed in. Resolving to ${mapDataRoot}`);
        }
        this.mapDataRoot = resolve(mapDataRoot);
        console.log(`UcsdDataFiles.mapDataRoot ${this.mapDataRoot}`);
        UcsdDataFiles.EnsurePathSync(this.osmPath);
    }

    static EnsurePathSync(path: string) {
        if (!existsSync(path)) {
            // throw new Error(`Path ${path} does not exist`);
            try {
                console.log(`UcsdDataFiles.EnsurePathSync() about to mkdirSync ${path}`);
                mkdirSync(path, { recursive: true });
            } catch (e) {
                console.error(`UcsdDataFiles.EnsurePathSync() about to mkdirSync ${path}`, e);
            }
        }
    }

    static async EnsurePath(path: string) {
        return promises
            .access(path, constants.F_OK | constants.W_OK)
            .then(() => path)
            .catch(() => promises.mkdir(path, { recursive: true }))
            .then(() => path);
    }

    getOpenStreetMapDataFiles() {
        return readdirSync(this.osmPath)
            .filter(f => f.endsWith(`.${this.osmJsonExt}`))
            .map(f => join(this.osmPath, f));
    }

    getRoadSegmentDataJsonFiles() {
        return readdirSync(this.osmPath)
            .filter(f => f.endsWith(`.${this.rsdJsonExt}`))
            .map(f => join(this.osmPath, f));
    }

    getRsdPathFromOsmPath(osmPath: string, text: boolean = false): string {
        const ext = text ? this.rsdTextExt : this.rsdJsonExt;
        return join(this.osmPath, basename(osmPath).replace(this.osmJsonExt, ext));
    }

    getOsmPathFromRsdJsonPath(rsdPath: string): string {
        return join(this.osmPath, basename(rsdPath).replace(this.rsdJsonExt, this.osmJsonExt));
    }

    getIntPathFromOsmPath(osmPath: string, text: boolean = false): string {
        const ext = text ? this.intTextExt : this.intJsonExt;
        return join(this.osmPath, basename(osmPath).replace(this.osmJsonExt, ext));
    }

    getPointsPathFromOsmPath(osmPath: string): string {
        return join(this.osmPath, basename(osmPath).replace(this.osmJsonExt, this.pointsJsonExt));
    }

    getOsmAndRsdMapping(osmFilePath: string): IOsmBasedFilePaths {
        return {
            osmFilePath: new PathExistence(osmFilePath),
            rsdJsonFilePath: new PathExistence(this.getRsdPathFromOsmPath(osmFilePath, false)),
            rsdTextFilePath: new PathExistence(this.getRsdPathFromOsmPath(osmFilePath, true)),
            intJsonFilePath: new PathExistence(this.getIntPathFromOsmPath(osmFilePath, false)),
            intTextFilePath: new PathExistence(this.getIntPathFromOsmPath(osmFilePath, true)),
            pointsJsonFilePath: new PathExistence(this.getPointsPathFromOsmPath(osmFilePath)),
        };
    }

    getOsmBasedFilePaths(osmFile?: string | undefined): Array<IOsmBasedFilePaths> {
        const files = this.getOpenStreetMapDataFiles().map(f => this.getOsmAndRsdMapping(f));
        if (osmFile) {
            return files.filter(f => f.osmFilePath.name === osmFile);
        }
        return files;
    }
}

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
