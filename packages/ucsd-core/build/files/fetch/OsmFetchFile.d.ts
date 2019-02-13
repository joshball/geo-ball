export declare type LoadFileCallback<TFileType> = (path: string) => Promise<TFileType>;
export interface IOsmFetchFile<TFileType> {
    path: string;
    file: TFileType | undefined;
}
export declare type OsmFetchFileType = 'osm' | 'rsd' | 'pmf' | 'int';
export interface IOsmFetchFileMeta {
    path: string;
    type: OsmFetchFileType;
    size: number;
}
export declare class OsmFetchFile<TFileType> implements IOsmFetchFile<TFileType> {
    path: string;
    file: TFileType | undefined;
    loadCb: LoadFileCallback<TFileType>;
    constructor(loadCb: LoadFileCallback<TFileType>, path?: string);
    loadFile(path: string): Promise<TFileType>;
}
//# sourceMappingURL=OsmFetchFile.d.ts.map