
export type LoadFileCallback<TFileType> = (path: string) => Promise<TFileType>


export interface IOsmFetchFile<TFileType> {
    path: string;
    file: TFileType | undefined;
}

export type OsmFetchFileType = 'osm' | 'rsd' | 'pmf' | 'int' ;

export interface IOsmFetchFileMeta {
    path: string;
    type: OsmFetchFileType;
    size: number;
}


export class OsmFetchFile<TFileType> implements IOsmFetchFile<TFileType> {
    path: string;
    file: TFileType | undefined;
    loadCb: LoadFileCallback<TFileType>;
    constructor(loadCb: LoadFileCallback<TFileType>, path: string = '') {
        this.loadCb = loadCb;
        this.path = path;
    }
    public async loadFile(path: string): Promise<TFileType> {
        this.path = path;
        return this.loadCb(path)
            .then(file => this.file = file);
    }
}
