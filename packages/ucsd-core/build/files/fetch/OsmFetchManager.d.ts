import { LocalDateTime } from '@geo-ball/utils';
import { IGeographicBoundsDescription } from '@geo-ball/osm-data';
import { OsmFetchDir, IOsmFetchDir } from './OsmFetchDir';
export interface IOsmFetchManager {
    fetchRootPath: string;
    osmFetchDirs: Array<IOsmFetchDir>;
}
export declare class OsmFetchManager {
    fetchRootPath: string;
    osmFetchDirs: Array<OsmFetchDir>;
    constructor(fetchRootPath: string);
    createFetchDir(ldt: LocalDateTime): Promise<void>;
    getOsmFetchDirs(): Promise<Array<OsmFetchDir>>;
    load(): Promise<Array<OsmFetchDir>>;
    dump(): string;
}
export interface IOsmFetchAndSaveParams {
    osmServer: string;
    queryDate: LocalDateTime;
    geoBounds: IGeographicBoundsDescription;
    fetchDir: string;
    overwrite: boolean;
    fake: boolean;
}
//# sourceMappingURL=OsmFetchManager.d.ts.map