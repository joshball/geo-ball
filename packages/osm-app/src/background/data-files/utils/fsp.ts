import { promises } from 'fs';
export const readFile = promises.readFile;
export const readdir = promises.readdir;
export const stat = promises.stat;
export const lstat = promises.lstat;
