import { join, isAbsolute, resolve } from 'path';
import { existsSync } from 'fs';
import { BaseDataPath } from './defaults';

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
    return findFilePathIn(filepath, [process.cwd(), BaseDataPath]);
}

export const assertFileExists = (filepath: string): string => {
    const resolvedPath = resolve(filepath);
    if (!existsSync(resolvedPath)) {
        throw new Error(`File [${resolvedPath}] does not exist`)
    }
    return resolvedPath;
}
