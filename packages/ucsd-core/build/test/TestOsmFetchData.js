"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const upath_1 = require("upath");
const os_1 = require("os");
const utils_1 = require("@geo-ball/utils");
const CONSTANTS = {
    usersHomePath: os_1.homedir(),
    ucsdDataDir: `.ucsd`,
    osmFetchDir: `osm-fetches`,
};
const PATHS = {
    ucsdDataPath: upath_1.normalize(`${CONSTANTS.usersHomePath}/${CONSTANTS.ucsdDataDir}`),
    osmFetchPath: upath_1.normalize(`${CONSTANTS.usersHomePath}/${CONSTANTS.ucsdDataDir}/${CONSTANTS.osmFetchDir}`),
};
const createExtraFile = (fetchDirPath, filename) => {
    return upath_1.normalize(`${fetchDirPath}/${filename}`);
};
const createExtraFiles = (fetchDirPath, fileNames = []) => {
    return fileNames.map(filename => createExtraFile(fetchDirPath, filename));
};
const removeStandardFiles = (standardFiles, standardFileTypes = []) => {
    // standardFileTypes.forEach((sft: string) => console.log('deleting standardFiles[sft]: ', sft, standardFiles[sft]))
    // standardFileTypes.forEach((sft: string) => delete standardFiles[sft]);
    standardFileTypes.forEach((sft) => standardFiles[sft] = { path: null, file: null });
};
const createFileNode = (fetchDirPath, fileDateStr, extension) => {
    return {
        "path": upath_1.normalize(`${fetchDirPath}/${fileDateStr}.${extension}`),
        "file": undefined
    };
};
const createStandardFiles = (fetchDirPath, fileDateStr) => {
    return {
        qry: createFileNode(fetchDirPath, fileDateStr, 'osm-qry.json'),
        osm: createFileNode(fetchDirPath, fileDateStr, 'osm-data.json'),
        int: createFileNode(fetchDirPath, fileDateStr, 'ucsd-int.json'),
        pmf: createFileNode(fetchDirPath, fileDateStr, 'ucsd-pmf.json'),
        rsd: createFileNode(fetchDirPath, fileDateStr, 'ucsd-rsd.json'),
    };
};
const getStandardFilesAsArray = (standardFiles) => {
    // console.log('Object.keys(standardFiles)', Object.keys(standardFiles));
    return Object.keys(standardFiles)
        .filter((key) => standardFiles[key].path)
        .map((key) => standardFiles[key].path);
};
const createFetch = (fileDateStr, options) => {
    const ldt = utils_1.LocalDateTime.ParseFilenameFormat(fileDateStr);
    const fetchDirPath = upath_1.normalize(`${PATHS.osmFetchPath}/${fileDateStr}`);
    const standardFiles = createStandardFiles(fetchDirPath, fileDateStr);
    if (options.removeFiles) {
        // console.log('standardFiles.BEFORE', JSON.stringify(standardFiles, undefined, 4));
        removeStandardFiles(standardFiles, options.removeFiles);
        // console.log('standardFiles.AFTER', JSON.stringify(standardFiles, undefined, 4));
    }
    const extraFiles = createExtraFiles(fetchDirPath, options.extraFiles);
    const standarFilesArray = getStandardFilesAsArray(standardFiles);
    // console.log('extraFiles', JSON.stringify(extraFiles, undefined, 4));
    // console.log('standarFilesArray', JSON.stringify(standarFilesArray, undefined, 4));
    const subFiles = getStandardFilesAsArray(standardFiles).concat(extraFiles);
    // console.log('subFiles', JSON.stringify(subFiles, undefined, 4));
    const osmFetchDir = {
        "fetchDirPath": fetchDirPath,
        "fetchLocalDateTime": {
            "unixUtcEpochMs": ldt.unixUtcEpochMs,
            "timezoneOffsetMin": ldt.timezoneOffsetMin,
            "timezoneName": ldt.timezoneName,
            "MTZ": ldt.MTZ.toString()
        },
        "dirName": `${fileDateStr}`,
        "rootPath": upath_1.normalize(`${PATHS.osmFetchPath}`),
        "subFiles": subFiles,
        "unknownPaths": extraFiles,
    };
    const done = Object.assign({}, osmFetchDir, standardFiles);
    return done;
};
const noOptions = {
    extraFiles: [],
    removeFiles: [],
};
const extraFilesOptions = {
    extraFiles: ['foo.json', 'bar.json'],
    removeFiles: [],
};
const removeOptions = {
    extraFiles: [],
    removeFiles: ['rsd', 'int'],
};
const bothOptions = {
    extraFiles: ['foo.json', 'bar.json'],
    removeFiles: ['rsd', 'int'],
};
exports.OsmFetchData = {
    "fetchRootPath": `${PATHS.osmFetchPath}`,
    "osmFetchDirs": [
        createFetch('2017-01-01 0800-10', noOptions),
        createFetch('2018-01-01 0800-10', extraFilesOptions),
        createFetch('2019-01-01 0800-10', removeOptions),
        createFetch('2020-01-01 0800-10', bothOptions),
    ]
};
// console.log('OsmFetchData')
// console.log(JSON.stringify(OsmFetchData, undefined, 4));
// console.log(OsmFetchData.osmFetchDirs[1]);
// const OsmFetchDataOld = {
//     "fetchRootPath": `${PATHS.osmFetchPath}`,
//     "osmFetchDirs": [
//         {
//             "fetchDirPath": `${PATHS.osmFetchPath}\\2017-01-01 0800-10`,
//             "fetchLocalDateTime": {
//                 "unixUtcEpochMs": 1483282810000,
//                 "timezoneOffsetMin": -420,
//                 "timezoneName": "America/Denver",
//                 "MTZ": "2017-01-01T15:00:10.000Z"
//             },
//             "dirName": "2017-01-01 0800-10",
//             "rootPath": `${PATHS.osmFetchPath}`,
//             "subFiles": [
//                 `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.osm-data.json`,
//                 `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.ucsd-int.json`,
//                 `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.ucsd-pmf.json`,
//                 `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.ucsd-rsd.jso`,
//             ],
//             "unknownPaths": [],
//             "osm": {
//                 "path": `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.osm-data.jso`,
//             },
//             "int": {
//                 "path": `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.ucsd-int.jso`,
//             },
//             "pmf": {
//                 "path": `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.ucsd-pmf.jso`,
//             },
//             "rsd": {
//                 "path": `${PATHS.osmFetchPath}\\2017-01-01 0800-10\\2017-01-01 0800-10.ucsd-rsd.jso`,
//             }
//         },
//         {
//             "fetchDirPath": `${PATHS.osmFetchPath}\\2018-01-01 0800-10`,
//             "fetchLocalDateTime": {
//                 "unixUtcEpochMs": 1514818810000,
//                 "timezoneOffsetMin": -420,
//                 "timezoneName": "America/Denver",
//                 "MTZ": "2018-01-01T15:00:10.000Z"
//             },
//             "dirName": "2018-01-01 0800-10",
//             "rootPath": `${PATHS.osmFetchPath}`,
//             "subFiles": [
//                 `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.osm-data.json`,
//                 `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.ucsd-int.json`,
//                 `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.ucsd-pmf.json`,
//                 `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.ucsd-rsd.jso`,
//             ],
//             "unknownPaths": [],
//             "osm": {
//                 "path": `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.osm-data.jso`,
//             },
//             "int": {
//                 "path": `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.ucsd-int.jso`,
//             },
//             "pmf": {
//                 "path": `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.ucsd-pmf.jso`,
//             },
//             "rsd": {
//                 "path": `${PATHS.osmFetchPath}\\2018-01-01 0800-10\\2018-01-01 0800-10.ucsd-rsd.jso`,
//             }
//         },
//         {
//             "fetchDirPath": `${PATHS.osmFetchPath}\\2019-01-01 0800-10`,
//             "fetchLocalDateTime": {
//                 "unixUtcEpochMs": 1546354810000,
//                 "timezoneOffsetMin": -420,
//                 "timezoneName": "America/Denver",
//                 "MTZ": "2019-01-01T15:00:10.000Z"
//             },
//             "dirName": "2019-01-01 0800-10",
//             "rootPath": `${PATHS.osmFetchPath}`,
//             "subFiles": [
//                 `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.osm-data.json`,
//                 `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.ucsd-int.json`,
//                 `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.ucsd-pmf.json`,
//                 `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.ucsd-rsd.jso`,
//             ],
//             "unknownPaths": [],
//             "osm": {
//                 "path": `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.osm-data.jso`,
//             },
//             "int": {
//                 "path": `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.ucsd-int.jso`,
//             },
//             "pmf": {
//                 "path": `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.ucsd-pmf.jso`,
//             },
//             "rsd": {
//                 "path": `${PATHS.osmFetchPath}\\2019-01-01 0800-10\\2019-01-01 0800-10.ucsd-rsd.jso`,
//             }
//         }
//     ]
// }
//# sourceMappingURL=TestOsmFetchData.js.map