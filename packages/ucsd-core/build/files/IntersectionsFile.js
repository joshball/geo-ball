"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const __1 = require("..");
const Intersections_1 = require("../data/Intersections");
class IntersectionsFile {
    constructor(metaData, intersections) {
        this.metaData = new __1.GeoFileMetaData(metaData.bounds, metaData.timestamp);
        this.intersections = intersections;
    }
    static CreateFromPointsFile(pointsFile) {
        const metaData = IntersectionsFile.CreateMetaDataFromPoints(pointsFile);
        const intersections = Intersections_1.findIntersections(pointsFile.pointsMap);
        return new IntersectionsFile(metaData, intersections);
    }
    static CreateMetaDataFromPoints(rsdFile) {
        return new __1.GeoFileMetaData(rsdFile.metaData.bounds, new Date(rsdFile.metaData.timestamp));
    }
    static SaveJsonFile(filePath, intersectionsFile) {
        // const pmf = {
        //     metaData: JSON.parse(JSON.stringify(pointsMapFile.metaData)),
        //     pointsMap: JSON.parse(pointsMapFile.pointsMap.serialize())
        // };
        // console.log(JSON.stringify(intersectionsFile, undefined, 4));
        return fs_1.writeFileSync(filePath, JSON.stringify(intersectionsFile));
    }
    // static SaveTextFile(filePath: string, roadSegmentsFile: IntersectionsFile): void {
    //     const lines = roadSegmentsFile.segmentsData.map(rs => {
    //         const start = rs.start.lat + ' ' + rs.start.lng;
    //         const end = rs.end.lat + ' ' + rs.end.lng;
    //         return `${start} ${end} "${rs.name}" ${rs.type}`
    //     })
    //     return writeFileSync(filePath, lines.join('\r\n'));
    // }
    // static LoadFromTextFile(filePath: string): IntersectionsFile {
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
    //     return new IntersectionsFile(metaData, roadSegments);;
    // }
    static LoadFromJsonFile(filePath) {
        console.log('IntersectionsFile.LoadFromJsonFile', filePath);
        const file = JSON.parse(fs_1.readFileSync(filePath, 'utf8'));
        console.log('IntersectionsFile.LoadFromJsonFile.metaData', file.metaData);
        return new IntersectionsFile(file.metaData, file.intersections);
    }
}
exports.IntersectionsFile = IntersectionsFile;
//# sourceMappingURL=IntersectionsFile.js.map