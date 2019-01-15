import { writeFileSync } from 'fs'
import {  IOpenStreetMapNode } from '@ball-maps/osm-data';
import { GeoFileMetaData } from './GeoFileMetaData';
import { RoadSegmentsFile } from './RoadSegmentsFile';
import { PointsToRoadSegmentsMap } from '../data/PointsToRoadSegmentsMap';


export class PointMapsFile {
    metaData: GeoFileMetaData;
    pointsMap: PointsToRoadSegmentsMap;

    constructor(metaData: GeoFileMetaData, pointsMap: PointsToRoadSegmentsMap) {
        this.metaData = new GeoFileMetaData(metaData.bounds, metaData.timestamp);
        this.pointsMap = pointsMap;
    }

    static CreateFromRsdFile(rsdFile: RoadSegmentsFile): PointMapsFile {
        const metaData = PointMapsFile.CreateMetaDataFromRsd(rsdFile);
        const pointsMap = PointMapsFile.CreatePointsToRoadSegmentsMapFromRsdFile(rsdFile);
        return new PointMapsFile(metaData, pointsMap);
    }

    static DeReferenceNode(nodes: Array<IOpenStreetMapNode>, nodeId: number): IOpenStreetMapNode {
        const node = nodes.find(f => f.id === nodeId);
        if (!node) {
            throw new Error('cant find node');
        }
        return node;
    }

    static CreatePointsToRoadSegmentsMapFromRsdFile(rsdFile: RoadSegmentsFile): PointsToRoadSegmentsMap {
        const pointMap = new PointsToRoadSegmentsMap();
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

    static CreateMetaDataFromRsd(rsdFile: RoadSegmentsFile): GeoFileMetaData {
        return new GeoFileMetaData(rsdFile.metaData.bounds, new Date(rsdFile.metaData.timestamp));
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
    // static LoadFromJsonFile(filePath: string): PointMapsFile {
    //     const file = JSON.parse(readFileSync(filePath, 'utf8'));
    //     return new PointMapsFile(file.metaData, file.segmentsData);
    // }

    // // ORIG: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    // /// NEW: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential


    static SaveJsonFile(filePath: string, pointsMapFile: PointMapsFile): void {
        const pmf = {
            metaData: JSON.parse(JSON.stringify(pointsMapFile.metaData)),
            pointsMap: JSON.parse(pointsMapFile.pointsMap.serialize())
        };
        // console.log(JSON.stringify(pmf.pointsMap, undefined, 4));
        return writeFileSync(filePath, JSON.stringify(pmf));
    }

    // static SaveTextFile(filePath: string, roadSegmentsFile: PointMapsFile): void {
    //     const lines = roadSegmentsFile.data.map(rs => {
    //         const start = rs.start.lat + ' ' + rs.start.lon;
    //         const end = rs.end.lat + ' ' + rs.end.lon;
    //         return `${start} ${end} "${rs.name}" ${rs.type}`
    //     })
    //     return writeFileSync(filePath, lines.join('\r\n'));
    // }

}
