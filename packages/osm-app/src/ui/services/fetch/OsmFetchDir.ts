import { resolve, join, dirname, basename } from 'path';
import {
    LocalDateTime,
    ILocalDateTime,
    readdir,
    mkdir,
    exists,
} from '@geo-ball/utils';
import { OpenStreetmapFile } from '@geo-ball/osm-data';
import { IOsmFetchFile, OsmFetchFile } from './OsmFetchFile';

export interface IOsmFetchDir {
    fetchDirPath: string;
    fetchLocalDateTime: ILocalDateTime;
    dirName: string;
    rootPath: string;
    subFiles: Array<string>;
    osm: IOsmFetchFile<OpenStreetmapFile> | undefined;
    unknownPaths: Array<string>;
}

/**
 * Just a simple abstraction around the OSM Fetch Directory
 */
export class OsmFetchDir {
    fetchDirPath: string;
    fetchLocalDateTime: LocalDateTime;
    dirName: string;
    rootPath: string;
    subFiles: Array<string>;
    osm: IOsmFetchFile<OpenStreetmapFile> | undefined;
    unknownPaths: Array<string>;

    constructor(fetchDirPath: string) {
        this.fetchDirPath = resolve(fetchDirPath);
        const ldt = LocalDateTime.ParseFilenameFormat(fetchDirPath);
        this.fetchLocalDateTime = ldt;

        this.dirName = basename(this.fetchDirPath);
        this.rootPath = dirname(this.fetchDirPath);
        this.subFiles = [];
        this.unknownPaths = [];
    }

    get localDateTime(): LocalDateTime {
        return LocalDateTime.ParseFilenameFormat(this.dirName);
    }

    get ParsedFilenameTimestamp(): LocalDateTime {
        return LocalDateTime.ParseFilenameFormat(this.dirName);
    }

    public async getOsmFetchFilePaths(): Promise<Array<string>> {
        return readdir(this.fetchDirPath)
            .then(data => {
                console.log('fetchDirs:', data);
                return data;
            })
            .then(fetchDirs =>
                fetchDirs.map(fetchDir => join(this.fetchDirPath, fetchDir))
            );
    }

    public async load(): Promise<Array<string>> {
        console.log('');
        console.log(
            '======================================================================'
        );
        console.log('OsmFetchDir.load this.fetchDirPath', this.fetchDirPath);
        return this.getOsmFetchFilePaths()
            .then(data => {
                console.log('files:', data);
                return data;
            })
            .then(files => (this.subFiles = files))
            .then(files => this.setPaths(files));
    }

    setPath(osmSingleRunFilePath: string): void {
        if (OpenStreetmapFile.HasCorrectExtension(osmSingleRunFilePath)) {
            this.osm = new OsmFetchFile(
                OpenStreetmapFile.Load,
                osmSingleRunFilePath
            );
        } else {
            this.unknownPaths.push(osmSingleRunFilePath);
        }
    }

    setPaths(osmRunFilePaths: Array<string>): Array<string> {
        osmRunFilePaths.forEach(osmSingleRunFilePath =>
            this.setPath(osmSingleRunFilePath)
        );
        return osmRunFilePaths;
    }

    // public static CreateFetchDirPath(fetchRootPath: string, ldt: LocalDateTime): string {
    //     fetchRootPath = resolve(fetchRootPath);
    //     return join(fetchRootPath, ldt.toFilenameTimestamp());
    // }
}
