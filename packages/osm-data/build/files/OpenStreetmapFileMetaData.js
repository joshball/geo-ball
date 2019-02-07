"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenStreetmapQuery_1 = require("../api/OpenStreetmapQuery");
class OpenStreetmapFileMetaData {
    constructor(osmServer, osmQuery, queryName, queryDesc, queryBoundsArea, queryDate = new Date().toISOString()) {
        this.osmServer = osmServer;
        // this.osmQuery = new OpenStreetmapQuery(osmQuery.latLngBounds, osmQuery.features, osmQuery.outFormat, osmQuery.timeoutInSec);
        this.osmQuery = new OpenStreetmapQuery_1.OpenStreetmapQuery(osmQuery);
        this.queryName = queryName;
        this.queryDesc = queryDesc;
        this.queryBoundsArea = queryBoundsArea;
        this.queryDate = queryDate;
    }
}
exports.OpenStreetmapFileMetaData = OpenStreetmapFileMetaData;
//# sourceMappingURL=OpenStreetmapFileMetaData.js.map