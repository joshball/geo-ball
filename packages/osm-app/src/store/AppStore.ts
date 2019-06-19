import { resolve, join } from 'path';
import { homedir } from 'os';

export const OsmDataDirName = '.osmdata';

export const ExampleOsmDataDirPath = resolve(
    join(__dirname, '../../example-data-dir')
);

export const UsersOsmDataDirPath = resolve(join(homedir(), OsmDataDirName));

export interface IAppStore {
    osmDataDir: string;
    osmDataDirs: Array<string>;
}

export const ExampleAppStore: IAppStore = {
    osmDataDir: ExampleOsmDataDirPath,
    osmDataDirs: [UsersOsmDataDirPath, ExampleOsmDataDirPath],
};
