import { LatLngBounds } from '@ball-maps/geo-core';
import { OpenStreetmapFile, IOpenStreetMapNode } from '@ball-maps/osm-data';
import { RoadSegmentLine } from '../data/RoadSegmentLine';
export declare type IRoadSegmentsFileData = Array<RoadSegmentLine>;
export declare class RoadSegmentsFileMetaData {
    bounds: LatLngBounds;
    timestamp: Date;
    constructor(bounds: LatLngBounds, timestamp: Date);
    static CreateEmpty(): RoadSegmentsFileMetaData;
}
export declare class IntersectionsFile {
    metaData: RoadSegmentsFileMetaData;
    segmentsData: IRoadSegmentsFileData;
    constructor(metaData: RoadSegmentsFileMetaData, segmentsData: IRoadSegmentsFileData);
    static CreateFromOsm(osmFile: OpenStreetmapFile): IntersectionsFile;
    static DeReferenceNode(nodes: Array<IOpenStreetMapNode>, nodeId: number): IOpenStreetMapNode;
    static CreateSegmentsDataFromOsm(_osmFile: OpenStreetmapFile): IRoadSegmentsFileData;
    static CreateMetaDataFromOsm(_osmFile: OpenStreetmapFile): RoadSegmentsFileMetaData;
    static LoadFromTextFile(filePath: string): IntersectionsFile;
    static LoadFromJsonFile(filePath: string): IntersectionsFile;
    static SaveJsonFile(filePath: string, roadSegmentsFile: IntersectionsFile): void;
    static SaveTextFile(filePath: string, roadSegmentsFile: IntersectionsFile): void;
}
//# sourceMappingURL=IntersectionFile.d.ts.map