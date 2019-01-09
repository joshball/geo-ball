import { resolve, join } from 'path';
import { existsSync, readdirSync, readFileSync } from 'fs';
// import * as logger from 'morgan';

const pathToData = resolve(join(__dirname, '../data'));

if (!existsSync(pathToData)) {
    console.error('looks like data dir is not correct (does not exist):', pathToData);
    throw new Error('Bad data dir');
}

console.log('DATA PATH:', pathToData);

const mapsPath = join(pathToData, 'maps');

export const getMaps = () => readdirSync(mapsPath).filter(f => f.endsWith('.map'));

export const getMap = (mapFile: string): string | undefined => {
    const p = join(mapsPath, mapFile);
    if (existsSync(p)) {
        return readFileSync(p, 'utf8');
    }
    return undefined;
};
