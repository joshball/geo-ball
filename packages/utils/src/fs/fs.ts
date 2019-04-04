import { promisify } from 'util';
import * as fs from 'fs';

export const readdir = promisify(fs.readdir);
export const lstat = promisify(fs.lstat);
export const access = promisify(fs.access);
export const mkdir = promisify(fs.mkdir);
export const readFile = promisify(fs.readFile);
export const writeFile = promisify(fs.writeFile);
export const CONSTANTS = fs.constants;

export const exists = async (path: string): Promise<boolean> => {
    try {
        await access(path, CONSTANTS.F_OK);
        return true;
    } catch (error) {
        return false;
    }
};
