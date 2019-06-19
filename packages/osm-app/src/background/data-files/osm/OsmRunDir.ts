import { resolve, join } from 'path';
import { lstat } from '../utils/fsp';
import { OsmRunError, OsmRunErrorTxt } from './OsmRunError';
import parse from 'date-fns/parse';
import { OsmRunFiles } from './OsmRunFile';

export type OsmRunState = 'Invalid' | 'NotRun' | 'Valid';

export interface IOsmRunDir {
    name: string;
    path: string;
    state: OsmRunState;
    date: Date;
    dirValid: boolean;
    filesValid: boolean;
    error: OsmRunErrorTxt | undefined;
    runFiles: OsmRunFiles | undefined;
}

export const createOsmRun = async (osmRunDirPath: string, dirName: any): Promise<IOsmRunDir> => {
    const fullPath = resolve(join(osmRunDirPath, dirName));
    const rds: IOsmRunDir = {
        name: dirName,
        path: fullPath,
        state: 'Valid',
        date: parseRunDir(dirName),
        dirValid: true,
        filesValid: true,
        error: undefined,
        runFiles: undefined,
    };

    const stats = await lstat(fullPath);

    if (!stats.isDirectory()) {
        rds.state = 'Invalid';
        rds.dirValid = false;
        rds.error = 'PathWasFileNotDir';
        return rds;
    }

    rds.runFiles = await OsmRunFiles.GetOsmRunFiles(fullPath);

    return rds;
};

const parseRunDir = (dirName: string): Date => {
    // YYYY-MM-DD_HHMMSS
    if (dirName.length !== 17) {
        throw new OsmRunError('dirName.length != 17', 'DirImproperlyNamed');
    }
    const date = parse(dirName, 'YYY-MM-DD_HHmmss', new Date());
    if (!date) {
        throw new OsmRunError('dirName is not properly formatted date', 'DirImproperlyNamed');
    }
    return date;
};
