import { writeFileSync, readFileSync } from 'fs';

import { LatLngBounds, LatLng } from '@geo-ball/geo-core';
import {
    OpenStreetmapFile,
    IOpenStreetMapWay,
    OpenStreetMapElements,
    IOpenStreetMapNode,
} from '@geo-ball/osm-data';

import { RoadSegmentLine, RoadSegmentType } from '../data/RoadSegmentLine';
import { GeoFileMetaData } from './GeoFileMetaData';
import { basename } from 'path';
import { readFile } from '@geo-ball/utils';

export type IRoadSegmentsFileData = Array<RoadSegmentLine>;

export class RoadSegmentsFile {
    metaData: GeoFileMetaData;
    segmentsData: IRoadSegmentsFileData;

    constructor(metaData: GeoFileMetaData, segmentsData: IRoadSegmentsFileData) {
        this.metaData = new GeoFileMetaData(metaData.bounds, metaData.timestamp);
        this.segmentsData = segmentsData;
    }

    static Extension = 'ucsd-rsd.json';
    static HasCorrectExtension(filePath: string): boolean {
        return basename(filePath).endsWith(RoadSegmentsFile.Extension);
    }

    static CreateFromOsm(osmFile: OpenStreetmapFile): RoadSegmentsFile {
        const metaData = RoadSegmentsFile.CreateMetaDataFromOsm(osmFile);
        const segmentsData = RoadSegmentsFile.CreateSegmentsDataFromOsm(osmFile);
        return new RoadSegmentsFile(metaData, segmentsData);
    }

    static DeReferenceNode(nodes: Array<IOpenStreetMapNode>, nodeId: number): IOpenStreetMapNode {
        const node = nodes.find(f => f.id === nodeId);
        if (!node) {
            throw new Error('cant find node');
        }
        return node;
    }

    static CreateSegmentsDataFromOsm(_osmFile: OpenStreetmapFile): IRoadSegmentsFileData {
        const segments: IRoadSegmentsFileData = [];
        const { elements } = _osmFile.getElements();
        const ways = elements.filter(e => e.type === 'way') as Array<IOpenStreetMapWay>;
        const nodes = elements.filter(e => e.type === 'node') as Array<IOpenStreetMapNode>;
        ways.forEach(e => {
            const way = e as IOpenStreetMapWay;
            const name = way.tags.name!;
            const highway = way.tags.highway! as RoadSegmentType;
            const lanes = way.tags.lanes;
            const maxSpeed = way.tags.maxspeed;
            const oneWay = way.tags.oneway === 'yes';
            const nodeIds = way.nodes || [];
            if (nodeIds.length < 2) {
                throw new Error('NODE LEN < 2');
            }
            for (let i = 0; i < nodeIds.length - 1; i++) {
                const start = RoadSegmentsFile.DeReferenceNode(nodes, nodeIds[i]);
                const startLatLng = new LatLng(start.lat, start.lon);
                const end = RoadSegmentsFile.DeReferenceNode(nodes, nodeIds[i + 1]);
                const endLatLng = new LatLng(end.lat, end.lon);
                // BUG: CHECK BOUNDS

                segments.push(
                    new RoadSegmentLine(startLatLng, endLatLng, name, highway, maxSpeed, lanes),
                );
                if (!oneWay) {
                    segments.push(
                        new RoadSegmentLine(endLatLng, startLatLng, name, highway, maxSpeed, lanes),
                    );
                }
            }
        });
        return segments;
    }
    static CreateMetaDataFromOsm(_osmFile: OpenStreetmapFile): GeoFileMetaData {
        return new GeoFileMetaData(
            _osmFile.osmMetaData.osmQuery.latLngBounds,
            _osmFile.osmMetaData.queryDate,
        );
    }

    static LoadFromTextFile(filePath: string): RoadSegmentsFile {
        const lines = readFileSync(filePath, 'utf8')
            .split(/\r?\n/)
            .filter(l => l !== '');

        const roadSegments = lines.map(l => {
            return RoadSegmentLine.CreateFromString(l);
        });
        const bounds = new LatLngBounds(new LatLng(1, 1), new LatLng(3, 3));
        const metaData = GeoFileMetaData.CreateEmpty();
        // return new RoadSegmentsFile(bounds, new Date(), roadSegments);;
        return new RoadSegmentsFile(metaData, roadSegments);
    }

    static async Load(filePath: string): Promise<RoadSegmentsFile> {
        console.log('RoadSegmentsFile.Load', filePath);
        return readFile(filePath, 'utf8').then(file => RoadSegmentsFile.CreateFromFileJson(file));
    }

    static LoadSync(filePath: string): RoadSegmentsFile {
        console.log('RoadSegmentsFile.Load', filePath);
        return RoadSegmentsFile.CreateFromFileJson(readFileSync(filePath, 'utf8'));
    }

    static CreateFromFileJson(fileJson: string): RoadSegmentsFile {
        const file = JSON.parse(fileJson);
        console.log('RoadSegmentsFile.Load.metaData', file.metaData);
        return new RoadSegmentsFile(file.metaData, file.segmentsData);
    }

    // ORIG: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential
    /// NEW: 32.8769858 -117.2359995 32.8771038 -117.2360337 "Myers Drive" residential

    static SaveJsonFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void {
        return writeFileSync(filePath, JSON.stringify(roadSegmentsFile));
    }

    static SaveTextFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void {
        const lines = roadSegmentsFile.segmentsData.map(rs => {
            const start = rs.start.lat + ' ' + rs.start.lng;
            const end = rs.end.lat + ' ' + rs.end.lng;
            return `${start} ${end} "${rs.name}" ${rs.type}`;
        });
        return writeFileSync(filePath, lines.join('\r\n'));
    }
}
