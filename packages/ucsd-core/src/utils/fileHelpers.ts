import { resolve, join, isAbsolute, basename, dirname, extname } from 'path';
import { existsSync, readdirSync } from 'fs';
// import { dataDir } from '../../../ucsd-core/src/test/TestData';

export const findFilePathIn = (filepath: string, dirsToTry: Array<string>): string => {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < dirsToTry.length; i++) {
        const resolvedPath = resolve(join(dirsToTry[i], filepath));
        if (existsSync(resolvedPath)) {
            return resolvedPath;
        }
    }
    throw new Error(`Could not find any files matching path from [${filepath}]`)
}

export const findFilePath = (filepath: string): string => {
    if (isAbsolute(filepath)) {
        return assertFileExists(filepath);
    }
    return findFilePathIn(filepath, [process.cwd(), /*BaseDataPath*/]);
}

export const assertFileExists = (filepath: string): string => {
    const resolvedPath = resolve(filepath);
    if (!existsSync(resolvedPath)) {
        throw new Error(`File [${resolvedPath}] does not exist`)
    }
    return resolvedPath;
}

export interface FormatExtension {
    format: OutputFormatType;
    extension: string;
}
export interface KeyVal {
    [key: string]: string;
}
export const OutputFormatExtensions: KeyVal = {
    json: 'json',
    text: 'txt',
};

export const OutputFormats = Object.keys(OutputFormatExtensions);

/** Create a Type */
export type OutputFormatType = keyof typeof OutputFormatExtensions;



export const isCorrectExt = (filename: string, format: string): boolean => {
    if (filename) {
        const extWithPeriod = '.' + format.toLowerCase();
        if (extname(filename).toLowerCase() === extWithPeriod) {
            return true;
        }
    }
    return false;
}

export const ensureCorrectEnding = (filename: string, ending: string): string | undefined => {
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
}


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
