import { LocalDateTime, ILocalDateTime } from '@geo-ball/utils';
import { OpenStreetmapFile } from '@geo-ball/osm-data';
import { IOsmFetchFile } from './OsmFetchFile';
import { RoadSegmentsFile } from '../RoadSegmentsFile';
import { PointMapsFile } from '../PointMapsFile';
import { IntersectionsFile } from '../IntersectionsFile';
export interface IOsmFetchDir {
    fetchDirPath: string;
    fetchLocalDateTime: ILocalDateTime;
    dirName: string;
    rootPath: string;
    subFiles: Array<string>;
    osm: IOsmFetchFile<OpenStreetmapFile> | undefined;
    rsd: IOsmFetchFile<RoadSegmentsFile> | undefined;
    pmf: IOsmFetchFile<PointMapsFile> | undefined;
    int: IOsmFetchFile<IntersectionsFile> | undefined;
    unknownPaths: Array<string>;
}
/**
 * Just a simple abstraction around the OSM Fetch Directory
 */
export declare class OsmFetchDir {
    fetchDirPath: string;
    fetchLocalDateTime: LocalDateTime;
    dirName: string;
    rootPath: string;
    subFiles: Array<string>;
    osm: IOsmFetchFile<OpenStreetmapFile> | undefined;
    rsd: IOsmFetchFile<RoadSegmentsFile> | undefined;
    pmf: IOsmFetchFile<PointMapsFile> | undefined;
    int: IOsmFetchFile<IntersectionsFile> | undefined;
    unknownPaths: Array<string>;
    constructor(fetchDirPath: string);
    readonly localDateTime: LocalDateTime;
    readonly ParsedFilenameTimestamp: LocalDateTime;
    getOsmFetchFilePaths(): Promise<Array<string>>;
    load(): Promise<Array<string>>;
    setPath(osmSingleRunFilePath: string): void;
    setPaths(osmRunFilePaths: Array<string>): Array<string>;
}
//# sourceMappingURL=OsmFetchDir.d.ts.map