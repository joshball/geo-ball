import { resolve, join, parse as parsePath } from 'path';
import { OsmRunError } from '../osm/OsmRunError';
import { IGeoFileInfo } from './GeoFileInfo';
import { format } from 'date-fns';
import { parse } from 'date-fns';
export type GeoFileDataType = 'UNKNOWN' | 'JSON' | 'TEXT';

export interface IGeoFileName {
    path: string;
    fileName: string;
    split: Array<string>;
    segments: IGeoFileNameSegments;
    error: OsmRunError | undefined;
}

export type GeoFileType =
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

export class GeoFileName implements IGeoFileName {
    path: string;
    fileName: string;
    split: string[];
    segments: IGeoFileNameSegments;
    error: OsmRunError | undefined;

    constructor(path: string) {
        const igf = GeoFileName.GetGeoFileNameInterfaceFromPath(path);
        this.path = igf.path;
        this.fileName = igf.fileName;
        this.split = igf.split;
        this.segments = igf.segments;
    }

    static SplitGeoFileName = (fileName: string): Array<string> => {
        const split = fileName.split('.');
        if (split.length !== 4) {
            throw new OsmRunError(
                'filename split is not 4',
                'DirHasInconsistentFileNames'
            );
        }
        return split;
    };

    static ParseGeoFileName = (split: Array<string>): IGeoFileNameSegments => {
        return {
            name: split[0],
            date: fileDateStrToDate(split[1]),
            type: geoFileTypeStrToGeoType(split[2]),
            data: dataTypeStrToDataType(split[3]),
        };
    };

    static GetGeoFileNameInterfaceFromPath = (path: string): IGeoFileName => {
        const rp = resolve(path);
        const pp = parsePath(rp);
        const gfn: IGeoFileName = {
            path: rp,
            fileName: pp.base,
            split: [],
            segments: {
                name: '',
                date: new Date(),
                type: 'UNKNOWN',
                data: 'UNKNOWN',
            },
            error: undefined,
        };
        try {
            const split = GeoFileName.SplitGeoFileName(pp.base);
            const segments = GeoFileName.ParseGeoFileName(split);
            gfn.split = split;
            gfn.segments = segments;
        } catch (error) {
            gfn.error = error;
        }
        return gfn;
    };
}

export const FILE_DATE_STR = 'YYY-MM-DD_HHmmss';

export const fileDateStrToDate = (dateString: string): Date => {
    return parse(dateString, FILE_DATE_STR, new Date());
};

export const dataTypeStrToDataType = (dataStr: string): GeoFileDataType => {
    switch (dataStr) {
        case 'json':
            return 'JSON';
        case 'txt':
        case 'text':
            return 'TEXT';
        default:
            throw new OsmRunError(
                `Unknown data file type: [${dataStr}]`,
                'DirHasInconsistentFileNames'
            );
    }
};

export const geoFileTypeStrToGeoType = (typeString: string): GeoFileType => {
    switch (typeString) {
        case 'osm-query':
            return 'OSM_QUERY';
        case 'osm-data':
            return 'OSM_DOWNLOAD';
        case 'int':
            return 'INTERSECTIONS';
        case 'points':
            return 'POINT_MAP';
        case 'rsd':
            return 'ROAD_SEGMENTS';
        default:
            throw new OsmRunError(
                `Unknown geo file type: [${typeString}]`,
                'DirHasInconsistentFileNames'
            );
    }
};

export const geoFileTypeToStr = (type: GeoFileType): string => {
    switch (type) {
        case 'OSM_QUERY':
            return 'osm-query';
        case 'OSM_DOWNLOAD':
            return 'osm-data';
        case 'INTERSECTIONS':
            return 'int';
        case 'POINT_MAP':
            return 'points';
        case 'ROAD_SEGMENTS':
            return 'rsd';
        default:
            throw new OsmRunError(
                `Unknown geo file type: [${type}]`,
                'DirHasInconsistentFileNames'
            );
    }
};

export const dateToFileDateStr = (date: Date): string => {
    return format(date, FILE_DATE_STR);
};
