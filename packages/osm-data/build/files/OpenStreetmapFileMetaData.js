"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OpenStreetmapFileMetaData {
    constructor(osmFileMetaData) {
        this.osmServer = osmFileMetaData.osmServer;
        this.osmQuery = osmFileMetaData.osmQuery;
        this.queryDate = osmFileMetaData.queryDate;
        this.geoBounds = osmFileMetaData.geoBounds;
        this.originalFilePath = osmFileMetaData.originalFilePath;
    }
}
exports.OpenStreetmapFileMetaData = OpenStreetmapFileMetaData;
//# sourceMappingURL=OpenStreetmapFileMetaData.js.map