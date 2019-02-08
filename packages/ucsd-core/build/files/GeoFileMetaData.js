"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geo_core_1 = require("@geo-ball/geo-core");
const utils_1 = require("@geo-ball/utils");
class GeoFileMetaData {
    constructor(bounds, timestamp) {
        const sw = new geo_core_1.LatLng(bounds.southWest.lat, bounds.southWest.lng);
        const ne = new geo_core_1.LatLng(bounds.northEast.lat, bounds.northEast.lng);
        this.bounds = new geo_core_1.LatLngBounds(sw, ne);
        this.timestamp = timestamp;
    }
    static CreateEmpty() {
        const emptyBounds = new geo_core_1.LatLngBounds(new geo_core_1.LatLng(0, 0), new geo_core_1.LatLng(0, 0));
        return new GeoFileMetaData(emptyBounds, utils_1.LocalDateTime.Now());
    }
}
exports.GeoFileMetaData = GeoFileMetaData;
//# sourceMappingURL=GeoFileMetaData.js.map