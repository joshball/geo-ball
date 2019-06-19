import { OpenStreetMapsElementsArray } from '../../data';

export interface IOverpassQueryResponse {
    version: number;
    generator: string;
    osm3s: {
        timestamp_osm_base: string;
        copyright: string;
    };
    elements: OpenStreetMapsElementsArray;
}
