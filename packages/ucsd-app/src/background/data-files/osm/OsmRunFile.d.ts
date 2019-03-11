import { GeoFileInfo } from '../common/GeoFileInfo';
export declare class OsmRunFiles {
    query: GeoFileInfo;
    download: GeoFileInfo;
    constructor(query: GeoFileInfo, download: GeoFileInfo);
    static GetOsmRunFiles(runDirPath: string): Promise<OsmRunFiles>;
    static GetOsmQueryAndDownloadFiles(files: Array<GeoFileInfo>): Promise<any>;
}
//# sourceMappingURL=OsmRunFile.d.ts.map
