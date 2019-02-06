"use strict";
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
class OsmFetchGraphFilesSet {
    constructor(runDirPath) {
        this.fetchDirPath = runDirPath;
        const x = utils_1.findParseFilenameTimestamp(runDirPath);
        this.fetchDate =
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
        osmRunFilePaths.forEach(this.setPath);
    }
}
exports.OsmFetchGraphFilesSet = OsmFetchGraphFilesSet;
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
//# sourceMappingURL=MapDataFileSet.js.map