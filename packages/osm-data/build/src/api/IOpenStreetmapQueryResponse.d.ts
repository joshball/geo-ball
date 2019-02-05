import { OpenStreetMapsElementsArray } from '../data/OpenStreetMapElements';
export interface IOpenStreetmapQueryResponse {
    version: number;
    generator: string;
    osm3s: {
        timestamp_osm_base: string;
        copyright: string;
    };
    elements: OpenStreetMapsElementsArray;
}
//# sourceMappingURL=IOpenStreetmapQueryResponse.d.ts.map