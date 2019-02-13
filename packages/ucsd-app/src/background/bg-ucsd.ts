import { IChannelCallback } from './index.new';
import { PathLike } from 'fs';
import { IGeographicBoundsDescription, OpenStreetmapDownloader, OpenStreetmapFileMetaData, IFetchAndSaveResult, OpenStreetmapQuery, IOpenStreetmapQuery, OSMFeatureKeyValuePair, OSMFeatureKey } from '@geo-ball/osm-data';
import { LatLngBounds } from '@geo-ball/geo-core';
import { LocalDateTime } from '@geo-ball/utils';
import { OsmFetchManager } from '@geo-ball/ucsd-core';


export interface IDownloadOsmParams {
    geoBounds: IGeographicBoundsDescription;
    fake: boolean;
}
export interface IDownloadOsmResult {
    geoBounds: IGeographicBoundsDescription;
    path: string;
}

export class BackgroundOsmFetchManager {
    OFM: OsmFetchManager | undefined;

    loadOsmFetchManager = async (path: string, _window: any): Promise<OsmFetchManager> => {
        console.log('loadOsmFetchManager path', path)
        this.OFM = new OsmFetchManager(path);
        console.log('loadOsmFetchManager OFM', this.OFM)
        return this.OFM.load().then(() => {
            console.log('RETURNING: this.OFM!', this.OFM!);
            return this.OFM!;
        });
    }
}



export const downloadOsm = async (params: IDownloadOsmParams, _window: any): Promise<IDownloadOsmResult> => {
    console.log('');
    console.log('======================================== downloadOsm ========================================');
    console.log('params:', params);

    // server
    // query?
    // directory to save it in
    // overwrite?
    //     osmServer: string;
    // osmQuery: OpenStreetmapQuery;
    // queryDate: LocalDateTime;
    // geoBounds: GeographicBoundsDescription;
    // originalFilePath: string;

    // return OpenStreetmapDownloader.FetchAndSaveEx(osmParams.geoBounds, osmParams.fake)
    //     .then((results: IFetchAndSaveResult) => {
    //         console.log('Download Complete:');
    //         console.log('  SERVER:', results.osmDataFile.osmMetaData.osmServer);
    //         console.log('    DATE:', results.osmDataFile.osmMetaData.queryDate);
    //         console.log('    FILE:', results.osmDataFilePath);
    //     })
    //     .catch((error: Error) => {
    //         console.error('###################################################################################')
    //         console.error('DOWNLOAD FAILED:')
    //         console.error(error)
    //         console.error('###################################################################################')
    //         throw error;
    //     });

    return {
        geoBounds: params.geoBounds,
        path: 'foo'
    };
}

export const processOsm = async (osmFilePath: string, _window: any): Promise<void> => {
    console.log('');
    console.log('======================================== processOsm ========================================');
    console.log('osmFilePath:', osmFilePath);
}


export const BOFM = new BackgroundOsmFetchManager();

// BGW - BackGroundWindow
export const UCSD_CHANNELS: Array<IChannelCallback> = [
    {
        name: 'loadOsmFetchManager',
        namespace: 'UCSD',
        channel: 'BGW.loadOsmFetchManager',
        callback: BOFM.loadOsmFetchManager
    },
    {
        name: 'downloadOsm',
        namespace: 'UCSD',
        channel: 'BGW.downloadOsm',
        callback: downloadOsm
    },
    {
        name: 'processOsm',
        namespace: 'UCSD',
        channel: 'BGW.processOsm',
        callback: processOsm
    },
];




export const downloadOsmFileEx = async (osmParams: IDownloadOsmParams): Promise<void> => {
    // console.log('downloadOsmFile(bounds)', osmParams);
    // const osmQuery = getOsmQuery(osmParams.bounds)
    // const overwrite = true;
    // const osmDownloadFilePath = osmParams.name || 'map-query';
    // const endpoint = OpenStreetmapDownloader.DEFAULT_ENDPOINT;
    // const osmMeta = new OpenStreetmapFileMetaData(endpoint, osmQuery, osmParams.name, osmParams.desc, osmQuery.latLngBounds);


    // return OpenStreetmapDownloader.FetchAndSave(osmMeta, osmDownloadFilePath, overwrite, osmParams.fake)
    //     .then((results: IFetchAndSaveResult) => {
    //         console.log('Download Complete:');
    //         console.log('  SERVER:', results.osmDataFile.osmMetaData.osmServer);
    //         console.log('    DATE:', results.osmDataFile.osmMetaData.queryDate);
    //         console.log('    FILE:', results.osmDataFilePath);
    //     })
    //     .catch((error: Error) => {
    //         console.error('###################################################################################')
    //         console.error('DOWNLOAD FAILED:')
    //         console.error(error)
    //         console.error('###################################################################################')
    //         throw error;
    //     });


}


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

// export interface DownloadOsmParams {
//     bounds: LatLngBounds;
//     center: ILatLng;
//     name: string;
//     desc: string;
//     area: string;
//     fake: boolean;
// }
