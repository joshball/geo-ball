"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const geo_core_1 = require("@geo-ball/geo-core");
const utils_1 = require("@geo-ball/utils");
;
;
exports.createNewBounds = () => {
    const objBounds = {
        southWest: {
            lat: 32.859375,
            lng: -117.27233,
        },
        northEast: {
            lat: 32.902622,
            lng: -117.20367,
        }
    };
    const sw = new geo_core_1.LatLng(objBounds.southWest.lat, objBounds.southWest.lng);
    const ne = new geo_core_1.LatLng(objBounds.northEast.lat, objBounds.northEast.lng);
    const latLngBounds = new geo_core_1.LatLngBounds(sw, ne);
    return {
        objBounds,
        sw,
        ne,
        latLngBounds
    };
};
exports.createOsmFileMetaData = (latLngBoundsTestData) => {
    latLngBoundsTestData = latLngBoundsTestData || exports.createNewBounds();
    const latLngBounds = latLngBoundsTestData.latLngBounds;
    const iOsmQuery = { latLngBounds: latLngBoundsTestData.latLngBounds };
    const osmQuery = new __1.OpenStreetmapQuery(iOsmQuery);
    const queryName = 'queryName';
    const queryDesc = 'queryDesc';
    const originalFilePath = 'originalFilePath';
    const queryDate = utils_1.LocalDateTime.Now();
    const iGeoBounds = {
        date: queryDate,
        name: queryName,
        description: queryDesc,
        latLngBoundsArea: latLngBounds,
        address: '123 State St, Salt Lake City, UT 8401',
        geocodedAddress: '123 State St, Salt Lake City, UT 8401',
    };
    const geoBounds = new __1.GeographicBoundsDescription(iGeoBounds);
    return {
        osmServer: 'osm-endpoint',
        osmQuery,
        queryDate,
        geoBounds,
        originalFilePath
    };
};
exports.dataDir = '.';
exports.osmJsonResp = {
    "version": 0.6,
    "generator": "Overpass API 0.7.55.4 3079d8ea",
    "osm3s": {
        "timestamp_osm_base": "2018-10-23T19:14:02Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
    },
    "elements": [
        {
            "type": "node",
            "id": 83550018,
            "lat": 40.7192445,
            "lon": -111.8535611,
            "tags": {
                "highway": "traffic_signals"
            }
        }
    ]
};
//# sourceMappingURL=TestData.js.map