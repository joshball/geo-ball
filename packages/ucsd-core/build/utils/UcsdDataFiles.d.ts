export interface IPathExistence {
    name: string;
    path: string;
    exists: boolean;
}
export declare class PathExistence implements IPathExistence {
    name: string;
    path: string;
    exists: boolean;
    constructor(path: string);
}
export interface IOsmBasedFilePaths {
    osmFilePath: IPathExistence;
    rsdJsonFilePath: IPathExistence;
    rsdTextFilePath: IPathExistence;
    intJsonFilePath: IPathExistence;
    intTextFilePath: IPathExistence;
    pointsJsonFilePath: IPathExistence;
}
export declare class UcsdDataFiles {
    mapDataRoot: string;
    osmDir: string;
    osmJsonExt: string;
    rsdJsonExt: string;
    rsdTextExt: string;
    pointsJsonExt: string;
    intJsonExt: string;
    intTextExt: string;
    readonly osmPath: string;
    constructor(mapDataRoot?: string | undefined);
    static EnsurePathSync(path: string): void;
    static EnsurePath(path: string): Promise<string>;
    getOpenStreetMapDataFiles(): string[];
    getRoadSegmentDataJsonFiles(): string[];
    getRsdPathFromOsmPath(osmPath: string, text?: boolean): string;
    getOsmPathFromRsdJsonPath(rsdPath: string): string;
    getIntPathFromOsmPath(osmPath: string, text?: boolean): string;
    getPointsPathFromOsmPath(osmPath: string): string;
    getOsmAndRsdMapping(osmFilePath: string): IOsmBasedFilePaths;
    getOsmBasedFilePaths(osmFile?: string | undefined): Array<IOsmBasedFilePaths>;
}
//# sourceMappingURL=UcsdDataFiles.d.ts.map