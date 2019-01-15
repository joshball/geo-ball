declare type Maybe<T> = T | void;
export declare type OpenStreetMapFileType = 'Unknown' | 'UnknownJson' | 'OsmDataJson' | 'OsmDataGeoJson' | 'OsmQueryJson' | 'OsmQueryTxt';
export declare class OpenStreetmapFile {
    path: string;
    type: OpenStreetMapFileType;
    data: any;
    constructor(path: string, type: OpenStreetMapFileType, data: any);
    static CreateFilenameTimestamp(date?: Date): string;
    static Load(path: string): OpenStreetmapFile;
    static GetFileType(path: string, fileData: string): OpenStreetmapFile;
    static TryJsonType(path: string, fileData: string): Maybe<OpenStreetmapFile>;
    static TryDataJsonType(path: string, jsonData: any): Maybe<OpenStreetmapFile>;
    static TryGeoJsonType(path: string, jsonData: any): Maybe<OpenStreetmapFile>;
    static TryTextType(path: string, fileData: string): Maybe<OpenStreetmapFile>;
}
export {};
//# sourceMappingURL=OpenStreetmapFile.orig.d.ts.map