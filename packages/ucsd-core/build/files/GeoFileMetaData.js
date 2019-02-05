"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geo_core_1 = require("@geo-ball/geo-core");
class GeoFileMetaData {
    constructor(bounds, timestamp) {
        const sw = new geo_core_1.LatLng(bounds.sw.lat, bounds.sw.lng);
        const ne = new geo_core_1.LatLng(bounds.ne.lat, bounds.ne.lng);
        this.bounds = new geo_core_1.LatLngBounds(sw, ne);
        this.timestamp = timestamp;
    }
    static CreateEmpty() {
        const emptyBounds = new geo_core_1.LatLngBounds(new geo_core_1.LatLng(0, 0), new geo_core_1.LatLng(0, 0));
        return new GeoFileMetaData(emptyBounds, new Date());
    }
}
exports.GeoFileMetaData = GeoFileMetaData;
//# sourceMappingURL=GeoFileMetaData.js.map