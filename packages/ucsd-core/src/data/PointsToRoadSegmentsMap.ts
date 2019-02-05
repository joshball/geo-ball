import { SerializedKeyMap } from '../utils/SerializedKeyMap';
import { LatLng } from '@ball-maps/geo-core';
import { RoadSegmentLine } from './RoadSegmentLine';

export type SerializedGeographicPoint = string;
export type GeographicPointRoadSegments = Array<[LatLng, IncomingAndOutgoingRoadSegments]>;

export type RoadSegments = Array<RoadSegmentLine>;
export class IncomingAndOutgoingRoadSegments {
    incoming: RoadSegments;
    outgoing: RoadSegments;
    constructor() {
        this.incoming = [];
        this.outgoing = [];
    }

    toString = (): string => `Outgoing: ${this.outgoing.length}, Incoming: ${this.incoming.length}`;

    dump = (tab: string = '    '): void => {
        const dumpLine = (rli: RoadSegmentLine): void => console.log(`${tab}  - RL: ${rli.name} => P1:[${rli.start}] P2:[${rli.end}]`);
        console.log(`${tab}RoadSegments: out: ${this.outgoing.length}, in: ${this.incoming.length}`)
        console.log(`${tab} OUTGOING:`)
        this.outgoing.forEach(dumpLine)
        console.log(`${tab} INCOMING:`)
        this.incoming.forEach(dumpLine)
    };
}



export class PointsToRoadSegmentsMap {

    private _map: SerializedKeyMap<LatLng, IncomingAndOutgoingRoadSegments>;

    constructor() {
        this._map = new SerializedKeyMap<LatLng, IncomingAndOutgoingRoadSegments>
            (LatLng.Serialize, LatLng.DeSerialize);
        // console.log('PointsToRoadSegmentsMap._map.size', this._map.size)
    }

    public serialize(pretty: boolean = false): string {
        return this._map.serialize(pretty);
    }

    public get(point: LatLng) {
        return this._map.get(point);
    }

    get size(): number {
        return this._map.size;
    }

    public entries(): GeographicPointRoadSegments {
        return this._map.entries();
        // const a: GeographicPointRoadSegments = [];
        // for (const [pointString, roadsInAndOut] of this._map.entries()) {
        //     a.push([LatLng.DeSerialize(pointString), roadsInAndOut]);
        // }
        // return a;
    }

    public set(point: LatLng, ioRoadSegments: IncomingAndOutgoingRoadSegments) {
        return this._map.set(point, ioRoadSegments);
    }

    public addToPointsMapOneWay(line: RoadSegmentLine): void {
        // console.log('addToPointsMapOneWay.pointMap:', this._map)
        // console.log('addToPointsMapOneWay.line:', line)

        const ptOneInfos = this._getOrAddIoRoadSegments(line.start);
        ptOneInfos.outgoing.push(line);
        const ptTwoInfos = this._getOrAddIoRoadSegments(line.end);
        ptTwoInfos.incoming.push(line);
    }

    public toString = (): string => `PTRLMap has ${this.size} entries`;

    public dump = (tab: string = '    '): void => {

        console.log(`================================================================================`);
        console.log(`${tab}!DUMP! PointsToRoadSegmentsMap: has: ${this.size} entries:`)
        console.log(`================================================================================`);

        for (const [pointString, roadsInAndOut] of this._map.entries()) {
            console.log('POINT: ', pointString);
            roadsInAndOut.dump();
        }
        // console.log(`--------------------------------------------------------------------------------`);
        console.log(`================================================================================`);
    };


    private _getOrAddIoRoadSegments(point: LatLng): IncomingAndOutgoingRoadSegments {
        let ioRoadSegments: IncomingAndOutgoingRoadSegments | undefined = this.get(point);
        // console.log('-----')
        // console.log('MAP DUMP')
        // for (const [key, value] of this._map.entries()) {
        //     console.log(`   - ${key}: ${value.toString()}`);
        // }
        // console.log('  getOrAddIoRoadSegments.point: %s', point)
        // console.log('  getOrAddIoRoadSegments.ioRoadSegments: %s', ioRoadSegments)
        if (!ioRoadSegments) {
            // pt1Infos = new Array<Array<RoadSegmentLine>>();
            // ioRoadSegments = [[], []];
            ioRoadSegments = new IncomingAndOutgoingRoadSegments();
            // console.log('addToPointsMapOneWay.pt1Infos.n:', ioRoadSegments)
            this.set(point, ioRoadSegments)
        }
        return ioRoadSegments;
    }

}
