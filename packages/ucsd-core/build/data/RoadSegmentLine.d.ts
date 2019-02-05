import { LatLng } from '@ball-maps/geo-core';
/**
 * THe RoadSegementLine is used for parsing a RoadSegments file which
 */
export declare class RoadSegmentLine {
    start: LatLng;
    end: LatLng;
    name: string;
    type: string;
    maxSpeed: string;
    lanes: string;
    constructor(start: LatLng, end: LatLng, name: string, type: RoadSegmentType, maxSpeed?: string, lanes?: string);
    /**
     * Return true if this road is the same segment as other, but in reverse
     *   Otherwise return false.
     */
    isReverse(other: RoadSegmentLine): boolean;
    static MinLineLength: number;
    static CreateFromString(input: string): RoadSegmentLine;
    static ParseLineIntoArray(input: string): any;
}
export declare type RoadSegmentType = 'bus_stop' | 'crossing' | 'living_street' | 'motorway_junction' | 'motorway_link' | 'motorway' | 'primary_link' | 'primary' | 'residential' | 'road' | 'secondary_link' | 'secondary' | 'stop' | 'tertiary_link' | 'tertiary' | 'traffic_signals' | 'turning_circle' | 'turning_loop' | 'unclassified';
//# sourceMappingURL=RoadSegmentLine.d.ts.map