import { OpenStreetmapFile } from '@geo-ball/osm-data';
import { RoadSegmentsFile } from './RoadSegmentsFile';
import { PointMapsFile } from './PointMapsFile';
import { IntersectionsFile } from './IntersectionsFile';
export declare type ReadDirCallback = (path: string) => Promise<Array<string>>;
export declare type ReadFileCallback = (path: string) => Promise<any>;
export interface IPathFileMap<TFileType> {
    path: string;
    file: TFileType | undefined;
}
export declare class PathFileMap<TFileType> implements IPathFileMap<TFileType> {
    path: string;
    file: TFileType | undefined;
    constructor(path?: string);
}
export interface IOsmFetchGraphFilesSet {
    fetchDirPath: string;
    fetchDate: string;
    osm: IPathFileMap<OpenStreetmapFile>;
    rsd: IPathFileMap<RoadSegmentsFile>;
    pmf: IPathFileMap<PointMapsFile>;
    int: IPathFileMap<IntersectionsFile>;
    unknownPaths: Array<string>;
    setPath(osmSingleRunFilePath: string): void;
    setPaths(osmRunFilePaths: Array<string>): void;
}
/**
 * This class manages all the files needed for the graph algorithms.
 * All these files are based upon a download from OSM. We keep all
 * related files in a single directory, with timestamps.
 * Once downloaded, we kick off different processing which generates
 * the related files.
 * This class just tracks all of the file paths.
 */
export declare class OsmFetchGraphFilesSet implements IOsmFetchGraphFilesSet {
    fetchDirPath: string;
    fetchDate: string;
    osm: IPathFileMap<OpenStreetmapFile>;
    rsd: IPathFileMap<RoadSegmentsFile>;
    pmf: IPathFileMap<PointMapsFile>;
    int: IPathFileMap<IntersectionsFile>;
    unknownPaths: string[];
    constructor(fetchDirPath: string);
    setPath(osmSingleRunFilePath: string): void;
    setPaths(osmRunFilePaths: Array<string>): void;
    setPathsFromReadDir(singleOsmFetchPath: string, readDirCallback: ReadDirCallback): Promise<void>;
    loadFiles(readFileCallback: ReadFileCallback): Promise<void>;
    static GetAllFetchDirs(rootFetchDirPath: string, readDirCallback: ReadDirCallback): Promise<Array<OsmFetchGraphFilesSet>>;
}
//# sourceMappingURL=OsmFetchGraphFilesSet.d.ts.map