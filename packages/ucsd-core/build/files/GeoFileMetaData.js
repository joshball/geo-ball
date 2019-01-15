"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geo_core_1 = require("@ball-maps/geo-core");
class GeoFileMetaData {
    constructor(bounds, timestamp) {
        const sw = new geo_core_1.LatLng(bounds.sw.lat, bounds.sw.lon);
        const ne = new geo_core_1.LatLng(bounds.ne.lat, bounds.ne.lon);
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