import { IOpenStreetmapQuery, OSMFeatureKeyValuePair, OSMFeatureKey, OpenStreetmapQuery, OpenStreetmapDownloader, IFetchAndSaveResult } from "@geo-ball/osm-data";
import { LatLng as LeafLatLng, LatLngBounds as LeafLatLngBounds } from "leaflet";
import { reverseGeocodeLocation } from "./GeocodingService";


const getOsmQuery = (latLngBounds: LeafLatLngBounds): OpenStreetmapQuery => {
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
    bounds: LeafLatLngBounds;
    center: LeafLatLng;
    name: string;
    desc: string;
    area: string;
}

export const downloadOsmFile = async (osmParams: DownloadOsmParams): Promise<void> => {
    console.log('downloadOsmFile(bounds)', osmParams);
    const osmQuery = getOsmQuery(osmParams.bounds)
    const overwrite = true;
    const osmDownloadFilePath = osmParams.name || 'map-query';
    const downloader = new OpenStreetmapDownloader();

    // downloader.fetchAndSave(osmQuery, osmDownloadFilePath, overwrite)
    //     .then((results: IFetchAndSaveResult) => {
    //         console.log('Download Complete:');
    //         console.log('  SERVER:', results.osmDataFile.osmMetaData.osmServer);
    //         console.log('    DATE:', results.osmDataFile.osmMetaData.queryDate);
    //         console.log('    FILE:', results.osmDataFilePath);
    //     })
    //     .catch(error => {
    //         console.error('###################################################################################')
    //         console.error('DOWNLOAD FAILED:')
    //         console.error(error)
    //         console.error('###################################################################################')
    //         throw error;
    //     });


}
