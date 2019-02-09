"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const fs_1 = require("fs");
const OpenStreetmapFile_1 = require("../files/OpenStreetmapFile");
const FAKE = __importStar(require("../test/FakeData"));
// https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
const OverPassApiEndpoints = {
    main: 'http://overpass-api.de/api/interpreter',
    lz4: 'https://lz4.overpass-api.de/api/interpreter',
    z: 'https://z.overpass-api.de/api/interpreter',
    fr: 'http://overpass.openstreetmap.fr/api/interpreter',
    kumi: 'https://overpass.kumi.systems/api/interpreter',
};
// const osmMetaData = new OpenStreetmapFileMetaData(this.endpoint, osmQuery);
class OpenStreetmapDownloader {
    static Fetch(query, endpoint = OpenStreetmapDownloader.DEFAULT_ENDPOINT, fakeTheDownload = false) {
        if (!query.latLngBounds || !query.latLngBounds.valid()) {
            throw new Error('OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
        }
        const url = endpoint;
        const osmFormattedQuery = query.toString();
        // const url = 'http://localhost:1234';
        console.log('overpass query:', osmFormattedQuery);
        console.log('\noverpass url:', url);
        if (fakeTheDownload) {
            console.log('Faking the download ;-)');
            return Promise.resolve(FAKE.osmQueryResp);
        }
        else {
            return axios_1.default.post(url, osmFormattedQuery).then(response => {
                // console.log('axios.post:', response.status);
                // console.log('axios.post response.data:', response.data);
                // console.log('axios.post response:', response);
                return response.data;
            });
        }
    }
    static FetchAndSave(osmQueryMeta, osmDataFilePath, overwriteFile = false, fakeTheDownload = false) {
        osmDataFilePath = path_1.resolve(osmDataFilePath);
        if (!overwriteFile && fs_1.existsSync(osmDataFilePath)) {
            throw new Error(`File exists [${osmDataFilePath}]`);
        }
        return OpenStreetmapDownloader.Fetch(osmQueryMeta.osmQuery, osmQueryMeta.osmServer, fakeTheDownload)
            .then((osmQueryResp) => {
            const osmDataFile = new OpenStreetmapFile_1.OpenStreetmapFile(osmQueryMeta, osmQueryResp);
            fs_1.writeFileSync(osmDataFilePath, JSON.stringify(osmDataFile, undefined, 4));
            return {
                osmDataFile,
                osmDataFilePath,
            };
        });
    }
    static FetchAndSaveEx(params) {
        const osmDataFilePath = path_1.resolve(params.fetchDir);
        // if (!params.overwrite && existsSync(osmDataFilePath)) {
        //     throw new Error(`File exists [${osmDataFilePath}]`);
        // }
        return OpenStreetmapDownloader.Fetch(osmQueryMeta.osmQuery, osmQueryMeta.osmServer, fakeTheDownload)
            .then((osmQueryResp) => {
            const osmDataFile = new OpenStreetmapFile_1.OpenStreetmapFile(osmQueryMeta, osmQueryResp);
            fs_1.writeFileSync(osmDataFilePath, JSON.stringify(osmDataFile, undefined, 4));
            return {
                osmDataFile,
                osmDataFilePath,
            };
        });
    }
}
OpenStreetmapDownloader.DEFAULT_ENDPOINT = OverPassApiEndpoints.main;
exports.OpenStreetmapDownloader = OpenStreetmapDownloader;
class OsmFetchManager {
    constructor(fetchRootPath) {
        this.fetchRootPath = path_1.resolve(fetchRootPath);
        this.runs =
        ;
    }
    createFetch(ldt) {
    }
}
exports.OsmFetchManager = OsmFetchManager;
//# sourceMappingURL=OpenStreetmapDownloader.1.js.map