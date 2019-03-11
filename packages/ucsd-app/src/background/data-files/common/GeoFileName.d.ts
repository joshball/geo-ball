import { OsmRunError } from '../osm/OsmRunError';
export declare type GeoFileDataType = 'UNKNOWN' | 'JSON' | 'TEXT';
export interface IGeoFileName {
    path: string;
    fileName: string;
    split: Array<string>;
    segments: IGeoFileNameSegments;
    error: OsmRunError | undefined;
}
export declare type GeoFileType =
    | 'UNKNOWN'
    | 'INTERSECTIONS'
    | 'POINT_MAP'
    | 'ROAD_SEGMENTS'
    | 'OSM_DOWNLOAD'
    | 'OSM_QUERY';
export interface IGeoFileNameSegments {
    name: string;
    date: Date;
    type: GeoFileType;
    data: GeoFileDataType;
}
export declare class GeoFileName implements IGeoFileName {
    path: string;
    fileName: string;
    split: string[];
    segments: IGeoFileNameSegments;
    error: OsmRunError | undefined;
    constructor(path: string);
    static SplitGeoFileName: (fileName: string) => string[];
    static ParseGeoFileName: (split: string[]) => IGeoFileNameSegments;
    static GetGeoFileNameInterfaceFromPath: (path: string) => IGeoFileName;
}
export declare const FILE_DATE_STR = 'YYY-MM-DD_HHmmss';
export declare const fileDateStrToDate: (dateString: string) => Date;
export declare const dataTypeStrToDataType: (dataStr: string) => GeoFileDataType;
export declare const geoFileTypeStrToGeoType: (typeString: string) => GeoFileType;
export declare const geoFileTypeToStr: (type: GeoFileType) => string;
export declare const dateToFileDateStr: (date: Date) => string;
//# sourceMappingURL=GeoFileName.d.ts.map
