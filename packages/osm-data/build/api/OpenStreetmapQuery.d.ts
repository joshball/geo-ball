import { LatLngBounds, ILatLngBounds } from '@ball-maps/geo-core';
import { OSMFeatureKeyValuePair, OSMOutputFormat, IOSMFeatureKeyValuePair } from './OpenStreetmapFeatures';
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