"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const geo_core_1 = require("@geo-ball/geo-core");
;
;
exports.createNewBounds = () => {
    const objBounds = {
        sw: {
            lat: 32.859375,
            lng: -117.27233,
        },
        ne: {
            lat: 32.902622,
            lng: -117.20367,
        }
    };
    const sw = new geo_core_1.LatLng(objBounds.sw.lat, objBounds.sw.lng);
    const ne = new geo_core_1.LatLng(objBounds.ne.lat, objBounds.ne.lng);
    const latLngBounds = new geo_core_1.LatLngBounds(sw, ne);
    return {
        objBounds,
        sw,
        ne,
        latLngBounds
    };
};
exports.createNewOpenStreetmapFileMetaData = () => {
    const { query } = exports.createNewOpenStreetmapQuery();
    return new __1.OpenStreetmapFileMetaData('osm-endpoint', query);
};
exports.createNewOpenStreetmapQuery = (latLngBoundsTestData) => {
    latLngBoundsTestData = latLngBoundsTestData || exports.createNewBounds();
    const osmQuery = { latLngBounds: latLngBoundsTestData.latLngBounds };
    const query = new __1.OpenStreetmapQuery(osmQuery);
    return {
        query,
        latLngBoundsTestData
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