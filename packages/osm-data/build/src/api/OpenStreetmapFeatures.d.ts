export interface IOSMFeatureKeyValuePair {
    key: OSMFeatureKey;
    values: Array<string>;
}
export declare class OSMFeatureKeyValuePair {
    key: OSMFeatureKey;
    values: Array<string>;
    constructor(key: OSMFeatureKey, values?: Array<string>);
}
export declare type OSMFeatureKey = 'aerialway' | 'aeroway' | 'amenity' | 'barrier' | 'boundary' | 'building' | 'craft' | 'emergency' | 'geological' | 'highway' | 'historic' | 'military' | 'man_made' | 'power' | 'public_transport' | 'railway' | 'route' | 'shop' | 'waterway' | 'addr';
export declare type OSMBasicStructure = 'nodes' | 'ways' | 'relations';
export declare type OSMOutputFormat = 'json' | 'xml' | 'csv' | 'custom' | 'popup';
//# sourceMappingURL=OpenStreetmapFeatures.d.ts.map