"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const path_1 = require("path");
const fs_1 = require("fs");
const OpenStreetmapFile_1 = require("../files/OpenStreetmapFile");
// https://wiki.openstreetmap.org/wiki/Overpass_API#Public_Overpass_API_instances
const OverPassApiEndpoints = {
    main: 'http://overpass-api.de/api/interpreter',
    lz4: 'https://lz4.overpass-api.de/api/interpreter',
    z: 'https://z.overpass-api.de/api/interpreter',
    fr: 'http://overpass.openstreetmap.fr/api/interpreter',
    kumi: 'https://overpass.kumi.systems/api/interpreter',
};
const DEFAULT_ENDPOINT = OverPassApiEndpoints.main;
class OpenStreetmapDownloader {
    constructor(endpoint) {
        this.endpoint = endpoint || DEFAULT_ENDPOINT;
    }
    fetch(query) {
        if (!query.latLngBounds || !query.latLngBounds.valid()) {
            throw new Error('OpenStreetmapDownloader.fetch() query requires valid latLngBounds');
        }
        const url = this.endpoint;
        const osmFormattedQuery = query.toString();
        // const url = 'http://localhost:1234';
        console.log('overpass query:', osmFormattedQuery);
        console.log('\noverpass url:', url);
        return axios_1.default.post(url, osmFormattedQuery).then(response => {
            // console.log('axios.post:', response.status);
            // console.log('axios.post response.data:', response.data);
            // console.log('axios.post response:', response);
            return response.data;
        });
    }
    fetchAndSave(osmQuery, osmDataFilePath, overwriteFile = false) {
        osmDataFilePath = path_1.resolve(osmDataFilePath);
        if (!overwriteFile && fs_1.existsSync(osmDataFilePath)) {
            throw new Error(`File exists [${osmDataFilePath}]`);
        }
        const osmMetaData = new OpenStreetmapFile_1.OpenStreetmapFileMetaData(this.endpoint, osmQuery);
        return this.fetch(osmQuery).then((osmQueryResp) => {
            const osmDataFile = new OpenStreetmapFile_1.OpenStreetmapFile(osmMetaData, osmQueryResp);
            fs_1.writeFileSync(osmDataFilePath, JSON.stringify(osmDataFile, undefined, 4));
            return {
                osmDataFile,
                osmDataFilePath,
            };
        });
    }
}
exports.OpenStreetmapDownloader = OpenStreetmapDownloader;
//# sourceMappingURL=OpenStreetmapDownloader.js.map