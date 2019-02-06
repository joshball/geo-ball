import { OpenStreetmapFile } from '@geo-ball/osm-data';
import { RoadSegmentsFile } from './RoadSegmentsFile';
import { PointMapsFile } from './PointMapsFile';
import { IntersectionsFile } from './IntersectionsFile';
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
export declare class OsmFetchGraphFilesSet implements IOsmFetchGraphFilesSet {
    fetchDirPath: string;
    fetchDate: string;
    osm: IPathFileMap<OpenStreetmapFile>;
    rsd: IPathFileMap<RoadSegmentsFile>;
    pmf: IPathFileMap<PointMapsFile>;
    int: IPathFileMap<IntersectionsFile>;
    unknownPaths: string[];
    constructor(runDirPath: string);
    setPath(osmSingleRunFilePath: string): void;
    setPaths(osmRunFilePaths: Array<string>): void;
}
//# sourceMappingURL=MapDataFileSet.d.ts.map