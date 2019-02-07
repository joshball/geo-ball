import { IOpenStreetmapQuery, OSMFeatureKeyValuePair, OSMFeatureKey, OpenStreetmapQuery, OpenStreetmapDownloader, IFetchAndSaveResult, OpenStreetmapFileMetaData } from "@geo-ball/osm-data";
import { LatLngBounds, LatLng } from "@geo-ball/geo-core";


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
    // const fileName = OpenStreetmapFile.CreateDescriptiveFileName(this.results.queryName, now);
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

export interface DownloadOsmParams {
    bounds: LatLngBounds;
    center: LatLng;
    name: string;
    desc: string;
    area: string;
    fake: boolean;
}

export const downloadOsmFile = async (osmParams: DownloadOsmParams): Promise<void> => {
    console.log('downloadOsmFile(bounds)', osmParams);
    const osmQuery = getOsmQuery(osmParams.bounds)
    const overwrite = true;
    const osmDownloadFilePath = osmParams.name || 'map-query';
    const endpoint = OpenStreetmapDownloader.DEFAULT_ENDPOINT;
    const osmMeta = new OpenStreetmapFileMetaData(endpoint, osmQuery, osmParams.name, osmParams.desc, osmQuery.latLngBounds);

    return OpenStreetmapDownloader.FetchAndSave(osmMeta, osmDownloadFilePath, overwrite, osmParams.fake)
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
