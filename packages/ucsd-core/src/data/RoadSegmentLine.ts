import { LatLngBounds, LatLng } from '@ball-maps/geo-core';

/**
 * THe RoadSegementLine is used for parsing a RoadSegments file which
 */
export class RoadSegmentLine {
    start: LatLng;
    end: LatLng;
    name: string;
    type: string;
    maxSpeed: string;
    lanes: string;

    constructor(start: LatLng, end: LatLng, name: string, type: RoadSegmentType, maxSpeed: string = '', lanes: string = '') {
        this.start = start;
        this.end = end;
        this.name = name;
        this.type = type;
        this.maxSpeed = maxSpeed;
        this.lanes = lanes;
    }

    /**
     * Return true if this road is the same segment as other, but in reverse
     *   Otherwise return false.
     */
    isReverse(other: RoadSegmentLine): boolean {
        return this.start.equals(other.end) && this.end.equals(other.start) &&
            this.name === other.name && this.type === other.type;
    }


    // used to weed out 6 items, plus 5 spaces?
    static MinLineLength: number = 11;

    static CreateFromString(input: string): RoadSegmentLine {
        const { startLat, startLon, endLat, endLon, roadName, roadType } = RoadSegmentLine.ParseLineIntoArray(input);
        const start = new LatLng(startLat, startLon);
        const end = new LatLng(endLat, endLon);
        return new RoadSegmentLine(start, end, roadName, roadType);
    }

    static ParseLineIntoArray(input: string): any {
        const tokSplitter = RegExp(/([-+]?\d*(.\d+)?)\s+([-+]?\d*(.\d+)?)\s+([-+]?\d*(.\d+)?)\s+([-+]?\d*(.\d+)?)\s+"([^"]*)"\s+(\w+)/g);
        const m = tokSplitter.exec(input);
        // console.log(JSON.stringify(m, undefined, 4));
        // console.log('match length:', m && m.length)
        // console.log('match:', m)
        if (!m || m.length !== 11) {
            console.log('match length should be 11')
            console.log('match input', input)
            console.log('match length:', m && m.length)
            console.log('match:', m)
            throw new Error(`match length should be 11 for line: [${input}]`)
        }
        const startLat = parseFloat(m[1]);
        const startLon = parseFloat(m[3]);
        const endLat = parseFloat(m[5]);
        const endLon = parseFloat(m[7]);
        const roadName = m[9];
        const roadType = m[10];

        return { startLat, startLon, endLat, endLon, roadName, roadType };
    }
}

export type RoadSegmentType =
    'bus_stop' |
    'crossing' |
    'living_street' |
    'motorway_junction' |
    'motorway_link' |
    'motorway' |
    'primary_link' |
    'primary' |
    'residential' |
    'road' |
    'secondary_link' |
    'secondary' |
    'stop' |
    'tertiary_link' |
    'tertiary' |
    'traffic_signals' |
    'turning_circle' |
    'turning_loop' |
    'unclassified';
