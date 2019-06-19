import axios from 'axios';
import { resolve } from 'path';
import { writeFileSync, existsSync } from 'fs';
import {
    OpenStreetmapFile,
    OpenStreetmapFileMetaData,
} from '../files/OpenStreetmapFile';
import * as FAKE from '../test/FakeData';
import { LocalDateTime } from '@geo-ball/utils';
import { OverpassQuery, IOverpassQueryResponse } from './OverpassApi';
import { IGeographicBoundsDescription } from '../data';

// https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
const OverPassApiEndpoints = {
    main: 'http://overpass-api.de/api/interpreter',
    lz4: 'https://lz4.overpass-api.de/api/interpreter',
    z: 'https://z.overpass-api.de/api/interpreter',
    fr: 'http://overpass.openstreetmap.fr/api/interpreter',
    kumi: 'https://overpass.kumi.systems/api/interpreter',
};

export interface IFetchAndSaveResult {
    osmDataFile: OpenStreetmapFile;
    osmDataFilePath: string;
}
// const osmMetaData = new OpenStreetmapFileMetaData(this.endpoint, osmQuery);

export class OpenStreetmapDownloader {
    public static DEFAULT_ENDPOINT = OverPassApiEndpoints.main;

    public static Fetch(
        query: OverpassQuery,
        endpoint: string = OpenStreetmapDownloader.DEFAULT_ENDPOINT,
        fakeTheDownload: boolean = false
    ): Promise<IOverpassQueryResponse> {
        if (!query.latLngBounds || !query.latLngBounds.valid()) {
            throw new Error(
                'OpenStreetmapDownloader.fetch() query requires valid latLngBounds'
            );
        }
        const url = endpoint;
        const osmFormattedQuery = query.toString();

        // const url = 'http://localhost:1234';
        console.log('overpass query:', osmFormattedQuery);
        console.log('\noverpass url:', url);
        if (fakeTheDownload) {
            console.log('Faking the download ;-)');
            return Promise.resolve(FAKE.osmQueryResp);
        } else {
            return axios.post(url, osmFormattedQuery).then(response => {
                // console.log('axios.post:', response.status);
                // console.log('axios.post response.data:', response.data);
                // console.log('axios.post response:', response);
                return response.data;
            });
        }
    }

    public static FetchAndSave(
        osmQueryMeta: OpenStreetmapFileMetaData,
        osmDataFilePath: string,
        overwriteFile: boolean = false,
        fakeTheDownload: boolean = false
    ): Promise<IFetchAndSaveResult> {
        osmDataFilePath = resolve(osmDataFilePath);
        if (!overwriteFile && existsSync(osmDataFilePath)) {
            throw new Error(`File exists [${osmDataFilePath}]`);
        }
        return OpenStreetmapDownloader.Fetch(
            osmQueryMeta.osmQuery,
            osmQueryMeta.osmServer,
            fakeTheDownload
        ).then((osmQueryResp: IOverpassQueryResponse) => {
            const osmDataFile = new OpenStreetmapFile(
                osmQueryMeta,
                osmQueryResp
            );
            writeFileSync(
                osmDataFilePath,
                JSON.stringify(osmDataFile, undefined, 4)
            );
            return {
                osmDataFile,
                osmDataFilePath,
            };
        });
    }

    // public static FetchAndSaveEx(params: IOsmFetchAndSaveParams): Promise<IFetchAndSaveResult> {
    //     const osmDataFilePath = resolve(params.fetchDir);

    //     // if (!params.overwrite && existsSync(osmDataFilePath)) {
    //     //     throw new Error(`File exists [${osmDataFilePath}]`);
    //     // }
    //     return OpenStreetmapDownloader.Fetch(osmQueryMeta.osmQuery, osmQueryMeta.osmServer, fakeTheDownload)
    //         .then((osmQueryResp: IOverpassQueryResponse) => {
    //             const osmDataFile = new OpenStreetmapFile(osmQueryMeta, osmQueryResp);
    //             writeFileSync(osmDataFilePath, JSON.stringify(osmDataFile, undefined, 4));
    //             return {
    //                 osmDataFile,
    //                 osmDataFilePath,
    //             };
    //         });
    // }
}

// export class OsmFetchManager{
//     fetchRootPath: string;

//     constructor(fetchRootPath:string){
//         this.fetchRootPath = resolve(fetchRootPath);
//         this.runs =
//     }

//     createFetch(ldt:LocalDateTime){

//     }
// }
export interface IOsmFetchAndSaveParams {
    osmServer: string;
    queryDate: LocalDateTime;
    geoBounds: IGeographicBoundsDescription;
    fetchDir: string;
    overwrite: boolean;
    fake: boolean;
}
