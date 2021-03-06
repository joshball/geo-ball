export interface IOSMFeatureKeyValuePair {
    key: OSMFeatureKey;
    values: Array<string>;
}

export class OSMFeatureKeyValuePair {
    key: OSMFeatureKey;
    values: Array<string>;
    constructor(key: OSMFeatureKey, values: Array<string> = ['*']) {
        this.key = key;
        this.values = values;
    }
}

export type OSMFeatureKey =
    | 'addr'
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
    | 'man_made'
    | 'military'
    | 'power'
    | 'public_transport'
    | 'railway'
    | 'route'
    | 'shop'
    | 'waterway'

/**
 * https://wiki.openstreetmap.org/wiki/Elements
 *  - nodes (defining points in space),
 *  - ways (defining linear features and area boundaries), and
 *  - relations (which are sometimes used to explain how other elements work together).
 */
export type OsmElementType = 'nodes' | 'ways' | 'relations';


export type OSMOutputFormat = 'json' | 'xml' | 'csv' | 'custom' | 'popup';
