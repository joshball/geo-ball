import { OpenStreetmapFile, IOpenStreetMapNode } from '@geo-ball/osm-data';
import { RoadSegmentLine } from '../data/RoadSegmentLine';
import { GeoFileMetaData } from './GeoFileMetaData';
export declare type IRoadSegmentsFileData = Array<RoadSegmentLine>;
export declare class RoadSegmentsFile {
    metaData: GeoFileMetaData;
    segmentsData: IRoadSegmentsFileData;
    constructor(metaData: GeoFileMetaData, segmentsData: IRoadSegmentsFileData);
    static Extension: string;
    static HasCorrectExtension(filePath: string): boolean;
    static CreateFromOsm(osmFile: OpenStreetmapFile): RoadSegmentsFile;
    static DeReferenceNode(nodes: Array<IOpenStreetMapNode>, nodeId: number): IOpenStreetMapNode;
    static CreateSegmentsDataFromOsm(_osmFile: OpenStreetmapFile): IRoadSegmentsFileData;
    static CreateMetaDataFromOsm(_osmFile: OpenStreetmapFile): GeoFileMetaData;
    static LoadFromTextFile(filePath: string): RoadSegmentsFile;
    static Load(filePath: string): Promise<RoadSegmentsFile>;
    static LoadSync(filePath: string): RoadSegmentsFile;
    static CreateFromFileJson(fileJson: string): RoadSegmentsFile;
    static SaveJsonFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void;
    static SaveTextFile(filePath: string, roadSegmentsFile: RoadSegmentsFile): void;
}
//# sourceMappingURL=RoadSegmentsFile.d.ts.map