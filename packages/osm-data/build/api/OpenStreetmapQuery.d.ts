import { LatLngBounds, ILatLngBounds } from '@geo-ball/geo-core';
import { OSMFeatureKeyValuePair, OSMOutputFormat, IOSMFeatureKeyValuePair } from '../data/OpenStreetmapFeatures';
export interface IOpenStreetmapQuery {
    latLngBounds?: ILatLngBounds;
    outFormat?: OSMOutputFormat;
    timeoutInSec?: number;
    bds?: Array<string>;
    features?: Array<IOSMFeatureKeyValuePair>;
}
export declare class OpenStreetmapQuery {
    latLngBounds: LatLngBounds;
    outFormat: OSMOutputFormat;
    timeoutInSec: number;
    bds: Array<string>;
    features: Array<OSMFeatureKeyValuePair>;
    constructor(osmQueryObj: IOpenStreetmapQuery);
    toString(): string;
    private getResultsString;
    private getFeaturesString;
}
//# sourceMappingURL=OpenStreetmapQuery.d.ts.map