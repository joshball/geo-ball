"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const geo_core_1 = require("@ball-maps/geo-core");
const RoadSegmentLine_1 = require("../data/RoadSegmentLine");
class RoadSegmentsFileMetaData {
    constructor(bounds, timestamp) {
        this.bounds = bounds;
        this.timestamp = timestamp;
    }
    static CreateEmpty() {
        const emptyBounds = new geo_core_1.LatLngBounds(new geo_core_1.LatLng(0, 0), new geo_core_1.LatLng(0, 0));
        return new RoadSegmentsFileMetaData(emptyBounds, new Date());
    }
}
exports.RoadSegmentsFileMetaData = RoadSegmentsFileMetaData;
class RoadSegmentsFile {
    constructor(metaData, segmentsData) {
        this.metaData = metaData;
        this.segmentsData = segmentsData;
    }
    static CreateFromOsm(osmFile) {
        const metaData = RoadSegmentsFile.CreateMetaDataFromOsm(osmFile);
        const segmentsData = RoadSegmentsFile.CreateSegmentsDataFromOsm(osmFile);
        return new RoadSegmentsFile(metaData, segmentsData);
    }
    static CreateSegmentsDataFromOsm(_osmFile) {
        throw new Error("Method not implemented.");
    }
    static CreateMetaDataFromOsm(_osmFile) {
        throw new Error("Method not implemented.");
    }
    static LoadFromTextFile(filePath) {
        const lines = fs_1.readFileSync(filePath, 'utf8')
            .split(/\r?\n/)
            .filter(l => l !== '');
        const roadSegments = lines
            .map(l => {
            return RoadSegmentLine_1.RoadSegmentLine.CreateFromString(l);
        });
        const bounds = new geo_core_1.LatLngBounds(new geo_core_1.LatLng(1, 1), new geo_core_1.LatLng(3, 3));
        const metaData = RoadSegmentsFileMetaData.CreateEmpty();
        // return new RoadSegmentsFile(bounds, new Date(), roadSegments);;
        return new RoadSegmentsFile(metaData, roadSegments);
        ;
    }
    static LoadFromJsonFile(filePath) {
        const file = JSON.parse(fs_1.readFileSync(filePath, 'utf8'));
        return new RoadSegmentsFile(file.metaData, file.segmentsData);
    }
    // ORIG: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    /// NEW: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    static SaveJsonFile(filePath, roadSegmentsFile) {
        return fs_1.writeFileSync(filePath, JSON.stringify(roadSegmentsFile));
    }
    static SaveTextFile(filePath, roadSegmentsFile) {
        const lines = roadSegmentsFile.segmentsData.map(rs => {
            const start = rs.start.lat + ' ' + rs.start.lon;
            const end = rs.end.lat + ' ' + rs.end.lon;
            return `${start} ${end} "${rs.name}" ${rs.type}`;
        });
        return fs_1.writeFileSync(filePath, lines.join('\r\n'));
    }
}
exports.RoadSegmentsFile = RoadSegmentsFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9hZFNlZ21lbnRzRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9maWxlcy9Sb2FkU2VnbWVudHNGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQWdEO0FBRWhELGtEQUEyRDtBQUczRCw2REFBMEQ7QUFLMUQsTUFBYSx3QkFBd0I7SUFJcEMsWUFBWSxNQUFtQixFQUFFLFNBQWU7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXO1FBQ2pCLE1BQU0sV0FBVyxHQUFHLElBQUksdUJBQVksQ0FBQyxJQUFJLGlCQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksaUJBQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxPQUFPLElBQUksd0JBQXdCLENBQUMsV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Q7QUFiRCw0REFhQztBQUdELE1BQWEsZ0JBQWdCO0lBSTVCLFlBQVksUUFBa0MsRUFBRSxZQUFtQztRQUNsRixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxPQUEwQjtRQUM5QyxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNoRSxNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RSxPQUFPLElBQUksZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFHRCxNQUFNLENBQUMseUJBQXlCLENB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