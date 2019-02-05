"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
// import { dataDir } from '../../../ucsd-core/src/test/TestData';
exports.findFilePathIn = (filepath, dirsToTry) => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < dirsToTry.length; i++) {
        const resolvedPath = path_1.resolve(path_1.join(dirsToTry[i], filepath));
        if (fs_1.existsSync(resolvedPath)) {
            return resolvedPath;
        }
    }
    throw new Error(`Could not find any files matching path from [${filepath}]`);
};
exports.findFilePath = (filepath) => {
    if (path_1.isAbsolute(filepath)) {
        return exports.assertFileExists(filepath);
    }
    return exports.findFilePathIn(filepath, [process.cwd(),]);
};
exports.assertFileExists = (filepath) => {
    const resolvedPath = path_1.resolve(filepath);
    if (!fs_1.existsSync(resolvedPath)) {
        throw new Error(`File [${resolvedPath}] does not exist`);
    }
    return resolvedPath;
};
exports.OutputFormatExtensions = {
    json: 'json',
    text: 'txt',
};
exports.OutputFormats = Object.keys(exports.OutputFormatExtensions);
exports.isCorrectExt = (filename, format) => {
    if (filename) {
        const extWithPeriod = '.' + format.toLowerCase();
        if (path_1.extname(filename).toLowerCase() === extWithPeriod) {
            return true;
        }
    }
    return false;
};
exports.ensureCorrectEnding = (filename, ending) => {
    if (filename) {
        const extWithPeriod = '.' + ending.toLowerCase();
        const fLen = filename.length;
        const eLen = ending.length;
        const startOfEnding = fLen - eLen;
        const filenameStrTooSmall = () => fLen < eLen;
        const endOfFilenameNotExtName = () => filename.slice(startOfEnding).toLowerCase() !== extWithPeriod;
        if (filenameStrTooSmall() || endOfFilenameNotExtName()) {
            return filename + extWithPeriod;
        }
    }
    return undefined;
};
// export const resolveDataDir = (dataDirPath: string | undefined): string => {
//     if (!dataDirPath) {
//         const defaultRelDataDir = '../../map-data';
//         console.log(`No dataDir passed in. Resolving to CWD${defaultRelDataDir}`);
//         dataDirPath = resolve(join(process.cwd(), defaultRelDataDir));
//     }
//     if (!existsSync(dataDirPath)) {
//         throw new Error(`Cannot find a data dir: ${dataDirPath}`);
//     }
//     return dataDirPath;
// }
// export const resolveOsmFiles = (dataDirPath: string, osmFile: string | undefined): Array<string> => {
//     const osmDir = join(dataDirPath, 'osm');
//     if (osmFile) {
//         const osmFilePath = join(osmDir, osmFile);
//         if (!existsSync(osmFilePath)) {
//             throw new Error(`Cannot find osm file: ${osmFilePath}`);
//         }
//         return [osmFilePath];
//     }
//     return readdirSync(osmDir)
//         .filter(f => f.endsWith('.osm-data.json'))
//         .map(f => join(osmDir, f));
// }
// // export const resolveOsmAndRsdFiles = (dataDirPath: string, osmFiles: string[], overwriteRsFiles: boolean): Array<IOsmRsFiles> => {
//     // const osmDir = join(dataDirPath, 'osm');
//     const rsDir = join(dataDirPath, 'rsd');
//     return osmFiles
//         .map(f => {
//             return {
//                 osmFilePath: f,
//                 rsdJsonFilePath: join(rsDir, basename(f).replace('.osm-data.json', '.rsd.json')),
//                 rsdTextFilePath: join(rsDir, basename(f).replace('.osm-data.json', '.rsd.txt')),
//             }
//         })
//         .filter(f => {
//             if (!overwriteRsFiles) {
//                 if (existsSync(f.rsdJsonFilePath)) {
//                     throw new Error(`Overwrite is FALSE and RSD JSON file exits: ${f.rsdJsonFilePath}`);
//                 }
//                 if (existsSync(f.rsdTextFilePath)) {
//                     throw new Error(`Overwrite is FALSE and RSD TEXT file exits: ${f.rsdTextFilePath}`);
//                 }
//             }
//             return true;
//         });
// }
//# sourceMappingURL=fileHelpers.js.map