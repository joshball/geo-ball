import { IOpenStreetMapNode } from '@ball-maps/osm-data';
import { GeoFileMetaData } from './GeoFileMetaData';
import { RoadSegmentsFile } from './RoadSegmentsFile';
import { PointsToRoadSegmentsMap } from '../data/PointsToRoadSegmentsMap';
export declare class PointMapsFile {
    metaData: GeoFileMetaData;
    pointsMap: PointsToRoadSegmentsMap;
    constructor(metaData: GeoFileMetaData, pointsMap: PointsToRoadSegmentsMap);
    static Extension: string;
    static HasCorrectExtension(filePath: string): boolean;
    static Load(filePath: string): PointMapsFile;
    static CreateFromRsdFile(rsdFile: RoadSegmentsFile): PointMapsFile;
    static DeReferenceNode(nodes: Array<IOpenStreetMapNode>, nodeId: number): IOpenStreetMapNode;
    static CreatePointsToRoadSegmentsMapFromRsdFile(rsdFile: RoadSegmentsFile): PointsToRoadSegmentsMap;
    static CreateMetaDataFromRsd(rsdFile: RoadSegmentsFile): GeoFileMetaData;
    static SaveJsonFile(filePath: string, pointsMapFile: PointMapsFile): void;
}
//# sourceMappingURL=PointMapsFile.d.ts.map