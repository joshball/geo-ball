import { join } from 'path';

import { IOverpassDataDirContents } from './OverpassQueryFilesService';
import {
    IOverpassQueryFileContents,
    OverpassQueryFileContents,
} from './OverpassQueryFileContents';
import { IOverpassQueryFile, OverpassQueryFile } from './OverpassQueryFile';

// const files: Array<IFileContentsWrapper<IOverpassQueryFileContents>> = [
const files: Array<any> = [
    {
        filename: 'OverpassQueryFile-1.json',
        contents: {
            name: 'Abby',
            age: 400,
            color: 'Blue',
        },
    },
    {
        filename: 'OverpassQueryFile-2.json',
        contents: {
            name: 'Billy',
            age: 450,
            color: 'Green',
        },
    },
    {
        filename: 'OverpassQueryFile-3.json',
        contents: {
            name: 'Cate',
            age: 100,
            color: 'Purple',
        },
    },
    {
        filename: 'OverpassQueryFile-4.json',
        contents: {
            name: 'Dave',
            age: 200,
            color: 'Red',
        },
    },
    {
        filename: 'OverpassQueryFile-5.json',
        contents: {
            name: 'Eve',
            age: 888,
            color: 'Purple',
        },
    },
];

export const dirContents: IOverpassDataDirContents = {
    path: __dirname,
    files,
};

export const getFileContents = (
    filename: string,
    dirPath: string,
    contents: IOverpassQueryFileContents
): IOverpassQueryFile => {
    const { name, age, color } = contents;
    const unicornContents = new OverpassQueryFileContents(name, age, color);
    return new OverpassQueryFile(
        filename,
        join(dirPath, filename),
        unicornContents
    );
};

export const getDirContents = (path: string): IOverpassDataDirContents => {
    return {
        path,
        files: files.map(f => getFileContents(f.filename, path, f.contents)),
    };
};
