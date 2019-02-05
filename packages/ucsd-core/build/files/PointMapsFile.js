"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const GeoFileMetaData_1 = require("./GeoFileMetaData");
const PointsToRoadSegmentsMap_1 = require("../data/PointsToRoadSegmentsMap");
const path_1 = require("path");
class PointMapsFile {
    constructor(metaData, pointsMap) {
        this.metaData = new GeoFileMetaData_1.GeoFileMetaData(metaData.bounds, metaData.timestamp);
        this.pointsMap = pointsMap;
    }
    static HasCorrectExtension(filePath) {
        return path_1.basename(filePath).endsWith(PointMapsFile.Extension);
    }
    static Load(filePath) {
        console.log('PointMapsFile.Load', filePath);
        const file = JSON.parse(fs_1.readFileSync(filePath, 'utf8'));
        console.log('IntersectionsFile.Load.metaData', file.metaData);
        return new PointMapsFile(file.metaData, file.intersections);
    }
    static CreateFromRsdFile(rsdFile) {
        const metaData = PointMapsFile.CreateMetaDataFromRsd(rsdFile);
        const pointsMap = PointMapsFile.CreatePointsToRoadSegmentsMapFromRsdFile(rsdFile);
        return new PointMapsFile(metaData, pointsMap);
    }
    static DeReferenceNode(nodes, nodeId) {
        const node = nodes.find(f => f.id === nodeId);
        if (!node) {
            throw new Error('cant find node');
        }
        return node;
    }
    static CreatePointsToRoadSegmentsMapFromRsdFile(rsdFile) {
        const pointMap = new PointsToRoadSegmentsMap_1.PointsToRoadSegmentsMap();
        // let i = 0;
        rsdFile.segmentsData.forEach(rsl => {
            pointMap.addToPointsMapOneWay(rsl);
            // if (rsl.maxSpeed.indexOf('70') === 0 && i < 5) {
            //     i++
            //     pointMap.addToPointsMapOneWay(rsl);
            // }
        });
        return pointMap;
    }
    static CreateMetaDataFromRsd(rsdFile) {
        return new GeoFileMetaData_1.GeoFileMetaData(rsdFile.metaData.bounds, new Date(rsdFile.metaData.timestamp));
    }
    // static LoadFromTextFile(filePath: string): PointMapsFile {
    //     const lines = readFileSync(filePath, 'utf8')
    //         .split(/\r?\n/)
    //         .filter(l => l !== '');
    //     const roadSegments = lines
    //         .map(l => {
    //             return RoadSegmentLine.CreateFromString(l);
    //         })
    //     const bounds = new LatLngBounds(new LatLng(1, 1), new LatLng(3, 3));
    //     const metaData = GeoFileMetaData.CreateEmpty();
    //     // return new RoadSegmentsFile(bounds, new Date(), roadSegments);;
    //     return new PointMapsFile(metaData, roadSegments);;
    // }
    // static Load(filePath: string): PointMapsFile {
    //     const file = JSON.parse(readFileSync(filePath, 'utf8'));
    //     return new PointMapsFile(file.metaData, file.segmentsData);
    // }
    // // ORIG: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    // /// NEW: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    static SaveJsonFile(filePath, pointsMapFile) {
        const pmf = {
            metaData: JSON.parse(JSON.stringify(pointsMapFile.metaData)),
            pointsMap: JSON.parse(pointsMapFile.pointsMap.serialize())
        };
        // console.log(JSON.stringify(pmf.pointsMap, undefined, 4));
        return fs_1.writeFileSync(filePath, JSON.stringify(pmf));
    }
}
PointMapsFile.Extension = 'ucsd-pmf.json';
exports.PointMapsFile = PointMapsFile;
//# sourceMappingURL=PointMapsFile.js.map