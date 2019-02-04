
import { promisify } from 'util';
import * as fs from 'fs';

export const readdir = promisify(fs.readdir);
export const lstat = promisify(fs.lstat);
export const access = promisify(fs.access);
export const mkdir = promisify(fs.mkdir);

export const CONSTANTS = fs.constants
