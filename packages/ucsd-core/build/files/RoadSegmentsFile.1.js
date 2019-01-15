"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const geo_core_1 = require("@ball-maps/geo-core");
const RoadSegmentLine_1 = require("../data/RoadSegmentLine");
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
class RoadSegmentsFile {
    constructor(metaData, segmentsData) {
        this.metaData = new GeoFileMetaData(metaData.bounds, metaData.timestamp);
        this.segmentsData = segmentsData;
    }
    static CreateFromOsm(osmFile) {
        const metaData = RoadSegmentsFile.CreateMetaDataFromOsm(osmFile);
        const segmentsData = RoadSegmentsFile.CreateSegmentsDataFromOsm(osmFile);
        return new RoadSegmentsFile(metaData, segmentsData);
    }
    static DeReferenceNode(nodes, nodeId) {
        const node = nodes.find(f => f.id === nodeId);
        if (!node) {
            throw new Error('cant find node');
        }
        return node;
    }
    static CreateSegmentsDataFromOsm(_osmFile) {
        const segments = [];
        const { elements } = _osmFile.getElements();
        const ways = elements.filter(e => e.type === 'way');
        const nodes = elements.filter(e => e.type === 'node');
        ways
            .forEach((e) => {
            const way = e;
            const name = way.tags.name;
            const highway = way.tags.highway;
            const lanes = way.tags.lanes;
            const maxSpeed = way.tags.maxspeed;
            const oneWay = way.tags.oneway === 'yes';
            const nodeIds = way.nodes || [];
            if (nodeIds.length < 2) {
                throw new Error('NODE LEN < 2');
            }
            for (let i = 0; i < nodeIds.length - 1; i++) {
                const start = RoadSegmentsFile.DeReferenceNode(nodes, nodeIds[i]);
                const startLatLng = new geo_core_1.LatLng(start.lat, start.lon);
                const end = RoadSegmentsFile.DeReferenceNode(nodes, nodeIds[i + 1]);
                const endLatLng = new geo_core_1.LatLng(end.lat, end.lon);
                // BUG: CHECK BOUNDS
                segments.push(new RoadSegmentLine_1.RoadSegmentLine(startLatLng, endLatLng, name, highway, maxSpeed, lanes));
                if (!oneWay) {
                    segments.push(new RoadSegmentLine_1.RoadSegmentLine(endLatLng, startLatLng, name, highway, maxSpeed, lanes));
                }
            }
        });
        return segments;
    }
    static CreateMetaDataFromOsm(_osmFile) {
        return new GeoFileMetaData(_osmFile.osmMetaData.osmQuery.latLngBounds, new Date(_osmFile.osmMetaData.queryDate));
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
        const metaData = GeoFileMetaData.CreateEmpty();
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
//# sourceMappingURL=RoadSegmentsFile.1.js.map