import { LatLngBounds } from '@ball-maps/geo-core';
import { OpenStreetmapFile } from '@ball-maps/osm-data';
import { RoadSegmentLine } from '../data/RoadSegmentLine';
export declare type IRoadSegmentsFileData = Array<RoadSegmentLine>;
export declare class RoadSegmentsFileMetaData {
    bounds: LatLngBounds;
    timestamp: Date;
    constructor(bounds: LatLngBounds, timestamp: Date);
    static CreateEmpty(): RoadSegmentsFileMetaData;
}
export declare class RoadSegmentsFile {
    metaData: RoadSegmentsFileMetaData;
    segmentsData: IRoadSegmentsFileData;
    constructor(metaData: RoadSegmentsFileMetaData, segmentsData: IRoadSegmentsFileData);
    static CreateFromOsm(osmFile: OpenStreetmapFile): RoadSegmentsFile;
    static CreateSegmentsDataFromOsm(_osmFile: OpenStreetmapFile): IRoadSegmentsFileData;
    static CreateMetaDataFromOsm(_osmFile: OpenStreetmapFile): RoadSegmentsFileMetaData;
    static LoadFromTextFile(filePath: string): RoadSegmentsFile;
    static LoadFromJsonFile(filePath: string): RoadSegmentsFile;
    static SaveJsonFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void;
    static SaveTextFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void;
}
