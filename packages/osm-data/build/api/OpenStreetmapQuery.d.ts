import { LatLngBounds } from '@ball-maps/geo-core';
import { OSMFeatureKeyValuePair, OSMOutputFormat, OSMFeatureKey } from './OpenStreetmapFeatures';
export declare class OpenStreetmapQuery {
    latLngBounds: LatLngBounds;
    outFormat: OSMOutputFormat;
    timeoutInSec: number;
    bds: Array<string>;
    features: Array<OSMFeatureKeyValuePair>;
    constructor(latLngBounds: LatLngBounds, osmFeatures?: Array<OSMFeatureKey>, outFormat?: OSMOutputFormat, timeoutInSec?: number);
    toString(): string;
    private getResultsString;
    private getFeaturesString;
}
