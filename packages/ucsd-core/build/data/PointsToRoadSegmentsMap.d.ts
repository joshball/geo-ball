import { LatLng } from '@ball-maps/geo-core';
import { RoadSegmentLine } from './RoadSegmentLine';
export declare type SerializedGeographicPoint = string;
export declare type GeographicPointRoadSegments = Array<[LatLng, IncomingAndOutgoingRoadSegments]>;
export declare type RoadSegments = Array<RoadSegmentLine>;
export declare class IncomingAndOutgoingRoadSegments {
    incoming: RoadSegments;
    outgoing: RoadSegments;
    constructor();
    toString: () => string;
    dump: (tab?: string) => void;
}
export declare class PointsToRoadSegmentsMap {
    private _map;
    constructor();
    serialize(pretty?: boolean): string;
    get(point: LatLng): IncomingAndOutgoingRoadSegments | undefined;
    readonly size: number;
    entries(): GeographicPointRoadSegments;
    set(point: LatLng, ioRoadSegments: IncomingAndOutgoingRoadSegments): Map<string, IncomingAndOutgoingRoadSegments>;
    addToPointsMapOneWay(line: RoadSegmentLine): void;
    toString: () => string;
    dump: (tab?: string) => void;
    private _getOrAddIoRoadSegments;
}
//# sourceMappingURL=PointsToRoadSegmentsMap.d.ts.map