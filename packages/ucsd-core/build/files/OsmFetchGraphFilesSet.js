"use strict";
// import { OpenStreetmapFile } from '@geo-ball/osm-data';
// import { RoadSegmentsFile } from './RoadSegmentsFile';
// import { PointMapsFile } from './PointMapsFile';
// import { IntersectionsFile } from './IntersectionsFile';
// import { LocalDateTime } from '@geo-ball/utils';
// export type ReadDirCallback = (path: string) => Promise<Array<string>>
// export type ReadFileCallback = (path: string) => Promise<any>
// export interface IOsmFetchGraphFilesSet {
//     fetchDirPath: string;
//     fetchDate: string;
//     osm: IOsmFetchFile<OpenStreetmapFile>;
//     rsd: IOsmFetchFile<RoadSegmentsFile>;
//     pmf: IOsmFetchFile<PointMapsFile>;
//     int: IOsmFetchFile<IntersectionsFile>;
//     unknownPaths: Array<string>;
//     setPath(osmSingleRunFilePath: string): void;
//     setPaths(osmRunFilePaths: Array<string>): void;
// }
// /**
//  * This class manages all the files needed for the graph algorithms.
//  * All these files are based upon a download from OSM. We keep all
//  * related files in a single directory, with timestamps.
//  * Once downloaded, we kick off different processing which generates
//  * the related files.
//  * This class just tracks all of the file paths.
//  */
// export class OsmFetchGraphFilesSet implements IOsmFetchGraphFilesSet {
//     fetchDirPath: string;
//     fetchDate: string;
//     osm: IOsmFetchFile<OpenStreetmapFile>;
//     rsd: IOsmFetchFile<RoadSegmentsFile>;
//     pmf: IOsmFetchFile<PointMapsFile>;
//     int: IOsmFetchFile<IntersectionsFile>;
//     unknownPaths: string[];
//     constructor(fetchDirPath: string) {
//         this.fetchDirPath = fetchDirPath;
//         const pft = LocalDateTime.ParseFilenameFormatWithRegex(fetchDirPath);
//         this.fetchDate = pft ? pft.fileTimestamp : '';
//         this.osm = new OsmFetchFile(OpenStreetmapFile.Load);
//         this.rsd = new OsmFetchFile();
//         this.pmf = new OsmFetchFile();
//         this.int = new OsmFetchFile();
//         this.unknownPaths = [];
//     }
//     setPath(osmSingleRunFilePath: string): void {
//         if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             this.osm.path = osmSingleRunFilePath;
//         }
//         else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             this.rsd.path = osmSingleRunFilePath;
//         }
//         else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             this.pmf.path = osmSingleRunFilePath;
//         }
//         else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
//             this.int.path = osmSingleRunFilePath;
//         }
//         else {
//             this.unknownPaths.push(osmSingleRunFilePath);
//         }
//     }
//     setPaths(osmRunFilePaths: Array<string>): void {
//         osmRunFilePaths.forEach(osmSingleRunFilePath => this.setPath(osmSingleRunFilePath));
//     }
//     async setPathsFromReadDir(singleOsmFetchPath: string, readDirCallback: ReadDirCallback): Promise<void> {
//         return (readDirCallback(singleOsmFetchPath) as Promise<Array<string>>)
//             .then(this.setPaths)
//             .catch(error => {
//                 console.error('setPathsFromReadDir ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
//                 throw error;
//             })
//     }
//     async loadFiles(readFileCallback: ReadFileCallback): Promise<void> {
//         const osmJson = await readFileCallback(this.osm.path);
//         this.osm.file = OpenStreetmapFile.CreateFromFileJson(osmJson);
//         const rsdJson = await readFileCallback(this.rsd.path);
//         this.rsd.file = RoadSegmentsFile.CreateFromFileJson(rsdJson);
//         const pmfJson = await readFileCallback(this.pmf.path);
//         this.pmf.file = PointMapsFile.CreateFromFileJson(pmfJson);
//         const intJson = await readFileCallback(this.int.path);
//         this.int.file = IntersectionsFile.CreateFromFileJson(intJson);
//     }
//     static async GetAllFetchDirs(rootFetchDirPath: string, readDirCallback: ReadDirCallback): Promise<Array<OsmFetchGraphFilesSet>> {
//         console.log('')
//         console.log('')
//         console.log('')
//         console.log('################################################################################################')
//         console.log('################################################################################################')
//         console.log('')
//         console.log('')
//         console.log('')
//         console.log('* GetAllFetchDirs *')
//         const osmFetchDirectories = await readDirCallback(rootFetchDirPath);
//         return Promise.all(osmFetchDirectories.map(singleOsmFetchPath => {
//             console.log('* GetAllFetchDirs. IN MAPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP *')
//             return readDirCallback(singleOsmFetchPath)
//                 .then(fetchFilePaths => {
//                     console.log('* GetAllFetchDirs. CREATING  OsmFetchGraphFilesSet()*', singleOsmFetchPath)
//                     console.log('* GetAllFetchDirs. CREATING  OsmFetchGraphFilesSet()*', fetchFilePaths)
//                     const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
//                     set.setPaths(fetchFilePaths);
//                     return set;
//                 })
//             // const fetchFilePaths = await readDirCallback(rootFetchDirPath);
//             // const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
//             // set.setPaths(fetchFilePaths);
//             // return set;
//         }));
//     }
// }
//     // /**
//     //  *
//     //  * @param rootFetchDirPath - the root of the managed fetch dataDirectory
//     //  */
//     // const createMapDataFileSetFromPath = async (rootFetchDirPath: string): Promise<Array<OsmFetchGraphFilesSet>> => {
//     //     // const stat = await ipc.callRender(backgroundWindow, CHANNELS.lstat, 'package.json');
//     //     // console.log('createMapDataFileSetFromPath: runPath', runPath)
//     //     // const content = await FileStorageService.ReadDir(runPath) as Array<string>;
//     //     // console.log('createMapDataFileSetFromPath: content', content)
//     //     // console.log('createMapDataFileSetFromPath: content', content)
//     //     // console.log('createMapDataFileSetFromPath: content', content)
//     //     // console.log('createMapDataFileSetFromPath: content', content)
//     //     console.log('###====================================================================================###')
//     //     console.log('createMapDataFileSetFromPath.ReadDirWithFullPaths: runPath', rootFetchDirPath)
//     //     console.log('###====================================================================================###')
//     //     const osmFetchDirectories = await FileStorageService.ReadDirWithFullPaths(rootFetchDirPath) as Array<string>;
//     //     console.log('###====================================================================================###')
//     //     console.log('createMapDataFileSetFromPath: osmFetchDirectories', osmFetchDirectories)
//     //     console.log('###====================================================================================###')
//     //     return Promise.all(osmFetchDirectories.map(singleOsmFetchPath => {
//     //         return (FileStorageService.ReadDirWithFullPaths(singleOsmFetchPath) as Promise<Array<string>>)
//     //             .then((fetchFilePaths) => {
//     //                 const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
//     //                 set.setPaths(fetchFilePaths);
//     //                 return set;
//     //             })
//     //             // .then((osmRunFilePaths) => getFileTypesFromArray(singleOsmFetchPath, osmRunFilePaths))
//     //             .catch(error => {
//     //                 console.error('createMapDataFileSetFromPath ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
//     //                 throw error;
//     //             })
// //     }));
// // const getFileTypesFromArrayEx = (osmRunDirectoryPath: string, osmRunFilePaths: Array<string>): IMapDataFileSetEx => {
// //     console.log('---------------------------------------------------------------')
// //     console.log('getFileTypesFromArray: osmRunDirectoryPath', osmRunDirectoryPath)
// //     console.log('getFileTypesFromArray: osmRunFilePaths', osmRunFilePaths)
// //     const mdf = new MapDataFileSet(osmRunDirectoryPath);
// //     osmRunFilePaths.forEach(osmSingleRunFilePath => {
// //         console.log('getFileTypesFromArray.forEach: osmSingleRunFilePath', osmSingleRunFilePath)
// //         if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.osm) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.osm.path = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.rsd) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.rsdPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.rsd = RoadSegmentsFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.pmf) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.pmfPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.pmf = PointMapsFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.int) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.intPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.int = IntersectionsFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else {
// //             mdf.unknownPaths.push(osmSingleRunFilePath);
// //         }
// //     })
// //     return mdf;
// // }
// // const getFileTypesFromArray = (osmRunDirectoryPath: string, osmRunFilePaths: Array<string>): IMapDataFileSet => {
// //     console.log('---------------------------------------------------------------')
// //     console.log('getFileTypesFromArray: osmRunDirectoryPath', osmRunDirectoryPath)
// //     console.log('getFileTypesFromArray: osmRunFilePaths', osmRunFilePaths)
// //     const mdf: IMapDataFileSet = {
// //         path: osmRunDirectoryPath,
// //         osm: undefined,
// //         osmPath: undefined,
// //         rsd: undefined,
// //         rsdPath: undefined,
// //         pmf: undefined,
// //         pmfPath: undefined,
// //         int: undefined,
// //         intPath: undefined,
// //         unknownPaths: [],
// //     }
// //     const loadFiles = false;
// //     osmRunFilePaths.forEach(osmSingleRunFilePath => {
// //         console.log('getFileTypesFromArray.forEach: osmSingleRunFilePath', osmSingleRunFilePath)
// //         if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.osm) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.osmPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else if (RoadSegmentsFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.rsd) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.rsdPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.rsd = RoadSegmentsFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else if (PointMapsFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.pmf) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.pmfPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.pmf = PointMapsFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else if (IntersectionsFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //             if (mdf.int) {
// //                 throw new Error('Should only be one file in here');
// //             }
// //             mdf.intPath = osmSingleRunFilePath;
// //             if (loadFiles) {
// //                 mdf.int = IntersectionsFile.Load(osmSingleRunFilePath)
// //             }
// //         }
// //         else {
// //             mdf.unknownPaths.push(osmSingleRunFilePath);
// //         }
// //     })
// //     return mdf;
// // }
// // export interface IMapDataFileSet {
// //     path: string;
// //     osmPath: string | undefined;
// //     rsdPath: string | undefined;
// //     pmfPath: string | undefined;
// //     intPath: string | undefined;
// //     osm: OpenStreetmapFile | undefined;
// //     rsd: RoadSegmentsFile | undefined;
// //     pmf: PointMapsFile | undefined;
// //     int: IntersectionsFile | undefined;
// //     unknownPaths: Array<string>;
// // }
// // const handleIt = (path: string, extChecker: () => boolean, ) => {
// //     if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
// //         if (mdf.osm) {
// //             throw new Error('Should only be one file in here');
// //         }
// //         mdf.osmPath = osmSingleRunFilePath;
// //         if (loadFiles) {
// //             mdf.osm = OpenStreetmapFile.Load(osmSingleRunFilePath)
// //         }
// //     }
// // }
// // /**
// //  *
// //  * @param rootFetchDirPath - the root of the managed fetch dataDirectory
// //  */
// // const createMapDataFileSetFromPath = async (rootFetchDirPath: string): Promise<Array<OsmFetchGraphFilesSet>> => {
// //     // const stat = await ipc.callRender(backgroundWindow, CHANNELS.lstat, 'package.json');
// //     // console.log('createMapDataFileSetFromPath: runPath', runPath)
// //     // const content = await FileStorageService.ReadDir(runPath) as Array<string>;
// //     // console.log('createMapDataFileSetFromPath: content', content)
// //     // console.log('createMapDataFileSetFromPath: content', content)
// //     // console.log('createMapDataFileSetFromPath: content', content)
// //     // console.log('createMapDataFileSetFromPath: content', content)
// //     console.log('###====================================================================================###')
// //     console.log('createMapDataFileSetFromPath.ReadDirWithFullPaths: runPath', rootFetchDirPath)
// //     console.log('###====================================================================================###')
// //     const osmFetchDirectories = await FileStorageService.ReadDirWithFullPaths(rootFetchDirPath) as Array<string>;
// //     console.log('###====================================================================================###')
// //     console.log('createMapDataFileSetFromPath: osmFetchDirectories', osmFetchDirectories)
// //     console.log('###====================================================================================###')
// //     return Promise.all(osmFetchDirectories.map(singleOsmFetchPath => {
// //         return (FileStorageService.ReadDirWithFullPaths(singleOsmFetchPath) as Promise<Array<string>>)
// //             .then((fetchFilePaths) => {
// //                 const set = new OsmFetchGraphFilesSet(singleOsmFetchPath);
// //                 set.setPaths(fetchFilePaths);
// //                 return set;
// //             })
// //             // .then((osmRunFilePaths) => getFileTypesFromArray(singleOsmFetchPath, osmRunFilePaths))
// //             .catch(error => {
// //                 console.error('createMapDataFileSetFromPath ReadDirWithFullPaths/getFileTypesFromArray ERROR:', error);
// //                 throw error;
// //             })
// //     }));
// // }
//# sourceMappingURL=OsmFetchGraphFilesSet.js.map