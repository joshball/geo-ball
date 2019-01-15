import { LatLng } from '@ball-maps/geo-core';
import { GeoFileMetaData } from '..';
import { PointMapsFile } from './PointMapsFile';
export declare class IntersectionsFile {
    metaData: GeoFileMetaData;
    intersections: Array<LatLng>;
    constructor(metaData: GeoFileMetaData, intersections: Array<LatLng>);
    static CreateFromPointsFile(pointsFile: PointMapsFile): IntersectionsFile;
    static CreateMetaDataFromPoints(rsdFile: PointMapsFile): GeoFileMetaData;
    static SaveJsonFile(filePath: string, intersectionsFile: IntersectionsFile): void;
    static LoadFromJsonFile(filePath: string): IntersectionsFile;
}
//# sourceMappingURL=IntersectionsFile.d.ts.map