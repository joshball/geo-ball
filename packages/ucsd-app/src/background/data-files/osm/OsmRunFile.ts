import { GeoFileInfo } from '../common/GeoFileInfo';

export class OsmRunFiles {
    query: GeoFileInfo;
    download: GeoFileInfo;

    constructor(query: GeoFileInfo, download: GeoFileInfo) {
        if (query.name.error) {
            throw query.name.error;
        }
        if (download.name.error) {
            throw download.name.error;
        }
        this.query = query;
        this.download = download;
    }

    static async GetOsmRunFiles(runDirPath: string) {
        const files = await GeoFileInfo.GetGeoFilesFromDir(runDirPath);
        const both: any = await OsmRunFiles.GetOsmQueryAndDownloadFiles(files);

        return new OsmRunFiles(both.query, both.download);
    }
    static async GetOsmQueryAndDownloadFiles(files: Array<GeoFileInfo>) {
        const both: any = {};
        files.forEach(f => {
            if (f.name.segments.type === 'OSM_QUERY') {
                both.query = f;
            }
            if (f.name.segments.type === 'OSM_DOWNLOAD') {
                both.download = f;
            }
        });
        return both;
    }
}
