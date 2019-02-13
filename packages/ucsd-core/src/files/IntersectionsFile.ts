import { writeFileSync, readFileSync } from 'fs'

import { LatLng } from '@geo-ball/geo-core';
import { GeoFileMetaData } from '..';
import { PointMapsFile } from './PointMapsFile';
import { findIntersections } from '../data/Intersections';
import { basename } from 'path';
import { readFile } from '@geo-ball/utils';


export class IntersectionsFile {
    metaData: GeoFileMetaData;
    intersections: Array<LatLng>;

    constructor(metaData: GeoFileMetaData, intersections: Array<LatLng>) {
        this.metaData = new GeoFileMetaData(metaData.bounds, metaData.timestamp);
        this.intersections = intersections;
    }

    static Extension = 'ucsd-int.json';
    static HasCorrectExtension(filePath: string): boolean {
        return basename(filePath).endsWith(IntersectionsFile.Extension);
    }

    static CreateFromPointsFile(pointsFile: PointMapsFile): IntersectionsFile {
        const metaData = IntersectionsFile.CreateMetaDataFromPoints(pointsFile)
        const intersections = findIntersections(pointsFile.pointsMap);
        return new IntersectionsFile(metaData, intersections);
    }

    static CreateMetaDataFromPoints(rsdFile: PointMapsFile): GeoFileMetaData {
        return new GeoFileMetaData(rsdFile.metaData.bounds, rsdFile.metaData.timestamp);
    }

    static SaveJsonFile(filePath: string, intersectionsFile: IntersectionsFile): void {
        // const pmf = {
        //     metaData: JSON.parse(JSON.stringify(pointsMapFLoad
        //     pointsMap: JSON.parse(pointsMapFile.pointsMap.serialize())
        // };
        // console.log(JSON.stringify(intersectionsFile, undefined, 4));
        return writeFileSync(filePath, JSON.stringify(intersectionsFile));
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
    static async Load(filePath: string): Promise<IntersectionsFile> {
        console.log('IntersectionsFile.Load', filePath);
        return readFile(filePath, 'utf8')
            .then(file => IntersectionsFile.CreateFromFileJson(file))
    }

     static LoadSync(filePath: string): IntersectionsFile {
        console.log('IntersectionsFile.Load', filePath);
        return IntersectionsFile.CreateFromFileJson(readFileSync(filePath, 'utf8'));
    }

    static CreateFromFileJson(fileJson: string): IntersectionsFile {
        const file = JSON.parse(fileJson);
        console.log('IntersectionsFile.Load.metaData', file.metaData);
        return new IntersectionsFile(file.metaData, file.intersections);
    }



    // // ORIG: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    // /// NEW: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential


    // static SaveJsonFile(filePath: string, roadSegmentsFile: IntersectionsFile): void {
    //     return writeFileSync(filePath, JSON.stringify(roadSegmentsFile));
    // }

    // static SaveTextFile(filePath: string, roadSegmentsFile: IntersectionsFile): void {
    //     const lines = roadSegmentsFile.segmentsData.map(rs => {
    //         const start = rs.start.lat + ' ' + rs.start.lng;
    //         const end = rs.end.lat + ' ' + rs.end.lng;
    //         return `${start} ${end} "${rs.name}" ${rs.type}`
    //     })
    //     return writeFileSync(filePath, lines.join('\r\n'));
    // }

    //         const start = rs.start.lat + ' ' + rs.start.lng;
    //         const end = rs.end.lat + ' ' + rs.end.lng;
    //         return `${start} ${end} "${rs.name}" ${rs.type}`
    //     })
    //     return writeFileSync(filePath, lines.join('\r\n'));
    // }

}
