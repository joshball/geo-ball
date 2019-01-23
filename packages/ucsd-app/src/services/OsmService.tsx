import { IOpenStreetmapQuery, OSMFeatureKeyValuePair, OSMFeatureKey, OpenStreetmapQuery, OpenStreetmapDownloader, IFetchAndSaveResult } from "@ball-maps/osm-data";
import { LatLngBounds } from "@ball-maps/geo-core";


const getOsmQuery = (latLngBounds: LatLngBounds): OpenStreetmapQuery => {
    const features = [
        "highway",
        "addr"
    ];
    const osmQueryObj: IOpenStreetmapQuery = {
        latLngBounds,
        features: features.map(f => new OSMFeatureKeyValuePair(f as OSMFeatureKey))
    }
    const osmQuery = new OpenStreetmapQuery(osmQueryObj);
    return osmQuery;
    // const now = this.results.timestamp ? new Date() : undefined;
    // const fileName = OpenStreetmapFile.CreateFileName(this.results.queryName, now);
    // const dataDir = resolve(this.results.dataDir || process.cwd());
    // const resultsFileName: string = resolve(join(dataDir, fileName));
    // const osmEndpoint = this.query.osmEndpoint;
    // const overwrite = this.results.overwrite === true;

    // return {
    //     osmQuery,
    //     resultsFileName,
    //     overwrite,
    //     osmEndpoint,
    // }
}

export const downloadOsmFile = async (info: any): Promise<void> => {
    console.log('downloadOsmFile(bounds)', info);
    return;
    const osmQuery = getOsmQuery(info.bounds)
    const overwrite = true;
    const osmDownloadFilePath = ''; //info.name
    const downloader = new OpenStreetmapDownloader();

    downloader.fetchAndSave(osmQuery, osmDownloadFilePath, overwrite)
        .then((results: IFetchAndSaveResult) => {
            console.log('Download Complete:');
            console.log('  SERVER:', results.osmDataFile.osmMetaData.osmServer);
            console.log('    DATE:', results.osmDataFile.osmMetaData.queryDate);
            console.log('    FILE:', results.osmDataFilePath);
        })
        .catch(error => {
            console.error('###################################################################################')
            console.error('DOWNLOAD FAILED:')
            console.error(error)
            console.error('###################################################################################')
            throw error;
        });


}
