import { join, resolve, dirname, basename } from 'path';
import { fileNamify } from './fileNamify';

export const pathNamify = (path: string, options: any | undefined) => {
    path = resolve(path);
    return join(dirname(path), fileNamify(basename(path), options));
};
