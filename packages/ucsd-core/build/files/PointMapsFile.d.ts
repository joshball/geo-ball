import { IOpenStreetMapNode } from '@geo-ball/osm-data';
import { GeoFileMetaData } from './GeoFileMetaData';
import { RoadSegmentsFile } from './RoadSegmentsFile';
import { PointsToRoadSegmentsMap } from '../data/PointsToRoadSegmentsMap';
export declare class PointMapsFile {
    metaData: GeoFileMetaData;
    pointsMap: PointsToRoadSegmentsMap;
    constructor(metaData: GeoFileMetaData, pointsMap: PointsToRoadSegmentsMap);
    static Extension: string;
    static HasCorrectExtension(filePath: string): boolean;
    static Load(filePath: string): Promise<PointMapsFile>;
    static LoadSync(filePath: string): PointMapsFile;
    static CreateFromFileJson(fileJson: string): PointMapsFile;
    static CreateFromRsdFile(rsdFile: RoadSegmentsFile): PointMapsFile;
    static DeReferenceNode(nodes: Array<IOpenStreetMapNode>, nodeId: number): IOpenStreetMapNode;
    static CreatePointsToRoadSegmentsMapFromRsdFile(rsdFile: RoadSegmentsFile): PointsToRoadSegmentsMap;
    static CreateMetaDataFromRsd(rsdFile: RoadSegmentsFile): GeoFileMetaData;
    static SaveJsonFile(filePath: string, pointsMapFile: PointMapsFile): void;
}
//# sourceMappingURL=PointMapsFile.d.ts.map