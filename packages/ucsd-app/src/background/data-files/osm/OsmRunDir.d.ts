import { OsmRunErrorTxt } from './OsmRunError';
import { OsmRunFiles } from './OsmRunFile';
export declare type OsmRunState = 'Invalid' | 'NotRun' | 'Valid';
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
export declare const createOsmRun: (osmRunDirPath: string, dirName: any) => Promise<IOsmRunDir>;
//# sourceMappingURL=OsmRunDir.d.ts.map
