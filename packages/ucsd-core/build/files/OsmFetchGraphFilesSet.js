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
const osm_data_1 = require("@geo-ball/osm-data");
const RoadSegmentsFile_1 = require("./RoadSegmentsFile");
const PointMapsFile_1 = require("./PointMapsFile");
const IntersectionsFile_1 = require("./IntersectionsFile");
const utils_1 = require("@geo-ball/utils");
class PathFileMap {
    constructor(path = '') {
        this.path = path;
    }
}
exports.PathFileMap = PathFileMap;
/**
 * This class manages all the files needed for the graph algorithms.
 * All these files are based upon a download from OSM. We keep all
 * related files in a single directory, with timestamps.
 * Once downloaded, we kick off different processing which generates
 * the related files.
 * This class just tracks all of the file paths.
 */
class OsmFetchGraphFilesSet {
    constructor(fetchDirPath) {
        this.fetchDirPath = fetchDirPath;
        const pft = utils_1.findParseFilenameTimestamp(fetchDirPath);
        this.fetchDate = pft ? pft.fileTimestamp : '';
        this.osm = new PathFileMap();
        this.rsd = new PathFileMap();
        this.pmf = new PathFileMap();
        this.int = new PathFileMap();
        this.unknownPaths = [];
    }
    setPath(osmSingleRunFilePath) {
        if (osm_data_1.OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.osm.path = osmSingleRunFilePath;
        }
        else if (RoadSegmentsFile_1.RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.rsd.path = osmSingleRunFilePath;
        }
        else if (PointMapsFile_1.PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.pmf.path = osmSingleRunFilePath;
        }
        else if (IntersectionsFile_1.IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.int.path = osmSingleRunFilePath;
        }
        else {
            this.unknownPaths.push(osmSingleRunFilePath);
        }
    }
    setPaths(osmRunFilePaths) {
        osmRunFilePaths.forEach(osmSingleRunFilePath => this.setPath(osmSingleRunFilePath));
    }
    setPathsFromReadDir(singleOsmFetchPath, readDirCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            return readDirCallback(singleOsmFetchPath)
                .then(this.setPaths)
                .catch(error => {
                console.error('setPathsFromReadDir ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
                throw error;
            });
        });
    }
    loadFiles(readFileCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const osmJson = yield readFileCallback(this.osm.path);
            this.osm.file = osm_data_1.OpenStreetmapFile.CreateFromFileJson(osmJson);
            const rsdJson = yield readFileCallback(this.rsd.path);
            this.rsd.file = RoadSegmentsFile_1.RoadSegmentsFile.CreateFromFileJson(rsdJson);
            const pmfJson = yield readFileCallback(this.pmf.path);
            this.pmf.file = PointMapsFile_1.PointMapsFile.CreateFromFileJson(pmfJson);
            const intJson = yield readFileCallback(this.int.path);
            this.int.file = IntersectionsFile_1.IntersectionsFile.CreateFromFileJson(intJson);
        });
    }
    static GetAllFetchDirs(rootFetchDirPath, readDirCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('');
            console.log('');
            console.log('');
            console.log('################################################################################################');
            console.log('################################################################################################');
            console.log('');
            console.log('');
            console.log('');
            console.log('* GetAllFetchDirs *');
            const osmFetchDirectories = yield readDirCallback(rootFetchDirPath);
            return Promise.all(osmFetchDirectories.map(singleOsmFetchPath => {
                console.log('* GetAllFetchDirs. IN MAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP *');
                return readDirCallback(singleOsmFetchPath)
                    .then(fetchFilePaths => {
                    console.log('* GetAllFetchDirs. CREATING  OsmFetchGraphFilesSet()*', singleOsmFetchPath);
                    console.log('* GetAllFetchDirs. CREATING  OsmFetchGraphFilesSet()*', fetchFilePaths);
                    const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
                    set.setPaths(fetchFilePaths);
                    return set;
                });
                // const fetchFilePaths = await readDirCallback(rootFetchDirPath);
                // const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
                // set.setPaths(fetchFilePaths);
                // return set;
            }));
        });
    }
}
exports.OsmFetchGraphFilesSet = OsmFetchGraphFilesSet;
// /**
//  *
//  * @param rootFetchDirPath - the root of the managed fetch dataDirectory
//  */
// const createMapDataFileSetFromPath = async (rootFetchDirPath: string): Promise<Array<OsmFetchGraphFilesSet>> => {
//     // const stat = await ipc.callRender(backgroundWindow, CHANNELS.lstat, 'package.json');
//     // console.log('createMapDataFileSetFromPath: runPath', runPath)
//     // const content = await FileStorageService.ReadDir(runPath) as Array<string>;
//     // console.log('createMapDataFileSetFromPath: content', content)
//     // console.log('createMapDataFileSetFromPath: content', content)
//     // console.log('createMapDataFileSetFromPath: content', content)
//     // console.log('createMapDataFileSetFromPath: content', content)
//     console.log('###====================================================================================###')
//     console.log('createMapDataFileSetFromPath.ReadDirWithFullPaths: runPath', rootFetchDirPath)
//     console.log('###====================================================================================###')
//     const osmFetchDirectories = await FileStorageService.ReadDirWithFullPaths(rootFetchDirPath) as Array<string>;
//     console.log('###====================================================================================###')
//     console.log('createMapDataFileSetFromPath: osmFetchDirectories', osmFetchDirectories)
//     console.log('###====================================================================================###')
//     return Promise.all(osmFetchDirectories.map(singleOsmFetchPath => {
//         return (FileStorageService.ReadDirWithFullPaths(singleOsmFetchPath) as Promise<Array<string>>)
//             .then((fetchFilePaths) => {
//                 const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
//                 set.setPaths(fetchFilePaths);
//                 return set;
//             })
//             // .then((osmRunFilePaths) => getFileTypesFromArray(singleOsmFetchPath, osmRunFilePaths))
//             .catch(error => {
//                 console.error('createMapDataFileSetFromPath ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
//                 throw error;
//             })
//     }));
// const getFileTypesFromArrayEx = (osmRunDirectoryPath: string, osmRunFilePaths: Array<string>): IMapDataFileSetEx => {
//     console.log('---------------------------------------------------------------')
//     console.log('getFileTypesFromArray: osmRunDirectoryPath', osmRunDirectoryPath)
//     console.log('getFileTypesFromArray: osmRunFilePaths', osmRunFilePaths)
//     const mdf = new MapDataFileSet(osmRunDirectoryPath);
//     osmRunFilePaths.forEach(osmSingleRunFilePath => {
//         console.log('getFileTypesFromArray.forEach: osmSingleRunFilePath', osmSingleRunFilePath)
//         if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.osm) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.osm.path = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.rsd) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.rsdPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.rsd = RoadSegmentsFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.pmf) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.pmfPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.pmf = PointMapsFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.int) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.intPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.int = IntersectionsFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else {
//             mdf.unknownPaths.push(osmSingleRunFilePath);
//         }
//     })
//     return mdf;
// }
// const getFileTypesFromArray = (osmRunDirectoryPath: string, osmRunFilePaths: Array<string>): IMapDataFileSet => {
//     console.log('---------------------------------------------------------------')
//     console.log('getFileTypesFromArray: osmRunDirectoryPath', osmRunDirectoryPath)
//     console.log('getFileTypesFromArray: osmRunFilePaths', osmRunFilePaths)
//     const mdf: IMapDataFileSet = {
//         path: osmRunDirectoryPath,
//         osm: undefined,
//         osmPath: undefined,
//         rsd: undefined,
//         rsdPath: undefined,
//         pmf: undefined,
//         pmfPath: undefined,
//         int: undefined,
//         intPath: undefined,
//         unknownPaths: [],
//     }
//     const loadFiles = false;
//     osmRunFilePaths.forEach(osmSingleRunFilePath => {
//         console.log('getFileTypesFromArray.forEach: osmSingleRunFilePath', osmSingleRunFilePath)
//         if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.osm) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.osmPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.rsd) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.rsdPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.rsd = RoadSegmentsFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.pmf) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.pmfPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.pmf = PointMapsFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             if (mdf.int) {
//                 throw new Error('Should only be one file in here');
//             }
//             mdf.intPath = osmSingleRunFilePath;
//             if (loadFiles) {
//                 mdf.int = IntersectionsFile.Load(osmSingleRunFilePath)
//             }
//         }
//         else {
//             mdf.unknownPaths.push(osmSingleRunFilePath);
//         }
//     })
//     return mdf;
// }
// export interface IMapDataFileSet {
//     path: string;
//     osmPath: string | undefined;
//     rsdPath: string | undefined;
//     pmfPath: string | undefined;
//     intPath: string | undefined;
//     osm: OpenStreetmapFile | undefined;
//     rsd: RoadSegmentsFile | undefined;
//     pmf: PointMapsFile | undefined;
//     int: IntersectionsFile | undefined;
//     unknownPaths: Array<string>;
// }
// const handleIt = (path: string, extChecker: () => boolean, ) => {
//     if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
//         if (mdf.osm) {
//             throw new Error('Should only be one file in here');
//         }
//         mdf.osmPath = osmSingleRunFilePath;
//         if (loadFiles) {
//             mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
//         }
//     }
// }
// /**
//  *
//  * @param rootFetchDirPath - the root of the managed fetch dataDirectory
//  */
// const createMapDataFileSetFromPath = async (rootFetchDirPath: string): Promise<Array<OsmFetchGraphFilesSet>> => {
//     // const stat = await ipc.callRender(backgroundWindow, CHANNELS.lstat, 'package.json');
//     // console.log('createMapDataFileSetFromPath: runPath', runPath)
//     // const content = await FileStorageService.ReadDir(runPath) as Array<string>;
//     // console.log('createMapDataFileSetFromPath: content', content)
//     // console.log('createMapDataFileSetFromPath: content', content)
//     // console.log('createMapDataFileSetFromPath: content', content)
//     // console.log('createMapDataFileSetFromPath: content', content)
//     console.log('###====================================================================================###')
//     console.log('createMapDataFileSetFromPath.ReadDirWithFullPaths: runPath', rootFetchDirPath)
//     console.log('###====================================================================================###')
//     const osmFetchDirectories = await FileStorageService.ReadDirWithFullPaths(rootFetchDirPath) as Array<string>;
//     console.log('###====================================================================================###')
//     console.log('createMapDataFileSetFromPath: osmFetchDirectories', osmFetchDirectories)
//     console.log('###====================================================================================###')
//     return Promise.all(osmFetchDirectories.map(singleOsmFetchPath => {
//         return (FileStorageService.ReadDirWithFullPaths(singleOsmFetchPath) as Promise<Array<string>>)
//             .then((fetchFilePaths) => {
//                 const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
//                 set.setPaths(fetchFilePaths);
//                 return set;
//             })
//             // .then((osmRunFilePaths) => getFileTypesFromArray(singleOsmFetchPath, osmRunFilePaths))
//             .catch(error => {
//                 console.error('createMapDataFileSetFromPath ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
//                 throw error;
//             })
//     }));
// }
//# sourceMappingURL=OsmFetchGraphFilesSet.js.map