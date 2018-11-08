export class OSMFeatureKeyValuePair {
    key: OSMFeatureKey;
    values: Array<string>;
    constructor(key: OSMFeatureKey, values: Array<string> = ['*']) {
        this.key = key;
        this.values = values;
    }
}

export type OSMFeatureKey =
    | 'aerialway'
    | 'aeroway'
    | 'amenity'
    | 'barrier'
    | 'boundary'
    | 'building'
    | 'craft'
    | 'emergency'
    | 'geological'
    | 'highway'
    | 'historic'
    | 'military'
    | 'man_made'
    | 'power'
    | 'public_transport'
    | 'railway'
    | 'route'
    | 'shop'
    | 'waterway'
    | 'addr';

export type OSMBasicStructure = 'nodes' | 'ways' | 'relations';

export type OSMOutputFormat = 'json' | 'xml' | 'csv' | 'custom' | 'popup';
